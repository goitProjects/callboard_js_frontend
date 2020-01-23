'use strict';

import '../carousel/scroll-style.css';

// отдельная функция которая на вход принимает массив с обьявлениями и выводит его с возможностью скролить пока не закончатся и начинать заново с первого обьявления в массиве

export const scroll = async () => {

    const refs = {
        container: document.querySelector('.container'),
        scrollBox: document.querySelector('.scroll-box'),
        scrollPag: document.querySelector('.scroll-pagination'),
        nxtBtn: document.querySelector('.next-scroll'),
        prvBtn: document.querySelector('.prev-scroll')
    }

    // ЗАДАНО ДЕЙСТВУЮЩИЙ ИНДЕКС!!!

    let currentIdx = 0; //действующий индекс

    let boxCount = refs.scrollBox.childElementCount; //количество детей бокса с элементами

    // АДАПТИВ ЛИСТА ДЛЯ МОБИЛЬНОЙ ПЛАТФОРМЫ

    // функция редактирующая лист для мобильной версии
    function getMobileList() {
        if (window.screen.width < 768) {
            if (refs.scrollBox.childElementCount > 4) {
                const scrollBoxAll = document.querySelectorAll('.scroll-box'); //массив всех элементов
                const el = scrollBoxAll[0].children[refs.scrollBox.childElementCount - 1]; //последний элемент массива 
                el.remove(); //удаляем последний
                getMobileList();
            } else {
                return
            };
        }
    }

    getMobileList()

    // РАБОТА С ПАГИНАЦИЕЙ!!!

    const dots = []; //массив дотс-пагинейшн

    //создать элементы пагинации не больше 4х
    if (boxCount != 1) {
        for (let i = 0; boxCount < 4 ? i < boxCount : i < 4; i++) {
            dots.push('<li class="dots"></li>');
        }
    }

    refs.scrollPag.insertAdjacentHTML("beforeend", (dots.reduce((acc, el) => acc += el, ''))); //добавляем доты

    const hoverDots = document.querySelectorAll('.dots'); //массив прорисованых дотсов
    hoverDots[0].style.backgroundColor = 'orange'; //присвоение дефолтного цвета доту пагинации

    //изменение цвета - ховер пагинации
    function hoverPagEl() {
        delHoverPagEl() //удаляем активный ховер

        for (let i = 0; i <= hoverDots.length - 1; i++) {
            if (i === currentIdx) {
                hoverDots[i].style.backgroundColor = 'orange';
            }
        }
    }

    //находит и изменяет цвет ховера пагинации на дефолтный 
    function delHoverPagEl() {
        for (let i = 0; i <= hoverDots.length - 1; i++) {
            if (hoverDots[i].style.backgroundColor = 'orange') {
                hoverDots[i].style.backgroundColor = '#ccc';
            }
        }
    }

    // СМЕЩЕНИЕ СЛАЙДА

    function changeSlide() {
        refs.scrollBox.style.transform = `translateX(-${currentIdx}00%)`;
    };

    // СЛУШАТЕЛИ КЛИКОВ КНОПОК

    refs.nxtBtn.addEventListener('click', incrementIdx) //слушатель правой кнопки
    refs.prvBtn.addEventListener('click', decrementIdx) //слушатель левой кнопки

    function incrementIdx(e) {
        e.preventDefault();
        if (window.screen.width >= 1200) {
            if (currentIdx >= refs.scrollBox.children.length - 4) {
                currentIdx = 0;
            } else {
                currentIdx += 1;
            }
        } else if (window.screen.width >= 768) {
            if (currentIdx >= refs.scrollBox.children.length - 2) {
                currentIdx = 0;
            } else {
                currentIdx += 1;
            }
        } else if (window.screen.width < 768) {
            if (currentIdx === refs.scrollBox.children.length - 1) {
                currentIdx = 0
            } else {
                currentIdx += 1;
            }
        }

        hoverPagEl();
        changeSlide();
    };

    function decrementIdx(e) {
        e.preventDefault();

        if (window.screen.width >= 1200) {
            if (currentIdx === 0) {
                currentIdx = refs.scrollBox.children.length - 4;
            } else {
                currentIdx -= 1;
            }
        } else if (window.screen.width >= 768) {
            if (currentIdx === 0) {
                currentIdx = refs.scrollBox.children.length - 2;
            } else {
                currentIdx -= 1;
            }
        } else if (window.screen.width < 768) {
            if (currentIdx === 0) {
                currentIdx = refs.scrollBox.children.length - 1;
            } else {
                currentIdx -= 1;
            }
        }

        hoverPagEl();
        changeSlide();
    };

    // ---------------------------------------------------------------------------------------

    // СЛУШАТЕЛЬ КЛИКОВ ПАГИНАЦИИ//на*ер не нужен (ховер не работает на мобиле)  

    // refs.scrollPag.addEventListener('click', getPagImg); //вешаем слушателя

    // // функция-колбэк слушающая клики элементов пагинации
    // function getPagImg(e) {
    //     e.preventDefault();

    //     //получить индекс-пагинейшн
    //     function getPagIdx() {
    //         for (let i = 0; i <= e.currentTarget.childNodes.length - 1; i++) {
    //             if (e.currentTarget.childNodes[i] === e.target) {
    //                 return i;
    //             }
    //         }
    //     }

    //     currentIdx = getPagIdx(); //переприсваиваем поточный индекс

    //     //проверяем произойшол ли клик в родителе(пока не понял что хотел этим добиться)
    //     if (e.target && e.currentTarget) {
    //         //ВЫЗОВ ОСНОВНОЙ ФУНКЦИИ(ДОБАВЛЯЕТ АКТИВНЫЙ КЛАС)
    //         addActive();
    //     } else {
    //         return
    //     }

    // }

    // ДОБАВЛЕНИЕ И УДАЛЕНИЕ АКТИВНОГО ЭЛЕМЕНТА

    //функция добавляет активный клас предварительно удаляя действующий
    // function addActive() {
    //     delActive(); //удаление предидущего активного класса
    //     refs.scrollBox.children[currentIdx].classList.add('isActive'); //добавление нового активного класса
    // }

    //функция удаляет предидущий активный класс
    // function delActive() {
    //     const active = refs.scrollBox.querySelector('.isActive');
    //     active.classList.remove('isActive');
    // }

    // ----------------------------------------------------------------------------------

}

scroll();