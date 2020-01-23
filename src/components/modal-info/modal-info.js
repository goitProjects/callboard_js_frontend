import services from "../../services.js";
import template from "./modal-info.hbs";
import "./modal-info.css";

const mainTable = document.querySelector(".modal-info__modal");
const overlay = document.querySelector(".modal-info__overlay");
const ul = document.querySelector(".products");
const section = document.querySelector("section.products");
let fav = document.querySelector(".fav");
const list = document.querySelector("ul#search_list");


ul.addEventListener("click", handleClick, true);
overlay.addEventListener("click", handleOverlay);
document.addEventListener("keydown", handleKeyPress);

let svg;

// FETCHING DATA AND RENDERING
async function handleClick(e) {
 
  const liItem = document.querySelector(".Card_cardItem");
  ul.removeEventListener("click", handleClick, true);
  if(!e.target.closest('.Card_cardItem') || e.currentTarget.className === 'Card_cardItem'){
    return
  }
  
  // const liItem = document.querySelector(".Card_cardItem");
  // ul.removeEventListener("click", handleClick, true);

  // if(e.target.closest("Li")===liItem){
  //   console.log('fwf')
  //   // overlay.classList.remove("show-modal");
    
  // }
else{
  mainTable.innerHTML = "";
 
  // liItem.addEventListener("click", handleClick, true);
  overlay.classList.add("show-modal");
  overlay.style.opacity = "1";
  overlay.style.display = "block";
  overlay.style.position = "fixed";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "999";

  await services.getUserAds(e.target.closest(".Card_cardItem").dataset.id).then(res => {
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
    let closingBtn = document.querySelector(".modal-info__left-mobile-arrow");
    closingBtn.addEventListener("click", e => {
      closeModal();
    });

    // BUTTON FOR ADDING TO FAVORITES
    // let icon = document.querySelector("#modal-info__favorite");
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


const body=document.querySelector('body');
body.addEventListener('click', addFavorite )


async function addFavorite(e) {
 
  let icon = document.querySelector("#modal-info__favorite");
  const li = document.querySelector(".Card_cardItem");
    
  if(icon){
    icon.addEventListener("click", e => {
      if(!e.target.classList.contains("js-fav")){
        icon.classList.add("js-fav");
  
          fav.style.height = "16px";
          fav.style.width = "16px";
          fav.style.visibility = "visible";
          services.addToFavorites(li.dataset.id, {}, { headers:  { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log);
        }
      
       
      // if (!e.target.classList.contains("js-fav")) {
      //   icon.classList.add("js-fav");

      //   fav.style.height = "16px";
      //   fav.style.width = "16px";
      //   console.log("click");
      //   fav.style.visibility = "visible";
      //   services.addToFavorites(li.dataset.id, {}, { headers:  { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log);
      // }

    
    
  
     else if(e.target.classList.contains("js-fav")){
        icon.classList.remove("js-fav");
        fav.style.visibility="hidden";
      icon.style.visibility="visible";
      services.deleteFavorites("5e27012306c82737fc27f69f", { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log)
      }
    });
  }
}

    // const li = document.querySelector(".Card_cardItem");
    // console.log(li.dataset.id)

  // services.addToFavorites(li.dataset.id, {}, { headers:  { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log)
//  services.getFavorites({ headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log)
//  services.deleteFavorites("5e27012306c82737fc27f69f", { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjU4NjY3MDZjODI3MzdmYzI3ZjY0ZSIsImlhdCI6MTU3OTc5NDU3NX0.UFCcUUw7UEESSQVnLAc9io5hsu1tQXFA6dY0peYafD8" }}).then(console.log)
// })



// FUNCTION FOR CLOSING MODAL
function closeModal(e) {
  overlay.classList.remove("show-modal");
  overlay.style = "none";
  section.style = "none";
  ul.addEventListener("click", handleClick, true);
  console.log("clicked");
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
