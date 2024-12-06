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
  const selectedLabels = [];

  for (let i = 0; i < allLabels.length; i++) {
    selectedLabels.push(allLabels[i].innerText.toLowerCase());
  }

  function matchesInput(recipe) {
    let nameMatch = false;
    let ingredientsMatch = false;
    let descriptionMatch = false;

    if (isInputValid) {
      nameMatch = recipe.name.toLowerCase().includes(inputValue);

      for (let i = 0; i < recipe.ingredients.length; i++) {
        if (recipe.ingredients[i].ingredient.toLowerCase().includes(inputValue)) {
          ingredientsMatch = true;
          break;
        }
      }

      descriptionMatch = recipe.description.toLowerCase().includes(inputValue);

      return nameMatch || ingredientsMatch || descriptionMatch;
    } else {
      return true;
    }
  }

  function matchesAllLabels(recipe) {
    if (selectedLabels.length) {
      for (let i = 0; i < selectedLabels.length; i++) {
        const label = selectedLabels[i];
        let labelMatch = false;

        if (recipe.name.toLowerCase().includes(label)) {
          labelMatch = true;
        }

        for (let j = 0; j < recipe.ingredients.length; j++) {
          if (recipe.ingredients[j].ingredient.toLowerCase().includes(label)) {
            labelMatch = true;
            break;
          }
        }

        if (recipe.description.toLowerCase().includes(label)) {
          labelMatch = true;
        }

        for (let j = 0; j < recipe.ustensils.length; j++) {
          if (recipe.ustensils[j].toLowerCase().includes(label)) {
            labelMatch = true;
            break;
          }
        }

        if (recipe.appliance.toLowerCase().includes(label)) {
          labelMatch = true;
        }

        if (!labelMatch) {
          return false;
        }
      }
    }
    return true;
  }

  const selectedRecipes = [];
  for (let i = 0; i < allRecipes.length; i++) {
    const recipe = allRecipes[i];
    if (matchesInput(recipe) && matchesAllLabels(recipe)) {
      selectedRecipes.push(recipe);
    }
  }

  // Afficher les recettes filtrées ou un message si aucune recette n'est trouvée
  if (!selectedRecipes.length) {
    mainResults.querySelector(".results")?.remove();
    noResultDiv.innerText = `Aucune recette ne contient ${inputValue ? `"${inputValue}"` : "l'étiquette que vous avez ajoutée"}. 
    Vous pouvez chercher "poisson", "tarte aux pommes", etc.`;
    noResultDiv.style.display = "block";
  } else {
    noResultDiv.style.display = "none";
    displayRecipesData(selectedRecipes);
    uploadRecipesNumber();
  }

  return selectedRecipes;
}


input.addEventListener('input', getRecipesFromResearch)





