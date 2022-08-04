const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeTable = document.querySelector('#time'),
      board = document.querySelector('#board'),
      ownTime = document.querySelector('#time-own-btn');

let time = 0;
let score = 0;

let a, b, c;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});


timeList.addEventListener('click', e => {
    if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

ownTime.addEventListener('click', () => {
    time = parseInt(prompt("Введите своё время: "));
    screens[1].classList.add('up');
    startGame();
});

board.addEventListener('click', e => {
    if(e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTimer, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTimer() {
    if(time === 0) {
        gameOver();
    } else {
        let currentTime = --time;
        if(currentTime < 10) {
            currentTime = `0${currentTime}`;
        }
        setTime(currentTime);
    }
}

function setTime(value) {
    timeTable.innerHTML = `00:${value}`;
}

function gameOver() {
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
    timeTable.parentNode.classList.add('hide');
}

function createRandomCircle() {
    a = Math.random() * 255;
    b = Math.random() * 255;
    c = Math.random() * 255;
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.backgroundColor = `rgb(${a}, ${b}, ${c})`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}