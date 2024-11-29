import { recipesTemplate } from '../templates/card.js';

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
    selectedLabels.push(allLabels[i].innerText.toLowerCase()); // Convertir en tableau de chaînes en minuscules
  }

  // Fonction pour vérifier si un tableau satisfait un prédicat pour TOUS ses éléments
  function arrayAll(array, predicate) {
    for (let i = 0; i < array.length; i++) {
      if (!predicate(array[i])) {
        return false; // Si un élément ne respecte pas le prédicat, retourne false
      }
    }
    return true; // Si tous les éléments respectent le prédicat, retourne true
  }

  // Tableau pour stocker les recettes sélectionnées
  const selectedRecipes = [];

  // Parcourir toutes les recettes
  for (let i = 0; i < allRecipes.length; i++) {
    const recipe = allRecipes[i];

    // Vérification des ingrédients
    let hasMatchingIngredient = false;
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredientName = recipe.ingredients[j].ingredient.toLowerCase();
      const matchesInput = isInputValid ? ingredientName.includes(inputValue) : true; // Match avec l'input
      const matchesAllLabels = arrayAll(selectedLabels, (label) => ingredientName.includes(label)); // Match avec toutes les étiquettes

      if (matchesInput && matchesAllLabels) {
        hasMatchingIngredient = true;
        break; // Si un ingrédient correspond, on peut arrêter la vérification pour ce champ
      }
    }

    // Vérification du titre
    let hasMatchingTitle = isInputValid ? recipe.name.toLowerCase().includes(inputValue) : true;
    let matchesTitleLabels = true;
    if (selectedLabels.length > 0) {
      matchesTitleLabels = arrayAll(selectedLabels, (label) => recipe.name.toLowerCase().includes(label)); // Vérifier le titre avec les étiquettes
    }

    const titleValid = hasMatchingTitle && matchesTitleLabels;

    // Vérification de la description
    let hasMatchingDescription = isInputValid ? recipe.description.toLowerCase().includes(inputValue) : true;
    let matchesDescriptionLabels = true;
    if (selectedLabels.length > 0) {
      matchesDescriptionLabels = arrayAll(selectedLabels, (label) => recipe.description.toLowerCase().includes(label)); // Vérifier la description avec les étiquettes
    }

    const descriptionValid = hasMatchingDescription && matchesDescriptionLabels;

    // Ajouter la recette si elle correspond à l'une des conditions
    if (hasMatchingIngredient || titleValid || descriptionValid) {
      selectedRecipes.push(recipe);
    }
  }

  // Afficher les recettes filtrées ou un message si aucune recette n'est trouvée
  if (selectedRecipes.length === 0) {
    mainResults.querySelector(".results")?.remove();
    console.log('Aucune recette trouvée.');
  } else {
    displayRecipesData(selectedRecipes);
  }
}


getRecipesFromResearch();




// const recipeHasIngredient=(recipe,ingredients)=>
//   recipe.ingredients.some(ingredient => {
//     const matchesInput = isInputValid && ingredient.ingredient.toLowerCase().includes(inputValue);

//     // Vérifier si les étiquettes existent et si l'ingrédient correspond à une des étiquettes
//     const matchesLabel = selectedLabels.length > 0 ? selectedLabels.some(label =>
//       ingredient.ingredient.toLowerCase().includes(label.toLowerCase())
//     ) : true; // Si aucune étiquette, on ne filtre pas par étiquette

//     return matchesInput && matchesLabel;
//   });


input.addEventListener('input', getRecipesFromResearch)

getRecipesFromResearch()
