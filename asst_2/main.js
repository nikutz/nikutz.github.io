const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

//Looping through images 

const img_array = [
  "images/pic1.jpg",
  "images/pic2.jpg",
  "images/pic3.jpg",
  "images/pic4.jpg",
  "images/pic5.jpg"
];

//This foreach funciton works, I just can get button to go

img_array.forEach(function(item) {
  let newImage = document.createElement("img");
  newImage.setAttribute("src", item);
  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", setImage);
});

function setImage(e) {
  // get the file path of the thumbnail picture
  let imgPath = e.target.getAttribute("src");

  // set thumbnail as the picture displayed
  displayedImage.setAttribute("src", imgPath);
}



/* Wiring up the Darken/Lighten button */

btn.onclick = function() {
  if(btn.getAttribute("class") == "dark")
  {
    btn.setAttribute("class", "light");
    btn.textContent = "lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  }
  else
  {
    btn.setAttribute("class", "dark");
    btn.textContent = 'darken';
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
}