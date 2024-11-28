import { getAllRecipes } from "./mainResearch.js";

const allRecipes = await getAllRecipes();

const filtersObject = {
  ingredients: {
    value: 'ingredients',
    input: document.getElementById('ingredients'),
    allElements: allRecipes.flatMap(recipe =>
      recipe.ingredients.map(ingredient => ingredient.ingredient)
    ),
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
    allElements: [...new Set(allRecipes.flatMap(recipe => recipe.appliance))],
    dropdown: document.getElementById('ustensiles-dropdown'),
  }
};


Object.entries(filtersObject).forEach(([key, filter]) => {

  function displayFilterList(tab) {
    const dropdownMenu = filter.dropdown
    const suggestionsList = document.createElement('ul')
    suggestionsList.classList.add('advanced__suggestions')

    tab.forEach(element => {
      const suggestion = document.createElement('li')
      suggestion.classList.add('suggestion')
      suggestion.innerText = `${element}`
      suggestionsList.appendChild(suggestion)
    })
    if (!dropdownMenu.querySelector('.advanced__suggestions')) {
      dropdownMenu.appendChild(suggestionsList)
    } else {
      dropdownMenu.querySelector('.advanced__suggestions').remove()
      dropdownMenu.appendChild(suggestionsList)
    }
  }

  const inputFilter = filter.input

  function filtersResearch() {
    const allElements = filter.allElements

    inputFilter.addEventListener('input', () => {
      let matchingElements = []
      const inputValue = inputFilter.value.toLowerCase()
      // if (inputValue.length < 1) {
      //   console.log('3 caracteres minimum');
      //   return
      // } else {
      allElements.forEach(element => {
        if (element.toLowerCase().includes(inputValue)) {
          !matchingElements.includes(element) && matchingElements.push(element)
        }
      })
      console.log(matchingElements);
      displayFilterList(matchingElements)
      // }
    })

  }

  filtersResearch()

});

