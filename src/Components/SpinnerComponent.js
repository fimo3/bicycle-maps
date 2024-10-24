// CustomSpinner.js
import React from "react"

const CustomSpinner = () => {
  return (
    <div className="custom-spinner-overlay">
      <h1>Loading...</h1>
      <div className="custom-spinner" />
      <div className="custom-spinner" />
      <div className="custom-spinner" />
    </div>
  )
}

export default CustomSpinner
