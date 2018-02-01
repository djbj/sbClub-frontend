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

  render() {
    // navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    console.log(this.state.myLat)
    return (
      <div>
        {(this.state.myLat && this.state.storeList) ? (<MyMap
          myLat={this.state.myLat}
          myLng={this.state.myLng}
          allStores={this.state.storeList}
          showLocation={this.state.isLocationMarkerShow} />)
          :
          (<div>Getting your position drinker</div>)}

      </div>
    )
  }
}
export default App
