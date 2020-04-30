import Search from "./models/Search";
import { elements } from "./views/base";
import * as searchView from "./views/searchView";
/** Global state of the app
 *  - Search object
 *  - Current recipe object
 *  - Shopping list object
 *  - Liked recipes
 */
const state = {};

const controlDefault = async () => {
  // Get query from view
  const query = searchView.getInput();
  if (query) {
    // New search object added to state
    state.search = new Search(query);

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();

    // Search for recipes
    await state.search.getResults();

    // Render results
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlDefault();
});
