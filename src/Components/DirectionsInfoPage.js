import React from "react"

const DirectionsInfoPane = ({ directions }) => {
  return (
    <div className="directions-info-pane">
      <div>
        <h3>
          <bold>Top Routes</bold>
        </h3>
        {directions && directions.length > 0 ? (
          directions.map((route, index) => (
            <div key={index}>
              <h4>Route {index + 1}:</h4>
              <p>
                Time: {Math.round(route.time)} minutes Distance:{" "}
                {route.distance.toFixed(2)} km
              </p>
            </div>
          ))
        ) : (
          <p>No routes available</p>
        )}
      </div>
      <div>
        <h3>Directions</h3>
        {directions && directions.length > 0 ? (
          directions[0].instructions.map((step, index) => (
            <li key={index}>
              <p>
                {step.text} ({Math.round(step.distance)} meters)
              </p>
            </li>
          ))
        ) : (
          <p>No directions available</p>
        )}
      </div>
    </div>
  )
}

export default DirectionsInfoPane
