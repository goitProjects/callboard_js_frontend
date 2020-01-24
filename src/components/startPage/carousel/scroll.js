'use strict';

import '../carousel/scroll-style.css';

// отдельная функция которая на вход принимает массив с обьявлениями и выводит его с возможностью скролить пока не закончатся и начинать заново с первого обьявления в массиве

export const scroll = async () => {

    const refs = {
        mainTable: document.querySelector('.mainTable'),
        scrollingAll: document.querySelectorAll('.scrolling'),
        scrollBoxAll: document.querySelectorAll('.scroll-box'),
        scrollPagAll: document.querySelectorAll('.scroll-pagination'),
        nxtBtnAll: document.querySelectorAll('.next-scroll'),
        prvBtnAll: document.querySelectorAll('.prev-scroll'),

        scrollBox: document.querySelector('.scroll-box'),
        scrollPag: document.querySelector('.scroll-pagination'),
        nxtBtn: document.querySelector('.next-scroll'),
        prvBtn: document.querySelector('.prev-scroll')

    }

    // ЗАДАНО ДЕЙСТВУЮЩИЙ ИНДЕКС!!!

    const idxArr = []; //массив, хранящий индек текущего состояния смещения слайда

    let boxCount = refs.scrollBox.childElementCount; //количество детей бокса с элементами

    // АДАПТИВ ЛИСТА ДЛЯ МОБИЛЬНОЙ ПЛАТФОРМЫ

    // функция редактирующая лист для мобильной версии
    function MobileList() {
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

    // MobileList()

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



    // АДАПТИВ ЛИСТА ДЛЯ МОБИЛЬНОЙ ПЛАТФОРМЫ

    // функция создающая лист пагинации для мобильной версии
    function getMobilePagination() {

        // console.log(refs.scrollBoxAll.length)
        
        for (let i = 0; i < refs.scrollBoxAll.length; i++) {
            // console.log(i)
            console.dir(refs.scrollBoxAll[i].children);

            let i_refs = {
                currentScrollBox: refs.scrollBoxAll[i],
                currentScrollPag: refs.scrollPagAll[i],
                currentNextBtn: refs.nxtBtnAll[i],
                currentPrvBtn: refs.prvBtnAll[i]
            }

            // MobileList();

            window.onload = function MobileList() {
                console.log(i_refs.currentScrollBox)
                if (window.screen.width < 768) {
                    if (i_refs.currentScrollBox.childElementCount > 4) {
                        // const scrollBoxAll = document.querySelectorAll('.scroll-box'); //массив всех элементов
                        // const el = scrollBoxAll[0].children[refs.scrollBox.childElementCount - 1]; //последний элемент массива 
                        // el.remove(); //удаляем последний
                        // getMobileList();
                    } else {
                        return
                    };
                }
            }
        }
    }

    getMobilePagination();

    // function MobileList() {
    //     if (window.screen.width < 768) {
    //         if (refs.scrollBox.childElementCount > 4) {
    //             const scrollBoxAll = document.querySelectorAll('.scroll-box'); //массив всех элементов
    //             const el = scrollBoxAll[0].children[refs.scrollBox.childElementCount - 1]; //последний элемент массива 
    //             el.remove(); //удаляем последний
    //             getMobileList();
    //         } else {
    //             return
    //         };
    //     }
    // }






    // СМЕЩЕНИЕ СЛАЙДА

    refs.mainTable.addEventListener('click', changeSlide);

    function changeSlide(e) {
        e.preventDefault();

        let currentIdx = 0;

        for (let i = 0; i < refs.scrollBoxAll.length; i++) {

            if (idxArr[i] == undefined) {
                idxArr[i] = 0;
            }

            currentIdx = idxArr[i];

            // console.log(i)
            // console.log(idxArr[i])
            // console.log(currentIdx)

            let i_refs = {
                currentScrollBox: refs.scrollBoxAll[i],
                currentScrollPag: refs.scrollPagAll[i],
                currentNextBtn: refs.nxtBtnAll[i],
                currentPrvBtn: refs.prvBtnAll[i]
            }

            if (e.target === i_refs.currentNextBtn) {
                // console.log(i_refs.currentNextBtn);
                incrementIdx();
            }

            if (e.target === i_refs.currentPrvBtn) {
                // console.log(i_refs.currentPrvBtn);
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
                }

                idxArr[i] = currentIdx;

                getCurrentSlide();
                // hoverPagEl();
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
                }

                idxArr[i] = currentIdx;

                getCurrentSlide();
                // hoverPagEl();
            };

            //функция смещающая слайд
            function getCurrentSlide() {
                i_refs.currentScrollBox.style.transform = `translateX(-${currentIdx}00%)`;
            }

        }

    }

};

scroll();