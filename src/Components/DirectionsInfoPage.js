import React from "react"

const DirectionsInfoPane = ({ directions }) => {
  return (
    <div className="directions-info-pane">
      <h4>Directions</h4>
      {directions && directions.length > 0 ? (
        <ul>
          {directions.map((step, index) => (
            <li key={index}>
              {step.instruction} ({Math.round(step.distance)} meters)
            </li>
          ))}
        </ul>
      ) : (
        <p>No directions available</p>
      )}
    </div>
  )
}

export default DirectionsInfoPane
