import services from '../../../services';
import '../../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../../../../node_modules/pnotify/dist/es/PNotify.js';

const refs = {
  overlayLogin: document.querySelector('.auth-modal-overlay-login'),
  overlayRegister: document.querySelector('.auth-modal-overlay-register'),

  authModalLogin: document.querySelector('.auth-modal-login'),
  authModalRegister: document.querySelector('.auth-modal-register'),

  registerBlock: document.querySelector('.navigation__registration'),
  logoutBlock: document.querySelector('.navigation__logout'),
  loggedUser: document.querySelector('.logged-user')
};

services.refs.buttonLogin.addEventListener('click', showLoginModal);
refs.authModalLogin.addEventListener('click', login);

services.refs.buttonReg.addEventListener('click', showRegisterModal);
refs.authModalRegister.addEventListener('click', register);
refs.authModalLogin.addEventListener('click', registerFromModal);

services.refs.logout.addEventListener('click', logoutFromAcc);
refs.overlayLogin.addEventListener('click', closeModal);
refs.overlayRegister.addEventListener('click', closeModal);

// document.addEventListener('DOMContentLoaded', stayLoggedIn);

function showLoginModal() {
  refs.overlayLogin.classList.remove('hide');
  refs.overlayLogin.classList.add('show');
}

async function login(e) {
  e.preventDefault();
  if (e.target.classList.contains('btn-login')) {
    try {
      const user = {
        email: e.currentTarget.elements.email.value,
        password: e.currentTarget.elements.password.value
      };
      const dataLogin = await services.postLoginUser(user);
      services.userData = dataLogin.data.userData;
      services.token = dataLogin.data.token;
      services.ads = dataLogin.data.ads;
      services.favorites = dataLogin.data.favorites;
      services.isAuth = true;
      console.log(services);
      localStorage.setItem('token', services.token);
      changeUIforLoggedUser();
    } catch (e) {
      PNotify.error({
        title: 'Oops!',
        text: 'Email or password is incorrect.',
        modules: {
          Desktop: {
            desktop: true
          }
        }
      });
    }
  }
}

function showRegisterModal() {
  refs.overlayRegister.classList.remove('hide');
  refs.overlayRegister.classList.add('show');

  refs.overlayLogin.classList.add('hide');
  refs.overlayLogin.classList.remove('show');
}

async function register(e) {
  e.preventDefault();
  if (e.target.classList.contains('btn-confirm')) {
    try {
      const user = {
        email: e.currentTarget.elements.email.value,
        password: e.currentTarget.elements.password.value,
        name: e.currentTarget.elements.name.value
      };
      const dataRegister = await services.postRegisterNewUser(user);
      services.userData = dataRegister.data.userData;
      services.token = dataRegister.data.token;
      services.ads = dataRegister.data.ads;
      services.favorites = dataRegister.data.favorites;
      services.isAuth = true;
      console.log(services);
      localStorage.setItem('token', dataRegister.data.token);
      changeUIforLoggedUser();
    } catch (e) {
      PNotify.error({
        title: 'Oops!',
        text: 'Email or password is incorrect.',
        modules: { Desktop: { desktop: true } }
      });
    }
  }
}

function registerFromModal(e) {
  if (e.target.classList.contains('btn-registration')) {
    showRegisterModal();
  }
}

// logout fn works, even though if throws errors
function logoutFromAcc() {
  services.postLogoutUser();
  localStorage.setItem('token', null);
  refs.authModalRegister.reset();
  refs.authModalLogin.reset();
  services.isAuth = false;

  refs.registerBlock.style.display = 'block';
  refs.logoutBlock.style.display = 'none';
}

function closeModal(e) {
  if (
    e.target.classList.contains('close-icon') ||
    e.target === e.currentTarget
  ) {
    refs.authModalRegister.reset();
    refs.authModalLogin.reset();

    refs.overlayRegister.classList.add('hide');
    refs.overlayRegister.classList.remove('show');
    refs.overlayLogin.classList.add('hide');
    refs.overlayLogin.classList.remove('show');
  }
}

function changeUIforLoggedUser() {
  // change UI for logged user
  refs.registerBlock.style.display = 'none';
  refs.logoutBlock.style.display = 'block';
  refs.loggedUser.textContent = services.userData.name;

  // hide login/register window
  refs.overlayLogin.classList.add('hide');
  refs.overlayLogin.classList.remove('show');
  refs.overlayRegister.classList.add('hide');
  refs.overlayRegister.classList.remove('show');

  PNotify.success({
    title: 'Success!',
    text: 'You are logged in.'
  });
}

// function stayLoggedIn(e) {
//   if(services.token !== null) {

//     services.isAuth = true;
//     changeUIforLoggedUser();
//   }
// }