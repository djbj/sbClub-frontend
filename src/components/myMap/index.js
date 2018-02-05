import React from "react"
import { withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps"
import sbBottle1 from "./sbBottle1.png"
import "./index.css"

const google = window.google;

const MapWithAMarker = withGoogleMap(props =>

  <GoogleMap
    defaultZoom={props.zoomTala}
    defaultCenter={{ lat: props.myLat, lng: props.myLng }}
  >
    <Marker
      position={{ lat: props.myLat, lng: props.myLng }}
    />
    {props.storeList.map(store => (
      <Marker
        key={store.Nr}
        position={{ lat: parseFloat(store.Lat), lng: parseFloat(store.Lng) }}
        title={
          `SB ${store.Address1}
        Open today until ${store.Oppetider}`}
        // onClick={() => (console.log(`Store number ${store.Nr} clicked`))}
        // onClick={() => this.props.handleClick(store.Lat, store.Lng, store.isChosen, store.chosenStoreNr)}
        onClick={()=>(props.onStoreMarkerClick(store.Lat, store.Lng, store.isChosen, store.chosenStoreN))}
        // label="SB"
        icon={sbBottle1}
      >
      </Marker>
    ))}
    {props.directions && <DirectionsRenderer directions={props.directions} zoom="13" />}
    </GoogleMap>
)

class MyMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      directions: ""
    }
  }
//
  // componentDidMount() {
// componentWillReceiveProps(nextProps) {
  updateMyMap = () => {
    const DirectionsService = new google.maps.DirectionsService()
    DirectionsService.route({
      origin: new google.maps.LatLng(parseFloat(this.props.myLat), parseFloat(this.props.myLng)),
      destination: new google.maps.LatLng(parseFloat(this.props.chosenStoreLat), parseFloat(this.props.chosenStoreLng)),
      travelMode: google.maps.TravelMode[this.props.chosenTransport]
    },(result, status) => {
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

  storeMarkerClick = (storeLat, storeLng, isChosen, chosenStoreNr) => {
    console.log(`StoreListItemClicked ${storeLat} and ${storeLng}`)
    this.props.callToApp(storeLat, storeLng, isChosen, chosenStoreNr)
  }

  render() {
    this.updateMyMap()
    return (
      <div className="my-map">
        <MapWithAMarker
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div className="map" id="map" style={{ height: "100%" }} />}
          zoomTala={13}
          myLat={parseFloat(this.props.myLat)}
          myLng={parseFloat(this.props.myLng)}
          chosenStoreLat={parseFloat(this.props.chosenStoreLat)}
          chosenStoreLng={parseFloat(this.props.chosenStoreLng)}
          storeList={this.props.storeList}
          directions={this.state.directions}
          onStoreMarkerClick={this.storeMarkerClick}
        />
      </div>
    )
  }
}

export default MyMap
