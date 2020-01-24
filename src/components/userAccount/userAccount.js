import fav from "./favorites.json";
import adds from "./ads.json";
import favHbs from "./userAccount_fav.hbs";
import addsHbs from "./userAccount_add.hbs";
import "./userAccount.css";

const refs = {
  userAccount__overlay: document.querySelector(".userAccount__overlay-hide"),
  showUserAccountButton: document.querySelector(".js-show-user-account")
};

function invokeFavorites() {
  document
    .querySelector(".userAccount__favorite-list")
    .insertAdjacentHTML("beforeend", favHbs(fav));
}
invokeFavorites();

function invokeAdvertisements() {
  document
    .querySelector(".userAccount__ads-list")
    .insertAdjacentHTML("beforeend", addsHbs(adds));
}
invokeAdvertisements();

function showUserAccount() {
  refs.userAccount__overlay.classList.toggle("userAccount__overlay");
}

refs.showUserAccountButton.addEventListener("click", showUserAccount);
