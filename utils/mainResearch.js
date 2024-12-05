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
  const allAppliances = [...new Set(allRecipes.flatMap(recipe => recipe.appliance))];
  const allUstensils = [...new Set(allRecipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase())))];

  // Filtrage des recettes
  const selectedRecipes = allRecipes.filter(recipe => {
    // Vérifier les ingrédients
    const hasMatchingIngredient = recipe.ingredients.some(ingredient => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      const matchesInput = isInputValid ? ingredientName.includes(inputValue) : true; // Match avec l'input (ou non si l'input est vide)
      const matchesAllLabels = selectedLabels.every(label => ingredientName.includes(label)); // Match avec toutes les étiquettes
      return matchesInput && matchesAllLabels; // Doit satisfaire les deux conditions
    });

    // Vérifier le titre
    // hasMatchingTitle vérifie si le nom de la recette contient la valeur de l'input (en ignorant la casse), sinon considère que c'est vrai.
    const hasMatchingTitle = isInputValid ? recipe.name.toLowerCase().includes(inputValue) : true;
    const matchesTitleLabels = selectedLabels.every(label =>
      recipe.name.toLowerCase().includes(label)
    );
    const titleValid = hasMatchingTitle && matchesTitleLabels;

    // Vérifier la description
    const hasMatchingDescription = isInputValid ? recipe.description.toLowerCase().includes(inputValue) : true;
    const matchesDescriptionLabels = selectedLabels.every(label =>
      recipe.description.toLowerCase().includes(label)
    );
    const descriptionValid = hasMatchingDescription && matchesDescriptionLabels;

    //Vérifier les appareils
    const applianceLabel = selectedLabels.filter(label => allAppliances.some(appliance => appliance.toLowerCase().includes(label)))
    let hasMatchingAppliance = false
    if (applianceLabel.length !== 0) {
      hasMatchingAppliance = applianceLabel.every(label =>
        recipe.appliance.toLowerCase().includes(label.toLowerCase()))
    }

    //Vérifier les ustensiles
    const ustensilLabel = selectedLabels.filter(label => allUstensils.some(ustensil => ustensil.toLowerCase().includes(label)))
    let hasMatchingUstensil = false;

    if (ustensilLabel.length !== 0) {
      hasMatchingUstensil = ustensilLabel.every(label =>
        recipe.appliance.toLowerCase().includes(label.toLowerCase()))
    }

    // Une recette est valide si elle satisfait l'une des trois conditions
    return hasMatchingIngredient || titleValid || descriptionValid || hasMatchingUstensil || hasMatchingAppliance;
  });

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
}

input.addEventListener('input', getRecipesFromResearch)

getRecipesFromResearch()
