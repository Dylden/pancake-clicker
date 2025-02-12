const pancake = document.getElementById("pancake");
const scoreDisplay = document.getElementById("score");

let score = 0

function scoreIncrease(){
    score ++;
    scoreDisplay.textContent = score;
}

pancake.addEventListener('click', () => {
    pancake.classList.add('clicked');
    setTimeout(() => pancake.classList.remove('clicked'), 200);
    scoreIncrease();

})