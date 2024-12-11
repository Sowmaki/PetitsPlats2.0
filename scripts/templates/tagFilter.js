import { filterRecipes } from "../datas/recipes.js";
import { createLabelSearch } from "./createLabelsearch.js";

async function updateSuggestionsList(filter) {

  // Filtrer les éléments correspondant à l'input
  const inputValue = filter.input.value.toLowerCase();

  const matchingElements = availableElements.filter(element =>
    element.toLowerCase().includes(inputValue)
  );

  // Affichez uniquement les suggestions pertinentes
  displayFilterList(matchingElements, filter);
}

function displayFilterList(tab, filter) {
  const dropdownMenu = filter.dropdown;
  const suggestionsList = document.createElement('ul');
  suggestionsList.classList.add('advanced__suggestions');

  tab.forEach(element => {
    const suggestion = document.createElement('li');
    suggestion.classList.add('suggestion');
    suggestion.innerText = `${element}`;
    suggestionsList.appendChild(suggestion);

    // Ajouter un événement au clic sur chaque suggestion
    suggestion.addEventListener('click', () => {

      // retourner le chevron
      dropdownMenu.closest('.advanced__filter').querySelector('.fa-chevron-down').style = 'rotate(180deg)'

      // Ajouter une étiquette (label)
      createLabelSearch(suggestion);

      //Mettre à jour les résultats de recherche
      filterRecipes()

      // Réafficher les suggestions sans l'élément sélectionné
      updateSuggestionsList(filter);

      // Fermer le menu déroulant
      dropdownMenu.classList.remove('active');
    });
  });

  // Gestion de l'affichage des suggestions
  if (!dropdownMenu.querySelector('.advanced__suggestions')) {
    dropdownMenu.appendChild(suggestionsList);
  } else {
    dropdownMenu.querySelector('.advanced__suggestions').remove();
    dropdownMenu.appendChild(suggestionsList);
  }
}


Object.entries(filtersObject).forEach(([key, filter]) => {

  const inputFilter = filter.input;

  // Gestion de la saisie dans l'input
  inputFilter.addEventListener('input', () => {
    updateSuggestionsList(filter);
  });

  // Suppression de la saisie
  document.querySelector('.advanced__searchbar').addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-xmark')) {
      inputFilter.value = ""
      updateSuggestionsList(filter)
    }
  })

  // Gestion des suppressions d'étiquettes
  const labelsSection = document.querySelector('.labels')
  labelsSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-xmark')) {
      // Récupérer l'élément supprimé
      const removedElement = event.target.closest('.labels__label').innerText.toLowerCase();

      // Réinsérer dans `allElements` si ce n'est pas déjà présent
      if (!filter.allElements.includes(removedElement)) {
        filter.allElements.push(removedElement);
      }

      // Supprimer l'étiquette
      event.target.closest('.labels__label').remove();
      // Afficher les résultats
      filterRecipes()
    }
  });

  // Application de la fonction update
  const mainInput = document.getElementById('main-searchbar-input')
  mainInput.addEventListener('input', (event) => {
    event.stopPropagation()
    updateSuggestionsList(filter)
  })

  // Initialisation des suggestions pour ce filtre
  updateSuggestionsList(filter);
});




