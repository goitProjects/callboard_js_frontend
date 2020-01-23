import "../css/styles.css";

const showTeamBtn = document.querySelector(".info-students");
const showTeamBox = document.getElementById("show-team__box");
const teamBoxOverlay = document.querySelector(".team__box-overlay");
const closeTeamBoxBtn = document.querySelector(".team__box-close-btn");

showTeamBtn.addEventListener("click", handleShowTeam);
showTeamBox.addEventListener("click", handleCloseBox);

function handleShowTeam(e) {
  e.preventDefault();
  showTeamBox.classList.add("is-open");
}

function handleCloseBox(e) {
  if (e.target === teamBoxOverlay || e.target === closeTeamBoxBtn) {
    showTeamBox.classList.remove("is-open");
  }
}
