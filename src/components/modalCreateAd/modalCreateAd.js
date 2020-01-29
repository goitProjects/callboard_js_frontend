import services from '../../services';
import modalTemplate from './modal-template.hbs';
import './modal-styles.css';
import PNotify from 'pnotify/dist/es/PNotify';
import '../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotifyMobile from 'pnotify/dist/es/PNotifyMobile';

// START - Делаем проверку вьюпорта, чтобы отрисовать кнопку добавления новго объявления
const domDivForBtnNewAddDesktop = document.querySelector(".addnewad_desktop");
const domDivForBtnNewAddMobile = document.querySelector(".addnewad_mobile");
if (window.innerWidth < 1200) {
  domDivForBtnNewAddDesktop.style = "display: none";
  domDivForBtnNewAddMobile.style = "display: block";
} else {
  domDivForBtnNewAddDesktop.style = "display: block";
  domDivForBtnNewAddMobile.style = "display: none";
}
// END - Делаем проверку вьюпорта, чтобы отрисовать кнопку добавления новго объявления


const tokenLoad = localStorage.getItem('token') || [];
if (tokenLoad.length < 1) {
  document.querySelector(".navigation-promo").addEventListener("click", needLogin);
  function needLogin(e) {
    if (e.target.classList == 'navigation-promo') {
      PNotify.error({
        title: 'Oops!',
        text: 'You need to go to your personal account to add an advertisement'
      });
    }
    setTimeout(closePhotyfy,1000);
    function closePhotyfy(){
    PNotify.closeAll()}
     }
}else{
  //Getting category names for selector in modal window (o4eNb ToPmo3it)
  async function getCategories() {
    // const response = await services.getAllAds();
    // console.log(response.categories)
    const categories = [{_id: 3, category: "Робота"},{_id: 2, category: "Транспорт"},{_id: 4, category: "Електроніка"},{_id: 5, category: "Бізнес та послуги"},{_id: 7, category: "Віддам безкоштовно"},{_id: 8, category: "Обмін"},{_id: 6, category: "Відпочинок і спорт"},{_id: 1, category: "Нерухомість"},];
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

  //Main function
  const createNewAd = async (e) => {
    const Tokenlogin = localStorage.getItem('token') || [];
    if(Tokenlogin.length>1 && e.target.classList== "navigation-promo"){

    const body = document.querySelector('body');

    //console.log(categories);

    body.insertAdjacentHTML('afterbegin', markup);

    //Add listeners in modal after creating window
    const addModalListeners = () => {
      document.querySelector("body").style.overflow = "hidden";
      const modal = {
        window: document.querySelector('.modal-create-ad'),
        overlay: document.querySelector('.modal-create-ad__overlay'),
        close: document.querySelector('.modal-create-ad__btn-close'),
        submit: document.querySelector('.modal-create-ad__submit')
      };
      const input = {
        name: document.querySelector('#modal-create-ad__input-name'),
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
        document.querySelector("body").style.overflow = "auto";
      };

      const closeOnOverlay = () => {
        closeModal();
      };

      const closeOnEcs = () => {
        if (event.code == 'Escape') {
          closeModal();
        }
      };

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
          .then(console.log)
          .then(() => {
            closeModal();
            PNotify.success({
              title: 'Поздравляем!',
              text: 'Ваше объявление добавлено.'
            });
          });
      }

      //Cheching for empty fields
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
    
      if (document.querySelector(".modal-create-ad")){
      input.photo.addEventListener('change', addImage);
      modal.submit.addEventListener('click', verifyAndPostAd);
      modal.close.addEventListener('click', closeModal);
      modal.overlay.addEventListener('click', closeOnOverlay);
      document.addEventListener('keydown', closeOnEcs);}
    };
    addModalListeners();
    
  };
  getCategories().then(createModal);
}
document.querySelector("body").addEventListener('click', createNewAd);}
