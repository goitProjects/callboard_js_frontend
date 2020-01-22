import services from '../../services';
import modalTemplate from './modal-template.hbs';
import './modal-styles.css';
import PNotify from 'pnotify/dist/es/PNotify';
import '../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

let categories = [];

const getCategories = async () => {
  const response = await services.getAllAds();
  const categories = response.categories;
  return categories;
}
getCategories().then(cat => {
  categories = cat.map(id => id);
  console.log(categories);
});


export const createNewAd = () => {

  const body = document.querySelector('body');
  

  const createModal = () => {


    const markup = modalTemplate(categories);
    body.insertAdjacentHTML('afterbegin', markup);

    setTimeout(() => {
      const modal = {
        window: document.querySelector('.modal-create-ad__window'),
        overlay: document.querySelector('.modal-create-ad__overlay'),
        close: document.querySelector('.btn-close'),
        submit: document.querySelector('.modal-create-ad__submit')
      };
      const input = {
        name: document.querySelector('.modal-create-ad__input-name'),
        photo: document.querySelector('.modal-create-ad__input-upload-photos'),
        description: document.querySelector('.modal-create-ad__input-description'),
        category: document.querySelector('.modal-create-ad__select-category'),
        price: document.querySelector('.modal-create-ad__input-price'),
        phone: document.querySelector('.modal-create-ad__input-phone')
      };

      const closeModal = () => {
        modal.window.classList.toggle('closed');
        modal.overlay.classList.toggle('closed');
        //services.ref.btnAddPromo.addEventListener('click', createModal);
      };

      const closeOnOverlay = () => {
        modal.window.classList.toggle('closed');
        modal.overlay.classList.toggle('closed');

      }

      const closeOnEcs = _ => {
        if (event.code == "Escape") {
          modal.window.classList.toggle('closed');
          modal.overlay.classList.toggle('closed');
        }
      };

      const postAd = () => {
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
            console.log(`
            name: ${input.name.value}
            desc: ${input.description.value} 
            category: ${input.category.value} 
            price: ${input.price.value} 
            phone: ${input.phone.value} 
            
          `);
            break;
        }
      };

      modal.submit.addEventListener('click', postAd);
      modal.close.addEventListener('click', closeModal);
      modal.overlay.addEventListener('click', closeOnOverlay);
      modal.overlay.addEventListener('click', closeOnOverlay);
      document.addEventListener("keydown", closeOnEcs);
    }, 100);
  };

  services.ref.btnAddPromo.addEventListener('click', createModal);
};


createNewAd();




//const postAd = () => {
//console.log('submit btn');
// services
//   .postLoginUser({ email: 'em@ss.ua', password: '111111' })
//   .then(console.log);
// services
//   .postAddNewAd(
//     {
//       images: [],
//       title: '  ',
//       category: 1,
//       price: 1000,
//       phone: '+380000000000',
//       description: 'Lorem Ipsum pooooooop of the printing and typesetting'
//     },
//     {
//       headers: {
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjViZWE2MmFhNzhiNjUxNzdmZjUwMCIsImlhdCI6MTU3OTUzNDkzOX0._ZUC5CkNlmkqFcADbOMECx65yUCYCLNUwV37Q36466k'
//       }
//     }
//   )
//   .then(console.log);
//};
