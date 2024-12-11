import { createSuggestionList } from "./suggestionList";

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

  const query = () => $query.value
  const isOpen = () => $menu.classList.contains('active')
  const setIsOpen = myEl.classList.toggle("myClass", myConditionIsMet);

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
      <ul class="advanced__suggestions"></ul>
    </div>
  `

  const $query = $dropdown.querySelector('.advanced__searchbar>input')
  const $menu = $dropdown.querySelector('.advanced__dropdown-menu');
  const $chevron = $dropdown.querySelector('.fa-chevron-down')

  $chevron.addEventListener('click', (event) => {
    event.stopPropagation();
    $menu.classList.toggle('active')

    const isOpen = $menu.classList.contains('active');
    // Applique la rotation du chevron 
    $chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    // Met le focus sur l'input
    isOpen && $dropdown.querySelector('input').focus()
  })

  document.addEventListener('click', (event) => {
    if (!$dropdown.contains(event.target)) {
      $menu.classList.remove('active'); // Fermer le menu si clic à l'extérieur
      // retourner le chevron
      $chevron.style = 'rotate(180deg)'
    }
  });

  const suggestionsList = createSuggestionList({ suggestions, onSelect: (suggestion) => { throw new Error("todo") } })



    // A partir d'ici, tout corriger!!!!!!!
    .forEach(element => {
      const suggestion = document.createElement('li');
      suggestion.classList.add('suggestion');
      suggestion.innerText = `${element}`;
      suggestionsList.appendChild(suggestion);

      // Ajouter un événement au clic sur chaque suggestion
      suggestion.addEventListener('click', () => {

        // retourner le chevron
        $menu.closest('.advanced__filter').querySelector('.fa-chevron-down').style = 'rotate(180deg)'

        // Ajouter une étiquette (label)
        createLabelSearch(suggestion);

        //Mettre à jour les résultats de recherche
        filterRecipes()

        // Réafficher les suggestions sans l'élément sélectionné
        updateSuggestionsList(filter);

        // Fermer le menu déroulant
        $menu.classList.remove('active');
      });
    });

  // Gestion de l'affichage des suggestions
  if (!$menu.querySelector('.advanced__suggestions')) {
    $menu.appendChild(suggestionsList);
  } else {
    $menu.querySelector('.advanced__suggestions').remove();
    $menu.appendChild(suggestionsList);
  }
}