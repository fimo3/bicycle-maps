import React from "react"

const Input = ({ type, name, placeholder, value, onChange }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  )
}

export default Input
