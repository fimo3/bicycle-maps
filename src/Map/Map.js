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

const Map = () => {
  const mapContainer = useRef(null)
  const [, setRoute] = useState([])

  useEffect(() => {
    if (!mapContainer.current) {
      console.error("Map container not found")
      return
    }

    const map = L.map(mapContainer.current).setView([42.6977, 23.3219], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map)

    const fetchRoute = async (start, end) => {
      const apiKey = "6cd58b04-031e-426a-a662-0194bc11d2ee"
      const url = `https://graphhopper.com/api/1/route?point=${start[0]},${start[1]}&point=${end[0]},${end[1]}&vehicle=bike&locale=en&points_encoded=false&key=${apiKey}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

        if (data.paths && data.paths.length > 0) {
          const routeCoordinates = data.paths[0].points.coordinates.map(
            (coord) => [coord[1], coord[0]]
          )
          setRoute(routeCoordinates)

          L.polyline(routeCoordinates, {
            color: "red",
            weight: 10,
            dashArray: "1, 20",
          }).addTo(map)
        } else {
          console.error("No route found in response")
        }
      } catch (error) {
        console.error("Error fetching route:", error)
      }
    }

    const locateUser = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = [
              position.coords.latitude,
              position.coords.longitude,
            ]
            const end = [42.7041, 23.3146] // Fixed end location

            map.setView(userLocation, 13)

            L.marker(userLocation, { icon: customIcon })
              .addTo(map)
              .bindPopup("Your Location")
              .openPopup()

            L.marker(end, { icon: customIcon })
              .addTo(map)
              .bindPopup("End Point")
              .openPopup()

            fetchRoute(userLocation, end)
          },
          (error) => {
            console.error("Error getting location:", error)
          }
        )
      } else {
        console.error("Geolocation is not supported by this browser.")
      }
    }

    // Call locateUser after the map has been initialized
    locateUser()

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div>
      <div ref={mapContainer} style={{ height: "100vh" }}></div>
    </div>
  )
}

export default Map
