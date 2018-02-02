import React from "react"
import Header from "./header"
import Map from "./map"
import Transport from "./transport"
import StoreList from "./storeList"
import Home from "./homeView"
import MyMap from "./myMap"
// import MapWithMarker from "./map-with-marker"

class App extends React.Component {
  constructor(props) {
    super(props)
    navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    this.state = {
      enter:""
    }
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
    fetch("http://localhost:8080/stores").then(response => {
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
      return json
    })
      .then(json => {
        let destinationsCoords = ""
        let urlStoresCoords = json.map(store => {
          destinationsCoords = store.Lat + "%2C" + store.Lng + "%7C"
          return destinationsCoords
        })
        urlStoresCoords = urlStoresCoords.join("")
        console.log(urlStoresCoords)
        let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + this.state.myLat + "%2C" + this.state.myLng + "&destinations="+ urlStoresCoords + "&key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&mode=walking"
        console.log(url)
        return url
      })
      // .then(url => {
      //   // Here I fetch distances using google matrix api
      //   fetch(url, { mode: "no-cors" })
      //     .then(response => {
      //       console.log(typeof(response))
      //       return response
      //     })
      //     .then(response => console.log(response))
      // })
  }

  getMyLocationError = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  enterClub = () => {
    this.setState({
      enter: "ENTER"
    })
  }

  render() {
    return (
      <div>
        <Header />
        {(this.state.myLat && this.state.storeList && this.state.enter==="ENTER") ? (
          <Home
            myLat={this.state.myLat}
            myLng={this.state.myLng}
            storeList={this.state.storeList}
            showLocation={this.state.isLocationMarkerShow} />)
          :
          (<div>
            <div className="welcome">WELCOME</div>
          <div className="drinker">- getting your position drinker -</div>
          <div className="message">
            Welcome to the systemet.club website.
            You may not enter if you are:
            Younger than 20 years old or
            Lawyer working for Systembolaget.
            Others, please enter on your own risk !
            <div className="enter" onClick={this.enterClub}>ENTER</div>
          </div>
          </div>
          )

        }

      </div>
    )
  }
}
export default App
