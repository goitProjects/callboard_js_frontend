import services from "../../../services";
import "./login-auth.css";
import "../../../../node_modules/pnotify/dist/PNotifyBrightTheme.css";
import PNotify from "../../../../node_modules/pnotify/dist/es/PNotify.js";

// START - Делаем проверку вьюпорта, чтобы отрисовать кнопки входа/регистрации/выхода/ЛК
const domLoginBlockForMob = document.getElementById("user_login-bar-mobile");
const domLoginBlockForDesk = document.getElementById("user_login-bar-desktop");
const authContent = `
<div class="navigation__registration">
<button class="registration-button">Регистрация </button>
<button class="registration-enter">Войти </button>
</div>
<div class="navigation__logout">
<div class="logged-user"></div>
<button class="exit"> Выйти</button>
</div> `;
if (window.innerWidth < 1200) {
  domLoginBlockForDesk.innerHTML = "";
  domLoginBlockForMob.innerHTML = authContent;
} else {
  domLoginBlockForMob.innerHTML = "";
  domLoginBlockForDesk.innerHTML = authContent;
}
// END - Делаем проверку вьюпорта, чтобы отрисовать кнопки входа/регистрации/выхода/ЛК



const refs = {
  overlayLogin: document.querySelector(".auth-modal-overlay-login"),
  overlayRegister: document.querySelector(".auth-modal-overlay-register"),
  authModalLogin: document.querySelector(".auth-modal-login"),
  authModalRegister: document.querySelector(".auth-modal-register"),
  registerBlock: document.querySelector(".navigation__registration"),
  logoutBlock: document.querySelector(".navigation__logout"),
  loggedUser: document.querySelector(".logged-user"),
  logout: document.querySelector('.exit')
};

services.ref.body.addEventListener("click", showLoginModal);
refs.authModalLogin.addEventListener("click", login);
services.ref.body.addEventListener("click", showRegisterModal);
refs.authModalRegister.addEventListener("click", register);
refs.authModalLogin.addEventListener("click", registerFromModal);
refs.logout.addEventListener("click", logoutFromAcc);
services.ref.body.addEventListener("click", closeModal);
services.ref.body.addEventListener("click", closeModal);
document.addEventListener("DOMContentLoaded", stayLoggedIn);


function showLoginModal(e) {
  if (e.target.classList == "registration-enter") {
    refs.overlayLogin.style.display = "flex";
  }
}

async function login(e) {
  if (e.target.classList == "registration-enter") {
    e.preventDefault();
    showRegisterModal();
  } else if (e.target.classList.contains("btn-login")) {
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
      services.categories = dataLogin.data.categories;
      //localStorage.setItem('loginInfo', JSON.stringify({userData: services.userData, token:services.token, isAuth: true}));
      localStorage.setItem("token", services.token);
      localStorage.setItem("name", services.userData.name);
      changeUIforLoggedUser();
    } catch (e) {
      PNotify.error({
        title: "Oops!",
        text: "Email or password is incorrect.",
        modules: {
          Desktop: {
            desktop: true
          }
        }
      });
    }
  }
}

function showRegisterModal(e) {
  if (e.target.classList == "registration-button") {
    refs.overlayLogin.style.display = "none";
    refs.overlayRegister.style.display = "flex";
  }
  if (e.target.classList == "btn-registration") {
    refs.overlayLogin.style.display = "none";
    refs.overlayRegister.style.display = "flex";
  }
}

async function register(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-confirm")) {
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

      services.categories = dataRegister.data.categories;
      //localStorage.setItem('loginInfo', JSON.stringify({userData: services.userData, token:services.token, isAuth: true}));
      localStorage.setItem("loginName", dataRegister.data.userData);
      localStorage.setItem("token", dataRegister.data.token);
      changeUIforLoggedUser();
    } catch (e) {
      PNotify.error({
        title: "Oops!",
        text: "Email or password is incorrect.",
        modules: { Desktop: { desktop: true } }
      });
    }
  }
}

function registerFromModal(e) {
  e.preventDefault();
  if (e.target.classList === "btn-registration") {
    refs.overlayLogin.style.display = "none";
    showRegisterModal();
  }
}

// logout fn works, even though if throws errors
function logoutFromAcc() {
  services.postLogoutUser();
  localStorage.setItem("loginInfo", null);
  refs.authModalRegister.reset();
  refs.authModalLogin.reset();
  services.isAuth = false;
  refs.registerBlock.style.display = "block";
  refs.logoutBlock.style.display = "none";
}

function closeModal(e) {
  if (e.target.classList == "close-icon") {
    refs.overlayLogin.style.display = "none";
    refs.overlayRegister.style.display = "none";
    PNotify.closeAll();
  }
}

function changeUIforLoggedUser() {
  // change UI for logged user
  refs.registerBlock.style.display = "none";
  refs.logoutBlock.style.display = "block";

  refs.loggedUser.textContent = services.userData.name;

  // hide login/register window
  refs.overlayLogin.classList.add("hide");
  refs.overlayLogin.classList.remove("show");
  refs.overlayRegister.classList.add("hide");
  refs.overlayRegister.classList.remove("show");

  setTimeout(
    PNotify.success({
      title: "Success!",
      text: "You are logged in."
    }),
    1000
  );
}

function stayLoggedIn() {
  const servicesFromLS = localStorage.getItem("token");
  const servicesFromLSName = localStorage.getItem("name");
  if (servicesFromLS !== null) {
    refs.registerBlock.style.display = "none";
    refs.logoutBlock.style.display = "flex";
    const firstLetter = servicesFromLSName[0];
    refs.loggedUser.textContent = firstLetter;
    services.userData = servicesFromLS.userData;
    services.token = servicesFromLS.token;
    services.ads = servicesFromLS.ads;
    services.favorites = servicesFromLS.favorites;
    services.isAuth = true;
    //dataRegister = servicesFromLS.categories;
  }
}
