import services from "../../services.js";
import template from "./modal-info.hbs";
import "./modal-info.css";
import PNotify_1 from "pnotify/dist/es/PNotify";
import PNotifyMobile from "pnotify/dist/es/PNotifyMobile";

const mainTable = document.querySelector(".modal-info__modal");
const overlay = document.querySelector(".modal-info__overlay");
const section = document.querySelector(".products");
section.addEventListener("click", handleClick, true);
overlay.addEventListener("click", handleOverlay);
document.addEventListener("keydown", handleKeyPress);


let openLiItem;
let svg;
// localStorage.setItem(
//   "token",
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
// );
let tmp = localStorage.getItem("token") ||[];

// FETCHING DATA AND RENDERING
async function handleClick(e) {
  
  const liItem = document.querySelector(".Card_cardItem");

  let svgHeart = document.querySelector(".heart");

  let img = document.querySelector(".Card_img");
  if (
    !e.target.closest(".Card_cardItem") ||
    e.currentTarget.className == "Card_cardItem" ||
    e.currentTarget.className == ".Card_img"
  ) {
    return;
  } else {
    document.querySelector("body").style.overflow = "hidden";
    section.removeEventListener("click", handleClick, true);

    mainTable.innerHTML = "";
    overlay.classList.add("show-modal");

    overlay.style.opacity = "1";
    overlay.style.display = "block";
    overlay.style.position = "fixed";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999";
    openLiItem = e.target.closest(".Card_cardItem").dataset.id;
    await services
      .getUserAds(e.target.closest(".Card_cardItem").dataset.id)
      .then(res => {
        show(res.data.goal);

        let button = document.querySelector(".modal-info__buy-button");

        let link = document.querySelector(".modal-info__link");
        let fav = document.querySelector(".fav");
        let span = button.querySelector("span");
        // BUTTON FOR SHOWING NUMBER

        button.addEventListener("click", e => {
          e.stopImmediatePropagation();
          e.target.style.color = "#ff6b08";
          e.target.style.fontSize = "18px";
          link.href = "tel:${res.data.goal.phone}";
          span.innerText = "";
          link.textContent = `${res.data.goal.phone}`;
          link.style.color = "#ff6b08";

          button.style.backgroundColor = "#fff";
          button.style.border = "2px solid #ff6b08";
        });

        // BUTTON FOR CLOSING WINDOW
        let closingBtn = document.querySelector(
          ".modal-info__left-mobile-arrow"
        );
        closingBtn.addEventListener("click", e => {
          closeModal();
        });

        // BUTTON FOR ADDING TO FAVORITES
        let icon = document.querySelector("#modal-info__favorite");
         tmp = localStorage.getItem("token") ||[];
        if (tmp.length>1) {
          getFavoritesList();
        } 
        else {
          handleAddingIfNotLoggedIn();
          setTimeout(e=>{
            PNotify_1.closeAll();
          }, 2000);
          icon.classList.remove("js-fav");
          fav.style.visibility = "hidden";
        }
      });
  }
}

function handleAddingIfNotLoggedIn(){
  let icon = document.querySelector("#modal-info__favorite");
  icon.addEventListener('click',  e =>{
    let pnotify=PNotify_1.error({
    text: "You need to go to your personal account to add to favorites!",
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
})
pnotify.on('click', function(){
  pnotify.close()
});

setTimeout(e=>{
  PNotify_1.closeAll()
},2000)
})
}

// FUNCTION FOR ASYNC FETCHING AND EXECUTING
async function getFavoritesList(e) {
  let fav = document.querySelector(".fav");
  let icon = document.querySelector("#modal-info__favorite");

  await services
    .getFavorites({
      headers: {
        Authorization: tmp
      }
    })
    .then(res => {
      if (
        res.data.user.favorites.map(el => el._id).includes(openLiItem)

      ) {
        icon.classList.add("js-fav");
        fav.style.height = "16px";
        fav.style.width = "16px";
        fav.style.visibility = "visible";

        let pnot=PNotify_1.notice({
          text: "Product already added to your favorites!",
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
        pnot.on('click', function(){
          pnot.close()
        });

        setTimeout(e=>{
          PNotify_1.closeAll()
        },2000)
      } 
      else {

        icon.addEventListener("click", addToFavorite);
      }
    });
}

// FUNCTION FOR ASYNC FETCHING AND ADDING TO FAVORITES
async function addToFavorite(e) {
  let fav = document.querySelector(".fav");
  let icon = document.querySelector("#modal-info__favorite");

  icon.removeEventListener("click", addToFavorite);

  fav.style.visibility = "hidden";
  icon.style.visibility = "visible";

  await services
    .addToFavorites(
      openLiItem,
      {},
      {
        headers: {
          Authorization: tmp
        }
      }
    )
    .then(res => {
      icon.style.visibility = "hidden";
      fav.style.visibility = "visible";
      fav.style.height = "16px";
      fav.style.width = "16px";
    });

   let pn=PNotify_1.success({
    text: "Added to favorites!",
    modules: {
      Mobile: {
        swipeDismiss: true,
        styling: true,
        width: "50px"
      },
      Desktop: {
        desktop: false,
        fallback: true,
    }
    }
  });
  pn.on('click', function(){
    pn.close()
  })
  setTimeout(e=>{
   PNotify_1.closeAll()
  },2000);

}

// FUNCTION FOR CLOSING MODAL
function closeModal(e) {
  overlay.classList.remove("show-modal");
  // setTimeout(e=>{
  //   PNotify_1.closeAll()
  // }, 2000)
  
  overlay.style = "none";
  document.querySelector("body").style.overflow = "auto"; 
  section.addEventListener("click", handleClick, true);
}

// FUNCTION FOR CLOSING MODAL BY PRESSING 'ESCAPE'
function handleKeyPress(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}

// FUNCTION FOR CLOSING MODAL BY CLICKING OUTSIDE THE MODAL
function handleOverlay(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
}

// FUNCTIONS FOR CREATING AND INSERTING MARKUP TEMPLATE
function show(itm) {
  insertItems(createListMarkup(itm));
}

function insertItems(item) {
  mainTable.insertAdjacentHTML("beforeend", item);
}

function createListMarkup(items) {
  return template(items);
}