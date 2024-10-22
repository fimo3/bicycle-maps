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
  const routeLayers = useRef([])
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
  }, [startLocation, endLocation])

  const getDirections = async (start, end) => {
    if (!start || !end)
      return console.error("Start or end location is missing.")

    const apiKey = "6cd58b04-031e-426a-a662-0194bc11d2ee"
    const url = `https://graphhopper.com/api/1/route?point=${start[0]},${start[1]}&point=${end[0]},${end[1]}&vehicle=bike&locale=en&points_encoded=false&key=${apiKey}&algorithm=alternative_route&alternative_route.max_paths=5&alternative_route.min_paths=3&alternative_route.max_share_factor=0.5&alternative_route.max_weight_factor=2`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.paths && data.paths.length > 0) {
        setDirections(
          data.paths.map((path) => ({
            time: path.time / 60000, // convert ms to minutes
            distance: path.distance / 1000, // convert meters to kilometers
            coordinates: path.points.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ]),
            instructions: path.instructions,
          }))
        )

        routeLayers.current.forEach((layer) => layer.remove())
        routeLayers.current = []

        data.paths.forEach((path, index) => {
          const routeCoordinates = path.points.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ])
          const getRandomColor = () => {
            const letters = "0123456789ABCDEF"
            let color = "#"
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)]
            }
            return color
          }

          const color =
            index === 0 ? "#69d937" : index === 1 ? "green" : getRandomColor()
          const routeLayer = L.polyline(routeCoordinates, {
            color,
            weight: 5,
            opacity: 0.7,
          }).addTo(mapInstance.current)

          routeLayers.current.push(routeLayer)
        })

        // Add markers for start and end
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

        // Fit map bounds to the route
        const allCoordinates = data.paths.flatMap((path) =>
          path.points.coordinates.map((coord) => [coord[1], coord[0]])
        )
        mapInstance.current.fitBounds(L.latLngBounds(allCoordinates))
      } else {
        console.error("No route found in response")
      }
    } catch (error) {
      console.error("Error fetching route:", error)
    }
  }

  return (
    <div>
      <div ref={mapContainer} style={{ height: "90vh", width: "100%" }} />
      <DirectionsInfoPane directions={directions} />
    </div>
  )
}

export default Map
