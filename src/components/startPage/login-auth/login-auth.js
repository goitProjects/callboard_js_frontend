const refs = {
  authModalWindow: document.querySelector('.auth-modal'),
  registrationBtn: document.querySelector('.registration-btn')
}

refs.registrationBtn.addEventListener('click', openModal);
refs.authModalWindow.addEventListener('click', closeModal);

function openModal() {
  refs.authModalWindow.classList.remove('hide');
}

function closeModal(e) {
  if(e.target.classList.contains('close-icon')) {
    refs.authModalWindow.classList.add('hide');
  }
}