"use strict";
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
/** Global state of the app
 *  - Search object
 *  - Current recipe object
 *  - Shopping list object
 *  - Liked recipes
 */
const state = {};

// Search Controller
const controlDefault = async () => {
  // Get query from view
  const query = searchView.getInput();
  // const query = "pizza";
  if (query) {
    // New search object added to state
    state.search = new Search(query);

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // Search for recipes
      await state.search.getResults();

      clearLoader();
      // Render results
      searchView.renderResults(state.search.result);
    } catch (error) {
      clearLoader();
      alert("Error: " + error.message);
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlDefault();
});

// For testing
// window.addEventListener("load", (e) => {
//   e.preventDefault();
//   controlDefault();
// });

// elements.searchInput.addEventListener("keyup", (e) => {
//   let key = event.key || event.keyCode;
//   if (key === "Enter") {
//     // e.preventDefault();
//     // controlDefault();
//     console.log(e);
//   }
// });

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = +btn.dataset.goto;
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// Recipe controller
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  // console.log(id);

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);
    try {
      // Get recipe data and parse ingredient
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      // Testing
      // globalThis.r = state.recipe;
      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render Recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert("Error processing recipe " + error.message.toLowerCase());
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
