'use strict';

const nextKit = document.getElementById('nextKit');
const previousKit = document.getElementById('previousKit');
const kitStatus = document.getElementById('kitStatus');

var i = 1;
let kitNumber = '0'+i;

let sounds = {                //banco de dados
    'A' : `LD_Kick_${kitNumber}.wav`,
    'S' : `LD_Hi-Hat_${kitNumber}.wav`,
    'D' : `LD_Snare_${kitNumber}.wav`,
    'F' : `LD_Percussion_${kitNumber}.wav`
}

nextKit.addEventListener('click', function (){
    i++;
    if (i < 10) {kitNumber = '0'+i;}
    if (i == 10) {kitNumber = i;}
    if (i > 10) {i = 1; kitNumber = '0'+i;}

    kitStatus.textContent = kitNumber;

    sounds = {                //banco de dados
        'A' : `LD_Kick_${kitNumber}.wav`,
        'S' : `LD_Hi-Hat_${kitNumber}.wav`,
        'D' : `LD_Snare_${kitNumber}.wav`,
        'F' : `LD_Percussion_${kitNumber}.wav`
    }
});
previousKit.addEventListener('click', function (){
    i--;
    if (i < 1) {i = 10; kitNumber = i;}
    if (i < 10) { kitNumber = '0'+i;}

    kitStatus.textContent = kitNumber;

    sounds = {                //banco de dados
        'A' : `LD_Kick_${kitNumber}.wav`,
        'S' : `LD_Hi-Hat_${kitNumber}.wav`,
        'D' : `LD_Snare_${kitNumber}.wav`,
        'F' : `LD_Percussion_${kitNumber}.wav`
    }
});

const createDiv = (txt) => {    //manipulador do HTML
    const div = document.createElement('div');
    div.classList.add('key');
    div.textContent = txt;
    div.id = txt;
    document.getElementById('container').appendChild(div);
}

const playSound = (letter) => {
    const audio = new Audio(`./soundFonts/${sounds[letter]}`);
    audio.play();
}

const show = (sounds) => {      //cria div com o banco de dados
    Object.keys(sounds).forEach(createDiv);
}

show(sounds);

const addEffect = (letter) => document.getElementById(letter).classList.add('active');
const removeEffect = (letter) => {
    const div = document.getElementById(letter);
    const removeActive = () => div.classList.remove('active');
    div.addEventListener('transitionend',removeActive);

}

const activeDiv = (event) => {  //ativa a div
    let letter ='';
    if (event.type == 'click') {
        letter = event.target.id;
    } else {
        letter = event.key.toUpperCase();
    }
        const letterAllowed = sounds.hasOwnProperty(letter);
    if (letterAllowed){
        addEffect(letter);
        playSound(letter);
        removeEffect(letter);
    }
}
document.getElementById('container').addEventListener('click', activeDiv);

window.addEventListener('keydown', activeDiv);