const inp = document.querySelector("#inputFileToLoad");
const btn = document.querySelector("button");

function toDataURL(src, callback) {
  let xhttp = new XMLHttpRequest();

  xhttp.onload = function() {
    let fileReader = new FileReader();
    fileReader.onloadend = function() {
      callback(fileReader.result);
    };
    fileReader.readAsDataURL(xhttp.response);
  };
  xhttp.responseType = "blob";
  xhttp.open("GET", src, true);
  xhttp.send();
}

function addImage(e) {
  console.log(e.target.value);
  toDataURL(e.target.value, function(dataURL) {
    console.log([dataURL]);
  });
}
btn.addEventListener("click", addImage);
