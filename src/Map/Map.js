import React, { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import pin from "../images/pin.png"
import DirectionsInfoPane from "../Components/DirectionsInfoPage"

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
  const startMarker = useRef(null)
  const endMarker = useRef(null)
  const [directions, setDirections] = useState([])

  useEffect(() => {
    if (!mapInstance.current && mapContainer.current) {
      mapInstance.current = L.map(mapContainer.current).setView(
        [42.6977, 23.3219],
        13
      )

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 30,
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
  }, [startLocation, endLocation])

  const getDirections = async (start, end) => {
    if (!start || !end)
      return console.error("Start or end location is missing.")

    const apiKey = "6cd58b04-031e-426a-a662-0194bc11d2ee"
    const url = `https://graphhopper.com/api/1/route?point=${start[0]},${start[1]}&point=${end[0]},${end[1]}&vehicle=bike&locale=en&instructions=true&points_encoded=false&key=${apiKey}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.paths && data.paths.length > 0) {
        const routeCoordinates = data.paths[0].points.coordinates.map(
          (coord) => [coord[1], coord[0]]
        )

        const steps = data.paths[0].instructions.map((instruction) => ({
          instruction: instruction.text,
          distance: instruction.distance,
        }))

        setDirections(steps) // Update directions

        if (routeLayer.current) routeLayer.current.remove()
        if (startMarker.current) startMarker.current.remove()
        if (endMarker.current) endMarker.current.remove()

        routeLayer.current = L.polyline(routeCoordinates, {
          color: "blue",
          weight: 6,
          opacity: 0.7,
          dashArray: "5, 10",
        }).addTo(mapInstance.current)

        startMarker.current = L.marker(start, { icon: customIcon })
          .addTo(mapInstance.current)
          .bindPopup(`Start: ${start}`)
          .openPopup()

        endMarker.current = L.marker(end, { icon: customIcon })
          .addTo(mapInstance.current)
          .bindPopup(`End: ${end}`)
          .openPopup()

        mapInstance.current.fitBounds(L.latLngBounds(routeCoordinates))
      } else {
        console.error("No route found in response")
      }
    } catch (error) {
      console.error("Error fetching route:", error)
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <div ref={mapContainer} style={{ height: "100vh", width: "100%" }} />
      <DirectionsInfoPane directions={directions} />
    </div>
  )
}

export default Map
