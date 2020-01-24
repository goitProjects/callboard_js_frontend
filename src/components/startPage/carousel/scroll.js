'use strict';

import '../carousel/scroll-style.css';

// отдельная функция которая на вход принимает массив с обьявлениями и выводит его с возможностью скролить пока не закончатся и начинать заново с первого обьявления в массиве

export const scroll = async () => {

    const refs = {
        mainTable: document.querySelector('.mainTable'),
        scrollBoxAll: document.querySelectorAll('.scroll-box'),
        scrollBoxItemAll: document.querySelector('.scroll-box_item'),
        scrollPagAll: document.querySelectorAll('.scrolling_pagination'),
        nxtBtnAll: document.querySelectorAll('.nxt-scroll'),
        prvBtnAll: document.querySelectorAll('.prv-scroll')

    }

    // ЗАДАНО ДЕЙСТВУЮЩИЙ ИНДЕКС!!!

    const idxArr = []; //массив, хранящий индек текущего состояния смещения слайда

   
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
                }

                idxArr[i] = currentIdx;

                getCurrentSlide();
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
            };

            //функция смещающая слайд
            function getCurrentSlide() {
                i_refs.currentScrollBox.style.transform = `translateX(-${currentIdx}00%)`;
            }

        }

    }

};

scroll();