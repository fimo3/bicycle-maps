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
          <div className="">
            <h1>Welcome to SAFCycle!</h1>
            <img src={logo} alt="Logo" width="100" className="logo" />
          </div>
          <p>Your ultimate guide for navigating bike paths and routes.</p>
          <p>Explore the map to find the best biking routes around you!</p>
          <div className="">
            <Button
              href="#"
              content="Let's go >>"
              onClick={handleOpen}
              styling="Lets-go"
            />
          </div>
        </>
      )}
      {isOpen && (
        <div className="route-pane">
          <div className="sides">
            <h3 className="route-h3">Route</h3>
            <XButton href="#" onClick={handleClose} />
          </div>
          <RoutePane onSubmit={onSubmit} />
        </div>
      )}
    </div>
  )
}

export default Home
