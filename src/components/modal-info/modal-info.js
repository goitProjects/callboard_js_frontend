import services from "../../services.js";
import template from "./modal-info.hbs";
import "./modal-info.css";

const mainTable = document.querySelector(".modal-info__modal");
const overlay = document.querySelector(".modal-info__overlay");
const ul = document.querySelector(".products");
const section = document.querySelector("section.products");
let fav = document.querySelector(".fav");

ul.addEventListener("click", handleClick, true);
overlay.addEventListener("click", handleOverlay);
document.addEventListener("keydown", handleKeyPress);

let svg;

// FETCHING DATA AND RENDERING 
async function handleClick(e) {
  ul.removeEventListener("click", handleClick, true);

  mainTable.innerHTML = "";
  const li = document.querySelector(".Card_cardItem");
  overlay.classList.add("show-modal");
  overlay.style.opacity = "1";
  overlay.style.display = "block";
  overlay.style.position = "fixed";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

  await services.getUserAds(li.dataset.id).then(res => {
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
    let icon = document.querySelector("#modal-info__favorite");
    icon.addEventListener("click", e => {
     
      if (!icon.classList.contains("js-fav")) {
        icon.classList.add("js-fav");

        fav.style.height = "16px";
        fav.style.width = "16px";
        console.log("click");
        fav.style.visibility = "visible";
    }

    services.addToFavorites(li.dataset.id).then(res=>console.log(res))

   
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
  });
}

// })

// FUNCTION FOR CLOSING MODAL
function closeModal(e) {
  overlay.classList.remove("show-modal");
  overlay.style = "none";
  section.style = "none";
  ul.addEventListener("click", handleClick, true);
  console.log("clicked");

  // ul.addEventListener("click", handleClick, false);
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
