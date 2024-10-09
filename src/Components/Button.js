import React from "react"

const Button = ({ href, content, onClick, styling }) => {
  return (
    <div>
      <a href={href}>
        <button className={`Button ${styling}`} onClick={onClick}>
          {content}
        </button>
      </a>
    </div>
  )
}

export default Button
