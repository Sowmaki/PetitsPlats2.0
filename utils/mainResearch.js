import { recipesTemplate } from '../templates/card.js';

export async function getAllRecipes() {
  try {
    const response = await fetch('datas/recipes.json')
    if (!response.ok) {
      throw new Error('could not fetch data')
    }
    const data = await response.json()
    console.log(data);

    return data
  }
  catch (error) {
    console.error(error);
  }
}

const mainResults = document.querySelector(".main-results")
// Affiche les medias et leurs données après les avoir créé 
export async function displayRecipesData(selectedRecipes) {
  ; //recupere l'endroit ou vont etre affichés les medias
  // supprime l'element medias du main s'il existe deja
  mainResults.querySelector(".results")?.remove()
  // Variable contenant une liste créée à partir du template associé
  const recipesListDOM = recipesTemplate(selectedRecipes);
  mainResults.appendChild(recipesListDOM);
}

async function getRecipesFromResearch() {
  const input = document.getElementById('main-searchbar-input');
  // stocke tout ce que contient notre recipes.json dans une variable
  const allRecipes = await getAllRecipes();
  input.addEventListener('input', () => {
    // récupère la valeur de l'input de saisie 
    const inputValue = input.value.toLowerCase()
    //Si l'input n'a pas le minimum de 3 caractères, ne rien faire
    // Initialisation du tableau des recettes sélectionnées
    let selectedRecipes = [];

    // Parcourir toutes les recettes si le champ contient au moins 3 caractères
    if (inputValue.length < 3) {
      console.log('3 caracteres minimum');
      return
    } else {
      allRecipes.forEach(recipe => {

        // Vérifier si un ingrédient correspond à inputValue
        const hasMatchingIngredient = recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(inputValue)
        );

        // Vérifier si le titre contient inputValue
        const hasMatchingTitle = recipe.name.toLowerCase().includes(inputValue);

        // Vérifier si la description contient inputValue
        const hasMatchingDescription = recipe.description.toLowerCase().includes(inputValue);

        // Ajouter la recette à selectedRecipes si au moins une condition est vraie et qu'elle n'y est pas déjà
        if ((hasMatchingIngredient || hasMatchingTitle || hasMatchingDescription) &&
          !selectedRecipes.includes(recipe)) {
          selectedRecipes.push(recipe);
        }
      });
    }

    // Afficher les recettes filtrées si le tableau n'est pas vide
    if (selectedRecipes.length < 0) {
      console.log('pas de recettes trouvées');
      return
    } else {
      displayRecipesData(selectedRecipes);
    }
  });

}

getRecipesFromResearch()
