import { createLabelSearch } from "../templates/createLabelsearch.js";
import { getAllRecipes, getRecipesFromResearch } from "./mainResearch.js";

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

        //Mettre à jour les résultats de recherche
        getRecipesFromResearch()

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

  async function updateSuggestionsList() {
    const filteredRecipes = await getRecipesFromResearch();
    console.log(filteredRecipes);
    // Génére une nouvelle liste d'éléments pour ce filtre à partir des recettes filtrées
    const matchingElementsFromRecipes = [...new Set(
      filteredRecipes.flatMap(recipe => {
        if (filter.value === 'ingredients') {
          return recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        } else if (filter.value === 'appareils') {
          return recipe.appliance.toLowerCase();
        } else if (filter.value === 'ustensiles') {
          return recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        }
        return [];
      })
    )];

    // Exclure les éléments déjà sélectionnés (labels actifs)
    const activeLabels = [...document.querySelectorAll('.labels__label')].map(label =>
      label.innerText.toLowerCase()
    );

    const availableElements = matchingElementsFromRecipes.filter(el => !activeLabels.includes(el));

    const inputValue = filter.input.value.toLowerCase();

    // Filtrer les éléments correspondant à l'input
    const matchingElements = availableElements.filter(element =>
      element.toLowerCase().includes(inputValue)
    );

    // Affichez uniquement les suggestions pertinentes
    displayFilterList(matchingElements);
  }

  const inputFilter = filter.input;

  // Gestion de la saisie dans l'input
  inputFilter.addEventListener('input', () => {
    updateSuggestionsList();
  });

  // Suppression de la saisie
  document.querySelector('.advanced__searchbar').addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-xmark')) {
      inputFilter.value = ""
      updateSuggestionsList()
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

      // Mettre à jour la liste des suggestions
      updateSuggestionsList();

      // Afficher les résultats
      getRecipesFromResearch()

    }
  });

  // Initialisation des suggestions pour ce filtre
  updateSuggestionsList();
});



