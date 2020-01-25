'use strict';

import '../carousel/scroll-style.css';

// отдельная функция которая на вход принимает массив с обьявлениями и выводит его с возможностью скролить пока не закончатся и начинать заново с первого обьявления в массиве

export const scroll = async () => {

    const refs = {
        mainTable: document.querySelector('.mainTable'),
        scrollBoxAll: document.querySelectorAll('.scroll-box'),
        scrollPagAll: document.querySelectorAll('.scrolling_pagination'),
        nxtBtnAll: document.querySelectorAll('.nxt-scroll'),
        prvBtnAll: document.querySelectorAll('.prv-scroll')
    }

    // ЗАДАНО ДЕЙСТВУЮЩИЙ ИНДЕКС!!!

    const idxArr = []; //массив, хранящий индек текущего состояния смещения слайда

    // СМЕЩЕНИЕ СЛАЙДА!!!

    refs.mainTable.addEventListener('click', changeSlide);

    //функция выбора слайда
    function changeSlide(e) {
        e.preventDefault();

        let currentIdx = 0;

        for (let i = 0; i < refs.scrollBoxAll.length; i++) {

            if (idxArr[i] == undefined) {
                idxArr[i] = 0;
            }

            currentIdx = idxArr[i];

            let i_refs = {
                currentScrollBox: refs.scrollBoxAll[i],
                currentScrollPag: refs.scrollPagAll[i],
                currentNextBtn: refs.nxtBtnAll[i],
                currentPrvBtn: refs.prvBtnAll[i]
            }

            if (e.target === i_refs.currentNextBtn) {
                incrementIdx();
            }

            if (e.target === i_refs.currentPrvBtn) {
                decrementIdx(e);
            }

            //функция плюсует индекс с которым мы работаем
            function incrementIdx() {
                if (window.screen.width >= 1200) {
                    if (idxArr[i] >= i_refs.currentScrollBox.children.length - 4) {
                        currentIdx = 0;
                    } else {
                        currentIdx += 1;
                    }
                } else if (window.screen.width >= 768) {
                    if (idxArr[i] >= i_refs.currentScrollBox.children.length - 2) {
                        currentIdx = 0;
                    } else {
                        currentIdx += 1;
                    }
                } else if (window.screen.width < 768) {
                    if (idxArr[i] === i_refs.currentScrollBox.children.length - 1) {
                        currentIdx = 0
                    } else {
                        currentIdx += 1;
                    }

                    idxArr[i] = currentIdx;
                    getScrollHoverPagination();
                }

                idxArr[i] = currentIdx;

                getCurrentSlide();
                // getScrollHoverPagination();
            };

            //функция минусует индекс с которым мы работаем
            function decrementIdx() {

                if (window.screen.width >= 1200) {
                    if (idxArr[i] === 0) {
                        currentIdx = i_refs.currentScrollBox.children.length - 4;
                    } else {
                        currentIdx -= 1;
                    }
                } else if (window.screen.width >= 768) {
                    if (idxArr[i] === 0) {
                        currentIdx = i_refs.currentScrollBox.children.length - 2;
                    } else {
                        currentIdx -= 1;
                    }
                } else if (window.screen.width < 768) {
                    if (idxArr[i] === 0) {
                        currentIdx = i_refs.currentScrollBox.children.length - 1;
                    } else {
                        currentIdx -= 1;
                    }

                    idxArr[i] = currentIdx;
                    getScrollHoverPagination();
                }

                idxArr[i] = currentIdx;

                getCurrentSlide();
                // getScrollHoverPagination();
            };

            //функция смещающая слайд
            function getCurrentSlide() {
                i_refs.currentScrollBox.style.transform = `translateX(-${currentIdx}00%)`;
            }

        }

    }



    // АДАПТИВ ЛИСТА ДЛЯ МОБИЛЬНОЙ ПЛАТФОРМЫ !!!

    // проверка разрешениия и запуск адаптива для мобильной версии 
    if (window.screen.width < 768) {

        setTimeout(getMobileAdaptive, 7000);

    }

    // функция создающая каждому списку адаптивный лист для  мобильной версии
    async function getMobileAdaptive() {

        for (let i = 0; i < refs.scrollBoxAll.length; i++) {

            const i_refs = {
                currentScrollBox: refs.scrollBoxAll[i],
                currentScrollPag: refs.scrollPagAll[i],
                currentNextBtn: refs.nxtBtnAll[i],
                currentPrvBtn: refs.prvBtnAll[i]
            }

            await getMobileList();

            // функция редактирующая количество элементов листа мобильной версии
            async function getMobileList() {
                if (window.screen.width < 768) {
                    if (i_refs.currentScrollBox.children.length > 4) {
                        const endElem = i_refs.currentScrollBox.children[i_refs.currentScrollBox.children.length - 1]; //последний элемент массива 
                        endElem.remove(); //удаляем последний
                        await getMobileList();
                    } else {
                        return
                    };
                }
            }

            // СОЗДАНИЕ ПАГИНАЦИИ!!!

            await createDotsPagination()

            // функция создающая каждому списку лист-пагинейшн
            async function createDotsPagination() {
                const boxCount = i_refs.currentScrollBox.children.length; //количество детей бокса с элементами
                const dots = []; //массив дотс-пагинейшн

                //создать элементы пагинации не больше 4х
                if (boxCount != 1) {
                    for (let i = 0; boxCount < 4 ? i < boxCount : i < 4; i++) {
                        dots.push('<li class="dots"></li>');
                    }
                }

                i_refs.currentScrollPag.insertAdjacentHTML("beforeend", (dots.reduce((acc, el) => acc += el, ''))); //добавляем доты

                const allDotsList = document.querySelectorAll('.scrolling_pagination');
                const hoverDots = allDotsList[i].children[0]; //лист прорисованых дотсов
                hoverDots.style.backgroundColor = 'orange'; //присвоение дефолтного цвета доту пагинации
            }
        }
    }

    //РАБОТА С ПАГИНАЦИЕЙ!!!

    //изменение цвета - ховер пагинации
    function getScrollHoverPagination() {

        const allDotsList = document.querySelectorAll('.scrolling_pagination');

        for (let i = 0; i < allDotsList.length; i++) {

            const currentDotsList = allDotsList[i]
            let currentIdx = idxArr[i];

            delHoverPagEl() //удаляем активный ховер

            for (let j = 0; j < currentDotsList.children.length; j++) {
                if (j === currentIdx) {
                    currentDotsList.children[j].style.backgroundColor = 'orange';
                }
            }

            //находит и изменяет цвет ховера пагинации на дефолтный 
            function delHoverPagEl() {
                for (let j = 0; j < currentDotsList.children.length; j++) {
                    if (currentDotsList.children[j].style.backgroundColor = 'orange') {
                        currentDotsList.children[j].style.backgroundColor = '#ccc';
                    }
                }
            }
        }
    }
};

scroll();