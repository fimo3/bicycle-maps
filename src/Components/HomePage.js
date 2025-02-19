import React, { useState } from "react"
import Home from "../Home/Home"
import Map from "../Map/Map"

const HomePage = () => {
  const [startLocation, setStartLocation] = useState(null)
  const [endLocation, setEndLocation] = useState(null)
  const [mapData, setMapData] = useState({
    directions: [],
    weatherData: {},
    routeColors: [],
  })
  const [mode, setMode] = useState("cycle")

  const handleDirectionsSubmit = (startCoords, endCoords) => {
    setStartLocation(startCoords)
    setEndLocation(endCoords)
  }

  const handleMapDataUpdate = (data) => {
    setMapData((prevData) => ({ ...prevData, ...data }))
  }

  return (
    <div className="homepage-container">
      <div className="aside-home-page">
        <Home
          onSubmit={handleDirectionsSubmit}
          mapData={mapData}
          mode={mode}
          setMode={setMode}
        />
      </div>
      <div className="map fixed-map">
        <Map
          startLocation={startLocation}
          endLocation={endLocation}
          onDataUpdate={handleMapDataUpdate}
          mode={mode}
          setMode={setMode}
        />
      </div>
    </div>
  )
}

export default HomePage
