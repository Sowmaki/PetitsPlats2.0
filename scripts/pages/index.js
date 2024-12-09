import { fetchRecipes, filterRecipes } from "../datas/recipes";

let recipes = []
fetchRecipes().then((data) => {
  recipes = data
  displayRecipesData()
})

const tagFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
}
export function updateIngredientFilter(ingredients) {
  tagFilters.ingredients = ingredients
  displayRecipesData()
}
export function updateApplianceFilter(appliances) {
  tagFilters.appliances = appliances
  displayRecipesData()
}
export function updateUstensilFilter(ustensils) {
  tagFilters.ustensils = ustensils
  displayRecipesData()
}


const mainResults = document.querySelector(".main-results")
const input = document.getElementById('main-searchbar-input');
const noResultDiv = document.querySelector('.no-result');

export function displayRecipesData() {

  mainResults.querySelector(".results")?.remove()

  const query = input.value
  const { filteredRecipes, filteredSuggestions } = filterRecipes(recipes, query, tagFilters)

  // Variable contenant une liste créée à partir du template associé
  const recipesListDOM = recipesTemplate(filteredRecipes);
  mainResults.appendChild(recipesListDOM);

  // Afficher les recettes filtrées ou un message si aucune recette n'est trouvée
  if (!filteredRecipes.length) {
    mainResults.querySelector(".results")?.remove()
    noResultDiv.innerText = `Aucune recette ne contient ${inputValue ? `"${inputValue}"` : "l'étiquette que vous avez ajoutée"}. 
    Vous pouvez chercher "poissson", "tarte aux pommes", etc.`
    noResultDiv.style.display = "block";
  } else {
    noResultDiv.style.display = "none"
    displayRecipesData(filteredRecipes);
    updateRecipesNumber()
  }
}

function updateRecipesNumber() {
  const numberDiv = document.querySelector('.recipes-number')
  const numberOfRecipes = document.querySelectorAll('.recipe').length
  numberDiv.innerText = `${numberOfRecipes} Recettes`
}

input.addEventListener('input', getRecipesFromResearch)