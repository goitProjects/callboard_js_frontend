// import { getBoardCategories } from "./searchBar";
import "./styles.css";
import searchBar from "./searchBar";
import services from "../../services";

export default searchBar;

// Подгружаем все доступные категории из БД и отрисовываем в фильтрах
searchBar.getBoardCategories();

// Запускаем поиск по ключевому слову. Совпадения ищет в заголовках
searchBar.refs.form.addEventListener("submit", searchBar.getSearchResult);

// Сброс. Очищаем input.value, radio.checked и результаты поиска
searchBar.refs.clear.addEventListener("click", searchBar.clearSearchResult);

