import React, { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const login = (user, password) => {
    if (user === "admin" && password === "123456789") {
      setUsername(user)
      setPassword(password)
      setEmail(user)
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  const logout = () => {
    setUsername(null)
    setEmail(null)
    setPassword(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ username, password, email, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
