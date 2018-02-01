import React from "react"
import "./index.css"

class Transport extends React.Component {

  handleClick = event => {
    console.log("Transport changed to: " + event.target.value)
    this.props.sendToAppTransport(event.target.value)
  }

  render() {
    return (
      <div className="transport-container">
        <button className={this.props.transport === "WALKING" ? "transport-chosen" : "transport-not-chosen"} value={"WALKING"} onClick={this.handleClick}>
          WALK
        </button>
        <button className={this.props.transport === "DRIVING" ? "transport-chosen" : "transport-not-chosen"} value={"DRIVING"} onClick={this.handleClick}>
          DRIVE
        </button>
        <button className={this.props.transport === "TRANSIT" ? "transport-chosen" : "transport-not-chosen"} value={"TRANSIT"} onClick={this.handleClick}>
          TRANSIT
        </button>
      </div>
    )
  }
}

export default Transport
