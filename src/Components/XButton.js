import React from "react"

const XButton = ({ href, onClick }) => {
  return (
    <div>
      <a href={href}>
        <button className={`Button X`} onClick={onClick}>
          X
        </button>
      </a>
    </div>
  )
}

export default XButton
