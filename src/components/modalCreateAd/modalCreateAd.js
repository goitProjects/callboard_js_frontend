import services from '../../services';
import modalTemplate from './modal-template.hbs';
import './modal-styles.css';
import PNotify from 'pnotify/dist/es/PNotify';
import '../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

//Getting category names for selector in modal window (o4eNb ToPmo3it)
async function getCategories() {
  const response = await services.getAllAds();
  const categories = response.categories;
  console.log(categories);
  return categories;
}

//Add modal window to DOM from handlebars template
let markup = '';
function createModal(cat) {
  markup = modalTemplate(cat);
}

//Creating Base64 from input image
let photos = [];
function addImage(e) {
  toDataURL(e.target).then(result => {
    photos.push(result);
  });
}

function toDataURL(inputElem) {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(inputElem.files[0]);
  });
}

//Posting Ad to server
async function postAd(getInputData) {
  const token = localStorage.getItem('token');


  console.log(getInputData);
  await services
    .postAddNewAd(getInputData, {
      headers: {
        Authorization: token
      }
    })
    .then(console.log);
}

//Main function
export const createNewAd = async () => {
  const body = document.querySelector('body');

  //console.log(categories);

  body.insertAdjacentHTML('afterbegin', markup);

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
      photo: document.querySelector('.modal-create-ad__input-upload-photos'),
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

    const verifyAndPostAd = () => {
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
          const dataFromInputs = {
            images: photos,
            title: input.name.value,
            category: parseInt(input.category.value, 10), //convert to num
            price: parseInt(input.price.value, 10),
            phone: input.phone.value,
            description: input.description.value
          };
          postAd(dataFromInputs);
          break;
      }
    };
    input.photo.addEventListener('change', addImage);
    modal.submit.addEventListener('click', verifyAndPostAd);
    modal.close.addEventListener('click', closeModal);
    modal.overlay.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeOnEcs);
  };
  addModalListeners();
};
getCategories().then(createModal);
services.ref.btnAddPromo.addEventListener('click', createNewAd);
