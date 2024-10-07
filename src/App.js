import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Side from "./Components/Side"
import About from "./About/About"
import Contact from "./Contact/Contact"

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
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
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Side />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}
