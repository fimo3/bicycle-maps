import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Side from "./Components/Side"
import About from "./About/About"
import Contact from "./Contact/Contact"
import ErrorBoundary from "./ErrorHandling/ErrorBoundary"
import logo from "./images/SAFCycle.png"

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <div>
              <ul>
                <li>
                  <a href="/" className="home-li">
                    <p>Home</p>
                    <img
                      src={logo}
                      width="50px"
                      height="50px"
                      alt="Home"
                      className="home-logo logo"
                    />
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
              </ul>
            </div>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Side />
              </ErrorBoundary>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}
