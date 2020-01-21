'use strict';

const burger = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.section_nav__btn_burger_close');
const burgerMenu = document.querySelector('.hidden_mobile');
const menuAnchors = [...document.querySelectorAll('.btn_menu')];

const openMenu = e => {
    e.preventDefault();
    burger.style.display = "none";
    document.body.style.overflow = "hidden";
    burgerMenu.classList.add('hidden_mobile_menu-active');
}

const closeMenu = e => {
    burger.style.display = "block";
    document.body.style.overflow = "auto";
    burgerMenu.classList.remove('hidden_mobile_menu-active');
}

burger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
menuAnchors.forEach(e => {
    e.addEventListener('click', closeMenu);
});