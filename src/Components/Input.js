import React, { useState } from "react"

const Input = ({ type, placeholder, value, onChange, suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleInputChange = (event) => {
    const inputValue = event.target.value
    onChange(event)

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    )

    setFilteredSuggestions(filtered)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion) => {
    onChange({ target: { value: suggestion } })
    setShowSuggestions(false)
  }

  return (
    <div>
      <div className="dropdown">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className="input"
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Input
