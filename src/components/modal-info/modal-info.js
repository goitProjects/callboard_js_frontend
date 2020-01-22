import services from "../../services.js";
import template from "./modal-info.hbs";
import "./modal-info.css";

const mainTable = document.querySelector(".modal-info__modal");
const overlay = document.querySelector(".modal-info__overlay");
const ul = document.querySelector(".products");
const section=document.querySelector('section.products')
const divMain=document.querySelector('.mainTable')
const body=document.querySelector('body');
let fav=document.querySelector('.fav');



ul.addEventListener("click", handleClick);
section.addEventListener("click", handleOverlay);
document.addEventListener("keydown", handleKeyPress);

let svg;
async function handleClick(e) {
  
  const li = document.querySelector(".Card_cardItem");
  overlay.classList.add("show-modal");
  overlay.style.opacity= "1";
  overlay.style.display= "block";
  overlay.style.position= "fixed";
  overlay.style.display= "flex";
  overlay.style.justifyContent= "center";
  overlay.style.alignItems= "center";

  section.style.backgroundColor= "rgba(0, 0, 0, 0.5)";
  overlay.style.width= "100vw";
  overlay.style.height= "100vh";

  
  ul.removeEventListener("click", handleClick);
 
    await services.getUserAds(li.dataset.id).then(res => {
      show(res.data.goal);

      let button = document.querySelector(".modal-info__buy-button");
  
      let link = document.querySelector(".modal-info__link");
     
      button.addEventListener("click", e => {
        e.target.style.color = "#ff6b08";
        e.target.style.fontSize = "18px";
        link.href = "tel:${res.data.goal.phone}";
        e.target.innerText = res.data.goal.phone;
        button.style.backgroundColor = "#fff";
        button.style.border = "2px solid #ff6b08";
      });

      let closingBtn = document.querySelector(".modal-info__left-mobile-arrow");
      closingBtn.addEventListener("click", e => {
        closeModal();
      });

     
      let icon = document.querySelector("#modal-info__favorite");
      icon.addEventListener("click", e => {
        
        icon.classList.add('js-fav');
        fav.style.visibility="visible";
     
        fav.style.height = "16px";
        fav.style.width = "16px";

      });
     
      // icon.setAttribute('id', 'modal-info__favorite')
    });
    
  }
  
  // })


function closeModal(e) {
  overlay.classList.remove("show-modal");
  overlay.style='none';
  section.style='none';
  console.log('clicked')
  // ul.addEventListener("click", handleClick);
}

function handleKeyPress(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}

function handleOverlay(e) {
  if (e.target !== e.currentTarget) {
 return 
  }
  
  closeModal();
 
 
}

function show(itm) {
  insertItems(createListMarkup(itm));
}

function insertItems(item) {
  mainTable.insertAdjacentHTML("beforeend", item);
}

function createListMarkup(items) {
  return template(items);
}
