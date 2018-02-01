import React from "react"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import sbBottle1 from "./sbBottle1.png"

import "./index.css"

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={props.zoomTala}
    defaultCenter={{ lat: props.myLat, lng: props.myLng }}
  >
    <Marker
      position={{ lat: props.myLat, lng: props.myLng }}
    />
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
      >
        {/* {console.log("props isOpen" + props.isOpen)} */}
        {/* {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          <FaAnchor />
          TextHere </InfoWindow>} */}
      </Marker>
    ))}
    </GoogleMap>
)

class MyMap extends React.Component {

  render() {
    return (
      <div className="my-map">
        <MapWithAMarker
          containerElement={<div style={{ height: "400px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          zoomTala={13}
          myLat={parseFloat(this.props.myLat)}
          myLng={parseFloat(this.props.myLng)}
          allStores={this.props.allStores}
        />
      </div>
    )
  }
}

export default MyMap
