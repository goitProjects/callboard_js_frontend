import services from '../../../services';
import '../../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../../../../node_modules/pnotify/dist/es/PNotify.js';

const refs = {
  overlay: document.querySelector('.auth-modal-overlay'),
  authModalWindow: document.querySelector('.auth-modal'),
  headerRegistrationBtn: document.querySelector('.registration-btn'),
  inputsContainer: document.querySelector('.inputs-container'),
  authBtns: document.querySelector('.auth-btns'),
  logout: document.querySelector('.logout')
};

refs.headerRegistrationBtn.addEventListener('click', openModal);
refs.overlay.addEventListener('click', closeModal);
refs.authModalWindow.addEventListener('click', registerOrLogin);
refs.logout.addEventListener('click', logout);

function openModal() {
  refs.overlay.classList.remove('hide');
}

function closeModal(e) {
  if (
    e.target.classList.contains('close-icon') ||
    e.target === e.currentTarget
  ) {
    refs.overlay.classList.add('hide');
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
    console.log('user :', user);
    refs.authBtns.innerHTML = '';
    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'submit';
    confirmBtn.classList.add('btn-confirm');
    confirmBtn.textContent = 'Подтвердить';
    refs.authBtns.append(confirmBtn);

    confirmBtn.addEventListener('click', submitRegistrationInfo);

    async function submitRegistrationInfo() {
      user.name = nameInput.value;
      user.email = emailInput.value;
      user.password = passwordInput.value;
      const dataRegister = await services
        .postRegisterNewUser(user)
        .then(console.log)
        .catch(e => console.log(e));
      localStorage.setItem('token', dataRegister.data.token);
    }
  } else if (e.target.classList.contains('btn-login')) {
    try {
      const user = {
        email: e.currentTarget.elements.email.value,
        password: e.currentTarget.elements.password.value
      };
      const dataLogin = await services.postLoginUser(user);
      refs.overlay.classList.add('hide');
      PNotify.success({
        title: 'Success!',
        text: 'You are logged in.'
      });
      localStorage.setItem('token', dataLogin.data.token);
    } catch (e) {
      PNotify.error({
        title: 'Error',
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

function logout() {
  localStorage.removeItem('token');
}