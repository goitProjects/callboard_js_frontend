import "./components/startPage";
import services from "./services";
import itemHBS from "./item.hbs";

const ref={
    body: document.querySelector("body")
};



  
  
  function firstCategory(categoryArr) {
    //   const makeup = menu.map(menu => menuItem(menu)).join('');
  const categoryLayout =itemHBS(categoryArr)

      ref.body.insertAdjacentHTML('beforeend', categoryLayout);
    }


let item = services.getAdsByCategory(2).then(res => {
    console.log(res.data.ads.docs);
    
    firstCategory(res.data.ads.docs);
})

// services.getAdsByCategory(2).then(console.log)
