import favHbs from "./userAccount_fav.hbs";
import addsHbs from "./userAccount_add.hbs";
import "./userAccount.css";
import services from "./../../services";

let allFavAds = [];
let allMyAds = [];

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
    document.querySelector("body").style.overflow = "auto";
  }
}

function handleCLickOpenModalAcc(e) {
  if (e.target.classList == "logged-user") {
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector("#menu__toggle").checked = false;
    document.querySelector(".userAccount__overlay").style.display = "block";

    // ------------------------------------- Мои избранные объявления
    services
      .getFavorites({ headers: { Authorization: tokenUserAcc } })
      .then(res => {
        allFavAds = res.data.user.favorites;
        const listFav = document.querySelector(".userAccount__favorite-list");
        const itemFav = document.createElement("li");
        const addDelBtn = document.createElement("button");
        listFav.innerHTML="";
        allFavAds.map(el => {
          itemFav.className = "userAccount__favorite-list-item";
          itemFav.dataset.id = el._id;
          listFav.appendChild(itemFav);
          itemFav.innerHTML = favHbs(el);
          addDelBtn.className = "useracc__del-btn";
          addDelBtn.innerHTML = "&times;";
          addDelBtn.dataset.id = el._id;
          itemFav.appendChild(addDelBtn);
          addDelBtn.addEventListener("click", deleteFavAd);
        });
      });


    // ------------------------------------- Мои объявления

      services
      .getAdsUser({ headers: { Authorization: tokenUserAcc } })
      .then(res => {
        allMyAds = res.data.ads;
        const listMyAds = document.querySelector(".userAccount__ads-list");
        const itemMyAds = document.createElement("li");
        itemMyAds.innerHTML="";
        allMyAds.map(el => {
          itemMyAds.className = "userAccount__ads-list-item";
          itemMyAds.dataset.id = el._id;
          listMyAds.appendChild(itemMyAds);
          itemMyAds.innerHTML = favHbs(el);
          const addDelBtn = document.createElement("button");
          addDelBtn.className = "useracc__del-btn";
          addDelBtn.innerHTML = "&times;";
          addDelBtn.dataset.id = el._id;
            itemMyAds.appendChild(addDelBtn);
          addDelBtn.addEventListener("click", deleteMyAd);
        });
      });



  }

  if (e.target.classList == "userAccount-close-Modal") {
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("#menu__toggle").checked = false;
    document.querySelector(".userAccount__overlay").style.display = "none";
    document.querySelector(".userAccount__ads-list").innerHTML = "";
  }
}

function deleteFavAd(e) {
  if (e.target.nodeName !== "BUTTON") return;
  const button = e.target;
  const parentLi = button.closest("li.userAccount__favorite-list-item");
  const itemID = parentLi.dataset.id;

  allFavAds.map(el => {
    if (itemID === el._id) {
      const idxOfElement = allFavAds.indexOf(el);
      allFavAds.splice(idxOfElement, 1);
      parentLi.remove();
      services.deleteFavorites(`${itemID}`, { headers: { Authorization: tokenUserAcc } })
    }
  });
}

function deleteMyAd(e) {
  if (e.target.nodeName !== "BUTTON") return;
  const button = e.target;
  const parentLi = button.closest("li.userAccount__ads-list-item");
  const itemID = parentLi.dataset.id;

  allMyAds.map(el => {
    if (itemID === el._id) {
      const idxOfElement = allMyAds.indexOf(el);
      allMyAds.splice(idxOfElement, 1);
      parentLi.remove();
      services.deleteAdById(`${itemID}`, { headers: { Authorization: tokenUserAcc } })
    }
  });
}

