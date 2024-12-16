import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>
        Have any questions, feedback, or just want to say hello? We're here to
        help!
      </p>
      <div>
        <p className="brandlogos">
          <a className="email" href="mailto:fimo3155@gmail.com">
            <strong className="brandlogo-email">
              <FontAwesomeIcon icon={faEnvelope} />
            </strong>
          </a>
          <br />
          <div className="align-center">
            <strong className="brandlogo-phone">
              <FontAwesomeIcon icon={faPhone} />
            </strong>
            +359884446809
          </div>
          <br />
          <a
            className="email"
            href="https://www.instagram.com/fimo.155/"
            target="_blank"
            rel="noreferrer"
          ><strong className="brandlogo-instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </strong>
          </a>
        </p>
      </div>
    </div>
  )
}

export default Contact
