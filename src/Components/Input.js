import React from "react"

const Input = ({ type, name, placeholder }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input"
      ></input>
    </div>
  )
}

export default Input
