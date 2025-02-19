import React from "react"
import PropTypes from "prop-types"
import CaloriesComponent from "./CaloriesComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faRoad, faSun } from "@fortawesome/free-solid-svg-icons"
import { faBicycle, faWalking } from "@fortawesome/free-solid-svg-icons"
import Button from "../Components/Button"

const DirectionsInfoPane = ({
  directions,
  weatherData,
  routeColors,
  setMode,
}) => {
  return (
    <div className="directions-info-pane">
      <div className="switcher">
        <Button
          onClick={() => setMode("foot")}
          content={<FontAwesomeIcon icon={faWalking} />}
        />
        <Button
          onClick={() => setMode("cycle")}
          content={<FontAwesomeIcon icon={faBicycle} />}
        />
      </div>

      <h3 className="routes-title">
        <strong>Top Routes</strong>
      </h3>
      <div className="routes-container flex">
        {directions && directions.length > 0 ? (
          directions.map((route, index) => (
            <div
              key={index}
              className="routes-card"
              style={{ backgroundColor: routeColors[index] }}
            >
              <h4 className="route-title">Route {index + 1}:</h4>
              <div className="route-info">
                <p>
                  <FontAwesomeIcon icon={faClock} /> Time:{" "}
                  {Math.round(route.time)} minutes
                </p>
                <p>
                  <FontAwesomeIcon icon={faRoad} /> Distance:{" "}
                  {route.distance.toFixed(2)} km
                </p>
              </div>
              <div className="weather-info">
                <p>
                  <FontAwesomeIcon icon={faSun} /> Weather Information:
                  <br />
                  {weatherData.temperature && weatherData.description ? (
                    <div>
                      Temperature: {weatherData.temperature}°C
                      <br />
                      Description: {weatherData.description}
                    </div>
                  ) : (
                    <div>No weather access at the moment.</div>
                  )}
                </p>
                <CaloriesComponent distance={route.distance} />
              </div>
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
                  {step.text}
                  {index < directions[0].instructions.length - 1
                    ? " (" + Math.round(step.distance) + " meters)"
                    : "."}
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
  weatherData: PropTypes.shape({
    temperature: PropTypes.string,
    description: PropTypes.string,
  }),
  routeColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
}

export default DirectionsInfoPane
