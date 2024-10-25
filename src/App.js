import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthProvider from "./Components/AuthProvider" // Adjust the path accordingly
import Side from "./Components/Side"
import About from "./About/About"
import Contact from "./Contact/Contact"
import Login from "./Components/Login" // Import your Login component
import ProtectedPage from "./Components/ProtectedPage" // Import your ProtectedPage component

export default function App() {
  return (
    <AuthProvider>
      {" "}
      <Router>
        <div className="App">
          <header className="App-header">
            <nav>
              <div>
                <ul>
                  <li>
                    <a href="/">
                      <p>Home</p>
                    </a>
                  </li>
                  <li>
                    <a href="/about">
                      <p>About</p>
                    </a>
                  </li>
                  <li>
                    <a href="/contact">
                      <p>Contact</p>
                    </a>
                  </li>
                  <li>
                    <a href="/login">
                      <p>Login</p>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Side />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/protected" element={<ProtectedPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}
