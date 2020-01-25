import services from '../../services';
import modalTemplate from './modal-template.hbs';
import './modal-styles.css';
import PNotify from 'pnotify/dist/es/PNotify';
import '../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

const btnAddPromoItem =document.querySelector(".navigation-promo");
const token = (localStorage.getItem('token')||[]);
if(token.length<1){
  document.querySelector("header").addEventListener("click",needLogin);
  function needLogin(e){
    if(e.target.classList=="navigation-promo"){
PNotify.error({
      title: 'Oops!',
      text: 'You need to go to your personal account to add an advertisement',})
    setTimeout(PNotify.closeAll(), 100);
 }
  }
}else{
//Getting category names for selector in modal window (o4eNb ToPmo3it)
let categories = [];
btnAddPromoItem.style.disabled ="false";
const getCategories = async () => {
  const response = await services.getAllAds();
  const categories = response.categories;
  return categories;
};
getCategories()
  .then(cat => categories = cat.map(name => name));


//Post Ad to server
async function postAd(name, photos = [], desc, cat = 1, price, phone) {
  
  const getinfodate = {
    images: photos,
    title: name,
    category: cat,
    price: price,
    phone: phone,
    description: desc
  };
await services.postAddNewAd(getinfodate,{headers: {Authorization: token}}).then(console.log);
};

//Main function
 const createNewAd = () => {
  const body = document.querySelector('body');

  //Add modal window to DOM from handlebars template
  const createModal = async () => {
    const markup = await modalTemplate(categories);
    body.insertAdjacentHTML('afterbegin', markup);
  }

  //Add listeners in modal after creating window
  const addModalListeners = () => {
    const modal = {
      window: document.querySelector('.modal-create-ad'),
      overlay: document.querySelector('.modal-create-ad__overlay'),
      close: document.querySelector('.modal-create-ad__btn-close'),
      submit: document.querySelector('.modal-create-ad__submit')
    };
    const input = {
      name: document.querySelector('.modal-create-ad__input-name'),
      // photo: document.querySelector('.modal-create-ad__input-upload-photos'),
      photo: document.querySelector('input[type=file]'),
      description: document.querySelector(
        '.modal-create-ad__input-description'
      ),
      category: document.querySelector('.modal-create-ad__select-category'),
      price: document.querySelector('.modal-create-ad__input-price'),
      phone: document.querySelector('.modal-create-ad__input-phone')
    };

    //Closing modal 
    const closeModal = () => {
      modal.window.remove();
      modal.submit.removeEventListener('click', postAd);
      modal.close.removeEventListener('click', closeModal);
      modal.overlay.removeEventListener('click', closeOnOverlay);
      document.removeEventListener('keydown', closeOnEcs);
    };

    const closeOnOverlay = () => {
      closeModal();
    };

    const closeOnEcs = () => {
      if (event.code == 'Escape') {
        closeModal();
      }
    };


function toDataURL(src, callback) {
  let xhttp = new XMLHttpRequest();

  xhttp.onload = function() {
    let fileReader = new FileReader();
    fileReader.onloadend = function() {
      callback(fileReader.result);
    };
    fileReader.readAsDataURL(xhttp.response);
  };
  xhttp.responseType = "blob";
  xhttp.open("GET", src, true);
  xhttp.send();
}

function addImage() {
  toDataURL(input.photo.files, function(dataURL) {
    return dataURL;
   
  });
}




    //Verificating the form and sending to server
    const verifyAndPostAd = (e) => {

        //  addImage();


      switch (true) {
        case input.name.value == '':
          PNotify.error({
            title: 'Ошибка!',
            text: 'Введите название товара.'
          });
          break;

        case input.description.value == '':
          PNotify.error({
            title: 'Ошибка!',
            text: 'Введите описание товара.'
          });
          break;

        case input.price.value == '':
          PNotify.error({
            title: 'Ошибка!',
            text: 'Введите цену товара.'
          });
          break;

        case input.phone.value == '':
          PNotify.error({
            title: 'Ошибка!',
            text: 'Введите номер телефона.'
          });
          break;

        default:
          postAd(input.name.value, [], input.description.value, 1, input.price.value, input.phone.value);
          break;
      }
    };

    modal.submit.addEventListener('click', verifyAndPostAd);
    modal.close.addEventListener('click', closeModal);
    modal.overlay.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeOnEcs);
  }
  createModal().then(addModalListeners);
};

services.ref.btnAddPromo.addEventListener('click', createNewAd);
}
  
