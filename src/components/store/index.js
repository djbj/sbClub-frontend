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
      chosenStore: "",
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
    if (dd < 10) { dd = `0${dd}` }
    if (mm < 10) { mm = `0${mm}` }
    const todayDate = `${yyyy}-${mm}-${dd}`
    for (let i = 0; i < openingTimes.length; i++) {
      if (todayDate.localeCompare(openingTimes[i][0]) === 0) {
        return openingTimes[i]
      }
    }
  }

  getTimeToClose = openingTimes => {
    const d = new Date()
    let closingTime = openingTimes[2]
    closingTime = closingTime.split(":")
    const minutesToClosing = ((-d + d.setHours(closingTime[0], closingTime[1], 0, 0)) / 6e4)
    if (minutesToClosing < 1) { return "Closed" }
    const hours = Math.floor(minutesToClosing / 60)
    const minutes = Math.floor(minutesToClosing % 60)

    if (hours === 0) { return ` ${minutes} minutes` }
    else if (hours !== 0 && minutes !== 0) { return ` ${hours} hrs ${minutes} mins` }
    else if (hours !== 0 && minutes === 0) { return ` ${hours} hrs` }
  }

  handleClick = () => {

    // let directionsDisplay
    const directionsService = new google.maps.DirectionsService();
    //
    // const haight = new google.maps.LatLng(this.props.storeLat, this.props.storeLng);
    // const oceanBeach = new google.maps.LatLng(this.props.myLat, this.props.myLng);
    //
    // function initialize() {
    //   directionsDisplay = new google.maps.DirectionsRenderer();
    //   const mapOptions = {
    //     zoom: 14,
    //     center: haight
    //   }
    //   const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //   directionsDisplay.setMap(map)
    // }
    //
    // function calcRoute() {
    //   var selectedMode = document.getElementById('mode').value;
    //   var request = {
    //       origin: haight,
    //       destination: oceanBeach,
    //       // Note that Javascript allows us to access the constant
    //       // using square brackets and a string value as its
    //       // "property."
    //       travelMode: google.maps.TravelMode[selectedMode]
    //   };
    //   directionsService.route(request, function(response, status) {
    //     if (status == 'OK') {
    //       directionsDisplay.setDirections(response);
    //     }
    //   });
    // }
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
    return (
      <div className="store" onClick={this.handleClick}>
        <a href="#">
          <div className="store-box">
            <div className="store-name"><span className="systemet">Club</span></div>
            <span className="store-address">{this.props.name} {this.props.address1} </span>
            {this.state.openingTimes[2] === "00:00" ? (
              <span className="store-hrs">Closed Today</span>
            ) : (
              <div>
                {this.state.timeToClose === "Closed" ? (
                  <div className="open-info">
                    <span className="closes-in">Sorry, closed at {this.state.openingTimes[2]}</span>
                </div>
                ) : (
                  <div className="open-info">
                    <span className="store-hrs">Open until: {this.state.openingTimes[2]} </span>
                    <span className="closes-in">{this.state.timeToClose}</span>
                  </div>
                )}
              </div>
            )}
            {/* <span className="travel-time">Travel time: {this.state.travelTime} $$$ </span> */}
            {/* <span className="store-coords">Coords: {this.props.storeLat}, {this.props.storeLng} </span> */}
          </div>
        </a>
      </div>
    )
  }
}

export default Store
