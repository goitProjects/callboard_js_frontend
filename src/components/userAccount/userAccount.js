import favHbs from "./userAccount_fav.hbs";
import addsHbs from "./userAccount_add.hbs";
import "./userAccount.css";
import services from "./../../services";

const refs = {
  userAccount__overlay: document.querySelector(".userAccount__overlay"),
  showUserAccountButton: document.querySelector(".js-show-user-account")
};

const tokenUserAcc = localStorage.getItem("token");

document.addEventListener("click", handleCLickOpenModalAcc);
window.addEventListener("click", modalCloseByWindowClick);

function modalCloseByWindowClick(event) {
  if (event.target == refs.userAccount__overlay) {
    refs.userAccount__overlay.style.display = "none";
  }
}

function handleCLickOpenModalAcc(e) {
  if (e.target.classList == "logged-user") {
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector("#menu__toggle").checked = false;
    document.querySelector(".userAccount__overlay").style.display = "block";
    services
      .getFavorites({ headers: { Authorization: tokenUserAcc } })
      .then(res => {
        const Datafav = res.data.user.favorites;
        document
          .querySelector(".userAccount__favorite-list")
          .insertAdjacentHTML("beforeend", favHbs(Datafav));
      });
    services
      .getAdsUser({ headers: { Authorization: tokenUserAcc } })
      .then(res => {
        const DataAds = res.data.ads;
        document
          .querySelector(".userAccount__ads-list")
          .insertAdjacentHTML("beforeend", addsHbs(DataAds));
      });
    console.log(5);
  }

  if (e.target.classList == "userAccount-close-Modal") {
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("#menu__toggle").checked = false;
    document.querySelector(".userAccount__overlay").style.display = "none";
    document.querySelector(".userAccount__ads-list").innerHTML = "";
  }
}
