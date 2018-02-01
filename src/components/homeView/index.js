import React from "react"
import Header from "../header"
import Map from "../map"
import Transport from "../transport"
import StoreList from "../storeList"
// import MapWithMarker from "./map-with-marker"

class Home extends React.Component {
  constructor(props) {
    super(props)
    navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    this.state = {
      storeList: [],
      // map default beginning is in Central Stockholm
      myLat: this.props.myLat,
      myLng: this.props.myLng,
      isLocationMarkerShown: false,
      storeLat: 0,
      storeLng: 0,
      isStoreChosen: false,
      chosenStore: 0,
      chosenTransport: "WALKING"
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/stores").then(response => {

      console.log("promise1")
      return response.json()
    }).then(json => {
      json = json.map(store => {
        let openingHours = store.Oppettider
        openingHours = openingHours.split(",")
        openingHours = openingHours.map(item =>
          item.split(";"))
        store.Oppettider = openingHours
        return store
      })
      this.setState({ storeList: json })
      console.log("promise2")
      return json
    })
    // .then(json => {
    //   let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + this.state.myLat + "%2C" + this.state.myLng + "&destinations="
    //   const urlStoresCoords = json.map(store => {
    //     let destinationsCoords;
    //     destinationsCoords = store.Lat + "%2C" + store.Lng + "%7C"
    //     url += destinationsCoords
    //     return destinationsCoords
    //   })
    //   url += "&key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&mode=walking"
    //   console.log("promise3")
    //   console.log(url)
    //   return url
    // })
    // .then(url => {
    //   fetch(url).then(response => {
    //     console.log("REsponse is: " + response)
    //   })
    //   console.log("promise4")
    // })
  }

  getTransportTimes = () => {
    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + this.props.myLat + "%2C" + this.props.myLng + "&destinations="

    const urlStoresCoords = this.props.storeList.map(store => {
      let destinationsCoords;
      destinationsCoords = store.Lat + "%2C" + store.Lng + "%7C"
      url += destinationsCoords
      return destinationsCoords
    })
    url += "&key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&mode=walking"
    console.log(url)
  }

  getLocationSuccess = pos => {
    const crd = pos.coords
    console.log("Your current position is:")
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
    console.log("")
    this.setState({
      myLat: crd.latitude,
      myLng: crd.longitude,
      isLocationMarkerShown: true
    })
  }

  getMyLocationError = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  upDateCenter = (latitude, longitude, isChosen, storeNr) => {
    console.log(`UpdateApp to: ${latitude} and ${longitude}`)
    this.setState({
      myLat: this.state.myLat,
      myLng: this.state.myLng,
      storeLat: latitude,
      storeLng: longitude,
      isStoreChosen: true,
      chosenStore: storeNr
    })
  }

  upDateStoreList = storeItems => {
    this.setState ({
      storeList:storeItems
    })
    console.log("StoreList updated in app")
  }

  upDateTransport = transport => {
    this.setState({
      chosenTransport: transport
    })
  }

  render() {
    // navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    return (

      <div>
        <Header />
        {this.state.isStoreChosen ? (
          <Map
            myLat={this.state.storeLat}
            myLng={this.state.storeLng}
            chosenStoreLat={this.state.storeLat}
            chosenStoreLng={this.state.storeLng}
            appState={this.upDateCenter}
            isLocationMarkerShown={this.state.isLocationMarkerShown}
            storeList={this.state.storeList}
            chosenTransport={this.state.chosenTransport} />
        ) : (
          <Map
            myLat={this.state.myLat}
            myLng={this.state.myLng}
            chosenStoreLat={this.state.storeLat}
            chosenStoreLng={this.state.storeLng}
            appState={this.upDateCenter}
            isLocationMarkerShown={this.state.isLocationMarkerShown}
            storeList={this.state.storeList}
            chosenTransport={this.state.chosenTransport} />
        )}
        <Transport
          sendToAppTransport={this.upDateTransport}
          transport={this.state.chosenTransport}/>
        <StoreList
          myLat={this.state.myLat}
          myLng={this.state.myLng}
          callToApp={this.upDateCenter}
          setAppStoreList={this.upDateStoreList}
          storeList={this.state.storeList}
          travel={this.state.chosenTransport}
        />
      </div>
    )
  }
}
export default Home
