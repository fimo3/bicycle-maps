import React, { useState } from "react"
import Button from "../Components/Button"
import DirectionsMiniPane from "../Components/DirectionsMiniPane"
import logo from "../images/SAFCycle.png"

const Home = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div>
        <img src={logo} alt="Logo" width="100" className="logo" />
        <h1>Welcome to SAFCycle!</h1>
        <p>Your ultimate guide for navigating bike paths and routes.</p>
        <p>Explore the map to find the best biking routes around you!</p>
      </div>
      <Button
        href="#"
        content={`${!isOpen ? "Let's go! >>" : "Close X"}`}
        onClick={onClick}
      />

      {isOpen && (
        <div>
          <DirectionsMiniPane onSubmit={onSubmit} />
        </div>
      )}
    </div>
  )
}

export default Home
