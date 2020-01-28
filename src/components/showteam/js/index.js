import "../css/showTeam.css";

const showTeamBtn = document.querySelector(".info-students");
const showTeamBox = document.querySelector(".team__box");
const teamBoxOverlay = document.querySelector(".team__box-overlay");
const closeTeamBoxBtn = document.querySelector(".team__box-close-btn");

function handleShowTeam(e) {
  e.preventDefault();
  showTeamBox.style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
}

function handleCloseBox(e) {
  e.preventDefault();
  if (e.target === teamBoxOverlay || e.target === closeTeamBoxBtn) {
    showTeamBox.style.display = "none";
    document.querySelector("body").style.overflow = "auto";
  }
}

showTeamBtn.addEventListener("click", handleShowTeam);
showTeamBox.addEventListener("click", handleCloseBox);
