
/**
 * Plays a song and post steve carell dancing everywhere
 */
function releaseSteves() {

  // remove elements to make room for steve
  const button = document.getElementById('big-red-button');
  button.remove();
  document.getElementById('title').innerHTML = "SOUND UP!";
  // title.remove();

  // play audio
  const audio = new Audio("./art/dance-song.wav");
  audio.play();

  // add in steve in increments
  setTimeout(() => {  
    document.getElementById("gif-2").src = "./art/steve-2.gif";
    setTimeout(() => {  
      const headertitle = document.getElementById('title');
      headertitle.remove();
      document.getElementById("gif-3").src = "./art/steve-3.gif";
      document.getElementById("gif-5").src = "./art/steve-5.gif";
      document.getElementById("gif-4").src = "./art/steve-4.gif";
      document.getElementById("gif-1").src = "./art/steve1.gif";
      document.html.style.backgroundImage = "url(./art/party-back.jpeg)"
    }, 2000);
  }, 6300);
  

  setTimeout(() => {
    location.reload();
  }, 15000);
}

/**
 * Randomly picks an action to perform
 */
function doSomething() {

  // get a random number
  randomNum = Math.floor(Math.random() * 5);

  switch(randomNum) {
    case 0:
      const donkey = new Audio("./art/donkey.mp3");
      donkey.play();
      break;

    case 1:
      const jttw = new Audio("./art/jesus.wav");
      jttw.play();
      // animatePlane()
      document.getElementById("plane").animate([
        // keyframes
        { transform: 'translateX(-1000px)' },
        { transform: 'translateX(2000px)' },
      ], {
        // timing options
        duration: 7000,
        iterations: 1
      });
      break;

    case 2:
      //party time
      releaseSteves();
    break;

    case 3:
      const boing = new Audio("./art/boing.mp3");
      boing.play();
    break;

    case 4:
      // another sound effect
      const tell = new Audio("./art/tellyousomething.mp3");
      tell.play();
    break;

    default:
      releaseSteves();
  }
}


/**
 * listens for the first button click
 */
var b = document.getElementById("big-red-button");
b.addEventListener('click', function() { 
  // location.reload();
  doSomething(); 
});