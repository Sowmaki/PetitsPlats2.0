
export function filterRecipes(recipes, query, { ingredients, appliances, ustensils }) {
  const filteredRecipes = getRecipesFromResearch(recipes, query, { ingredients, appliances, ustensils })

  const filteredIngredients = [...new Set(filteredRecipes.flatMap(recipe =>
    recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())
  ))].filter(ingredient => !ingredients.includes(ingredient))

  const filteredAppliances = [...new Set(filteredRecipes.flatMap(recipe =>
    recipe.appliances.map(appliance => appliance.toLowerCase())
  ))].filter(appliance => !appliances.includes(appliance))

  const filteredUstensils = [...new Set(filteredRecipes.flatMap(recipe =>
    recipe.ustensils.map(ustensil => ustensil.toLowerCase())
  ))].filter(ustensil => !ustensils.includes(ustensil))

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
  const isQueryValid = query.length >= 3; // Vérifier si l'input contient au moins 3 caractères
  const hasTags = Object.values(tagFilters).some(tagFilter => tagFilter.length)
  if (!isQueryValid && !hasTags) return recipes

  function recipeMatchesInput(recipe) {
    if (!isQueryValid) return true
    const nameMatch = recipe.name.toLowerCase().includes(query)
    const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query))
    const descriptionMatch = recipe.description.toLowerCase().includes(query)
    return (nameMatch || ingredientsMatch || descriptionMatch)
  }

  const recipeHasEveryIngredients = recipe => tagFilters.ingredients.every(tagIngredient =>
    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tagIngredient)))
  const recipeHasEveryAppliance = recipe => tagFilters.appliances.every(tagAppliance =>
    recipe.appliance.toLowerCase().includes(tagAppliance))
  const recipeHasEveryUstensil = recipe => tagFilters.ustensils.every(tagUstensils =>
    recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tagUstensils)))

  const recipeMatchesTags = recipe => recipeHasEveryAppliance(recipe) && recipeHasEveryIngredients(recipe) && recipeHasEveryUstensil(recipe)

  return recipes.filter(recipe => recipeMatchesInput(recipe) && recipeMatchesTags(recipe))
}

export async function fetchRecipes() {
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







