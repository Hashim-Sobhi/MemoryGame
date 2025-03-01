let started = false;
window.onload = function() {
    let memory_board = document.getElementById('memory_board');
    let table = document.createElement('table');
    let emojis = generatePattern();
    let index = 0;
    for(let i = 0; i < 4; i++){
        let row = document.createElement('tr');
        for(let j = 0; j < 4; j++){
            let cell = document.createElement('td');
            cell.className = 'cell';
            cell.dataset.index = index;
            cell.textContent = "❔";
            console.log(emojis[index] + " " + index);
            let emoji = emojis[index];
            cell.addEventListener('click', ()=>flipCard(cell, emoji));
            row.appendChild(cell);
            index++;
        }
        table.appendChild(row);
    }
    memory_board.appendChild(table);
}
let res = 0;
let selected = [];
function flipCard(cell, emoji){
    if(!started){
        resetTimer();
        startTimer();
        started = true;
        
    }
    if(selected.length < 2 && cell.textContent === "❔"){
        cell.classList.add('flipped');
        setTimeout(() => {
            cell.textContent = emoji;
        }, 200);
        selected.push(cell);
    }
    if(selected.length == 2){
        check();
    }
}

function check(){
    document.querySelectorAll('.cell').forEach(
        cell => cell.style.pointerEvents = "none"); 
    
    setTimeout(() => {
        if (selected[0].textContent === selected[1].textContent) {
            selected.forEach(card=>{
                card.style.backgroundColor = "rgb(144, 146, 134)";
            });
            res++;
            if(res == 8){
                setTimeout(() => {
                    showPopup();
                    stopTimer();
                }, 500);
            }
            
        } else {
            selected.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => {
                card.textContent = "❔";
                
            }, 200)}
        );
        }
        setTimeout(() => {
        document.querySelectorAll('.cell').forEach(cell => {
            if (cell.textContent === "❔") {
                cell.style.pointerEvents = "auto";
            }
        })},210);
        selected = [];
    }, 1000);
}


function generatePattern(){
    const emojis = ['😀', '😀', '🎉', '🎉', '🚀', '🚀', '💡', '💡', '🎵', '🎵', '🔥', '🔥', '❤️', '❤️', '🍕', '🍕'];
    let shuffledEmojis = emojis.sort(() => Math.random() - 0.5);
    return shuffledEmojis;
}

let timer;
let totalSeconds = 0;

function startTimer() {
    clearInterval(timer);
    totalSeconds = 0;
    
    timer = setInterval(() => {
        totalSeconds++;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}
function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    stopTimer();
    totalSeconds = 0;
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
}
function restartGame(){
    location.reload();
}
///////////////////////////////////////////
function showPopup() {
    document.getElementById('popup').style.display = 'block';
    startFireworks();
    showFireworks();
}
////////fireworks/////
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

let fireworks = [];

function createFirework(x, y) {
    for (let i = 0; i < 30; i++) {
        fireworks.push(new Firework(x, y, `hsl(${Math.random() * 360}, 100%, 60%)`));
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animateFireworks);
}

function showFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(window.innerWidth / 2, window.innerHeight / 3);
        }, i * 500);
    }
    animateFireworks();
}



function startFireworks() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = () => {
        const duration = 5 * 1000; // 5 seconds
        const animationEnd = Date.now() + duration;
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
            }
        })();
    };
    document.body.appendChild(script);
}



