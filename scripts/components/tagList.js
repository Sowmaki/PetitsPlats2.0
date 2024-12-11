import { createTag } from "./tag"

/**
 * tags: array<{name: string, onDelete: () => void}>
 */
export function createTagList({ tags }) {
  const $tagList = document.createElement('ul')
  $tagList.classList.add('labels')
  tags.forEach(tag => $tagList.appendChild(createTag(tag)))
  return $tagList
}