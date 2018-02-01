import React from "react"
// import { DirectionsRenderer } from "react-google-maps"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps"
import "./index.css"
const google = window.google;


class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStoreChosen: false,
      openingTimes: "",
      timeToClose: "",
      travelTime: "",
    }
  }

  componentWillMount() {
    const setOpeningTimes = this.getOpeningTimes(this.props.openingHrs)
    const setTimeToClose = this.getTimeToClose(setOpeningTimes)
    this.setState({
      openingTimes: setOpeningTimes,
      timeToClose: setTimeToClose
    })
  }

  getOpeningTimes = openingTimes => {
    const today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 // January is 0!
    const yyyy = today.getFullYear()
    // const currentTime = today.getHours() + ":" + today.getMinutes()
    // const currentTime = `${today.getHours()}:${today.getMinutes()}`
    // console.log(currentTime)
    if (dd < 10) { dd = `0${dd}` }
    if (mm < 10) { mm = `0${mm}` }
    const todayDate = `${yyyy}-${mm}-${dd}`
    // for (let times of openingTimes) {
    for (let i = 0; i < openingTimes.length; i++) {
      if (todayDate.localeCompare(openingTimes[i][0]) === 0) {
      // if (todayDate === openingTimes[i][0]) {
        return openingTimes[i]
      }
    }
  }

  getTimeToClose = openingTimes => {
    const d = new Date()
    // let closingTime = this.state.timeToClose
    let closingTime = openingTimes[2]
    closingTime = closingTime.split(":")
    const minutesToClosing = ((-d + d.setHours(closingTime[0], closingTime[1], 0, 0)) / 6e4)
    return minutesToClosing
  }

  handleClick = () => {
    const DirectionsService = new google.maps.DirectionsService()
    // const travelMode = `google.maps.TravelMode.${this.props.travel}`
    DirectionsService.route({
      origin: new google.maps.LatLng(this.props.myLat, this.props.myLng),
      destination: new google.maps.LatLng(this.props.storeLat, this.props.storeLng),
      travelMode: google.maps.TravelMode.WALKING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        })
      } else {
        console.error(`error fetching directions ${result}`);
      }
    })
    this.setState({
      isStoreChosen: !this.state.isStoreChosen,
      chosenStore: this.props.nr
    })
    console.log(`Store clicked is: ${this.props.name} with coords ${this.props.storeLat} ${this.props.storeLng}`)
    console.log(`StoreChosen is ${this.state.chosenStore}`)
    this.props.callToStoreList(
      this.props.storeLat,
      this.props.storeLng,
      this.state.isStoreChosen,
      this.state.chosenStore
    )
  }

  render() {

    // const openToday = this.getOpeningTimes(this.props.openingHrs)
    // const closingIn = this.getTimeToClose(openToday)
    // const openToday = ["","","00:00"]
    return (
      <div className="store" onClick={this.handleClick}>
        <a href="#">
          <div className="store-box">
            <div className="store-name"><span className="systemet">Club</span></div>
            {/* <div className="store-nr"> {this.props.nr} </div> */}
            <span className="store-address">{this.props.name} {this.props.address1} </span>
            {/* <span className="store-coords">
            Lat: {this.props.storeLat}
            Lng: {this.props.storeLng}</span> */}
            {this.state.openingTimes[2] === "00:00" ? (
              <span className="store-hrs">Closed Today</span>
            ) : (
              <div>
                <span className="store-hrs">Open Today Until: {this.state.openingTimes[2]} </span>
                <span className="closes-in">Closes in: {this.state.timeToClose} </span>
              </div>
            )}
            {/* <span className="store-hrs">Open Today Until: {openToday[2]} </span> */}
            {/* <span className="closes-in">Closes in: {this.state.timeToClose} </span> */}
            {/* <span className="closes-in">Closes in: {this.props.timeToClose} </span> */}
            <span className="walking-time">Travel time: {this.state.travelTime} </span>
          </div>
        </a>
      </div>
    )
  }
}

export default Store
