import React, { useState } from "react"
import Button from "../Components/Button"
import XButton from "../Components/XButton"
import DirectionsMiniPane from "../Components/DirectionsMiniPane"
import logo from "../images/SAFCycle.png"

const Home = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <div>
        <img src={logo} alt="Logo" width="100" className="logo" />
        <h1>Welcome to SAFCycle!</h1>
        <p>Your ultimate guide for navigating bike paths and routes.</p>
        <p>Explore the map to find the best biking routes around you!</p>
      </div>
      {!isOpen && (
        <Button href="#" content="Let's go >>" onClick={handleOpen} />
      )}
      {isOpen && (
        <div className="directions-mini-pane">
          <XButton href="#" onClick={handleClose} />
          <DirectionsMiniPane onSubmit={onSubmit} />
        </div>
      )}
    </div>
  )
}

export default Home
