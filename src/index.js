import "./components/startPage";
import services from "./services";
import template from "./template/templates.hbs";
import axios from "axios";
import css from "./css/styles.css";

const wrap = document.querySelector(".wrapper");
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const mainButton=document.querySelector('.btn');

mainButton.addEventListener("click", handleClick);
overlay.addEventListener("click", handleOverlay);
document.addEventListener("keydown", handleKeyPress);

let svg;
async function handleClick(e) {
  e.preventDefault();
  container.classList.add("show-modal");
  mainButton.removeEventListener("click", handleClick);

  // console.log("start");
 
  await services.getAdsByCategory(3, 5).then(res => {
    show(res.data.ads.docs.find(el => el));
    // show(res.data.ads.docs[1]);
    let button = document.querySelector(".buy-button");
    let link=document.querySelector('.link');

    button.addEventListener("click", e => {
     
      e.target.style.color = "white";
      e.target.style.fontSize='18px'
      link.href="tel:${res.data.ads.docs[0].phone}";
      e.target.innerText =res.data.ads.docs[0].phone;
    });

    let closingBtn = document.querySelector(".left-mobile-arrow");
    closingBtn.addEventListener('click', (e)=>{
        closeModal();
    })
   
      let icon = document.querySelector(".favorite");
      icon.addEventListener("click", e => {
        svg=document.getElementById("favorite");
        // icon.replace(icon, 'svg');
        wrap.parentNode.replaceChild(svg, icon);
        // wrap=svg.parentNode;
        // console.log(icon)
  
        
        // icon.classList.remove("favorite");
        // icon.setAttribute('id', 'favorite')
        // icon = svg;
        // icon.style.fill="red"
      });
   
    
  });

}
// mainButton.addEventListener("click", handleClick);

function closeModal(e) {

  container.classList.remove("show-modal");


  
}

function handleKeyPress(e){
  if(e.code==='Escape'){
    container.classList.remove("show-modal");
  
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
  wrap.insertAdjacentHTML("beforeend", item);
}

function createListMarkup(items) {
  return template(items);
}
import "./components/default-page/default-page";
