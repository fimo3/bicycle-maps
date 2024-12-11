import React, { useState } from "react"
import Button from "../Components/Button"
import XButton from "../Components/XButton"
import RoutePane from "../Components/RoutePane"
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
    <div className="home">
      {!isOpen && (
        <>
          <div>
            <img src={logo} alt="Logo" width="100" className="logo" />
            <h1>Welcome to SAFCycle!</h1>
            <p>Your ultimate guide for navigating bike paths and routes.</p>
            <p>Explore the map to find the best biking routes around you!</p>
          </div>
          <Button href="#" content="Let's go >>" onClick={handleOpen} />
        </>
      )}
      {isOpen && (
        <div className="route-pane">
          <div className="center">
            <h3 className="route-h3" >Route</h3>
            <XButton href="#" onClick={handleClose} />
          </div>
          <RoutePane onSubmit={onSubmit} />
        </div>
      )}
    </div>
  )
}

export default Home
