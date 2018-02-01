import React from "react"
import Map from "../map"
import Transport from "../transport"
import StoreList from "../storeList"
import MyMap from "../myMap"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeLat: 0,
      storeLng: 0,
      isStoreChosen: false,
      chosenStore: 0,
      chosenTransport: "WALKING"
    }
  }

  // getTransportTimes = () => {
  //   let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + this.props.myLat + "%2C" + this.props.myLng + "&destinations="
  //
  //   const urlStoresCoords = this.props.storeList.map(store => {
  //     let destinationsCoords;
  //     destinationsCoords = store.Lat + "%2C" + store.Lng + "%7C"
  //     url += destinationsCoords
  //     return destinationsCoords
  //   })
  //   url += "&key=AIzaSyBEDZiGba8Eukfh-eDXzlAES3IS-Fh3qVc&mode=walking"
  //   console.log(url)
  // }

  upDateCenter = (latitude, longitude, isChosen, storeNr) => {
    console.log(`UpdateApp to: ${latitude} and ${longitude}`)
    this.setState({
      // myLat: this.state.myLat,
      // myLng: this.state.myLng,
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
    return (
      <div>
        {<MyMap
          myLat={this.props.myLat}
          myLng={this.props.myLng}
          chosenStoreLat={this.state.storeLat}
          chosenStoreLng={this.state.storeLng}
          appState={this.upDateCenter}
          isLocationMarkerShown={this.state.isLocationMarkerShown}
          storeList={this.props.storeList}
          chosenTransport={this.state.chosenTransport} />
        }
        <Transport
          sendToHomeTransport={this.upDateTransport}
          transport={this.state.chosenTransport} />
        <StoreList
          myLat={this.state.myLat}
          myLng={this.state.myLng}
          callToApp={this.upDateCenter}
          setAppStoreList={this.upDateStoreList}
          storeList={this.props.storeList}
          travel={this.state.chosenTransport}
        />
      </div>
    )
  }
}
export default Home
