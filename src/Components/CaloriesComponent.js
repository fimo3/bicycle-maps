import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire, faHamburger } from "@fortawesome/free-solid-svg-icons"

const CaloriesComponent = ({ distance }) => {
  const [calories, setCalories] = useState(0)
  const [burgers, setBurgers] = useState(0)
  const [BIGMAC, setBIGMAC] = useState(0)

  const calculateCaloriesAndBurgers = () => {
    const burnRatePerKm = 45
    const caloriesPerBurger = 292
    const caloriesPerBIGMAC = 563

    const totalCalories = distance * burnRatePerKm
    const burgerEquivalent = totalCalories / caloriesPerBurger
    const BIGMACEquivalent = totalCalories / caloriesPerBIGMAC

    setCalories(totalCalories)
    setBurgers(burgerEquivalent)
    setBIGMAC(BIGMACEquivalent)
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
        {burgers.toFixed(2)} cheeseburgers equivalent or {BIGMAC.toFixed(2)}{" "}
        BIGMACS.
      </p>
    </div>
  )
}

export default CaloriesComponent
