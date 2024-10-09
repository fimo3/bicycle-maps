import React, { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import pin from "../images/pin.png"

const customIcon = new L.Icon({
  iconUrl: pin,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const Map = ({ startLocation, endLocation }) => {
  const mapContainer = useRef(null)
  const mapInstance = useRef(null)
  const routeLayer = useRef(null)

  useEffect(() => {
    if (!mapContainer.current) {
      console.error("Map container not found")
      return
    }

    // Initialize the map instance
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView(
        [42.6977, 23.3219],
        13
      )
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapInstance.current)
    }

    // Function to fetch and display the route
    const fetchRoute = async (start, end) => {
      if (!start || !end) {
        console.error("Start or end location is missing.")
        return
      }

      const apiKey = "6cd58b04-031e-426a-a662-0194bc11d2ee"
      const url = `https://graphhopper.com/api/1/route?point=${start[0]},${start[1]}&point=${end[0]},${end[1]}&vehicle=bike&locale=en&points_encoded=false&key=${apiKey}`

      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data.paths && data.paths.length > 0) {
          const routeCoordinates = data.paths[0].points.coordinates.map(
            (coord) => [coord[1], coord[0]]
          )

          // Remove existing route layer if present
          if (routeLayer.current) {
            mapInstance.current.removeLayer(routeLayer.current)
          }

          // Add new route layer
          routeLayer.current = L.polyline(routeCoordinates, {
            color: "blue",
            weight: 6,
            opacity: 0.7,
            dashArray: "5, 10",
          }).addTo(mapInstance.current)

          // Add markers for start and end points
          L.marker(start, { icon: customIcon })
            .addTo(mapInstance.current)
            .bindPopup("Start Point")
            .openPopup()
          L.marker(end, { icon: customIcon })
            .addTo(mapInstance.current)
            .bindPopup("End Point")
            .openPopup()

          // Center the map on the route
          const bounds = L.latLngBounds(routeCoordinates)
          mapInstance.current.fitBounds(bounds)
        } else {
          console.error("No route found in response")
        }
      } catch (error) {
        console.error("Error fetching route:", error)
      }
    }

    // Fetch route if both start and end locations are defined
    if (startLocation && endLocation) {
      fetchRoute(startLocation, endLocation)
    }

    // Cleanup function to remove map instance
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [startLocation, endLocation])

  return (
    <div>
      <div ref={mapContainer} style={{ height: "100vh", width: "100%" }}></div>
    </div>
  )
}

export default Map
