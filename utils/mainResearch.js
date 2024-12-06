import { recipesTemplate } from '../templates/card.js';
import { uploadRecipesNumber } from './uploadRecipesNumber.js';

export async function getAllRecipes() {
  try {
    const response = await fetch('datas/recipes.json')
    if (!response.ok) {
      throw new Error('could not fetch data')
    }
    const data = await response.json()

    return data
  }
  catch (error) {
    console.error(error);
  }
}

const mainResults = document.querySelector(".main-results")
const input = document.getElementById('main-searchbar-input');
const noResultDiv = document.querySelector('.no-result');

export async function displayRecipesData(selectedRecipes) {
  mainResults.querySelector(".results")?.remove()
  // Variable contenant une liste créée à partir du template associé
  const recipesListDOM = recipesTemplate(selectedRecipes);
  mainResults.appendChild(recipesListDOM);
}

export async function getRecipesFromResearch() {
  const allRecipes = await getAllRecipes(); // Charger toutes les recettes
  const inputValue = input.value.toLowerCase(); // Récupérer la valeur de l'input
  const isInputValid = inputValue.length >= 3; // Vérifier si l'input contient au moins 3 caractères
  const allLabels = document.querySelectorAll('.labels__label'); // Récupérer les étiquettes
  const selectedLabels = [...allLabels].map(label => label.innerText.toLowerCase()); // Convertir en tableau de chaînes en minuscules

  function matchesInput(recipe) {
    const nameMatch = recipe.name.toLowerCase().includes(inputValue)
    const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputValue))
    const descriptionMatch = recipe.description.toLowerCase().includes(inputValue)

    if (isInputValid) {
      return (nameMatch || ingredientsMatch || descriptionMatch)
    } else {
      return true
    }
  }

  function matchesAllLabels(recipe) {
    if (selectedLabels.length) {
      return selectedLabels.every(label => {
        const nameMatch = recipe.name.toLowerCase().includes(label)
        const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(label))
        const descriptionMatch = recipe.description.toLowerCase().includes(label)
        const ustensilsMatch = recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(label))
        const applianceMatch = recipe.appliance.toLowerCase().includes(label)
        return (nameMatch || ingredientMatch || descriptionMatch || ustensilsMatch || applianceMatch)

      }) // chaque label doit matcher avec au moins un des trucs.
    } else { return true }
  }

  const selectedRecipes = allRecipes.filter(recipe => {
    return matchesInput(recipe) && matchesAllLabels(recipe)
  })

  // Afficher les recettes filtrées ou un message si aucune recette n'est trouvée
  if (!selectedRecipes.length) {
    mainResults.querySelector(".results")?.remove()
    noResultDiv.innerText = `Aucune recette ne contient ${inputValue ? `"${inputValue}"` : "l'étiquette que vous avez ajoutée"}. 
    Vous pouvez chercher "poissson", "tarte aux pommes", etc.`
    noResultDiv.style.display = "block";
  } else {
    noResultDiv.style.display = "none"
    displayRecipesData(selectedRecipes);
    uploadRecipesNumber()
  }

  return selectedRecipes
}

input.addEventListener('input', getRecipesFromResearch)





