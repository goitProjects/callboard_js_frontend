import favHbs from "./userAccount_fav.hbs";
import addsHbs from "./userAccount_add.hbs";
import "./userAccount.css";
import services from "./../../services";
import PNotify_1 from "pnotify/dist/es/PNotify";
import PNotifyMobile from "pnotify/dist/es/PNotifyMobile";

let allFavAds = [];
let allMyAds = [];

const refs = {
  userAccount__overlay: document.querySelector(".userAccount__overlay"),
  showUserAccountButton: document.querySelector(".js-show-user-account")
};

let tokenUserAcc ;


document.addEventListener("click", handleCLickOpenModalAcc);
window.addEventListener("click", modalCloseByWindowClick);

function modalCloseByWindowClick(event) {
  if (event.target == refs.userAccount__overlay) {
    refs.userAccount__overlay.style.display = "none";
    document.querySelector("body").style.overflow = "auto";
  }
}

function handleCLickOpenModalAcc(e) {
  tokenUserAcc=localStorage.getItem("token")||[];
  if(tokenUserAcc<1){return}
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
        // const addDelBtn = document.createElement("button");
        listFav.innerHTML="";
        // allFavAds.forEach(el => {
          // itemFav.className = "userAccount__favorite-list-item";
          // itemFav.dataset.id = el._id;
          // listFav.appendChild(itemFav);
          listFav.innerHTML= favHbs(allFavAds);
          // addDelBtn.className = "useracc__del-btn";

          // addDelBtn.innerHTML = "&times;";
          // addDelBtn.dataset.id = el._id;
          // itemFav.appendChild(addDelBtn);
          const body = document.querySelector("body");
          body.addEventListener("click", deleteFavAd);
        // });
      });


    // ------------------------------------- Мои объявления

      services
      .getAdsUser({ headers: { Authorization: tokenUserAcc } })
      .then(res => {
        allMyAds = res.data.ads;
        const listMyAds = document.querySelector(".userAccount__ads-list");

        if(res.data.ads.length>0){
          // const itemMyAds = document.createElement("li");
        listMyAds.innerHTML="";
        // allMyAds.map(el => {
          // itemMyAds.className = "userAccount__ads-list-item";
          // itemMyAds.dataset.id = el._id;
          // listMyAds.appendChild(itemMyAds);
          listMyAds.innerHTML = addsHbs(allMyAds);
          // const addDelBtn = document.createElement("button");
          // addDelBtn.className = "useracc__del-btn";
          // addDelBtn.innerHTML = "&times;";
          // addDelBtn.dataset.id = el._id;
            // itemMyAds.appendChild(addDelBtn);
          document.querySelector("body").addEventListener("click", deleteMyAd);
        }
        else{
          listMyAds.innerHTML=`<p class="text">Список оголошень порожній. Додайте!</p>`
        }
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
  if (e.target.classList=="useracc__del-btn"){ ;
  const button = e.target;
  const parentLi = button.closest("li.userAccount__favorite-list-item");
  const itemID = e.target.dataset.id;

  allFavAds.map(el => {
    if (itemID === el._id) {
      const idxOfElement = allFavAds.indexOf(el);
      allFavAds.splice(idxOfElement, 1);
      
      let pnSuccessFav=PNotify_1.success({
        text: "Deleted from favorites!",
        modules: {
          Mobile: {
            swipeDismiss: true,
            styling: true
          },
          Desktop: {
            desktop: false,
            fallback: true,
        }
      }
    });
    pnSuccessFav.on('click', function(){
      pnSuccessFav.close()
    });
    
    setTimeout(e=>{
      PNotify_1.closeAll()
    },2000)

      parentLi.remove();
      services.deleteFavorites(`${itemID}`, { headers: { Authorization: tokenUserAcc } })
    }
  });

}
}

function deleteMyAd(e) {
  if (e.target.classList=="useracc__del-btn") {
  const button = e.target;
  const parentLi = button.closest("li.userAccount__ads-list-item");
  const itemID = e.target.dataset.id;

  allMyAds.map(el => {
    if (itemID === el._id) {
      const idxOfElement = allMyAds.indexOf(el);
      allMyAds.splice(idxOfElement, 1);
      let pnSuccessAds=PNotify_1.success({
        text: "Deleted from ads!",
        modules: {
          Mobile: {
            swipeDismiss: true,
            styling: true
          },
          Desktop: {
            desktop: false,
            fallback: true,
        }
      }
    });
    pnSuccessAds.on('click', function(){
      pnSuccessAds.close()
    });
    
    setTimeout(e=>{
      PNotify_1.closeAll()
    },2000)

      parentLi.remove();
      services.deleteAdById(`${itemID}`, { headers: { Authorization: tokenUserAcc } })
    }
  })

}
  }
