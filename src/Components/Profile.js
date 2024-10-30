import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { useNavigate } from "react-router-dom"
import avatar from "../images/avatar.png"
import Button from "../Components/Button"

const Profile = () => {
  const { username, password, email, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const maskPassword = (password) => {
    if (!password) return "undefined"
    return `${"*".repeat(password.length)}`
  }

  return (
    <div>
      <h1>Profile</h1>
      <div className="profile-page">
        <div className="title">
          <div className="avatar-big-container">
            <img src={avatar} alt="avatar" className="avatar-big" />
          </div>
          <div>
            <div className="flex">
              <h2 className="userinfo">Username:</h2>
              <p className="userinfo">{username ? username : "undefined"}</p>
            </div>
            <div className="flex">
              <h2 className="userinfo">Email:</h2>
              <p className="userinfo">{email ? email : "undefined"}</p>
            </div>
            <div className="flex">
              <h2 className="userinfo">Password:</h2>
              <p className="userinfo">{maskPassword(password)}</p>{" "}
            </div>
          </div>
        </div>
        <div className="content"></div>
        <Button className="Logout" onClick={handleLogout} content="Logout" />
      </div>
    </div>
  )
}

export default Profile
