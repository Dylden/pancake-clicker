//VARIABLES
const pancake = document.getElementById('pancake');
const scoreDisplay = document.getElementById('score');
const totalScoreDisplay = document.getElementById('totalScore')
const upgradeSection = document.getElementById('upgradesSection');
const upgradesInternetSection = document.getElementById('internetSection')
const resetButton = document.getElementById('resetButton');

//UPGRADES
const upgrades = [
    {
        name: 'Internet',
        description: 'Use internet to see recipes of pancakes. Multiply the production x2',
        price: 50,
        multiplier: 2,
        bought: false
    },
    {
        name: 'Better tools',
        description : 'Better tools, better pancakes. Production x2',
        price: 200,
        multiplier: 2,
        bought: false 
    }
]

const upgradesInternet = [
    {
        name: 'Create a micro-business',
        description: 'Start your business !',
        price: 300,
        multiplier: 1,
        bought: false
    },
    {
        name: 'Hire an employee',
        description: 'Let\'s have some help !',
        price: 500,
        multiplier: 1,
        pancakesPerSecond: 1,
        bought: false
    }
]

let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let totalScore = localStorage.getItem('totalScore') ? parseInt(localStorage.getItem('totalScore')) : 0;
let multiplier = localStorage.getItem('multiplier') ? parseFloat(localStorage.getItem('multiplier')) : 1;
let pancakesPerSecond = localStorage.getItem('pancakesPerSecond') ? parseFloat(localStorage.getItem('pancakesPerSecond')) : 0;

scoreDisplay.textContent = score;
totalScoreDisplay.textContent = totalScore;

//upgradesInternetState

let upgradesInternetState = JSON.parse(localStorage.getItem('upgradesInternetState')) || [];
if (upgradesInternetState.length !== upgradesInternet.length){
    upgradesInternetState = upgradesInternet.map(upg => ({bought: upg.bought}));
    localStorage.setItem('upgradesInternetState', JSON.stringify(upgradesInternetState))
}

upgradesInternet.forEach((upgrade, index) => { 
    if (upgradesInternetState[index] && upgradesInternetState[index].bought) {
        upgradesInternet[index].bought = true;
    }

}) 

if(upgradesInternetSection){
    upgradesInternet.forEach((upgrade, index) => {

        const upgradeInternetItem = document.createElement('li');
    
        const title = document.createElement('h3');
        title.textContent = upgrade.name;
    
        const description = document.createElement('span');
        description.textContent = upgrade.description;
    
        const button = document.createElement('button')
        button.textContent = `Learn for ${upgrade.price} pancakes`;

        if(upgrade.bought) {
            button.disabled = true;
            button.textContent = "Purchased";
        }
    
        button.addEventListener('click', () => buyUpgradeInternet(index))
    
        upgradeInternetItem.appendChild(title);
        upgradeInternetItem.appendChild(description);
        upgradeInternetItem.appendChild(button);
    
        upgradesInternetSection.appendChild(upgradeInternetItem)
    })
}

//upgradesState

let upgradesState = JSON.parse(localStorage.getItem('upgradesState')) || [];
if (upgradesState.length !== upgrades.length) {
    upgradesState = upgrades.map(upg => ({ bought: upg.bought}));
    localStorage.setItem('upgradesState', JSON.stringify(upgradesState));
}

upgrades.forEach((upgrade, index) => {
    if (upgradesState[index] && upgradesState[index].bought) {
        upgrades[index].bought = true
    }
})

if (upgradeSection){
    upgrades.forEach((upgrade, index) => {
        const upgradeItem = document.createElement('li');
    
        const title = document.createElement('h3');
        title.textContent = upgrade.name;
    
        const description = document.createElement('span');
        description.textContent = upgrade.description;
    
        const button = document.createElement('button')
        button.textContent = `Learn for ${upgrade.price} pancakes`;

        if(upgrade.bought) {
            button.disabled = true;
            button.textContent = "Learned";
        }
    
        button.addEventListener('click', () => buyUpgrade(index))
    
        upgradeItem.appendChild(title);
        upgradeItem.appendChild(description);
        upgradeItem.appendChild(button);
    
        upgradeSection.appendChild(upgradeItem)
    })
} else {
    console.warn("Attention : l'élément #upgradesSection n'existe pas.")
}

function scoreIncrease(){
    //Actual amount of pancakes
    score += multiplier;
    scoreDisplay.textContent = score;
    localStorage.setItem('score', score)

    //Total of pancakes made
    totalScore += multiplier;
    totalScoreDisplay.textContent = totalScore
    localStorage.setItem('totalScore', totalScore)

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

        upgradesState[index] = { bought: true};
        localStorage.setItem('upgradesState', JSON.stringify(upgradesState));

        scoreDisplay.textContent = score;

       const buttons = document.querySelectorAll('#upgradesSection button');
       buttons[index].disabled = true;
       buttons[index].textContent = "Learned";

       
    } else {
        alert("You don't have enough pancakes !")
    }
}

let pancakeInterval = null;

if (pancakesPerSecond > 0) {
    startPancakePerSecInterval();
}

function startPancakePerSecInterval(){
    if(pancakeInterval === null){
        setInterval(increasePancakesPerSecond, 1000);
    }
}

//Buy an upgrade on internet

function buyUpgradeInternet(index){
    let upgrade = upgradesInternet[index];

    if (score >= upgrade.price && !upgrade.bought){
        score -= upgrade.price;
        multiplier *= upgrade.multiplier;

        if(upgrade.pancakesPerSecond){
            pancakesPerSecond += upgrade.pancakesPerSecond;
            localStorage.setItem('pancakesPerSecond', pancakesPerSecond)

            if(pancakesPerSecond > 0){
                startPancakePerSecInterval();
            }
        }

        localStorage.setItem('score', score);
        localStorage.setItem('multiplier', multiplier);

        upgradesInternet[index].bought = true;
        upgradesInternetState[index] = { bought: true};
        localStorage.setItem('upgradesInternetState', JSON.stringify(upgradesInternetState));

        scoreDisplay.textContent = score;

       const buttons = document.querySelectorAll('#internetSection button');
       buttons[index].disabled = true;
       buttons[index].textContent = "Purchased";

       
    } else {
        alert("You don't have enough pancakes !")
    }
}

function increasePancakesPerSecond(){
    score += pancakesPerSecond;
    totalScore += pancakesPerSecond;

    scoreDisplay.textContent = score;
    totalScoreDisplay.textContent = totalScore;

    localStorage.setItem('score', score);
    localStorage.setItem('totalScore', totalScore);

}



//Click on pancake
pancake.addEventListener('click', () => {
    pancake.classList.add('clicked');
    setTimeout(() => pancake.classList.remove('clicked'), 200);
    scoreIncrease();

})

//Reset localStorage
resetButton.addEventListener('click', () => {
    localStorage.clear();
    alert("Progress reset successfully !");
    location.reload();
});