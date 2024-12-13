import { createSuggestionList } from "./suggestionList.js";

/**
 * id: string
 * name: string
 * suggestions: array<string> 
 * onSelect: (suggestion) => void
 * 
 * 
  props:
    id: string
    name: string
    suggestions: array<string> 
  state:
    *query: string
    *filteredSuggestions: array<string>
    *isOpen: boolean
  actions:
    *open()
    *close()
    select(suggestion: string)
 */

export function createDropdownFilter({ id, name, suggestions, onSelect }) {

  // ETAT DU COMPOSANT

  const query = () => $query.value


  const isOpen = () => $menu.classList.contains('active')
  const setIsOpen = isOpen => {
    $menu.classList.toggle("active", isOpen)
    $chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    isOpen && $dropdown.querySelector('input').focus()
  };

  const filteredSuggestions = () => suggestions.filter(suggestion => suggestion.includes(query()))

  // CONTENU DU COMPOSANT

  const $dropdown = document.createElement('div')
  $dropdown.classList.add('advanced__filter')
  $dropdown.setAttribute('tabIndex', '0')
  $dropdown.innerHTML = `
  <div class="advanced__labelNtrigger">
  <label for="${id}-query">${name}</label>
  <span class="fa-solid fa-chevron-down"></span>
  </div>
  <div class="advanced__dropdown-menu">
  <div class="advanced__searchbar">
  <input type="text" id="${id}-query" minlength="3">
  <span class="fa-solid fa-xmark"></span>
  <img src="assets/loop/littleLoop.svg" class="loop" alt="rechercher">
  </div>
  </div>
  `

  const $menu = $dropdown.querySelector('.advanced__dropdown-menu');

  const $query = $dropdown.querySelector('.advanced__searchbar>input')
  $query.addEventListener('input', () => {
    $dropdown.querySelector('.advanced__suggestions').remove()
    $menu.appendChild($suggestionsList())
  })

  const $suggestionsList = () => createSuggestionList({
    suggestions: filteredSuggestions(),
    onSelect: (suggestion) => {
      onSelect(suggestion)
      setIsOpen(false)

      // createLabelSearch(suggestion);

      // // Mettre à jour les résultats de recherche
      // filterRecipes()
    }
  })
  $menu.appendChild($suggestionsList())

  const $chevron = $dropdown.querySelector('.fa-chevron-down')
  $chevron.addEventListener('click', (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen())
  })

  // Fermer le dropdown si on clique en dehors
  document.addEventListener('click', (event) => !$dropdown.contains(event.target) && setIsOpen(false));

  // Suppression de la saisie
  $dropdown.querySelector('.fa-xmark').addEventListener('click', (event) => {
    inputFilter.value = ""
    // updateSuggestionsList(filter)
  })

  return $dropdown
}