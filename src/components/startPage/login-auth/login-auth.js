import services from '../../../services';
import '../../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../../../../node_modules/pnotify/dist/es/PNotify.js';

const refs = {
  overlay: document.querySelector('.auth-modal-overlay'),
  authModalWindow: document.querySelector('.auth-modal'),
  inputsContainer: document.querySelector('.inputs-container'),
  authBtns: document.querySelector('.auth-btns'),
  registerBlock: document.querySelector('.navigation__registration'),
  logoutBlock: document.querySelector('.navigation__logout'),
  loggedUser: document.querySelector('.logged-user')
};

services.refs.buttonLogin.addEventListener('click', showModal);
refs.authModalWindow.addEventListener('click', login);
refs.authModalWindow.addEventListener('click', registerFromModal);
services.refs.buttonReg.addEventListener('click', registerInit);
services.refs.logout.addEventListener('click', logoutFromAcc);
refs.overlay.addEventListener('click', closeModal);

function showModal() {
  refs.overlay.classList.remove('hide');
  refs.overlay.classList.add('show');
}

async function login(e) {
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

      refs.registerBlock.style.display = 'none';
      refs.logoutBlock.style.display = 'block';
      refs.loggedUser.textContent = services.userData.name;

      refs.overlay.classList.add('hide');
      refs.overlay.classList.remove('show');
      PNotify.success({
        title: 'Success!',
        text: 'You are logged in.'
      });
      localStorage.setItem('token', dataLogin.data.token);
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

async function registerInit() {
  showModal();
}

const user = {};

async function registerFromModal(e) {
  e.preventDefault();
  if (e.target.classList.contains('btn-registration')) {
    const emailInput = e.currentTarget.elements.email;
    const passwordInput = e.currentTarget.elements.password;
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Имя';
    refs.inputsContainer.insertBefore(nameInput, emailInput);
    user.name = nameInput.value;
    user.email = emailInput.value;
    user.password = passwordInput.value;
    refs.authBtns.innerHTML = '';
    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'submit';
    confirmBtn.classList.add('btn-confirm');
    confirmBtn.textContent = 'Подтвердить';
    refs.authBtns.append(confirmBtn);

    confirmBtn.addEventListener('click', submitRegistrationInfo);

    async function submitRegistrationInfo() {
      try {
        user.name = nameInput.value;
        user.email = emailInput.value;
        user.password = passwordInput.value;

        const dataRegister = await services.postRegisterNewUser(user);
        services.userData = dataRegister.data.userData;
        services.token = dataRegister.data.token;
        services.ads = dataRegister.data.ads;
        services.favorites = dataRegister.data.favorites;
        services.isAuth = true;
        console.log(services);

        localStorage.setItem('token', dataRegister.data.token);

        refs.overlay.classList.add('hide');
        refs.overlay.classList.remove('show');
        PNotify.success({
          title: 'Success!',
          text: 'You can log in now using your email and password.'
        });
      } catch (e) {
        console.log(e);
        PNotify.error({
          title: 'Something went wrong :(',
          text: 'Password should contain from 6 to 12 charecters.',
          modules: {
            Desktop: {
              desktop: true
            }
          }
        });
      }
    }
  }
}

function logoutFromAcc() {
  services.postLogoutUser({ headers: { 'Authorization': services.token } });
  localStorage.removeItem('token');
  refs.authModalWindow.reset();
  services.isAuth = false;

  refs.registerBlock.style.display = 'block';
  refs.logoutBlock.style.display = 'none';
  console.log('LOGGED OUT!!!!!!!!!!');
}

function closeModal(e) {
  if (
    e.target.classList.contains('close-icon') ||
    e.target === e.currentTarget
  ) {
    refs.overlay.classList.add('hide');
    refs.overlay.classList.remove('show');
  }
}
