export function recipesTemplate(data) {
  const results = document.createElement('ul')
  results.classList.add('results')

  data.forEach(recipe => {
    // Récupération des données de la recette
    const imgSrc = `./assets/Images/${recipe.image}`;
    const duration = `${recipe.time}`;
    const title = `${recipe.name}`;
    const description = `${recipe.description}`;
    const ingredients = recipe.ingredients;

    // Création de la carte de recette
    const card = document.createElement('li');
    card.classList.add('recipe');

    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('recipe-container');

    // Partie supérieure de la carte (image et durée)
    const recipeTop = document.createElement('div');
    recipeTop.classList.add('recipe-container__top');
    recipeTop.innerHTML = `
    <img class="recipe__img" src="${imgSrc}" alt="${title}">
    <div class="recipe__duration">${duration} min</div>
  `;

    // Partie inférieure de la carte (titre, description, ingrédients)
    const recipeBottom = document.createElement('div');
    recipeBottom.classList.add('recipe-container__bottom');

    // Titre
    const recipeTitle = document.createElement('h2');
    recipeTitle.classList.add('recipe__name');
    recipeTitle.innerText = `${title}`

    // Description
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('recipe-container__description');
    descriptionContainer.innerHTML = `
    <h3>Recette</h3>
    <p class="recipe__description">${description}</p>
  `;

    // Liste des ingrédients
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('recipe-container__ingredients');

    const h3 = document.createElement('h3');
    h3.innerText = 'Ingrédients';

    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('recipe__ingredients');

    // Boucle pour créer chaque ingrédient
    ingredients.forEach(element => {
      const ingredient = document.createElement('li');
      ingredient.classList.add('recipe__ingredient-item');

      const ingredientName = element.ingredient;
      const ingredientQuantity = `${element.quantity ? element.quantity : ""} ${element.unit ? element.unit : ""}`;

      ingredient.innerHTML = `
      <span class="recipe__ingredient">${ingredientName}</span>
      <span class="recipe__ingredient--quantity">${ingredientQuantity}</span>
    `;
      ingredientsList.appendChild(ingredient);
    });

    // Ajout des éléments au conteneur des ingrédients
    ingredientsContainer.appendChild(h3);
    ingredientsContainer.appendChild(ingredientsList);

    // Assemblage des parties de la carte
    recipeBottom.appendChild(recipeTitle);
    recipeBottom.appendChild(descriptionContainer);
    recipeBottom.appendChild(ingredientsContainer);
    recipeContainer.appendChild(recipeTop);
    recipeContainer.appendChild(recipeBottom);
    card.appendChild(recipeContainer);

    // Ajout de la carte au conteneur principal
    results.appendChild(card);

  })

  return results

}
