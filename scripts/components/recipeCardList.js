import { createRecipeCard } from "./recipeCard";

/**
 * @param {array<recipe>} recipes 
 */
export function createRecipeCardList(recipes) {
  const $recipes = document.createElement('ul');
  $recipes.classList.add('results');

  recipes.forEach(recipe => $recipes.appendChild(createRecipeCard(recipe)));
  return $recipes;
}
