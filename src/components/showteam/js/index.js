import "../css/showTeam.css";

const showTeamBtn = document.querySelector(".info-students");
const showTeamBox = document.querySelector(".team-hide");
const teamBoxOverlay = document.querySelector(".team__box-overlay");
const closeTeamBoxBtn = document.querySelector(".team__box-close-btn");

function handleShowTeam(e) {
  e.preventDefault();
  showTeamBox.style.display = "block";
  // showTeamBox.className = "is-open";
  // showTeamBox.classList.add("is-open");
}

function handleCloseBox(e) {
  console.log(e);
  // if (e.target === teamBoxOverlay || e.target === closeTeamBoxBtn) {
  // showTeamBox.classList.remove("is-close");
  showTeamBox.style.display = "none";
  // }
}

showTeamBtn.addEventListener("click", handleShowTeam);
closeTeamBoxBtn.addEventListener("click", handleCloseBox);


console.log(window.addEventListener('click', (e) => {
  console.log(e.target)
}))