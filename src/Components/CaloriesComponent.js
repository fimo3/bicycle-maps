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
    <div>
      <p>
        <FontAwesomeIcon icon={faFire} />
        {calories.toFixed(2)} cal burned
      </p>
      <p>
        <FontAwesomeIcon icon={faHamburger} />
        {burgers.toFixed(2)} burgers equivalent
      </p>
    </div>
  )
}

export default CaloriesComponent
