import '../css/styles.css';

const showTeamBtn = document.getElementById('show-team__btn');
const showTeamBox = document.getElementById('show-team__box');
const teamBoxOverlay = document.querySelector('.team__box-overlay');

showTeamBtn.addEventListener('click', handleShowTeam);
showTeamBox.addEventListener('click', handleCloseBox);

function handleShowTeam() {
  showTeamBox.classList.remove('is-hidden');
}

function handleCloseBox(e) {
  if (e.target !== teamBoxOverlay) return;
  showTeamBox.classList.add('is-hidden');
}
