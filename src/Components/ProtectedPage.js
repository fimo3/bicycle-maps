import React, { useContext } from "react"
import avatar from "../images/pin2.png"
import { AuthContext } from "../Components/AuthProvider"

const ProtectedPage = () => {
  const { username } = useContext(AuthContext) // Get username from AuthContext

  return (
    <div>
      <h1>Profile</h1>
      <div className="profile-page">
        <div className="title">
          <img src={avatar} alt="avatar" />
          <h2>Username: {username}</h2>
        </div>
        <div className="content">
          <h2>Description: </h2>
          {/* Add a description or any additional content here */}
        </div>
      </div>
    </div>
  )
}

export default ProtectedPage
