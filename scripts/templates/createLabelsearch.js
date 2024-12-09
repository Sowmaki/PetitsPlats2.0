export function createLabelSearch(element) {
  const labelsList = document.querySelector('.labels')
  const labelSearch = document.createElement('li')
  labelSearch.classList.add('labels__label')
  labelSearch.innerText = `${element.innerText}`

  const deleteCross = document.createElement('span');
  deleteCross.classList.add('deleteBtn');

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-xmark');

  deleteCross.appendChild(icon)

  labelSearch.appendChild(deleteCross)
  labelsList.appendChild(labelSearch)
}