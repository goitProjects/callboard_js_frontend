'use strict';

import '../SS/scroll-style.css';

// отдельная функция которая на вход принимает массив с обьявлениями и выводит его с возможностью скролить пока не закончатся и начинать заново с первого обьявления в массиве

export const scroll = async () => {

    const refs = {
        container: document.querySelector('.container'),
        scrollBox: document.getElementById('scroll-box'),
        scrollPag: document.getElementById('scroll-pagination'),
        nxtBtn: document.getElementById('next-scroll'),
        prvBtn: document.getElementById('prev-scroll')
    }


    // РАБОТА С ПАГИНАЦИЕЙ!!!

    let boxCount = refs.scrollBox.childElementCount; //количество детей бокса с элементами
    const dots = []; //массив дотс-пагинейшн

    //создать элементы пагинации не больше 4х
    if (boxCount != 1) {
        for (let i = 0; boxCount < 4 ? i < boxCount : i < 4; i++) {
            dots.push('<li class="dots"></li>');
        }
    }

    refs.scrollPag.insertAdjacentHTML("beforeend", (dots.reduce((acc, el) => acc += el, ''))); //добавляем доты


    function hoverPagEl() {
        const hoverDot = document.querySelector('.dots');
        const hoverDots = document.querySelectorAll('.dots');


        if (hoverDot <= 4) {
            hoverDot.style.backgroundColor = 'orange';
            hoverDot.style.borderColor = 'orange';
        }

        console.dir(hoverDot.style)
    }

    hoverPagEl()

    // ЗАДАНО ДЕЙСТВУЮЩИЙ ИНДЕКС!!!

    let currentIdx = 0; //действующий индекс

    // ДОБАВЛЕНИЕ И УДАЛЕНИЕ АКТИВНОГО ЭЛЕМЕНТА

    //функция добавляет активный клас предварительно удаляя действующий
    function addActive() {
        //удаление предидущего активного класса
        delActive();
        refs.scrollBox.children[currentIdx].classList.add('isActive');
    }

    //функция удаляет предидущий активный класс
    function delActive() {
        const active = refs.scrollBox.querySelector('.isActive');
        active.classList.remove('isActive');
    }

    // ---------------------------------------------------------------------------------------

    // СЛУШАТЕЛЬ КЛИКОВ ПАГИНАЦИИ

    refs.scrollPag.addEventListener('click', getPagImg); //вешаем слушателя

    // функция-колбэк слушающая клики элементов пагинации
    function getPagImg(e) {
        e.preventDefault();

        //получить индекс-пагинейшн
        function getPagIdx() {
            for (let i = 0; i <= e.currentTarget.childNodes.length - 1; i++) {
                if (e.currentTarget.childNodes[i] === e.target) {
                    return i;
                }
            }
        }

        currentIdx = getPagIdx(); //переприсваиваем поточный индекс

        //проверяем произойшол ли клик в родителе(пока не понял что хотел этим добиться)
        if (e.target && e.currentTarget) {
            //ВЫЗОВ ОСНОВНОЙ ФУНКЦИИ(ДОБАВЛЯЕТ АКТИВНЫЙ КЛАС)
            addActive();
        } else {
            return
        }

    }

    // ----------------------------------------------------------------------------------

    // СЛУШАТЕЛИ КЛИКОВ КНОПОК

    refs.nxtBtn.addEventListener('click', incrementIdx) //слушатель правой кнопки
    refs.prvBtn.addEventListener('click', decrementIdx) //слушатель левой кнопки

    function incrementIdx(e) {
        e.preventDefault();
        if (currentIdx === refs.scrollBox.children.length - 1) {
            currentIdx = 0
        } else {
            currentIdx += 1;
        }

        console.log(currentIdx);

        addActive();
    };

    function decrementIdx(e) {
        e.preventDefault();
        if (currentIdx === (0)) {
            currentIdx = refs.scrollBox.children.length - 1;
        } else {
            currentIdx -= 1;
        }

        console.log(currentIdx)

        addActive();
    };

}

scroll();