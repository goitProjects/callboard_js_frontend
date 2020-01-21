'use strict';

import '../SS/style.css';

// отдельная функция которая на вход принимает массив с обьявлениями и выводит его с возможностью скролить пока не закончатся и начинать заново с первого обьявления в массиве

export const scroll = async () => {

    const refs = {
        container: document.querySelector('.container'),
        scrollBox: document.getElementById('scroll-box'),
        scrollPag: document.getElementById('scroll-pagination'),
        nxtBtn: document.getElementById('next-scroll'),
        prvBtn: document.getElementById('prev-scroll')
    }

    let boxCount = refs.scrollBox.childElementCount;
    const dots = [];

    if (boxCount != 1) {
        for (let i = 0; boxCount < 4 ? i < boxCount : i < 4; i++) {
            dots.push('<li class="dots"></li>');
        }
    }

    refs.scrollPag.insertAdjacentHTML("beforeend", (dots.reduce((acc, el) => acc += el, '')));

    console.log(refs.scrollPag)

    refs.scrollPag.addEventListener('click', getPagImg);

    function getPagImg(e) {
        e.preventDefault();
        console.dir(e.target)
        // console.dir(refs.scrollPag)
    }

    let currentIdx = 0;
    // addItems(currentIdx);

    console.dir(refs.container);


    

// ----------------------------------------------------------------------------------
    // refs.nxtBtn.addEventListener('click', incrementIdx)
    // refs.prvBtn.addEventListener('click', decrementIdx)



    // function incrementIdx(e) {
    //     e.preventDefault();
    //     if (currentIdx === scroll.length - 1) {
    //         currentIdx = 0
    //     } else {
    //         currentIdx += 1;
    //     }

    //     console.log(currentIdx)

    //     addItems()
    // };

    // function decrementIdx(e) {
    //     e.preventDefault();
    //     if (currentIdx === (0)) {
    //         currentIdx = arr.length - 1;
    //     } else {
    //         currentIdx -= 1;
    //     }

    //     console.log(currentIdx)

    //     addItems()
    // };

    // function addItems() {
    //     const currentItems = arr.reduce((acc, el, idx) => {

    //         // acc += el;

    //         if (refs.container.style.width < '688px') {
    //             if (currentIdx === idx) {
    //                 acc += el;
    //             }
    //         }


    //         if (refs.container.style.width >= '688px') {

    //             acc += el

    //         }

    //         if (refs.container.style.width >= '1200px') {
    //             console.dir(container.style.width);
    //             // for (let i = currentIdx; i < currentIdx + 3; i++) {
    //             //     acc += el
    //             // }

    //         }

    //         return acc;

    //     }, '');

    //     refs.scroll_container.innerHTML = "";
    //     refs.scroll_container.insertAdjacentHTML("beforeend", currentItems);
    // }

}

scroll();


// --------------------------------------------------------------------------------------
// function Slider(element) {
//     this.loadStatic();
//     this.el = document.querySelector(element);
//     this.init();
// }
 
// Slider.prototype = {
//     init: function () {
//         this.links = this.el.querySelectorAll("#slider-nav a");
//         this.wrapper = this.el.querySelector("#slider-wrapper");
//         this.nextBtn = this.el.querySelector("#next");
//         this.prevBtn = this.el.querySelector("#prev");
//         this.navigate();
//     },
//     navigate: function () {
 
//         var self = this;
 
//         for (var i = 0; i < this.links.length; ++i) {
//             var link = this.links[i];
//             link.addEventListener("click", function (e) {
//                 self.slide(this);
//             });
//         }
 
//         self.prevBtn.style.display = 'none';
 
//         self.nextBtn.addEventListener('click', function (e) {
//             var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
//             var nextSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) + 1) + '"]');
 
//             nextSlide.click();
//         }, false);
 
//         self.prevBtn.addEventListener('click', function (e) {
//             var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
//             var prevSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) - 1) + '"]');
 
//             prevSlide.click();
//         }, false);
 
//         self.close();
//     },
 
//     slide: function (element) {
//         this.setCurrentLink(element);
 
//         var index = parseInt(element.getAttribute("data-slide"), 10) + 1;
//         var currentSlide = this.el.querySelector(".slide:nth-child(" + index + ")");
 
//         this.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
 
//         if (index < this.links.length)
//             this.nextBtn.style.display = 'block';
//         else if (index == this.links.length)
//             this.nextBtn.style.display = 'none';
 
//         if (index > 1)
//             this.prevBtn.style.display = 'block';
//         else if (index == 1)
//             this.prevBtn.style.display = 'none';
//     },
 
//     setCurrentLink: function (link) {
//         var parent = link.parentNode;
//         var a = parent.querySelectorAll("a");
 
//         link.className = "current";
//         this.currentElement = link;
 
//         for (var j = 0; j < a.length; ++j) {
//             var cur = a[j];
//             if (cur !== link) {
//                 cur.className = "";
//             }
//         }
//     },
 
//     loadStatic: function () {
 
//         var self = this;
 
//         var link = document.createElement('link');
//         link.rel = 'stylesheet';
//         link.href = 'assets/popupSlider.css';
//         document.head.appendChild(link);
 
//         var sliderHTML = '';
 
//         var xhr = new XMLHttpRequest();
//         xhr.open('GET', 'assets/popupSlider.html', false);
//         xhr.send();
//         if (xhr.status != 200) {
//             alert('Can not load the popupSlider.html. Got the error ' + xhr.status + ': ' + xhr.statusText);
//         } else {
//             sliderHTML = xhr.responseText;
//         }
 
//         var div = document.createElement('div');
//         div.innerHTML = sliderHTML;
//         document.body.appendChild(div);
//     },
 
//     close: function () {
//         document.getElementById('cq-popup-btclose').onclick = function () {
//             document.getElementById('cq-popup-bg').remove();
//             document.getElementById('cq-popup').remove();
//         }
//     }
// };