// Logout.js
import React from "react"

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token") // Remove the JWT token
    onLogout() // Notify parent of logout
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
