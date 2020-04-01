const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

for (let i = 1; i <= 5; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute('src', 'pictures/pic' + i + 'jpg');
  thumbBar.appendChild(newImage);
  newImage.onclick = function(p) {
    displayedImage.src = p.target.src;
  }
}

/* Wiring up the Darken/Lighten button */
btn.onclick = function() {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class','ligth');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class','dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}


//This is kind of a useless test 
let img_array = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];
//img_array.forEach(element => console.log(element)); {
  const newImage = document.createElement("img");
  newImage.setAttribute('src', 'images/' + img_array.forEach(element => console.log(element)));
  thumbBar.appendChild(newImage);
  newImage.onclick = function(p) {
      displayedImage.src = p.target.src;
  }
//}