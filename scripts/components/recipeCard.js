
export function createRecipeCard(recipe) {
  // Récupération des données de la recette
  const imgSrc = `./assets/Images/${recipe.image}`;
  const { time, name, description, ingredients } = recipe

  // Création de la carte de recette
  const $card = document.createElement('li');
  $card.classList.add('recipe');

  const $recipeContainer = document.createElement('div');
  $recipeContainer.classList.add('recipe-container');

  // Partie supérieure de la carte (image et durée)
  const $recipeTop = document.createElement('div');
  $recipeTop.classList.add('recipe-container__top');
  $recipeTop.innerHTML = `
  <img class="recipe__img" src="${imgSrc}" alt="${name}">
  <div class="recipe__duration">${time} min</div>
`;

  // Partie inférieure de la carte (titre, description, ingrédients)
  const $recipeBottom = document.createElement('div');
  $recipeBottom.classList.add('recipe-container__bottom');

  // Titre
  const $recipeTitle = document.createElement('h2');
  $recipeTitle.classList.add('recipe__name');
  $recipeTitle.innerText = `${name}`

  // Description
  const $descriptionContainer = document.createElement('div');
  $descriptionContainer.classList.add('recipe-container__description');
  $descriptionContainer.innerHTML = `
  <h3>Recette</h3>
  <p class="recipe__description">${description}</p>
`;

  // Liste des ingrédients
  const $ingredientsContainer = document.createElement('div');
  $ingredientsContainer.classList.add('recipe-container__ingredients');

  const $ingredientsTitle = document.createElement('h3');
  $ingredientsTitle.innerText = 'Ingrédients';

  const $ingredientsList = document.createElement('ul');
  $ingredientsList.classList.add('recipe__ingredients');

  // Boucle pour créer chaque ingrédient
  ingredients.forEach(ingredient => {
    const $ingredient = document.createElement('li');
    $ingredient.classList.add('recipe__ingredient-item');

    const ingredientName = ingredient.ingredient;
    const ingredientQuantity = `${ingredient.quantity ? ingredient.quantity : ""} ${ingredient.unit ? ingredient.unit : ""}`;

    $ingredient.innerHTML = `
    <span class="recipe__ingredient">${ingredientName}</span>
    <span class="recipe__ingredient--quantity">${ingredientQuantity}</span>
  `;
    $ingredientsList.appendChild($ingredient);
  });

  // Ajout des éléments au conteneur des ingrédients
  $ingredientsContainer.appendChild($ingredientsTitle);
  $ingredientsContainer.appendChild($ingredientsList);

  // Assemblage des parties de la carte
  $recipeBottom.appendChild($recipeTitle);
  $recipeBottom.appendChild($descriptionContainer);
  $recipeBottom.appendChild($ingredientsContainer);
  $recipeContainer.appendChild($recipeTop);
  $recipeContainer.appendChild($recipeBottom);
  $card.appendChild($recipeContainer);

  // Retourne la carte
  return $card
}


