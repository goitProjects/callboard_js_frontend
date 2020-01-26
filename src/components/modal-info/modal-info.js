import services from "../../services.js";
import template from "./modal-info.hbs";
import "./modal-info.css";
import PNotify_1 from "pnotify/dist/es/PNotify";
// import PNotify from 'pnotify/src/PNotify.html';
// import PNotifyButtons from 'pnotify/src/PNotifyButtons.html';

const mainTable = document.querySelector(".modal-info__modal");
const overlay = document.querySelector(".modal-info__overlay");
const ul = document.querySelector(".products");
const section = document.querySelector("section.products");
let fav = document.querySelector(".fav");
let fav2 = document.querySelector(".fav2");
const list = document.querySelector("ul#search_list");
let favoriteBtn = document.querySelector(".favorites-top");

ul.addEventListener("click", handleClick, true);
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
  let img=document.querySelector('.Card_img');
  console.log("target:", e.target, "current:", e.currentTarget);
  if (
    !e.target.closest(".Card_cardItem") ||
    e.currentTarget.className === "Card_cardItem" ||
    e.currentTarget.className === "favorites-top" ||
    e.target.closest(".heart")
  ) {
    return;
  } else {
    ul.removeEventListener("click", handleClick, true);
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

        // BUTTON FOR SHOWING NUMBER
        button.addEventListener("click", e => {
          // e.preventDefault();
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

        console.log(favoriteBtn);
        // icon.addEventListener("click", e => {
        //services.getFavorites({headers: {Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"}}).then(console.log))

        if (tmp) {
          // icon.classList.add("js-fav");
          //         fav.style.height = "16px";
          //         fav.style.width = "16px";
          //         fav.style.visibility = "visible";
          // console.log('FUUUUUUUUUUUUUUUU!!!!!!!!!!!!!')
          services
            .getFavorites({
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
              }
            })
            .then(res => {
              if (
                res.data.user.favorites
                  .map(el => el._id)
                  .includes(liItem.dataset.id)
              ) {
                icon.classList.add("js-fav");
                fav.style.height = "16px";
                fav.style.width = "16px";
                fav.style.visibility = "visible";
                // favoriteBtn.classList.add('js-fav');
                // fav2.style.height = "16px";
                // fav2.style.width = "16px";
                // fav2.style.left = "50%";
                // fav2.style.visibility = "visible";

                const deletelFavoritIcon = e => {
                  fav.removeEventListener("click", deletelFavoritIcon);
                  // favoriteBtn.removeEventListener("click", deletelFavoritIcon);

                  services
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

                      console.log("yeeep", res.data.user.favorites);
                    });
                  PNotify_1.info("Deleted from favorites!");
                };

                fav.addEventListener("click", deletelFavoritIcon);
                // favoriteBtn.addEventListener("click", deletelFavoritIcon);
                // PNOTIFY
                PNotify_1.notice("Product already added to your favorites!");
              } else {
                const addToFavorite = e => {
                  icon.removeEventListener("click", addToFavorite);
                  // favoriteBtn.removeEventListener("click", addToFavorite);

                  fav.style.visibility = "hidden";
                  icon.style.visibility = "visible";
                  services
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

                      console.log("yeeep", res.data.user.favorites);
                    });
                  PNotify_1.success("Added to favorites!");

                  console.log("add");
                };
                icon.addEventListener("click", addToFavorite);
                // favoriteBtn.addEventListener("click", addToFavorite);
              }
            });
        } else {
          icon.classList.remove("js-fav");
          fav.style.visibility = "hidden";

          console.log("err");
        }

        // services
        //   .getFavorites({
        //     headers: {
        //       Authorization:
        //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
        //     }
        //   })
        //   .then(res => {
        //     if (res.data.user.favorites[0]._id.includes(liItem.dataset.id)) {
        //       fav.style.visibility = "hidden";
        //       icon.classList.remove("js-fav");
        //       console.log("err");
        //     }
        //   });

        //  console.log("that product already exists in your favorites!"))
        // icon.addEventListener("click", e => {
        //   if (!icon.classList.contains("js-fav")) {
        //     icon.classList.add("js-fav");

        //     fav.style.height = "16px";
        //     fav.style.width = "16px";
        //     console.log("click");
        //     fav.style.visibility = "visible";
        //   }

        // icon.classList.toggle('js-fav');
        // fav.style.visibility = "hidden";

        // icon.style.visibility = "visible";

        // icon.classList.remove('js-fav')

        //  icon.classList.remove('js-fav')

        //   else {
        //     icon.classList.toggle()
        //   fav.style.visibility="hidden";

        // icon.style.visibility="visible"
        //   }
      });
    // });
  }
}

// let favBtn = document.querySelector(".fav");
// favBtn.addEventListener('click', addFavorite);

// async function addFavorite(e) {
//   let icon = document.querySelector("#modal-info__favorite");
//   const liItem = document.querySelector(".Card_cardItem");
// icon.addEventListener("click", addFavorite);
// const li = document.querySelector(".Card_cardItem");
// localStorage.setItem('token', liItem.dataset.id)
//           services.addToFavorites(liItem.dataset.id, {},{
//          headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
//   }
// })

//   if (icon) {
//     if (tmp) {
//       // fav.style.visibility = "hidden";
//       // icon.classList.remove("js-fav");
//       // icon.style.visibility="visible"
//       services
//         .addToFavorites(
//           liItem.dataset.id,
//           {},
//           {
//             headers: {
//               Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
//             }
//           }
//         )
//         .then(console.log);
//       localStorage.setItem();
//     } else {
//       console.log("fsfefs");
//     }
//   }
// }

// let favBtn=document.querySelector('.fav');
// favBtn.addEventListener('click', deleteFavorite);

// async function deleteFavorite(e) {}

// if(icon){
// icon.addEventListener("click", handCLickOnIcon);
// function handCLickOnIcon (e){
//   console.log(0);
// services
//   .getFavorites({
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
//     }
//   })
// .then(
//   res => {
//     console.log(1);

// console.log(res.data.user.favorites.length);
// if (res.data.user.favorites[0]._id.includes(li.dataset.id)) {
//  console.log("that product already exists in your favorites!");
// }if(res.data.user.favorites.length>0){

//   }
//    else {
//     services
//       .addToFavorites(
//         li.dataset.id,
//         {},
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8"
//           }
//         }
//       )

//   }
// }
// console.log(
//   res.data.user.favorites.filter(el =>
//     console.log(el.id !== li.dataset.id)
//   )
// )
// );

// if (!e.target.classList.contains("js-fav")) {
//   icon.classList.add("js-fav");

//   fav.style.height = "16px";
//   fav.style.width = "16px";
//   fav.style.visibility = "visible";
//   icon.disabled = true;
//   // services.addToFavorites(li.dataset.id, {}, { headers:  { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log);
//   icon.disabled = false;

// if (!e.target.classList.contains("js-fav")) {
//   icon.classList.add("js-fav");

//   fav.style.height = "16px";
//   fav.style.width = "16px";
//   console.log("click");
//   fav.style.visibility = "visible";
//   services.addToFavorites(li.dataset.id, {}, { headers:  { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log);
// }

//  else){
//     icon.classList.remove("js-fav");
//     fav.style.visibility="hidden";
//   icon.style.visibility="visible";
//   services.deleteFavorites("5e27012306c82737fc27f69f", { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log)
//   }
// }
// };
// }

// const li = document.querySelector(".Card_cardItem");
// console.log(li.dataset.id)

// services.addToFavorites(li.dataset.id, {}, { headers:  { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log)
//  services.getFavorites({ headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log)
//  services.deleteFavorites("5e27012306c82737fc27f69f", { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log)
// })

// FUNCTION FOR CLOSING MODAL
function closeModal(e) {
  overlay.classList.remove("show-modal");
  PNotify_1.closeAll();
  overlay.style = "none";
  section.style = "none";
  document.querySelector("body").style.overflow = "auto";
  ul.addEventListener("click", handleClick, true);
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
