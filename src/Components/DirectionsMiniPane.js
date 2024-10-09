import React from "react"
import Input from "../Components/Input"
import Button from "./Button"

const DirectionsMiniPane = () => {
  return (
    <div className="directions-mini-pane">
      <h3>Directions</h3>
      <form>
        <label>Start location: </label>
        <Input
          type="text"
          name="start location"
          placeholder="e.g.Your location"
        ></Input>
        <hr />
        <label>End location: </label>
        <Input
          type="text"
          name="end location"
          placeholder="e.g.'Milin Kamak' №34 road... "
        ></Input>
        <hr />
        <Button
          type="submit"
          content="Find route"
          styling="Directions-button-submit"
        />
      </form>
    </div>
  )
}

export default DirectionsMiniPane
