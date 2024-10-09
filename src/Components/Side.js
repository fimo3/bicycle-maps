import React, { useState } from "react"
import Home from "../Home/Home"
import Map from "../Map/Map"

const Side = () => {
  const [startLocation, setStartLocation] = useState(null)
  const [endLocation, setEndLocation] = useState(null)

  const handleDirectionsSubmit = (startCoords, endCoords) => {
    setStartLocation(startCoords)
    setEndLocation(endCoords)
  }

  return (
    <div className="flex-justify-center">
      <div className="aside-home-page">
        <Home onSubmit={handleDirectionsSubmit} />
      </div>
      <div className="map">
        <Map startLocation={startLocation} endLocation={endLocation} />
      </div>
    </div>
  )
}

export default Side
