import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./AuthProvider"
import Input from "./Input"
import Button from "./Button"
import { faBicycle, faLock, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    login(username, password)
    navigate("/profile")
  }

  return (
    <div className="log-form">
      <h1>
        Login
        <FontAwesomeIcon
          style={{
            color: "#69d952",
            paddingLeft: 15,
          }}
          icon={faBicycle}
        />
      </h1>
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Enter username..."
          icon={
            <FontAwesomeIcon
              style={{
                color: "#69d935",
                paddingRight: 10,
              }}
              icon={faUserAlt}
            />
          }
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter password..."
          icon={
            <FontAwesomeIcon
              style={{ color: "#69d935", paddingRight: 10 }}
              icon={faLock}
            />
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" content={"Log in"} />
      </form>
    </div>
  )
}

export default Login