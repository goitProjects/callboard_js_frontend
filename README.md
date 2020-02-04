# Проект JavaScript

## Готовый проект:

Если не отображаются объявления, отключите addblocker для этого сайта у себя в браузере и перезагрузите страницу

```
https://goitprojects.github.io/callboard_js_frontend/
```

## Bootcamp 17 🔥

[Trello](https://trello.com/invite/b/Q8zzxdyU/325756c89520fe8514819ad18b2c853a/bootcamp17)

[Макеты](https://drive.google.com/drive/folders/1pN4P5RzBIJdDANwGznuTnohpYPm1SuyX)

```Fetch
базовый url для запроса --- https://dashads.goit.co.ua/api/v1
Методы для всплывающих оповещений, должны появляться при добавлении, удалении --- axios.getΩhttps://sciactive.com/pnotify/ )
Полуение всех обьявлений в нашей базе, для отрисовки на стартовой страницы axios.get(https://dashads.goit.co.ua/api/v1/ads/all) Получаем массыв с возможностью добавления дополнительных параметров
    "totalDocs": 50,
    "limit": 10, --- максимальное количество объявлений при первом запросе
    "hasPrevPage": false, --- наличие возможности перейти на предведущую страницу (нужно для отображения кнопки "вперед" или "назад")
    "hasNextPage": true,  --- наличие возможности перейти на предведущую страницу (нужно для отображения кнопки "вперед" или "назад")
    "page": 1, --- страница
    "totalPages": 5, --- всего страниц
    "pagingCounter": 1, --- сколько всего страниц отображается
    "prevPage": null, --- наличие предведущей страницы
    "nextPage": 2, --- какая следующая страница

Получение обьявления по id --- axios.get(https://dashads.goit.co.ua/api/v1/ads/{ // указываем id обьявления 5d8cdf235c35f91a27d75b8f' }) , у каждого обьявления есть id который можно использовать для отображении расшыренной информации дпри клике на карточку с товаром
Выбор лимита выдачи обявлений --- axios.get('https://dashads.goit.co.ua/api/v1/ads/all?limit={ лимит }&page={ номер страрницы }')
Получение обьявлений по категориям axios.get('https://dashads.goit.co.ua/ads/all?category=${ номер категории }&page=${ номер страницы }')
---------------------------- авторизация ----------

регистрация юзера --- axios.post('https://dashads.goit.co.ua/api/v1/auth/register`, { email: email, password: password, name: name, })
при регистрации пользователя в ответ получаем обьект в котором будет вся служебная информация про юзера ! все его обьявления и его избранные, а так же token
вход для зарегистрированных юзеров --- axios.post('https://dashads.goit.co.ua/api/v1/auth/login', { email: "test9@gmail.com", password: "qwerty" })
в ответ получаем такой же обьект как и при регистрации + обязательно указать email и login при запросе иначе будет ошибка, также ошибка будет при не правильном вводе
выход пользователя axios.post('https://dashads.goit.co.ua/api/v1/auth/logout', { email: email, password: password, }, { headers: { Authorization: token, })
обязательно указать обьект с email и password который вводили для входа в приложение и передать token, произойдет розлогирование и старый token больше не будет подходить для входа

---------------------------- добавление обьявлений ----------
карточка для добавления товара --- axios.post(https://dashads.goit.co.ua/api/v1/ads, { images : '', title: '', category: '', price: ', pho: '', description : '' }, { headers: { Authorization: this.userToken, }, }) одна для всех с обязательными полями для заполнения, при добавлении обьявления оно автоматически будет лежать вверху общего поиска
удаление обьявления --- axios.delete(https://dashads.goit.co.ua/api/v1/ads/${adId}, { headers: { Authorization: token, }, }); передаем token юзера и по нему удаляем

--------------------------- favorites ------------
получение favorites:  axios.get(`https://dashads.goit.co.ua/api/user/favorites, {
headers: { Authorization: token }})

запись favorites: axios.put(`https://dashads.goit.co.ua/api/user/favorite/${id}`, {
        headers: { Authorization: token }
      });

удаление favorites: axios.delete(`https://dashads.goit.co.ua/api/user/favorite/${id}`, {
        headers: { Authorization: token }
      });

---------------------------  получение своих обьявлений user ------------

получение all ads: axios.get(`https://dashads.goit.co.ua/ads`, {
        headers: { Authorization: token }
      });
```
