import { fetcher } from "./modalCreateAd";
import axios from 'axios';
import './modal-styles.css';

const createAdLink = document.getElementById('create-ad');
console.log(createAdLink);
const modalWindow = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.btn-close');
const createAdBtn = document.querySelector('.btn-create-ad')

const createAd = () => {
	console.log('click add btn');
}

const openModal = () => {
	console.log('1111');
	modalWindow.classList.toggle('closed');
	modalOverlay.classList.toggle('closed');


}

const closeModal = () => {
	modalWindow.classList.toggle('closed');
	modalOverlay.classList.toggle('closed');
}
closeBtn.addEventListener('click', closeModal);
createAdLink.addEventListener('click', openModal);
createAdBtn.addEventListener('click', createAd);



const fetchUserRegister = async () => {
const data = await axios.post(`https://dashads.goit.co.ua/api/v1/auth/register`, { email: 'email9@email.com', password: 'password', name: 'name', })
console.log(data);
}
//fetchUserRegister();

export default fetcher;