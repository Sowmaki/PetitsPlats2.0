```yml
$suggestion:
  state:
    name: string
  actions:
    select()

$suggestionList:
  state:
    suggestions: array<string>
  actions: 
    select(suggestion)
  children:
    $suggestion

$dropdownFilter:
  props:
    name: string
    suggestions: array<string> 
  state:
    *query: string
    *filteredSuggestions: array<string>
    *isOpen: boolean
  actions:
    *open()
    *close()
    select(suggestion: string)
  children: 
    div.advanced__searchbar
      input
    $suggestionsList
  
$tag:
  state:
    name: string
  actions:
    delete()

$tagList:
  state:
    tags: array<{name: string, onDelete: () => void}>
  children:
    $tag

$recipeCard:
  state:
    recipe: recipe

$indexPage: 
  state:
    query: string
    tagFilters: 
      ingredients: array<string>
      ustensils: array<string>
      appliances: array<string>
    recipes: array<recipe>
    filteredRecipes: array<recipe>
    filteredSuggestions :
      ingredients: array<string>
      appliances: array<string>
      ustensils: array<string>
  children: 
    $dropdownFilter
    $tagList
    $recipeCard


```

```jsx
<DropdownFilter name="ingrédients" category="ingredients" onClick={displayDropdownMenuIngredients}/>

<SuggestionsList list={ingredients}/>

<Suggestion name="pomme" category="ingredient" onClick={createTagPomme}/>

<Tag name="cuillère" category="ustensil" onDelete={deleteTagUstensil, createSuggestionCuillère} />

<Card duration={recipe.duration} name={recipe.name} image={recipe.image} description={recipe.description} ingredients={recipe.ingredients}>

```