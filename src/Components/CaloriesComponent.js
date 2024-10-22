import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire, faHamburger } from "@fortawesome/free-solid-svg-icons"

const CaloriesComponent = ({ distance }) => {
  const [calories, setCalories] = useState(0)
  const [burgers, setBurgers] = useState(0)

  const calculateCaloriesAndBurgers = () => {
    const burnRatePerKm = 45 // Calories burned per kilometer
    const caloriesPerBurger = 300 // Calories per burger

    const totalCalories = distance * burnRatePerKm
    const burgerEquivalent = totalCalories / caloriesPerBurger

    setCalories(totalCalories)
    setBurgers(burgerEquivalent)
  }

  useEffect(() => {
    calculateCaloriesAndBurgers()
  }, [distance])

  return (
    <div className="calories-component">
      <h4 className="calories-title">
        <strong>Calories Information</strong>
      </h4>
      <div className="calories-info">
        <p>
          <div className="calories-burned">
            <FontAwesomeIcon icon={faFire} className="icon fire-icon" />
            <span className="calories-text">
              <strong> {calories.toFixed(2)} cal</strong> burned
            </span>
          </div>
          <div className="burger-equivalent">
            <FontAwesomeIcon icon={faHamburger} className="icon burger-icon" />
            <span className="calories-text">
              <strong> {burgers.toFixed(2)}</strong> burgers equivalent
            </span>
          </div>
        </p>
      </div>
    </div>
  )
}

export default CaloriesComponent
