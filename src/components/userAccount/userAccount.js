
import services from "../../services";

// Логин пользователя
services.postLoginUser({ email: "em@ss.ua", password: "111111"}).then(console.log)
