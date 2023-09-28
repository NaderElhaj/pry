"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./index.css";

interface SuggestedTag {
  name: string;
  value: number;
}

const suggestedTags: SuggestedTag[] = [
  { name: "Sales", value: 50000 },
  { name: "Subscriptions", value: 10000 },
  { name: "Ad Revenue", value: 15000 },
  { name: "Affiliate Income", value: 5000 },
  { name: "Licensing Fees", value: 7000 },
  { name: "Employee Salaries", value: 20000 },
  { name: "Rent/Lease", value: 3000 },
  { name: "Utilities", value: 1500 },
  { name: "Office Supplies", value: 500 },
  { name: "Marketing Expenses", value: 2000 },
  { name: "Insurance Costs", value: 1200 },
  { name: "Travel Expenses", value: 2500 },
  { name: "Legal Fees", value: 1000 },
  { name: "IT Expenses", value: 3000 },
  { name: "Maintenance Costs", value: 800 },
];

function TagsInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const predefinedSuggestions = suggestedTags.map((tag) => tag.name);
  const operators = ["+", "-", "*", "/"];

  function calculateTagsValue(tagsArray: string[]): number {
    let result = 0;
    let operator = "+";

    tagsArray.forEach((item) => {
      if (operators.includes(item)) {
        operator = item;
      } else {
        const tag = suggestedTags.find(
          (suggestedTag) => suggestedTag.name === item
        );
        if (tag) {
          if (operator === "+") {
            result += tag.value;
          } else if (operator === "-") {
            result -= tag.value;
          } else if (operator === "*") {
            result *= tag.value;
          } else if (operator === "/") {
            result /= tag.value;
          }
        }
      }
    });

    return result;
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      if (value !== "") {
        setTags([...tags, value]);
        setInputValue("");
      }
    }
  }

  function removeTag(index: number) {
    setTags(tags.filter((el, i) => i !== index));
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);

    // Show suggestions when input is not empty
    if (value.trim() !== "") {
      const filteredSuggestions = predefinedSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setTags([...tags, suggestion]);
    setInputValue("");
    setSuggestions([]);
  }

  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <div className="result">
        Result: {calculateTagsValue([...tags, inputValue])}
      </div>
      <input
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={inputValue}
        type="text"
        className="tags-input"
        placeholder="Type something"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagsInput;
