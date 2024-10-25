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

  const handleLogin = () => {
    if (username === "admin" && password === "admin_password123") {
      login()
      navigate("/protected")
    } else {
      alert("Invalid credentials")
    }
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
      <Input
        type="text"
        placeholder="Username"
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
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        icon={
          <FontAwesomeIcon
            style={{ color: "#69d935", paddingRight: 10 }}
            icon={faLock}
          />
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} content={"Log in"} />
    </div>
  )
}

export default Login
