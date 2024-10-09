import React, { useState } from "react"
import Input from "../Components/Input"
import Button from "./Button"

const DirectionsMiniPane = ({ onSubmit }) => {
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")

  const geocode = async (location) => {
    const apiKey = "6cd58b04-031e-426a-a662-0194bc11d2ee"
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(
      location
    )}&key=${apiKey}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data && data.hits && data.hits.length > 0) {
        const { point } = data.hits[0]
        return [point.lat, point.lng]
      } else {
        console.error("No results found for location:", location)
        return null
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error)
      return null
    }
  }

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve([position.coords.latitude, position.coords.longitude])
          },
          (error) => {
            console.error("Error getting location:", error)
            reject(null)
          }
        )
      } else {
        console.error("Geolocation is not supported by this browser.")
        reject(null)
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let startCoords
    let endCoords

    if (startLocation.toLowerCase() === "your location") {
      startCoords = await getCurrentLocation()
    } else {
      startCoords = await geocode(startLocation)
    }

    if (endLocation.toLowerCase() === "your location") {
      endCoords = await getCurrentLocation()
    } else {
      endCoords = await geocode(endLocation)
    }

    if (startCoords && endCoords) {
      onSubmit(startCoords, endCoords)
    } else {
      console.error("Could not get coordinates for one or both locations.")
    }
  }

  return (
    <div className="directions-mini-pane">
      <h3>Directions</h3>
      <form onSubmit={handleSubmit}>
        <label>Start location: </label>
        <Input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          placeholder="e.g. Your location"
        />
        <hr />
        <label>End location: </label>
        <Input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          placeholder="e.g. 'Milin Kamak' №34 road..."
        />
        <hr />
        <Button
          type="submit"
          content="Find route"
          styling="Directions-button-submit"
        />
      </form>
    </div>
  )
}

export default DirectionsMiniPane
