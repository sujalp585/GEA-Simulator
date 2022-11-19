
/*--------------------------------------------Light Animation--------------------------------------------*/

const innerCircle1 = document.querySelector(".circle1");
const innerCircle2 = document.querySelector(".circle2");
const innerCircle3 = document.querySelector(".circle3");
const innerCircle4 = document.querySelector(".circle4");

const lightButton0 = document.querySelector(".lightButton0");
const lightButton1 = document.querySelector(".lightButton1");
const lightButton2 = document.querySelector(".lightButton2");

const lightLight = document.querySelector(".lightLight");

const lightEffect1 = document.querySelector(".lightEffect1");
const lightEffect2 = document.querySelector(".lightEffect2");



console.log(innerCircle1.style);
console.log(innerCircle2.style);
console.log(innerCircle3.style);
console.log(innerCircle4.style);

console.log(lightButton0.style);
console.log(lightButton1.style);
console.log(lightButton2.style);

console.log(lightLight.style);

console.log(lightEffect1.style);
console.log(lightEffect2.style);

lightButton1.addEventListener('click', () => {
  innerCircle1.style.backgroundColor ='#fffafa';
  innerCircle1.style.filter = "contrast(70%)";

  innerCircle2.style.backgroundColor ='#fffafa';
  innerCircle2.style.filter = "contrast(70%)";

  innerCircle3.style.backgroundColor ='#fffafa';
  innerCircle3.style.filter = "contrast(70%)";

  innerCircle4.style.backgroundColor ='#fffafa';
  innerCircle4.style.filter = "contrast(70%)";

  lightLight.style.backgroundColor ='#32f232';

  lightEffect1.style.backgroundColor ='#fffafa';
  lightEffect1.style.filter = "contrast(70%)";
  
  lightEffect2.style.backgroundColor = '#fffafa';
  lightEffect2.style.filter = "contrast(70%)";

  update_state("light_dim");
})

lightButton2.addEventListener('click', () => {
  innerCircle1.style.backgroundColor ='#fffafa';
  innerCircle1.style.filter = "brightness(100%)";

  innerCircle2.style.backgroundColor ='#fffafa';
  innerCircle2.style.filter = "brightness(100%)";

  innerCircle3.style.backgroundColor ='#fffafa';
  innerCircle3.style.filter = "brightness(100%)";

  innerCircle4.style.backgroundColor ='#fffafa';
  innerCircle4.style.filter = "brightness(100%)";

  lightLight.style.backgroundColor ='#32f232';

  lightEffect1.style.backgroundColor ='white';
  lightEffect1.style.filter = "brightness(100%)";

  lightEffect2.style.backgroundColor = 'white';
  lightEffect2.style.filter = "brightness(100%)";

  update_state("light_high");
})

lightButton0.addEventListener('click', () => {
  innerCircle1.style.backgroundColor ='';

  innerCircle2.style.backgroundColor ='';

  innerCircle3.style.backgroundColor ='';

  innerCircle4.style.backgroundColor ='';

  lightLight.style.backgroundColor ='red';

  lightEffect1.style.backgroundColor ='';
  lightEffect2.style.backgroundColor = '';

  update_state("light_off");
})


/*----------------------------Delay Button Animation--------------------------------*/

const delayButton0 = document.querySelector(".delayButton0");
const delayButton1 = document.querySelector(".delayButton1");

const delayLight = document.querySelector(".delayLight");



console.log(delayButton0.style);
console.log(delayButton1.style);

console.log(delayLight.style);


delayButton1.addEventListener('click', () => {
  delayLight.style.backgroundColor ='#32f232';
  update_state("delay_off");
})

delayButton0.addEventListener('click', () => {
  delayLight.style.backgroundColor ='red';
  update_state("delay_on");
})




/*--------------------------------------------------------------Fan Animation------------------------------------------------*/

let fanimg1 = document.querySelector(".fanimg1");
let fanimg2 = document.querySelector(".fanimg2");

let btns = document.querySelectorAll(".fanButtonsGroup p");

let fanLight = document.querySelector(".fanLight");



btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let arr = [];
      e.target.parentNode.querySelectorAll("p").forEach((child) => {
        if (child !== e.target) {
          if (e.target.classList.contains("fanButton1")) {
            fanLight.style.backgroundColor = '#32f232';

            fanimg1.classList.add("fanButton1");
            fanimg1.style.animationDuration = '0.4s';
            fanimg1.style.animationPlayState = 'running';

            fanimg2.classList.add("fanButton1");
            fanimg2.style.animationDuration = '0.4s';
            fanimg2.style.animationPlayState = 'running';

          } else if (e.target.classList.contains("fanButton2")) {
            fanLight.style.backgroundColor = '#32f232';

            fanimg1.classList.add("fanButton2");
            fanimg1.style.animationDuration = '80ms';
            fanimg1.style.animationPlayState = 'running';

            fanimg2.classList.add("fanButton2");
            fanimg2.style.animationDuration = '80ms';
            fanimg2.style.animationPlayState = 'running';

          } else if (e.target.classList.contains("fanButton3")) {
            fanLight.style.backgroundColor = '#32f232';

            fanimg1.classList.add("fanButton3");
            fanimg1.style.animationDuration = '11ms';
            fanimg1.style.animationPlayState = 'running';

            fanimg2.classList.add("fanButton3");
            fanimg2.style.animationDuration = '11ms';
            fanimg2.style.animationPlayState = 'running';

          } else if (e.target.classList.contains("fanButton4")) {
            fanLight.style.backgroundColor = '#32f232';

            fanimg1.classList.add("fanButton4");
            fanimg1.style.animationDuration = '0.8ms';
            fanimg1.style.animationPlayState = 'running';

            fanimg2.classList.add("fanButton4");
            fanimg2.style.animationDuration = '0.8ms';
            fanimg2.style.animationPlayState = 'running';

          } else if (e.target.classList.contains("fanButton0")) {
            fanLight.style.backgroundColor = 'red';

            fanimg1.classList.add("fanButton0");
            fanimg1.style.animationPlayState = 'paused';
            
            fanimg2.classList.add("fanButton0");
            fanimg2.style.animationPlayState = 'paused';

          } 

        }
      })
  })
})


const fanButton1 = document.querySelector(".fanButton1");
const fanButton2 = document.querySelector(".fanButton2");
const fanButton3 = document.querySelector(".fanButton3");
const fanButton4 = document.querySelector(".fanButton4");
const fanButton0 = document.querySelector(".fanButton0");

console.log(fanButton1.style);
console.log(fanButton2.style);
console.log(fanButton3.style);
console.log(fanButton4.style);
console.log(fanButton0.style);

fanButton1.addEventListener('click', () => {
  update_state("fan_low");
})
fanButton2.addEventListener('click', () => {
  update_state("fan_mid");
})
fanButton3.addEventListener('click', () => {
  update_state("fan_fast");
})
fanButton4.addEventListener('click', () => {
  update_state("fan_boost");
})
fanButton0.addEventListener('click', () => {
  update_state("fan_stop");
})
/*-------------------------------------------------------------------Timer---------------------------------------------------------*/


let start = document.querySelector(".start");
let reset = document.querySelector(".reset");

let h = document.querySelector(".inputHour");
let m = document.querySelector(".inputMin");
let s = document.querySelector(".inputSec");





var startTimer = null;



start.addEventListener('click', function(){


})








/*---------------------------------------------------------------------EXTRA-------------------------------------------------------*/

/*
$('.lightButton1').click(function() {
  $('.circle1').css({
      'background-color': 'red',
  });
});




let innerCircle1 = document.querySelector(".circle1");
let innerCircle2 = document.querySelector(".circle2");
let innerCircle3 = document.querySelector(".circle3");
let innerCircle4 = document.querySelector(".circle4");
let lightBtns = document.querySelectorAll(".lightButtonsGroup p");
let lightLight = document.querySelector(".lightLight");

lightBtns.forEach((btn) => {
  lightBtns.addEventListener("click", (l) => {
    let arr = [];
    l.target.parentNode.querySelectorAll("p").forEach((child) => {
      if (child !== e.target) {
        if (l.target.classList.contains("lightButton1")) {
          innerCircle1.classList.add("lightButton1");
          innerCircle1.style.backgroundColor = 'red';
          innerCircle1.style.animationPlayState = 'running';
          innerCircle2.classList.add("lightButton1");
          innerCircle2.style.backgroundColor = 'red';
          innerCircle2.style.animationPlayState = 'running';
          innerCircle3.classList.add("lightButton1");
          innerCircle3.style.backgroundColor = 'red';
          innerCircle4.classList.add("lightButton1");
          innerCircle4.style.backgroundColor = 'red';
          lightLight.style.backgroundColor = 'green';
        } else if (l.target.classList.contains("lightButton2")) {
          innerCircle1.classList.add("lightButton2");
          innerCircle1.style.backgroundColor = 'red';
          innerCircle2.classList.add("lightButton2");
          innerCircle2.style.backgroundColor = 'red';
          innerCircle3.classList.add("lightButton2");
          innerCircle3.style.backgroundColor = 'red';
          innerCircle4.classList.add("lightButton2");
          innerCircle4.style.backgroundColor = 'red';
          lightLight.style.backgroundColor = 'green';
        } else if (l.target.classList.contains("lightButton0")) {
          innerCircle1.classList.add("lightButton0");
          innerCircle1.style.backgroundColor = 'red';
          innerCircle2.classList.add("lightButton0");
          innerCircle2.style.backgroundColor = 'red';
          innerCircle3.classList.add("lightButton0");
          innerCircle3.style.backgroundColor = 'red';
          innerCircle4.classList.add("lightButton0");
          innerCircle4.style.backgroundColor = 'red';
          lightLight.style.backgroundColor = 'red';
      }
    })
  })
})














/*
let timerStartMinutes = 1;
let time = 1 * 60;

setInterval(hoodTimer, 1000);

function hoodTimer() {
  const minutes = Math.floor( (time/1000/60) % 60 );
  const hours = Math.floor( (time/(1000*60*60)) % 24 );

  return {
    time, 
    hours,
    minutes
  };

  let timerElement = document.getElementById('hoodTimer')

  timerElement.innerHTML = '${hours}:${minutes}';
  
  time--;

}
*/



  /*
  function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  
  return {
    total,
    hours,
    minutes
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);*/