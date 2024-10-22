import React from "react"
import PropTypes from "prop-types"
import CaloriesComponent from "./CaloriesComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faRoad } from "@fortawesome/free-solid-svg-icons" // Import Font Awesome icons

const DirectionsInfoPane = ({ directions }) => {
  return (
    <div className="directions-info-pane">
      <div className="routes-container">
        <h3 className="routes-title">
          <strong>Top Routes</strong>
        </h3>
        {directions && directions.length > 0 ? (
          directions.map((route, index) => (
            <div key={index} className="routes-card">
              <h4 className="route-title">Route {index + 1}:</h4>
              <p className="route-info">
                <FontAwesomeIcon icon={faClock} /> Time:{" "}
                {Math.round(route.time)} minutes
                <br />
                <FontAwesomeIcon icon={faRoad} /> Distance:{" "}
                {route.distance.toFixed(2)} km
              </p>
              <CaloriesComponent distance={route.distance} />
            </div>
          ))
        ) : (
          <p>No routes available</p>
        )}
      </div>
      <div className="directions-container">
        <h3 className="directions-title">Directions</h3>
        {directions && directions.length > 0 ? (
          <ul className="directions-list">
            {directions[0].instructions.map((step, index) => (
              <li key={index} className="direction-step">
                <p>
                  {step.text} ({Math.round(step.distance)} meters)
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No directions available</p>
        )}
      </div>
    </div>
  )
}

DirectionsInfoPane.propTypes = {
  directions: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      distance: PropTypes.number.isRequired,
      instructions: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          distance: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default DirectionsInfoPane
