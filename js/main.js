const afficheMinuteur = document.getElementById('minuteur');
const afficheTentatives = document.getElementById('tentatives');
const boxes = document.getElementById('boxes');




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
                let winer = document.getElementById('winner-modal');
                
                setTimeout(() => {
                    boxes.innerHTML = '';
                    afficheMinuteur.innerHTML = ''; 
                    afficheTentatives.innerHTML = '';
                    winer.innerHTML = winer.innerHTML +` <div class="modal">
                    <span class="emoji round">🏆</span>
                    <h1 class="titre-win">Félicitation !</h1>
                    <p>Vous avez gagné en ${tentatives} tentatives et en ${minutes} minutes et ${seconds} secondes</p>
                    </div>`;
                }, 1100);
                //annimation confetti
                for(i=0; i<100; i++) {
                    var randomRotation = Math.floor(Math.random() * 360);
                    var randomScale = Math.random() * 1;
                    var randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
                    var randomHeight =  Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));
                    
                    var randomAnimationDelay = Math.floor(Math.random() * 15);
                    console.log(randomAnimationDelay);
                  
                    var colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
                    var randomColor = colors[Math.floor(Math.random() * colors.length)];
                  
                    var confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.top=randomHeight + 'px';
                    confetti.style.right=randomWidth + 'px';
                    confetti.style.backgroundColor=randomColor;
                    confetti.style.obacity=randomScale;
                    confetti.style.transform='skew(15deg) rotate(' + randomRotation + 'deg)';
                    confetti.style.animationDelay=randomAnimationDelay + 's';
                    document.getElementById("confetti-wrapper").appendChild(confetti);
                  }
              }

            saveArray = [];
            click = 0;
        }




    });
});
}

