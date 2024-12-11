/**
 * name: string
 * onDelete: () => void
 */
export function createTag({ name, onDelete }) {
  const $tag = document.createElement('li')
  $tag.classList.add('label')
  $tag.innerText = name

  const $deleteIcon = document.createElement('span')
  $deleteIcon.classList.add('fa-solid', 'fa-xmark')
  $deleteIcon.addEventListener('click', onDelete)
  $tag.appendChild($deleteIcon)

  return $tag
}