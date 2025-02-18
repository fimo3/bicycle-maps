import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useState } from "react"

const Contact = () => {
  let { isOpen, setIsOpen } = useState(false)
  return (
    <div>
      <h1>Contact Us</h1>
      <p>
        Have any questions, feedback, or just want to say hello? We're here to
        help!
      </p>
      <div>
        <p className="brandlogos">
          <button>
            <a className="email" href="mailto:fimo3155@gmail.com">
              <strong className="brandlogo-email">
                <FontAwesomeIcon icon={faEnvelope} />
              </strong>
            </a>
          </button>
          <br />
          <button>
            <a
              className="email"
              href="https://www.instagram.com/fimo.155/"
              target="_blank"
              rel="noreferrer"
            >
              <strong className="brandlogo-instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </strong>
            </a>
          </button>
          <br />
          <button href="#">
            <div className="align-center">
              <strong className="brandlogo-phone">
                <FontAwesomeIcon icon={faPhone} />
              </strong>
              +359884446809
            </div>
          </button>
        </p>
      </div>
    </div>
  )
}

export default Contact
