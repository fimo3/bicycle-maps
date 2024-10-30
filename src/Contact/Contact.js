// Contact.js
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Us</h1>
      <p className="contact-text">
        Have any questions, feedback, or just want to say hello? We're here to
        help!
      </p>
      <div className="contact-info">
        <p className="contact-email">
          <strong>
            <FontAwesomeIcon icon={faEnvelope} />
          </strong>{" "}
          <a className="email" href="mailto:fimo3155@gmail.com">
            fimo3155@gmail.com
          </a>
          <br />
          <strong>
            <FontAwesomeIcon icon={faPhone} />
          </strong>
          +359884446809
          <br />
          <strong>
            <FontAwesomeIcon icon={faInstagram} />
          </strong>
          <a
            className="email"
            href="https://www.instagram.com/fimo.155/"
            target="_blank"
            rel="noreferrer"
          >
            @fimo155
          </a>
        </p>
      </div>
    </div>
  )
}

export default Contact
