const afficheMinuteur = document.getElementById('minuteur');
const afficheTentatives = document.getElementById('tentatives');
const boxes = document.getElementById('boxes');




function restartGame() {
    //tout clear
    boxes.innerHTML = '';
    afficheMinuteur.innerHTML = ''; 
    afficheTentatives.innerHTML = '';
    // arréter le timer
    clearInterval(timer);
    startGame();
}

function clearInterval(timer) {
    throw new Error('Function not implemented.');
}



function startGame(){
    
    containerAll.style.bottom = "-100vh";
    containerAll.style.bottom = "0";
let minutes = 0;
let seconds = 0;
let timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        afficheMinuteur.innerHTML = `Time = ${minutes}:${seconds}`;

    }, 1000);

let tentatives = 0;
function incrementTentatives() {
    tentatives++;
    afficheTentatives.innerHTML = "Tentatives = " + tentatives;
}


let array = ['lait_frais', 'NexusDev', 'Nico7600','NoixDeCoco6254','lait_frais', 'NexusDev', 'Nico7600','NoixDeCoco6254'];
let totalForWin = array.length / 2;
if (totalForWin % 2 !== 0) {
    totalForWin++;
}

array = array.sort((a, b) => Math.random() - 0.5);

array.forEach((box, key) => {
    boxes.innerHTML = boxes.innerHTML + `<div class="box"> <div class='box-${key}' ><img src="https://skins.nationsglory.fr/face/${box}/21" alt=""></div>`;
    let replaceBox = document.querySelector(`.box-${key}`);
    replaceBox.style.visibility = 'hidden';
});

const listBoxes = document.querySelectorAll('.box');

let click = 0;
let saveArray = [];
let winPairs = 0;
let saveKey = [];
let savePaire = [];

listBoxes.forEach((box, key) => {
    box.addEventListener('click', (event) => {
        //enlever le click sur les cartes déjà retournées
        if(saveKey.includes(key)) {
            return;
        }

        event.target.style.transform = 'rotateY(180deg)';
        let replaceBox = document.querySelector(`.box-${key}`);
        setTimeout(() => {
            replaceBox.style.visibility = 'visible';
        }, 200);
        click++;
        event.target.firstElementChild.style.transform = 'rotateY(180deg)';
        saveArray = [...saveArray, event.target.firstElementChild.innerHTML];

        saveKey = [...saveKey, key];
        
        if (click === 2) {
            incrementTentatives();
            if (saveArray[0] === saveArray[1]) {
                winPairs++;
            } else {
                
                //suprimer les 2 dernières cartes retournées
                saveKey.pop();
                saveKey.pop();

                // il doit retourner les 2 dernières cartes retournées et faire attention de pas retourner les paire déjà trouvées
                setTimeout(() => {
                    listBoxes.forEach((box, key) => {

                        if(saveKey.includes(key)==false) {
                            box.style.transform = 'rotateY(0deg)';
                            let replaceBox = document.querySelector(`.box-${key}`);
                            replaceBox.style.visibility = 'hidden';
                        }
                    });
                }, 1000);
                
           
            }
            console.log(winPairs + ' ' + totalForWin);
            if(winPairs === totalForWin) {
                //mettre un délais avant de faire l'alerte
                setTimeout(() => {
                    alert(`Vous avez gagné en ${tentatives} tentatives et en ${minutes} minutes et ${seconds} secondes`);
                    restartGame();
                }, 1100);
              }

            saveArray = [];
            click = 0;
        }




    });
});
}



/*
boxes.forEach((box, key) => {
    console.log(box, key);
    box.innerHTML = array[key];
    box.addEventListener('click', (event) => {
        console.log('clicked', event.target.innerHTML);
        //alert(`Vous avez cliqué sur la case ${event.target.innerHTML}`)
        //event.target.style.backgroundColor = 'red';
        //event.target.style.visibility = 'hidden';
        //event.target.style.display = 'none';

        setTimeout(() => {
            event.target.style.display = 'block';
        }, 1000);
    });
});*/
