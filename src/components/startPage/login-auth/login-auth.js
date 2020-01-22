import services from '../../../services';
import '../../../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../../../../node_modules/pnotify/dist/es/PNotify.js';

const refs = {
  overlayLogin: document.querySelector('.auth-modal-overlay-login'),
  overlayRegister: document.querySelector('.auth-modal-overlay-register'),

  authModalLogin: document.querySelector('.auth-modal-login'),
  authModalRegister: document.querySelector('.auth-modal-register'),

  inputsContainer: document.querySelector('.inputs-container'),
  authBtns: document.querySelector('.auth-btns'),
  registerBlock: document.querySelector('.navigation__registration'),
  logoutBlock: document.querySelector('.navigation__logout'),
  loggedUser: document.querySelector('.logged-user'),

  emailInput: document.querySelector('input[type="email"]'),
  passwordInput: document.querySelector('input[type="password"]')
};



services.refs.buttonLogin.addEventListener('click', showLoginModal);
refs.authModalLogin.addEventListener('click', login);

services.refs.buttonReg.addEventListener('click', showRegisterModal);
refs.authModalRegister.addEventListener('click', register);
refs.authModalLogin.addEventListener('click', registerFromModal);

services.refs.logout.addEventListener('click', logoutFromAcc);
refs.overlayLogin.addEventListener('click', closeModal);
refs.overlayRegister.addEventListener('click', closeModal);

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

      // change UI for logged user
      refs.registerBlock.style.display = 'none';
      refs.logoutBlock.style.display = 'block';
      refs.loggedUser.textContent = services.userData.name;
    
      // hide login window
      refs.overlayLogin.classList.add('hide');
      refs.overlayLogin.classList.remove('show');

      localStorage.setItem('token', dataLogin.data.token);

      PNotify.success({
        title: 'Success!',
        text: 'You are logged in.'
      });
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
  showRegisterModal();
  try {
    const user = {
      email: e.currentTarget.elements.email.value,
      password: e.currentTarget.elements.password.value,
      name: e.currentTarget.elements.name.value
    };
    const dataRegister = await services.postLoginUser(user);
    services.userData = dataRegister.data.userData;
    services.token = dataRegister.data.token;
    services.ads = dataRegister.data.ads;
    services.favorites = dataRegister.data.favorites;
    services.isAuth = true;
    console.log(services);

    refs.registerBlock.style.display = 'none';
    refs.logoutBlock.style.display = 'block';
    refs.loggedUser.textContent = services.userData.name;
  
    refs.overlayRegister.classList.add('hide');
    refs.overlayRegister.classList.remove('show');
    
    localStorage.setItem('token', dataLogin.data.token);

    PNotify.success({
      title: 'Success!',
      text: 'You are logged in.'
    });
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

function registerFromModal(e) {
  if(e.currentTarget.classList.contains('btn-registration')) {
    register();

    // hide login window
    refs.overlayLogin.classList.add('hide');
    refs.overlayLogin.classList.remove('show');

    // change UI for logged user
    refs.registerBlock.style.display = 'none';
    refs.logoutBlock.style.display = 'block';
    refs.loggedUser.textContent = services.userData.name;
  }
}

function logoutFromAcc() {
  services.postLogoutUser();
  localStorage.setItem('token', null);
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
    refs.authModalRegister.reset();
    refs.authModalLogin.reset();

    refs.overlayRegister.classList.add('hide');
    refs.overlayRegister.classList.remove('show');
    refs.overlayLogin.classList.add('hide');
    refs.overlayLogin.classList.remove('show');
  }
}

// OLD SHIT //////////////////////////////////////////////////////////////////////////////////////////////////
// async function registerInit() {
//   showModal();
//   const nameInput = createNewNameInput();
//   // user.name = nameInput.value;

//   const confirmBtn = createConfirmBtn();
//   confirmBtn.addEventListener('click', submitRegistrationInfo);
//   // repeating func
//   async function submitRegistrationInfo() {
//     const user = {
//       email: refs.emailInput.value,
//       password: refs.passwordInput.value,
//       name: nameInput.value
//     };
//     console.log(user);

//     try {
//       const dataRegister = await services.postRegisterNewUser(user);
//       services.userData = dataRegister.data.userData;
//       services.token = dataRegister.data.token;
//       services.ads = dataRegister.data.ads;
//       services.favorites = dataRegister.data.favorites;
//       services.isAuth = true;
//       console.log(services);

//       changeUIforLoggedUser();
//       localStorage.setItem('token', dataRegister.data.token);

//       PNotify.success({
//         title: 'Success!',
//         text: 'You can log in now using your email and password.'
//       });
//     } catch (e) {
//       console.log(e);
//       PNotify.error({
//         title: 'Something went wrong :(',
//         text: 'Password should contain from 6 to 12 charecters.',
//         modules: {
//           Desktop: {
//             desktop: true
//           }
//         }
//       });
//     }
//   }
// }

// async function registerFromModal(e) {
//   e.preventDefault();
//   if (e.target.classList.contains('btn-registration')) {
//     const nameInput = createNewNameInput();
//     user.name = nameInput.value;

//     const confirmBtn = createConfirmBtn();
//     confirmBtn.addEventListener('click', submitRegistrationInfo);

//     // repeating func
//     async function submitRegistrationInfo() {
//       try {
//         const dataRegister = await services.postRegisterNewUser(user);
//         services.userData = dataRegister.data.userData;
//         services.token = dataRegister.data.token;
//         services.ads = dataRegister.data.ads;
//         services.favorites = dataRegister.data.favorites;
//         services.isAuth = true;
//         console.log(services);

//         changeUIforLoggedUser();
//         localStorage.setItem('token', dataRegister.data.token);

//         PNotify.success({
//           title: 'Success!',
//           text: 'You can log in now using your email and password.'
//         });
//       } catch (e) {
//         console.log(e);
//         PNotify.error({
//           title: 'Something went wrong :(',
//           text: 'Password should contain from 6 to 12 charecters.',
//           modules: {
//             Desktop: {
//               desktop: true
//             }
//           }
//         });
//       }
//     }
//   }
// }

// function logoutFromAcc() {
//   services.postLogoutUser();
//   localStorage.setItem('token', null);
//   refs.authModalWindow.reset();
//   services.isAuth = false;

//   refs.registerBlock.style.display = 'block';
//   refs.logoutBlock.style.display = 'none';
//   console.log('LOGGED OUT!!!!!!!!!!');
// }

// function closeModal(e) {
//   if (
//     e.target.classList.contains('close-icon') ||
//     e.target === e.currentTarget
//   ) {
//     refs.authModalWindow.reset();
//     refs.overlay.classList.add('hide');
//     refs.overlay.classList.remove('show');
//   }
// }

// function changeUIforLoggedUser() {
//   refs.registerBlock.style.display = 'none';
//   refs.logoutBlock.style.display = 'block';
//   refs.loggedUser.textContent = services.userData.name;

//   refs.overlay.classList.add('hide');
//   refs.overlay.classList.remove('show');
// }

// function createNewNameInput() {
//   const nameInput = document.createElement('input');
//   nameInput.type = 'text';
//   nameInput.placeholder = 'Имя';
//   refs.inputsContainer.insertBefore(nameInput, refs.emailInput);
//   return nameInput;
// }