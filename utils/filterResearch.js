import { getAllRecipes } from "./mainResearch.js";

const allRecipes = await getAllRecipes();

const filtersObject = {
  ingredients: {
    value: 'ingredients',
    input: document.getElementById('ingredients'),
    allElements: allRecipes.flatMap(recipe =>
      recipe.ingredients.map(ingredient => ingredient.ingredient)
    ),
    // hasMatching: recipe.ingredients.some(ingredient =>
    //   ingredient.ingredient.toLowerCase().includes(inputValue)
    // ),
  },
  appareils: {
    value: 'appareils',
    input: document.getElementById('appareils'),
    allElements: [...new Set(allRecipes.flatMap(recipe => recipe.appliance))],
    // hasMatching: recipe.appliance.toLowerCase().includes(inputValue),
  },
  ustensiles: {
    value: 'ustensiles',
    input: document.getElementById('ustensiles'),
    allElements: [...new Set(allRecipes.flatMap(recipe => recipe.appliance))],
    // hasMatching: recipe.ustensils.toLowerCase().includes(inputValue),
  }
};


Object.entries(filtersObject).forEach(([key, filter]) => {
  console.log(`Clé : ${key}`);
  console.log('Valeur :', filter);

  // Exemple : accéder à des propriétés spécifiques
  console.log(`Champ input pour ${filter.value} :`, filter.input);
  console.log(`Tous les éléments pour ${filter.value} :`, filter.allElements);
});



const dropdownMenu = document.querySelector('.advanced__dropdown-menu');
const inputIngredients = document.getElementById('ingredients')
let selectedIngredients = []

function displayFilterList(tab) {
  const suggestionsList = document.createElement('ul')
  suggestionsList.classList.add('advanced__suggestions')

  tab.forEach(element => {
    const suggestion = document.createElement('li')
    suggestion.classList.add('suggestion')
    suggestion.innerText = `${element}`
    suggestionsList.appendChild(suggestion)
  })
  if (!document.querySelector('.advanced__suggestions')) {
    dropdownMenu.appendChild(suggestionsList)
  } else {
    document.querySelector('.advanced__suggestions').remove()
    dropdownMenu.appendChild(suggestionsList)
  }
}

async function filtersResearch() {
  const allIngredients = allRecipes.flatMap(recipe =>
    recipe.ingredients.map(ingredient => ingredient.ingredient)
  );

  inputIngredients.addEventListener('input', () => {
    let matchingIngredients = []
    const inputValue = inputIngredients.value.toLowerCase()
    // if (inputValue.length < 1) {
    //   console.log('3 caracteres minimum');
    //   return
    // } else {
    allIngredients.forEach(ingredient => {
      if (ingredient.toLowerCase().includes(inputValue)) {
        !matchingIngredients.includes(ingredient) && matchingIngredients.push(ingredient)
      }
    })
    console.log(matchingIngredients);
    displayFilterList(matchingIngredients)
    // }
  })

}

filtersResearch()