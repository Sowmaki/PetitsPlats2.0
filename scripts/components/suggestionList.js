import { createSuggestion } from "./suggestion.js"

/**
 * onSelect: (suggestion: string) => void
 * suggestions: array<string>
 */
export function createSuggestionList({ suggestions, onSelect }) {
  const $suggestionList = document.createElement('ul')
  $suggestionList.classList.add('advanced__suggestions')
  suggestions.forEach(suggestion => $suggestionList.appendChild(createSuggestion({
    name: suggestion,
    onSelect: () => onSelect(suggestion),
  })))
  return $suggestionList
}