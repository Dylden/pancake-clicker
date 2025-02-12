const pancake = document.getElementById("pancake");
const scoreDisplay = document.getElementById("score");
const upgradeButton = document.getElementById("upgrade1")

let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let multiplier = localStorage.getItem('multiplier') ? parseInt(localStorage.getItem('multiplier')) : 1;

scoreDisplay.textContent = score;


function scoreIncrease(){
    score += multiplier;
    scoreDisplay.textContent = score;
    localStorage.setItem('score', score)

}

//Buy an upgrade
function buyUpgrade(){

    const upgradeCost = 100;

    if (score >= upgradeCost){
        score -= upgradeCost;

        localStorage.setItem('score', score);
        localStorage.setItem('multiplier', 2);

        scoreDisplay.textContent = `${score}`;

        upgradeButton.disabled = true;
        upgradeButton.textContent = "Learned";

        multiplier = 2;
    } else {
        alert("You don't have enough pancakes !")
    }
}

//Click on upgrade
upgradeButton.addEventListener('click', buyUpgrade)

//Click on pancake
pancake.addEventListener('click', () => {
    pancake.classList.add('clicked');
    setTimeout(() => pancake.classList.remove('clicked'), 200);
    scoreIncrease();

})