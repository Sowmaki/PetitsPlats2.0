export function uploadRecipesNumber() {
  const numberDiv = document.querySelector('.recipes-number')
  const numberOfRecipes = document.querySelectorAll('.recipe').length
  numberDiv.innerText = `${numberOfRecipes} Recettes`
}