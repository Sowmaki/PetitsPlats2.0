
export function filterRecipes(recipes, query, { ingredients, appliances, ustensils }) {
  const filteredRecipes = getRecipesFromResearch(recipes, query, { ingredients, appliances, ustensils })

  const filteredIngredients = [...new Set(filteredRecipes.flatMap(recipe =>
    recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())
  ))].filter(ingredient => !ingredients.includes(ingredient))

  const filteredAppliances = [...new Set(filteredRecipes.flatMap(recipe =>
    recipe.appliance.toLowerCase()
  ))].filter(appliance => !appliances.includes(appliance))

  const filteredUstensils = [...new Set(filteredRecipes.flatMap(recipe =>
    recipe.ustensils.map(ustensil => ustensil.toLowerCase())
  ))].filter(ustensil => !ustensils.includes(ustensil))

  // Récupère les RECETTES FILTREES ansi que Leurs INGREDIENTS, APPAREILS et USTENSILES
  // Retourne un objet qui contient toutes ces valeurs.

  return {
    filteredSuggestions: {
      ingredients: filteredIngredients,
      appliances: filteredAppliances,
      ustensils: filteredUstensils,
    },
    filteredRecipes,
  }
}

function getRecipesFromResearch(recipes, query, tagFilters) {
  // Vérifie si l'input contient au moins 3 caractères, puis s'il y a des tags.
  //Si aucun des deux n'existe, récupère toutes les recettes.
  const isQueryValid = query.length >= 3;
  const hasTags = Object.values(tagFilters).some(tagFilter => tagFilter.length)
  if (!isQueryValid && !hasTags) return recipes

  // Fonction qui vérifie tour à tour dans la RECETTE si le titre, les ingrédients ou la description contiennent la QUERY
  function recipeMatchesInput(recipe) {
    if (!isQueryValid) return true;

    const lowerCaseQuery = query.toLowerCase();

    // Vérifier le nom
    let nameMatch = recipe.name.toLowerCase().includes(lowerCaseQuery);

    // Vérifier les ingrédients
    let ingredientsMatch = false;
    for (let ingredient of recipe.ingredients) {
      if (ingredient.ingredient.toLowerCase().includes(lowerCaseQuery)) {
        ingredientsMatch = true;
        break;
      }
    }

    // Vérifier la description
    let descriptionMatch = recipe.description.toLowerCase().includes(lowerCaseQuery);

    return nameMatch || ingredientsMatch || descriptionMatch;
  }

  // Fonctions qui vérifient si les INGREDIENTS de la RECETTE incluent toutes les TAGS ingrédients, idem pour les APPAREILS et USTENSILES
  const recipeHasEveryIngredients = recipe => tagFilters.ingredients.every(tagIngredient =>
    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tagIngredient)))
  const recipeHasEveryAppliance = recipe => tagFilters.appliances.every(tagAppliance =>
    recipe.appliance.toLowerCase().includes(tagAppliance))
  const recipeHasEveryUstensil = recipe => tagFilters.ustensils.every(tagUstensils =>
    recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tagUstensils)))

  // Fonction qui vérifie ainsi que les 3 fonctionc précédentes retournent TOUTES true
  const recipeMatchesTags = recipe => recipeHasEveryAppliance(recipe) && recipeHasEveryIngredients(recipe) && recipeHasEveryUstensil(recipe)

  // Retourne les recettes qui matchent à la fois avec la QUERY et les TAGS
  const matchingRecipes = [];
  for (let recipe of recipes) {
    if (recipeMatchesInput(recipe) && recipeMatchesTags(recipe)) {
      matchingRecipes.push(recipe);
    }
  }

  return matchingRecipes;
}

export async function fetchRecipes() {
  try {
    const response = await fetch('scripts/datas/recipes.json')
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







