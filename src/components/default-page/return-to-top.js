



var toTop = document.querySelector("#return-to-top")
  
  toTop.addEventListener("click", function(){
  scrollToTop(1000);
});
function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },15);
}


window.addEventListener("scroll", scrollWindow)
function scrollWindow(){
    if(pageYOffset >1000){
        toTop.style.display="block";
    }
    if(pageYOffset <1000){
        toTop.style.display="none";
    }
}