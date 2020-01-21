import services from '../../../services';
console.log(services)

const refs = {
  authModalWindow: document.querySelector('.auth-modal'),
  headerRegistrationBtn: document.querySelector('.registration-btn'),
  registerNewUserBtn: document.querySelector('.btn-registration'),
  nameInput: document.querySelector('input[name="name"]')
}

refs.headerRegistrationBtn.addEventListener('click', openModal);
refs.authModalWindow.addEventListener('click', closeModal);
refs.registerNewUserBtn.addEventListener('click', openRegisterModal);

function openModal() {
  refs.authModalWindow.classList.remove('hide');
}

function closeModal(e) {
  // + close whenclicked outside modal
  console.log(e.target);
  if(e.target.classList.contains('close-icon')) {
    refs.authModalWindow.classList.add('hide');
  }
}

function openRegisterModal(e) {
  refs.nameInput.classList.remove('hide');
  const user = {
    name: e.currentTarget.elements.name.value,
    email: e.currentTarget.elements.email.value,
    password: e.currentTarget.elements.password.value
  }
  services.postRegisterNewUser(user);
}