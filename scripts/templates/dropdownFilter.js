
import { getApplianceFilter, getIngredientFilter, getUstensilFilter, updateApplianceFilter, updateIngredientFilter, updateUstensilFilter } from "../pages";

//     $suggestionsList
const filters = [
  {
    $dropdown: document.getElementById('ingredients-dropdown'),
    getValue: getIngredientFilter,
    setValue: updateIngredientFilter,
  },
  {
    $dropdown: document.getElementById('appareils-dropdown'),
    getValue: getApplianceFilter,
    setValue: updateApplianceFilter,
  },
  {
    $dropdown: document.getElementById('ustensiles-dropdown'),
    getValue: getUstensilFilter,
    setValue: updateUstensilFilter,
  }
];


