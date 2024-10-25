// AuthProvider.js
import React, { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null)

  const login = (user) => {
    setUsername(user)
  }

  const logout = () => {
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
