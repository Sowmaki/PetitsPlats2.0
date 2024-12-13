import { createDropdownFilter } from "../components/dropdownFilter.js";
import { createRecipeCardList } from "../components/recipeCardList.js";
import { createTagList } from "../components/tagList.js";
import { fetchRecipes, filterRecipes } from "../datas/recipes.js";

let recipes = []
fetchRecipes().then((data) => {
  recipes = data
  displayRecipesData()
})

// Fonctions qui mettent à jour l'objet contenant les ETIQUETTES filtrantes et affichent les RECETTES
// Initialise l'objet qui va contenir les ETIQUETTES filtrantes
const tagFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
}

const getIngredientFilter = () => tagFilters.ingredients
export function updateIngredientFilter(ingredients, removedIngredient) {
  tagFilters.ingredients = ingredients.filter(ingredient => ingredient !== removedIngredient)
  displayRecipesData()
}
const getApplianceFilter = () => tagFilters.appliances
export function updateApplianceFilter(appliances, removedAppliance) {
  tagFilters.appliances = appliances.filter(appliance => appliance !== removedAppliance)
  displayRecipesData()
}
const getUstensilFilter = () => tagFilters.ustensils
export function updateUstensilFilter(ustensils, removedUstensils) {
  tagFilters.ustensils = ustensils.filter(ustensil => ustensil !== removedUstensils)
  displayRecipesData()
}

const queryResult = {
  filteredRecipes: [],
  filteredSuggestions: {
    ingredients: [],
    appliances: [],
    ustensils: [],
  }
}
const getIngredientSuggestions = () => queryResult.filteredSuggestions.ingredients
function updateIngredientSuggestions(ingredients) {
  queryResult.filteredSuggestions.ingredients = ingredients
  displayRecipesData()
}
const getApplianceSuggestions = () => queryResult.filteredSuggestions.appliances
function updateApplianceSuggestions(appliances) {
  queryResult.filteredSuggestions.appliances = appliances
  displayRecipesData()
}
const getUstensilSuggestions = () => queryResult.filteredSuggestions.ustensils
function updateUstensilSuggestions(ustensils) {
  queryResult.filteredSuggestions.ustensils = ustensils
  displayRecipesData()
}

export const filters = [
  {
    id: 'ingredients',
    name: 'Ingrédients',
    getTags: getIngredientFilter,
    setTags: updateIngredientFilter,
    getSuggestions: getIngredientSuggestions,
    setSuggestions: updateIngredientSuggestions,
  },
  {
    id: 'appliances',
    name: 'Appareils',
    getTags: getApplianceFilter,
    setTags: updateApplianceFilter,
    getSuggestions: getApplianceSuggestions,
    setSuggestions: updateApplianceSuggestions,
  },
  {
    id: 'ustensils',
    name: 'Ustensiles',
    getTags: getUstensilFilter,
    setTags: updateUstensilFilter,
    getSuggestions: getUstensilSuggestions,
    setSuggestions: updateUstensilSuggestions,
  }
];

const $mainResults = document.querySelector(".main-results")
const $query = document.getElementById('main-searchbar-input');
const $noResultDiv = document.querySelector('.no-result');

export function displayRecipesData() {

  $mainResults.querySelector(".results")?.remove()

  const query = $query.value
  const { filteredRecipes, filteredSuggestions } = filterRecipes(recipes, query, tagFilters)
  queryResult.filteredSuggestions = filteredSuggestions

  // Variable contenant une liste créée à partir du template associé
  const recipesListDOM = createRecipeCardList(filteredRecipes);
  $mainResults.appendChild(recipesListDOM);
  $filtersDiv.replaceChildren(...$dropdownFilters())
  $tagsDiv.replaceChildren(createTagList(tagFilters))

  // Afficher les recettes filtrées ou un message si aucune recette n'est trouvée
  if (!filteredRecipes.length) {
    $mainResults.querySelector(".results")?.remove()
    $noResultDiv.innerText = `Aucune recette ne contient ${inputValue ? `"${inputValue}"` : "l'étiquette que vous avez ajoutée"}.
    Vous pouvez chercher "poissson", "tarte aux pommes", etc.`
    $noResultDiv.style.display = "block";
    console.log('oops');

  } else {
    $noResultDiv.style.display = "none"
    updateRecipesNumber()
    console.log(tagFilters);
  }
}

function updateRecipesNumber() {
  const numberDiv = document.querySelector('.recipes-number')
  const numberOfRecipes = document.querySelectorAll('.recipe').length
  numberDiv.innerText = `${numberOfRecipes} Recettes`
}

function $dropdownFilters() {
  return filters.map(filter => createDropdownFilter({
    id: filter.id,
    name: filter.name,
    suggestions: filter.getSuggestions(),
    onSelect: suggestion => filter.setTags([...filter.getTags(), suggestion])
  }))
}

const $filtersDiv = document.querySelector('.advanced')
$filtersDiv.append(...$dropdownFilters())

$query.addEventListener('input', displayRecipesData)

const $tagsDiv = document.querySelector('.main-labels')
$tagsDiv.append(createTagList(tagFilters))
