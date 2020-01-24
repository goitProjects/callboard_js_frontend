import "../css/styles.css";



const showTeamBtn = document.querySelector(".info-students");
const showTeamBox = document.getElementById("show-team__box");
const teamBoxOverlay = document.querySelector(".team__box-overlay");
const closeTeamBoxBtn = document.querySelector(".team__box-close-btn");



function handleShowTeam(e) {
  e.preventDefault();
  console.log(1);
  showTeamBox.style.display = "block";
}

function handleCloseBox(e) {
  e.preventDefault();
  if (e.target === teamBoxOverlay || e.target === closeTeamBoxBtn) {
    showTeamBox.style.display = "none";
  }
}

showTeamBtn.addEventListener("click", handleShowTeam);
showTeamBox.addEventListener("click", handleCloseBox);