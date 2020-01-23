
import services from "../../services";
import axios from "axios";

// Логин пользователя
const accout = { email: "em@ss.ua", password: "111111"};
const fasdfa =  services.postLoginUser(accout).then(console.log)


// --------------------------- favorites ------------
// получение favorites:  axios.get(`https://dashads.goit.co.ua/api/user/favorites, {
// headers: { Authorization: token }})

// запись favorites: axios.put(`https://dashads.goit.co.ua/api/user/favorite/${id}`, {
//         headers: { Authorization: token }
//       });

// удаление favorites: axios.delete(`https://dashads.goit.co.ua/api/user/favorite/${id}`, {
//         headers: { Authorization: token }
//       });

// ---------------------------  получение своих обьявлений user ------------

// получение all ads: axios.get(`https://dashads.goit.co.ua/ads`, {
//         headers: { Authorization: token }
//       })



const tokenAcc = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjViZWE2MmFhNzhiNjUxNzdmZjUwMCIsImlhdCI6MTU3OTc3NTA0OH0.KFJUoWxQ9uuIQQElIw2wp7QCgT4f-LGeaVEovEyPaiU';

const test =  axios.get(`https://dashads.goit.co.ua/api/user/favorites/{headers:{Authorization: ${tokenAcc} }}`).then(console.log)

