const pancake = document.getElementById("pancake");
const scoreDisplay = document.getElementById("score");
// const upgradeButton = document.getElementById("upgrade1")
const upgradeSection = document.getElementById('upgradesSection');
const resetButton = document.getElementById('resetButton');

//UPGRADES
const upgrades = [
    {
        name: 'Internet',
        description : 'Use internet to see recipes of pancakes. Multiply the production x2',
        price: 100,
        multiplier: 2,
        bought: false
    },
]


let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let multiplier = localStorage.getItem('multiplier') ? parseFloat(localStorage.getItem('multiplier')) : 1;



scoreDisplay.textContent = score;

if (upgradeSection){
    upgrades.forEach((upgrade, index) => {
        const upgradeItem = document.createElement('li');
    
        const title = document.createElement('h3');
        title.textContent = upgrade.name;
    
        const description = document.createElement('span');
        description.textContent = upgrade.description;
    
        const button = document.createElement('button')
        button.textContent = `Learn for ${upgrade.price} pancakes`;
    
        button.addEventListener('click', () => buyUpgrade(index))
    
        upgradeItem.appendChild(title);
        upgradeItem.appendChild(description);
        upgradeItem.appendChild(button);
    
        upgradeSection.appendChild(upgradeItem)
    })
} else {
    console.warn("Attion : l'élément #upgradesSection n'existe pas.")
}


function scoreIncrease(){
    score += multiplier;
    scoreDisplay.textContent = score;
    localStorage.setItem('score', score)

}

//Buy an upgrade
function buyUpgrade(index){

    let upgrade = upgrades[index];

    if (score >= upgrade.price && !upgrade.bought){
        score -= upgrade.price;
        multiplier *= upgrade.multiplier;

        localStorage.setItem('score', score);
        localStorage.setItem('multiplier', multiplier);
        upgrades[index].bought = true;

        scoreDisplay.textContent = score;

       const buttons = document.querySelectorAll('#upgradesSection button');
       buttons[index].disabled = true;
       buttons[index].textContent = "Learned";

       
    } else {
        alert("You don't have enough pancakes !")
    }
}

//Click on upgrade
// upgradeButton.addEventListener('click', () => buyUpgrade(0));

//Click on pancake
pancake.addEventListener('click', () => {
    pancake.classList.add('clicked');
    setTimeout(() => pancake.classList.remove('clicked'), 200);
    scoreIncrease();

})

//Reset du localStorage

resetButton.addEventListener('click', () => {
    localStorage.clear();

    score = 0;
    multiplier = 1;
    upgrades = [];

    scoreDisplay.textContent = score;

    upgrades.forEach((upgrade, index) => {
        upgrade.bought = false;
        const buttons = document.querySelectorAll('#upgradesSection button');
        buttons[index].disabled = false;
        buttons[index].textContent = `Learn for ${upgrade.price} pancakes`;
    })

    alert("Progress reset successfully !");

})