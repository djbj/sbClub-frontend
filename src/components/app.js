import React from "react"
import Header from "./header"
import Map from "./map"
import Transport from "./transport"
import StoreList from "./storeList"
import Home from "./homeView"
// import MapWithMarker from "./map-with-marker"

class App extends React.Component {
  constructor(props) {
    super(props)
    navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    this.state = {


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
  }

  getMyLocationError = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  render() {
    // navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getMyLocationError)
    console.log(this.state.myLat)
    return (
      <div>

        <Home
          myLat={this.state.myLat}
          myLng={this.state.myLng}/>
      </div>
    )
  }
}
export default App
