import React from "react"
import { compose, withProps, lifecycle, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps"
import sbBottle1 from "./sbBottle1.png"
const google = window.google;
// const FaAnchor = require("react-icons/lib/fa/anchor")
const FaAnchor = "<p>Hello</p>"

const MyMapComponent = compose(
  withProps({
  }),
  withStateHandlers(() => ({
    isOpen: false
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen
    })
  }),
  withScriptjs, withGoogleMap, lifecycle({
    componentWillMount() {
      const DirectionsService = new google.maps.DirectionsService()
      const travelMode = `google.maps.TravelMode.${this.props.travel}`
      console.log("TravelMode is " + travelMode)
      console.log("This.props.travel " + this.props.travel)
      console.log("Travel is: " + google.maps.TravelMode[this.props.chosenTransport])
      const a =this.props.chosenTransport
      const g = google.maps.TravelMode
      DirectionsService.route({
        // origin: new google.maps.LatLng(59.317254999999996, 18.0282943),
        origin: new google.maps.LatLng(this.props.myPosLat, this.props.myPosLng),
        destination: new google.maps.LatLng(59.298469, 18.0790565),
        // destination: new google.maps.LatLng(this.props.myStoreLat, this.props.myStoreLng),
        // destination: new google.maps.LatLng(59.3081016, 18.0740143),
        // travelMode: this.props.travel
        // travelMode: google.maps.TravelMode[this.props.travel]
        travelMode: google.maps.TravelMode.WALKING
        // travelMode
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("Directions: " + result)
          this.setState({
            directions: result
          })
        } else {
          console.error(`error fetching directions ${result}`);
        }
      })
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={13}
    onZoomChanged={() => (console.log("ZoomChanged"))}
    onClick={() => (console.log("Map clicked"))}
    // defaultCenter={{ lat: 59.3170826, lng: 18.0275315}}
    defaultCenter={{ lat: props.myPosLat, lng: props.myPosLng }}
    center={{ lat: props.myPosLat, lng: props.myPosLng }}
    clickableIcons={false}>
    {props.allStores.map(store => (
      // console.log(store),
      // console.log(store.Lat, store.Lng)
      <Marker
        key={store.Nr}
        position={{ lat: parseFloat(store.Lat), lng: parseFloat(store.Lng) }}
        title={
          `SB ${store.Address1}
        Open today until ${store.Oppetider}`}
        onClick={() => (console.log(`Store number ${store.Nr} clicked`))}
        // label="SB"
        icon={sbBottle1}

        // icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        // icon={"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0B7B3E"}
        // color={"0B7B3E"}
      >
        {/* {console.log("props isOpen" + props.isOpen)} */}
        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          {/* <FaAnchor /> */}

          TextHere </InfoWindow>}
      </Marker>
    ))}
    {props.isMarkerShown && <Marker
      position={{ lat: props.myPosLat, lng: props.myPosLng }}
      title="Current position"
      snippet="Population: 4,137,400"
      // label={""}
      // icon={"https://static.systembolaget.se/content/assets/images/sb-logotype.svg"}
      // icon="./sbBottle.png"
      onClick={props.onMarkerClick} />}
      {console.log("directions are: " + props.directions)}
    {props.directions && <DirectionsRenderer directions={props.directions} zoom="13" />}

    {console.log(props.directions)}
  </GoogleMap>)

export default class Map extends React.PureComponent {

  componentDidMount() {
    // this.delayedShowMarker()

  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    console.log(`State coords  ${this.props.myLat}  ${this.props.myLng}`)
    console.log("Hide marker")
    this.setState({
      isMarkerShown: false
    })
    console.log("HandleMarkerClick")
    this.delayedShowMarker()
  }

  render() {
    console.log("Rendering MyMap")
    return (
      <div>
        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          // muna ad nota parseFloat
          myPosLat={parseFloat(this.props.myLat)}
          myPosLng={parseFloat(this.props.myLng)}
          // isMarkerShown={this.props.isLocationMarkerShown}
          // isMarkerShown={false}
          onMarkerClick={this.handleMarkerClick}
          allStores={this.props.storeList}
          myStoreLat={parseFloat(this.props.chosenStoreLat)}
          myStoreLng={parseFloat(this.props.chosenStoreLat)}
          // isOpen={true}
          // travel="TRANSIT"
          travel={"google.maps.TravelMode." + this.props.chosenTransport}
        />
        {/* <MapWithADirectionsRenderer
          originLat={this.props.myLat}
          originLng={this.props.myLng} /> */}
        {/* <MapWithAMarker
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          lat={parseFloat(this.props.myLat)}
          lng={parseFloat(this.props.myLng)}
          isMarkerShown={this.props.isLocationMarkerShown}
          onMarkerClick={this.handleMarkerClick} /> */}
      </div>
    )
  }
}
