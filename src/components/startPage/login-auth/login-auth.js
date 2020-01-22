import services from '../../../services';
import '../../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../../../../node_modules/pnotify/dist/es/PNotify.js';

const refs = {
  overlay: document.querySelector('.auth-modal-overlay'),
  authModalWindow: document.querySelector('.auth-modal'),
  headerRegistrationBtn: document.querySelector('.registration-btn'),
  inputsContainer: document.querySelector('.inputs-container'),
  authBtns: document.querySelector('.auth-btns'),
  logout: document.querySelector('.logout-from-acc')
};

refs.headerRegistrationBtn.addEventListener('click', openModal);
refs.overlay.addEventListener('click', closeModal);
refs.authModalWindow.addEventListener('click', registerOrLogin);
refs.logout.addEventListener('click', logoutFromAcc);

function openModal() {
  refs.overlay.classList.remove('hide-modal');
  refs.overlay.classList.add('show-modal');
}

function closeModal(e) {
  if (
    e.target.classList.contains('close-icon') ||
    e.target === e.currentTarget
  ) {
    refs.overlay.classList.add('hide-modal');
    refs.overlay.classList.remove('show-modal');
  }
}

const user = {};

async function registerOrLogin(e) {
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
        services.userData = dataRegister.userData;
        services.token = dataRegister.token;
        services.ads = dataRegister.ads;
        services.favorites = dataRegister.favorites;
        services.isAuth = true;
        console.log(services);

        localStorage.setItem('token', dataRegister.data.token);

        refs.overlay.classList.add('hide-modal');
        refs.overlay.classList.remove('show-modal');
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
  } else if (e.target.classList.contains('btn-login')) {
    try {
      const user = {
        email: e.currentTarget.elements.email.value,
        password: e.currentTarget.elements.password.value
      };
      const dataLogin = await services.postLoginUser(user);
      services.userData = dataLogin.userData;
      services.token = dataLogin.token;
      services.ads = dataLogin.ads;
      services.favorites = dataLogin.favorites;
      services.isAuth = true;
      console.log(services);

      refs.overlay.classList.add('hide-modal');
      refs.overlay.classList.remove('show-modal');
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

function logoutFromAcc() {
  services.postLogoutUser({ headers: { Authorization: services.token } });
  localStorage.removeItem('token');
  refs.authModalWindow.reset();
  services.isAuth = false;
  console.log('LOGGED OUT!!!!!!!!!!');
}