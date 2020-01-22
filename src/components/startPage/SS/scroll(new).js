'use strict';

import '../SS/scroll(new)-style.css';



function Carousel(setting) {

	/* Scope privates methods and properties */
	let privates = {};

	/* Privates properties */
	privates.setting = setting;

	privates.sel = {
		"main": document.querySelector(privates.setting.main),
		"wrap": document.querySelector(privates.setting.wrap),
		"children": document.querySelector(privates.setting.wrap).children,
		"prev": document.querySelector(privates.setting.prev),
		"next": document.querySelector(privates.setting.next)
	};

	privates.opt = {
		"position": 0,
		"max_position": document.querySelector(privates.setting.wrap).children.length
	};

	// Pagination
	const refs = {
        container: document.querySelector('.container'),
        // scrollBox: document.getElementById('scroll-box'),
        scrollPag: document.getElementById('scroll-pagination'),
        nxtBtn: document.getElementById('next-scroll'),
        prvBtn: document.getElementById('prev-scroll')
    }

	let boxCount = privates.sel.wrap.childElementCount;
	console.log(privates.sel.wrap)
    const dots = [];

    if (boxCount != 1) {
        for (let i = 0; boxCount < 4 ? i < boxCount : i < 4; i++) {
            dots.push('<li class="dots"></li>');
        }
    }

    refs.scrollPag.insertAdjacentHTML("beforeend", (dots.reduce((acc, el) => acc += el, '')));
    refs.scrollPag.addEventListener('click', getPagImg);

    function getPagImg(e) {
        e.preventDefault();

        function getPagIdx() {
            for (let i = 0; i <= e.currentTarget.childNodes.length - 1; i++) {
                if (e.currentTarget.childNodes[i] === e.target) {
                    return i;
                }
            }
        }

        function addActive() {
            delActive();

            const currentElemIdx = getPagIdx();
            refs.scrollBox.children[currentElemIdx].classList.add('isActive')
        }

        function delActive() {
            const active = refs.scrollBox.querySelector('.isActive')
            active.classList.remove('isActive')
            console.log(active)
        }

        if (e.target && e.currentTarget) {
            addActive();
        } else {
            return
        }

    }

	// Control
	if(privates.sel.prev !== null) {
		privates.sel.prev.addEventListener('click', () => {
			this.prev_slide();
		});
	}

	if(privates.sel.next !== null) {
		privates.sel.next.addEventListener('click', () => {
			this.next_slide();
		});
	}
/* Public methods */
// Prev slide
this.prev_slide = () => {
	--privates.opt.position;

	if(privates.opt.position < 0) {
		privates.sel.wrap.classList.add('s-notransition');
		privates.opt.position = privates.opt.max_position - 1;
	}

	privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
};


// Next slide
this.next_slide = () => {
	++privates.opt.position;

	if(privates.opt.position >= privates.opt.max_position) {
		privates.opt.position = 0;
	}

	privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
};
}




new Carousel({
	"main": ".js-carousel",
	"wrap": ".js-carousel__wrap",
	"prev": ".js-carousel__prev",
	"next": ".js-carousel__next"
});