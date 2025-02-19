import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom"
import Side from "./Components/HomePage"
import Contact from "./Contact/Contact"
import Login from "./Components/Login"
import Profile from "./Components/Profile" // Import the Profile component
import { AuthContext } from "./Components/AuthProvider"
import Button from "./Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faMoon,
  faSignOut,
  faSun,
} from "@fortawesome/free-solid-svg-icons"
import avatar from "./images/avatar.png"

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [isLightMode, setIsLightMode] = useState("light")

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
  }

  const login = (user, pass) => {
    setUsername(user)
    setPassword(pass)
    setEmail(user + "@gmail.com")
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUsername(null)
    setPassword(null)
    setEmail(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ username, password, email, login, logout, isAuthenticated }}
    >
      <Router>
        <div className={`App ${isLightMode ? "light-mode" : "dark"}`}>
          <header className="App-header">
            <nav>
              <div>
                <ul className="navul">
                  <li>
                    <Link to="/">
                      <p className="SAFCycle-nav-title">
                        <FontAwesomeIcon
                          style={{ color: "#f2f2f2" }}
                          icon={faHome}
                        />
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <p>Contact</p>
                    </Link>
                  </li>
                  {isAuthenticated ? (
                    <>
                      <li className="flex">
                        <Link to="/profile">
                          <img
                            src={avatar}
                            width={40}
                            className="small-avatar"
                            alt="avatar"
                          />
                        </Link>
                        <Link onClick={logout}>
                          <FontAwesomeIcon
                            className="padding-left-12px"
                            icon={faSignOut}
                          />
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/login">
                        <p>Login</p>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Button
                      onClick={toggleTheme}
                      className="switcher theme-switcher"
                      content={
                        <FontAwesomeIcon icon={isLightMode ? faMoon : faSun} />
                      }
                    ></Button>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Side />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext)
  return isAuthenticated ? children : <Navigate to="/login" />
}
