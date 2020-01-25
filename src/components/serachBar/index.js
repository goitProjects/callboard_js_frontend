// import { getBoardCategories } from "./searchBar";
import "./styles.css";
import searchBar from "./searchBar";
import services from "../../services";

export default searchBar;

searchBar.renderSearchBarForm();
searchBar.getBoardCategories();
const searchBarForm = document.querySelector("body");
searchBarForm.addEventListener("submit", searchBar.getSearchResult);

searchBar.refsearch.clear.addEventListener(
  "click",
  searchBar.clearSearchResult
);

searchBar.refsearch.clearDesktop.addEventListener(
  "click",
  searchBar.clearSearchResult
);
