import { updateApplianceFilter, updateIngredientFilter, updateUstensilFilter } from "../pages/index.js";
import { createTag } from "./tag.js";

/**
 * tags: array<{name: string, onDelete: () => void}>
 */
export function createTagList(tags) {
  const { ingredients = [], appliances = [], ustensils = [] } = tags
  const $tagList = document.createElement('ul')
  $tagList.classList.add('labels')
  ingredients.forEach(tag => $tagList.appendChild(createTag({
    name: tag,
    onDelete: () => updateIngredientFilter(ingredients, tag),
  })))
  appliances.forEach(tag => $tagList.appendChild(createTag({
    name: tag,
    onDelete: () => updateApplianceFilter(appliances, tag),
  })))
  ustensils.forEach(tag => $tagList.appendChild(createTag({
    name: tag,
    onDelete: () => updateUstensilFilter(ustensils, tag),
  })))
  return $tagList
}