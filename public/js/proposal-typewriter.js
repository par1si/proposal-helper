const body = document.getElementById('body');

// Typewriter effect
let i = 0;
const txt = 'Build a 1 & 3 year proposal easily, below.';
const speed = 30;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("subtitle-text").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

setTimeout(typeWriter, 1200);