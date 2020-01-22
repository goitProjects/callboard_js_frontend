import services from "../../services.js";
import template from "./modal-info.hbs";
import "./modal-info.css";

const section=document.querySelector('section');
const container = section.querySelector(".mainContainer");
const wrapper = document.querySelector(".modal-info__wrapper");
const overlay = document.querySelector(".modal-info__overlay");
const div=container.querySelectorAll('div');
const li=document.getElementById('byId');
container.addEventListener("click", handleClick);
overlay.addEventListener("click", handleOverlay);
document.addEventListener("keydown", handleKeyPress);

let svg;
async function handleClick(e) {
  container.classList.add("show-modal");

  container.removeEventListener("click", handleClick);

 
  await services.getUserAds(e.target.dataset.id).then(res => {
  console.log(res)
    show(res.data.goal);
    let button = document.querySelector(".modal-info__buy-button");
    let link = document.querySelector(".modal-info__link");

    button.addEventListener("click", e => {
      e.target.style.color = "#ff6b08";
      e.target.style.fontSize = "18px";
      link.href = "tel:${res.data.goal.phone}";
      e.target.innerText = res.data.goal.phone;
      button.style.backgroundColor='#fff';
      button.style.border= '2px solid #ff6b08'

    });

    let closingBtn = document.querySelector(".modal-info__left-mobile-arrow");
    closingBtn.addEventListener("click", e => {
      closeModal();
    });

    let icon = document.getElementById("modal-info__favorite");
    icon.addEventListener("click", e => {
     container.style.backgroundImage="url('../../icons/heart/favorite-heart-button.svg/')";
     icon.style.width='18px';
     icon.style.height='18px';

     icon.style.fill='red'
    //  icon.style.stroke='red'
      // console.log(heart)
    });
      // svg = document.getElementById("favorite");
      // // icon.replace(icon, 'svg');
      // icon.parentNode.replaceChild(svg, icon);

      // icon.classList.remove("favorite");
      // icon.setAttribute('id', 'favorite')
      // icon = svg;
      // icon.style.fill="red"
    });
  // })

}


function closeModal(e) {
  container.classList.remove("show-modal");
  // container.addEventListener("click", handleClick);
}

function handleKeyPress(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}

function handleOverlay(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
}

function show(itm) {
  insertItems(createListMarkup(itm));
}

function insertItems(item) {
  wrapper.insertAdjacentHTML("beforeend", item);
}

function createListMarkup(items) {
  return template(items);
}