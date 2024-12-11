
/**
 * name: string
 * onSelect: () => void
 */
export function createSuggestion({ name, onSelect }) {
  const $suggestion = document.createElement('li')
  $suggestion.classList.add('suggestion')
  $suggestion.innerText = name
  $suggestion.addEventListener('click', onSelect)
  return $suggestion
}