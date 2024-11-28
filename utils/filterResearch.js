import { createLabelSearch } from "../templates/createLabelsearch.js";
import { getAllRecipes } from "./mainResearch.js";

const allRecipes = await getAllRecipes();

const filtersObject = {
  ingredients: {
    value: 'ingredients',
    input: document.getElementById('ingredients'),
    allElements: [...new Set(allRecipes.flatMap(recipe =>
      recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())
    ))],
    dropdown: document.getElementById('ingredients-dropdown'),
  },
  appareils: {
    value: 'appareils',
    input: document.getElementById('appareils'),
    allElements: [...new Set(allRecipes.flatMap(recipe => recipe.appliance))],
    dropdown: document.getElementById('appareils-dropdown'),
  },
  ustensiles: {
    value: 'ustensiles',
    input: document.getElementById('ustensiles'),
    allElements: [...new Set(allRecipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))],
    dropdown: document.getElementById('ustensiles-dropdown'),
  }
};


Object.entries(filtersObject).forEach(([key, filter]) => {

  function displayFilterList(tab) {
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
        // Ajouter une étiquette (label)
        createLabelSearch(suggestion);

        // Retirer l'élément de `allElements`
        filter.allElements = filter.allElements.filter(el => el !== element);

        // Réafficher les suggestions sans l'élément sélectionné
        updateSuggestionsList();

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

  function updateSuggestionsList() {
    const inputValue = filter.input.value.toLowerCase();
    const matchingElements = filter.allElements.filter(element =>
      element.toLowerCase().includes(inputValue)
    );
    displayFilterList(matchingElements);
  }

  const inputFilter = filter.input;

  // Gestion de la saisie dans l'input
  inputFilter.addEventListener('input', () => {
    updateSuggestionsList();
  });

  // Gestion des suppressions d'étiquettes
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-xmark')) {
      // Récupérer l'élément supprimé
      const removedElement = event.target.closest('.labels__label').innerText.toLowerCase();

      // Réinsérer dans `allElements` si ce n'est pas déjà présent
      if (!filter.allElements.includes(removedElement)) {
        filter.allElements.push(removedElement);
      }

      // Supprimer l'étiquette
      event.target.closest('.labels__label').remove();

      // Mettre à jour la liste des suggestions
      updateSuggestionsList();
    }
  });

  // Initialisation des suggestions pour ce filtre
  updateSuggestionsList();
});



