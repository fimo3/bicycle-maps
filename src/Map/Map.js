import React, { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import pin from "../images/pin2.png"
import SpinnerComponent from "../Components/SpinnerComponent"

const customIcon = new L.Icon({
  iconUrl: pin,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const Map = ({ startLocation, endLocation, onDataUpdate, mode, setMode }) => {
  const mapContainer = useRef(null)
  const [loading, setLoading] = useState(false)
  const mapInstance = useRef(null)
  const routeLayers = useRef([])
  const startMarker = useRef(null)
  const endMarker = useRef(null)

  // Local states – they can be updated as needed, but also pushed to the parent.
  const [directions, setDirections] = useState([])
  const [avgWeather, setAvgWeather] = useState({})
  const [routeColors, setRouteColors] = useState([])

  useEffect(() => {
    if (!mapInstance.current && mapContainer.current) {
      mapInstance.current = L.map(mapContainer.current).setView(
        [42.6977, 23.3219],
        4
      )

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 24,
      }).addTo(mapInstance.current)
    }

    if (mapInstance.current && startLocation && endLocation) {
      getDirections(startLocation, endLocation)
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [startLocation, endLocation, mode])

  const getWeatherData = async (coordinates) => {
    const apiKey = "4e91fc4f3b4cc81c46e873bf2b5b7951"
    const weatherPromises = coordinates.map(async (coord) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=${apiKey}&units=metric`
      try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.main) {
          return {
            temperature: data.main.temp,
            weather: data.weather[0].description,
          }
        } else {
          console.error(
            `No main data found for coordinates: ${coord[0]}, ${coord[1]}`
          )
          return null
        }
      } catch (error) {
        console.error(
          `Error fetching weather data for coordinates: ${coord[0]}, ${coord[1]}`,
          error
        )
        return null
      }
    })

    const weatherData = await Promise.all(weatherPromises)
    const validWeatherData = weatherData.filter((data) => data !== null)

    if (validWeatherData.length > 0) {
      const avgTemp =
        validWeatherData.reduce((sum, data) => sum + data.temperature, 0) /
        validWeatherData.length
      const computedAvgWeather = {
        temperature: avgTemp.toFixed(1),
        description: validWeatherData[0].weather,
      }
      setAvgWeather(computedAvgWeather)
      if (onDataUpdate) {
        onDataUpdate({ weatherData: computedAvgWeather })
      }
    } else {
      setAvgWeather({})
      if (onDataUpdate) {
        onDataUpdate({ weatherData: {} })
      }
    }
  }

  const getRandomColor = () => {
    let red,
      green,
      blue = 0
    while (!(red + green + blue >= 100)) {
      red = Math.floor(Math.random() * 50)
      green = Math.floor(Math.random() * 256)
      blue = Math.floor(Math.random() * 50)
    }
    return `#${red.toString(16).padStart(2, "0")}${green
      .toString(16)
      .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`
  }

  const getDirections = async (start, end) => {
    if (!start || !end)
      return console.error("Start or end location is missing.")

    const apiKey = "6cd58b04-031e-426a-a662-0194bc11d2ee"
    let url
    setLoading(true)

    if (mode === "cycle") {
      url = `https://graphhopper.com/api/1/route?point=${start[0]},${start[1]}&point=${end[0]},${end[1]}&vehicle=bike&locale=en&points_encoded=false&key=${apiKey}&algorithm=alternative_route&alternative_route.max_paths=5&alternative_route.min_paths=3&alternative_route.max_share_factor=0.5&alternative_route.max_weight_factor=2`
    } else if (mode === "foot") {
      url = `https://graphhopper.com/api/1/route?point=${start[0]},${start[1]}&point=${end[0]},${end[1]}&vehicle=foot&locale=en&points_encoded=false&key=${apiKey}&algorithm=alternative_route&alternative_route.max_paths=5&alternative_route.min_paths=3&alternative_route.max_share_factor=0.5&alternative_route.max_weight_factor=2`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.paths && data.paths.length > 0) {
        const sortedPaths = data.paths.sort((a, b) => a.distance - b.distance)
        const colors = []

        const directionsData = sortedPaths.map((path, index) => {
          const randomColor = getRandomColor()
          colors.push(randomColor)

          return {
            time: path.time / 60000,
            distance: path.distance / 1000,
            coordinates: path.points.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ]),
            instructions: path.instructions,
            color: randomColor,
          }
        })

        setDirections(directionsData)
        setRouteColors(colors)
        if (onDataUpdate) {
          onDataUpdate({ directions: directionsData, routeColors: colors })
        }

        // Remove old layers
        routeLayers.current.forEach((layer) => layer.remove())
        routeLayers.current = []

        // Add new route layers to the map
        directionsData.forEach((route, index) => {
          const borderLayer = L.polyline(route.coordinates, {
            color: "#000000",
            weight: 11 - 1.5 * index,
            opacity: 0.8,
          }).addTo(mapInstance.current)

          const routeLayer = L.polyline(route.coordinates, {
            color: route.color,
            weight: 9 - 1.5 * index,
            opacity: (9 - index) / 10,
          }).addTo(mapInstance.current)

          routeLayers.current.push(borderLayer, routeLayer)
        })

        // Remove previous markers and add new ones
        if (startMarker.current) startMarker.current.remove()
        if (endMarker.current) endMarker.current.remove()

        startMarker.current = L.marker(start, { icon: customIcon })
          .addTo(mapInstance.current)
          .bindPopup("Start Location")
          .openPopup()

        endMarker.current = L.marker(end, { icon: customIcon })
          .addTo(mapInstance.current)
          .bindPopup("End Location")
          .openPopup()

        const allCoordinates = sortedPaths.flatMap((path) =>
          path.points.coordinates.map((coord) => [coord[1], coord[0]])
        )
        mapInstance.current.fitBounds(L.latLngBounds(allCoordinates))

        // Fetch weather data for the route coordinates.
        getWeatherData(allCoordinates)
      } else {
        console.error("No route found in response")
      }
    } catch (error) {
      console.error("Error fetching route:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <SpinnerComponent />}
      <div
        ref={mapContainer}
        style={{ height: "90vh", width: "100%" }}
        className="map-container"
      />
    </div>
  )
}

export default Map
