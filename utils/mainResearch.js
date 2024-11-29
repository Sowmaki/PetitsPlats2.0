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
  const input = document.getElementById('main-searchbar-input');
  const allRecipes = await getAllRecipes();

  input.addEventListener('input', () => {
    const inputValue = input.value.trim().toLowerCase(); // Nettoyage de l'input
    const allLabels = document.querySelectorAll('.labels__label');
    const selectedLabels = [];
    for (let i = 0; i < allLabels.length; i++) {
      selectedLabels.push(allLabels[i].innerText.toLowerCase());
    }
    const isInputValid = inputValue.length >= 3; // Vérifie si l'input est valide

    const selectedRecipes = [];
    for (let i = 0; i < allRecipes.length; i++) {
      const recipe = allRecipes[i];

      // Vérifier les ingrédients
      let ingredientMatches = true; // Suppose au départ que les ingrédients correspondent
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredientName = recipe.ingredients[j].ingredient.toLowerCase();
        const inputMatch = isInputValid ? ingredientName.includes(inputValue) : true;

        // Vérifie que toutes les étiquettes correspondent aux ingrédients
        let labelMatch = true;
        if (selectedLabels.length > 0) {
          for (let k = 0; k < selectedLabels.length; k++) {
            if (!ingredientName.includes(selectedLabels[k])) {
              labelMatch = false;
              break;
            }
          }
        }

        if (!inputMatch || !labelMatch) {
          ingredientMatches = false;
          break;
        }
      }

      // Vérifier le titre
      let titleMatches = isInputValid ? recipe.name.toLowerCase().includes(inputValue) : true;
      let titleLabelMatch = true;
      if (selectedLabels.length > 0) {
        for (let j = 0; j < selectedLabels.length; j++) {
          if (!recipe.name.toLowerCase().includes(selectedLabels[j])) {
            titleLabelMatch = false;
            break;
          }
        }
      }

      // Vérifier la description
      let descriptionMatches = isInputValid ? recipe.description.toLowerCase().includes(inputValue) : true;
      let descriptionLabelMatch = true;
      if (selectedLabels.length > 0) {
        for (let j = 0; j < selectedLabels.length; j++) {
          if (!recipe.description.toLowerCase().includes(selectedLabels[j])) {
            descriptionLabelMatch = false;
            break;
          }
        }
      }

      // Ajouter la recette si une des conditions est remplie
      if (
        ingredientMatches ||
        (titleMatches && titleLabelMatch) ||
        (descriptionMatches && descriptionLabelMatch)
      ) {
        selectedRecipes.push(recipe);
      }
    }

    // Mettre à jour l'affichage
    displayRecipesData(selectedRecipes);
  });
}



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
