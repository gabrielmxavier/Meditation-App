
var inicio = true;
var startTimerButton = document.querySelector('.starButton');
var pauseTimerButton = document.querySelector('.btn');
var timerDisplay = document.querySelector('.watch');
var timerDisplayMinutes = document.querySelector('.minutes');
var timerDisplaySecond = document.querySelector('.seconds');
var timerDisplayCentiseconds = document.querySelector('.centiseconds');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
var reseted = 0;

const container = document.getElementById('container');
const text = document.getElementById('text');


function startTimer() {

    if (!running && inicio) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        paused = 0;
        running = 1;
        reseted = 0;
        inicio = false;
        var stopBtn = document.querySelector('.btn');
        stopBtn.className = 'startButton';
        stopBtn.innerHTML = 'STOP';

        const totalTime = 7500;
        const breatheTime = (totalTime / 5) * 2;
        const holdTime = totalTime / 5;

        function breathAnimation() {
            text.innerText = 'Breathe In';
            container.className = 'container-grow';
          
            setTimeout(() => {
              text.innerText = 'Hold';
          
              setTimeout(() => {
                text.innerText = 'Breathe Out';
                container.className = 'container-shrink';
              }, holdTime);
            }, breatheTime);
        };

        setInterval(breathAnimation, totalTime);
        breathAnimation();

    } else {
        clearInterval(tInterval);
        savedTime = difference;
        paused = 1;
        running = 0;
        reseted = 0;
        inicio = true;
        var startBtn = document.querySelector('.startButton');
        startBtn.className = 'btn';
        startBtn.innerHTML = 'START';

        const totalTime = 0;
        const breatheTime = 0;
        const holdTime = 0;

        function breathAnimation() {
            text.innerText = 'Breathe In';
            container.className = 'container';
          
            setTimeout(() => {
              text.innerText = 'Breathe In';
          
              setTimeout(() => {
                text.innerText = 'Meditation';
                container.className = 'breath';
              }, holdTime);
            }, breatheTime);
        };

        window.location.reload(true);
        setInterval(breathAnimation, totalTime);
    };
};

function getShowTime() {
    updatedTime = new Date().getTime();

    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }

    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((difference % (1000 * 60)) / 100);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;

    timerDisplayMinutes.innerHTML = minutes;
    timerDisplaySecond.innerHTML = seconds;
    timerDisplayCentiseconds.innerHTML = milliseconds;
};