import React from "react"
import Home from "../Home/Home"
import Map from "../Map/Map"

const Side = () => {
  return (
    <div className="flex-justify-center">
      <div className="aside-home-page">
        <Home />
      </div>
      <div className="map">
        <Map />
      </div>
    </div>
  )
}

export default Side
