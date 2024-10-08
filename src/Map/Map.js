import React, { useEffect, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import pin from "../images/pin.png"
// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: pin, // Replace with your custom icon URL
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
})

const Map = () => {
  const [, setRoute] = useState([])

  useEffect(() => {
    const map = L.map("map").setView([42.6977, 23.3219], 13) // Center on Sofia

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    // Example start and end coordinates
    const start = [42.6977, 23.3219] // Start coordinates
    const end = [42.7041, 23.3146] // End coordinates

    const fetchRoute = async () => {
      const apiKey = "6cd58b04-031e-426a-a662-0194bc11d2ee"
      const url = `https://graphhopper.com/api/1/route?point=${start[0]},${start[1]}&point=${end[0]},${end[1]}&vehicle=bike&locale=en&points_encoded=false&key=${apiKey}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data) // Debugging: See the entire response structure

        if (data.paths && data.paths.length > 0) {
          const routeCoordinates = data.paths[0].points.coordinates.map(
            (coord) => [coord[1], coord[0]]
          )
          setRoute(routeCoordinates)

          // Draw the route on the map
          L.polyline(routeCoordinates, { color: "blue" }).addTo(map)
        } else {
          console.error("No route found in response")
        }
      } catch (error) {
        console.error("Error fetching route:", error)
      }
    }

    fetchRoute()

    // Add start and end markers to the map
    L.marker(start, { icon: customIcon })
      .addTo(map)
      .bindPopup("Start Point")
      .openPopup()
    L.marker(end, { icon: customIcon })
      .addTo(map)
      .bindPopup("End Point")
      .openPopup()

    // Cleanup on unmount
    return () => {
      map.remove()
    }
  }, [])

  return <div id="map" style={{ height: "100vh" }}></div>
}

export default Map
