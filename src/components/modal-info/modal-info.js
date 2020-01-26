import services from "../../services.js";
import template from "./modal-info.hbs";
import "./modal-info.css";
import PNotify_1 from "pnotify/dist/es/PNotify";

const mainTable = document.querySelector(".modal-info__modal");
const overlay = document.querySelector(".modal-info__overlay");
const section = document.querySelector(".products");
section.addEventListener("click", handleClick, true);
overlay.addEventListener("click", handleOverlay);
document.addEventListener("keydown", handleKeyPress);

let svg;
localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
);
const tmp = localStorage.getItem("token");

// FETCHING DATA AND RENDERING
async function handleClick(e) {
  const liItem = document.querySelector(".Card_cardItem");

  let svgHeart = document.querySelector(".heart");

  let img = document.querySelector(".Card_img");
  if (
    !e.target.closest(".Card_cardItem") ||
    e.currentTarget.className == "Card_cardItem" ||
    e.currentTarget.className == "favorites-top" ||
    e.target.closest(".fav2") ||  e.target.closest('.fav3')||
    e.currentTarget.className == ".Card_img"
  ) {
    return;
  } else {
    section.removeEventListener("click", handleClick, true);
    mainTable.innerHTML = "";
    document.querySelector("body").style.overflow = "hidden";
    overlay.classList.add("show-modal");
    overlay.style.opacity = "1";
    overlay.style.display = "block";
    overlay.style.position = "fixed";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999";

    await services
      .getUserAds(e.target.closest(".Card_cardItem").dataset.id)
      .then(res => {
        show(res.data.goal);

        let button = document.querySelector(".modal-info__buy-button");

        let link = document.querySelector(".modal-info__link");
        let fav = document.querySelector(".fav");

        // BUTTON FOR SHOWING NUMBER
        button.addEventListener("click", e => {
          e.target.style.color = "#ff6b08";
          e.target.style.fontSize = "18px";
          link.href = "tel:${res.data.goal.phone}";
          e.target.innerText = res.data.goal.phone;
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

        if (tmp) {
          getFavoritesList();
        } else {
          icon.classList.remove("js-fav");
          fav.style.visibility = "hidden";
        }
      });
  }
}

// favBtn.addEventListener('click', onFav);
// document.body.addEventListener("click", onFav);
// async function onFav(e) {
//   const fav2 = document.querySelector(".fav2");
//   const fav3 = document.querySelector(".fav3");
//   let iconBtn = document.querySelector(".favorites-top");

//   if (tmp) {
//     getFav();
//   } else {
//     iconBtn.classList.add('fav3')
//     fav2.style.visibility = "hidden";
//   }
// }

// FUNCTION FOR ASYNC FETCHING AND EXECUTING
async function getFavoritesList(e) {
  let fav = document.querySelector(".fav");
  const liItem = document.querySelector(".Card_cardItem");
  let icon = document.querySelector("#modal-info__favorite");

  await services
    .getFavorites({
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
      }
    })
    .then(res => {
      if (
        res.data.user.favorites.map(el => el._id).includes(liItem.dataset.id)
      ) {
        icon.classList.add("js-fav");
        fav.style.height = "16px";
        fav.style.width = "16px";
        fav.style.visibility = "visible";

        PNotify_1.notice("Product already added to your favorites!");
        fav.addEventListener("click", deletelFavoritIcon);
      } else {
        icon.addEventListener("click", addToFavorite);
      }
    });
}

// FUNCTION FOR ASYNC FETCHING AND REMOVING FAVORITES
async function deletelFavoritIcon(e) {
  let fav = document.querySelector(".fav");
  const liItem = document.querySelector(".Card_cardItem");
  let icon = document.querySelector("#modal-info__favorite");
  fav.removeEventListener("click", deletelFavoritIcon);

  await services
    .deleteFavorites(liItem.dataset.id, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
      }
    })
    .then(res => {
      icon.classList.remove("js-fav");
      icon.style.visibility = "visible";
      fav.style.visibility = "hidden";
    });
  PNotify_1.info("Deleted from favorites!");
}

// FUNCTION FOR ASYNC FETCHING AND ADDING TO FAVORITES
async function addToFavorite(e) {
  let fav = document.querySelector(".fav");
  const liItem = document.querySelector(".Card_cardItem");
  let icon = document.querySelector("#modal-info__favorite");

  icon.removeEventListener("click", addToFavorite);

  fav.style.visibility = "hidden";
  icon.style.visibility = "visible";

  await services
    .addToFavorites(
      liItem.dataset.id,
      {},
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
        }
      }
    )
    .then(res => {
      icon.style.visibility = "hidden";
      fav.style.visibility = "visible";
      fav.style.height = "16px";
      fav.style.width = "16px";
    });
  PNotify_1.success("Added to favorites!");
}







// async function getFav(e) {
//   let fav2 = document.querySelector(".fav2");
//   let fav3 = document.querySelector(".fav3");
//   const liItem = document.querySelector(".Card_cardItem");
//   let iconBtn = document.querySelector(".favorites-top");

//   await services
//     .getFavorites({
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
//       }
//     })
//     .then(res => {
//       if (
//         res.data.user.favorites.map(el => el._id).includes(liItem.dataset.id)
//       ) {
//         iconBtn.style.visibility='hidden';
//         iconBtn.style.stroke='red'
//         fav2.style.height = "20px";
//         fav2.style.fill='red';
//         fav2.style.width = "18px";
//         fav2.style.visibility = "visible";
       

//         PNotify_1.notice("Product already added to your favorites!");
//         fav2.addEventListener("click", deleteFav);
//       } else {
//         iconBtn.addEventListener("click", addFav);
//       }
//     });
// }



// async function deleteFav(e) {
//   let fav2 = document.querySelector(".fav2");
//   let fav3 = document.querySelector(".fav3");

//   const liItem = document.querySelector(".Card_cardItem");
//   let iconBtn = document.querySelector(".favorites-top");
//   fav2.removeEventListener("click", deleteFav);

//   await services
//     .deleteFavorites(liItem.dataset.id, {
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
//       }
//     })
//     .then(res => {
//       iconBtn.classList.add('fav3');
//       fav2.style.visibility = "hidden";
//       fav2.style.fill='white';
//       fav3.visibility='visible';
      
//     });
//   PNotify_1.info("Deleted from favorites!");
// }


// async function addFav(e) {
//   let fav2 = document.querySelector(".fav2");
//   let fav3 = document.querySelector(".fav3");
//   const liItem = document.querySelector(".Card_cardItem");
//   let iconBtn = document.querySelector("#modal-info__favorite");

//   iconBtn.removeEventListener("click", addFav);

//   fav2.style.visibility = "hidden";
//   iconBtn.classList.add('fav3');
//   fav3.style.visibility='visible'
//   fav3.style.fill='blue'

//   await services
//     .addToFavorites(
//       liItem.dataset.id,
//       {},
//       {
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
//         }
//       }
//     )
//     .then(res => {
//       fav3.style.visibility = "hidden";
//       fav2.style.visibility = "visible";
//       fav2.style.height = "16px";
//       fav2.style.width = "16px";
//     });
//   PNotify_1.success("Added to favorites!");
// }






// FUNCTION FOR CLOSING MODAL
function closeModal(e) {
  overlay.classList.remove("show-modal");
  PNotify_1.closeAll();
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
