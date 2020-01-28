'use strict';

import '../carousel/scroll-style.css';

// отдельная функция которая на вход принимает массив с обьявлениями и выводит его с возможностью скролить пока не закончатся и начинать заново с первого обьявления в массиве

export const scroll = async () => {

    const refs = {
        mainTable: document.querySelector('.mainTable'),
        scrollBoxAll: document.querySelectorAll('.scroll-box'),
        scrollPagAll: document.querySelectorAll('.scrolling_pagination'),
        nxtBtnAll: document.querySelectorAll('.nxt-scroll'),
        prvBtnAll: document.querySelectorAll('.prv-scroll'),

        desctop: window.screen.width >= 1200,
        tablet: window.screen.width >= 768,
        mobile: window.screen.width < 768
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
                if (refs.desctop) {
                    if (idxArr[i] >= i_refs.currentScrollBox.children.length - 4) {
                        currentIdx = 0;
                    } else {
                        currentIdx += 1;
                    }
                } else if (refs.tablet) {
                    if (idxArr[i] >= i_refs.currentScrollBox.children.length - 2) {
                        currentIdx = 0;
                    } else {
                        currentIdx += 1;
                    }
                } else if (refs.mobile) {
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
            };

            //функция минусует индекс с которым мы работаем
            function decrementIdx() {

                if (refs.desctop) {
                    if (idxArr[i] === 0) {
                        currentIdx = i_refs.currentScrollBox.children.length - 4;
                    } else {
                        currentIdx -= 1;
                    }
                } else if (refs.tablet) {
                    if (idxArr[i] === 0) {
                        currentIdx = i_refs.currentScrollBox.children.length - 2;
                    } else {
                        currentIdx -= 1;
                    }
                } else if (refs.mobile) {
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
            };

            //функция смещающая слайд
            function getCurrentSlide() {
                i_refs.currentScrollBox.style.transform = `translateX(-${currentIdx}00%)`;
            }

        }

    }


    // РЕДАКТИРОВАНИЕ ЛИСТА ОТНОСИТЕЛЬНО ШИРИНЫ ДИСПЛЕЯ

    setTimeout(getEditedList, 7000);

    // функция создающая каждому списку адаптивный лист
    async function getEditedList() {

        for (let i = 0; i < refs.scrollBoxAll.length; i++) {

            const i_refs = {
                currentScrollBox: refs.scrollBoxAll[i],
                currentScrollPag: refs.scrollPagAll[i],
                currentNextBtn: refs.nxtBtnAll[i],
                currentPrvBtn: refs.prvBtnAll[i]
            }

            // РЕДАКТОР ВИДИМОСТИ КНОПОК ЛИСТА

            // функция добавляет кнопки если есть необходимость
            async function getBtn() {
                
                    const mobileState = i_refs.currentScrollBox.children.length > 1;
                    const tabletState = i_refs.currentScrollBox.children.length > 2;
                    const desctopState = i_refs.currentScrollBox.children.length > 4;

                if (refs.desctop) {

                    if (desctopState) {
                        i_refs.currentNextBtn.style.display = 'inline-block';
                        i_refs.currentPrvBtn.style.display = 'inline-block';
                        return
                    }

                } else if (refs.tablet) {

                    if (tabletState) {
                        i_refs.currentNextBtn.style.display = 'inline-block';
                        i_refs.currentPrvBtn.style.display = 'inline-block';
                        return
                    }

                } else

                if (mobileState) {
                    i_refs.currentNextBtn.style.display = 'inline-block';
                    i_refs.currentPrvBtn.style.display = 'inline-block';
                    return
                }
                
            }

            // АДАПТИВ ЛИСТА ДЛЯ МОБИЛЬНОЙ ПЛАТФОРМЫ !!!

            // функция редактирующая количество элементов листа мобильной версии
            async function getMobileList() {
                if (refs.mobile) {
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

                i_refs.currentScrollPag.insertAdjacentHTML("beforeend", (dots.reduce((acc, el) => acc += el, ''))); //добавляем дотсы

                const allDotsList = document.querySelectorAll('.scrolling_pagination');
                const hoverDots = allDotsList[i].children[0]; //каждый дотс с нулевым индексом
                if(hoverDots !== undefined){
                hoverDots.style.backgroundColor = 'orange'; //присвоение дефолтного цвета первому доту пагинации
            }
            }


            // проверка разрешениия и запуск адаптива для мобильной версии 
            if (refs.mobile) {
                await getMobileList();
                await createDotsPagination();
            }

            await getBtn();
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