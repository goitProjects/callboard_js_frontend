// import { getBoardCategories } from "./searchBar";
import "./styles.css";
import searchBar from "./searchBar";
import services from "../../services";

export default searchBar;

searchBar.getBoardCategories();
services.srch.form.addEventListener("submit", searchBar.getSearchResult);
services.srch.clear.addEventListener("submit", searchBar.clearSearchResult);
