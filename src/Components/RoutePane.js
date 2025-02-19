import React, { useState } from "react"
import Input from "./Input"
import Button from "./Button"

const RoutePane = ({ onSubmit }) => {
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")
  const [startSuggestions, setStartSuggestions] = useState([])
  const [endSuggestions, setEndSuggestions] = useState([])

  const apiKey = "6cd58b04-031e-426a-a662-0194bc11d2ee"

  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([])
      return
    }

    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(
      query
    )}&key=${apiKey}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data && data.hits) {
        const suggestions = data.hits.map((hit) => ({
          name: hit.name,
          point: hit.point,
        }))
        setSuggestions(suggestions)
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
    }
  }

  const geocode = async (location) => {
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

  const handleInputChange = (value, setLocation, setSuggestions) => {
    setLocation(value)
    fetchSuggestions(value, setSuggestions)
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

    const getCoordinates = async (location, suggestions) => {
      if (location.toLowerCase() === "your location") {
        return await getCurrentLocation()
      }

      const suggestion = suggestions.find((s) => s.name === location)
      if (suggestion) {
        return [suggestion.point.lat, suggestion.point.lng]
      } else {
        return await geocode(location)
      }
    }

    const startCoords = await getCoordinates(startLocation, startSuggestions)
    const endCoords = await getCoordinates(endLocation, endSuggestions)

    if (startCoords && endCoords) {
      onSubmit(startCoords, endCoords)
    } else {
      console.error("Could not get coordinates for one or both locations.")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className=" margin-top">Start location: </label>
        <Input
          type="text"
          value={startLocation}
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              setStartLocation,
              setStartSuggestions
            )
          }
          styling="route-input"
          placeholder="e.g. Your location"
          className=" margin-top"
          suggestions={startSuggestions.map((suggestion) => suggestion.name)}
        />
        <br />
        <label className=" margin-top">End location: </label>
        <Input
          className=" margin-top"
          type="text"
          value={endLocation}
          onChange={(e) =>
            handleInputChange(e.target.value, setEndLocation, setEndSuggestions)
          }
          styling="route-input"
          placeholder="e.g. 'Milin Kamak' №34 road..."
          suggestions={endSuggestions.map((suggestion) => suggestion.name)}
        />
        <button
          type="submit"
          styling="button-submit"
          className="Button margin-top"
        >
          Find route
        </button>
      </form>
    </div>
  )
}

export default RoutePane
