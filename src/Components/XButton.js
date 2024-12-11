import React from "react"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const XButton = ({ href, onClick }) => {
  return (
    <div>
      <a href={href}>
        <button className={`Button X`} onClick={onClick}>
        <FontAwesomeIcon
          icon={faX}
        />
        </button>
      </a>
    </div>
  )
}

export default XButton
