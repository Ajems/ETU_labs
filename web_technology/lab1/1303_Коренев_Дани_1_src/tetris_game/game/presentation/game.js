import {Looper} from "../domain/Looper.js";
import {Storage} from "../data/Storage.js";
import {Controller} from "../domain/objects/Controller.js";
import {Config} from "../domain/objects/Config.js";
import {Level} from "../domain/objects/Level.js";

let config = new Config(getName(), new Level())
let storage = new Storage()
let controller = new Controller()
const limitLeaderboard = 30

function getName() {
    return localStorage.getItem('name');
}

function stopGame(){
    showResult()
}

function showResult(){
    let records = storage.getAllRecords().sort((a, b) => b.score - a.score)
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';


    for(let i = 0; i < Math.min(records.length, limitLeaderboard); i++){
        const newRecord = document.createElement('li');
        let playerName = records[i].player
        if (playerName.length > 13){
            playerName = `${playerName.slice(0, 10)}...`
        }
        newRecord.textContent = `${playerName}: ${records[i].score}`;
        leaderboard.appendChild(newRecord)
    }
}


let looper = new Looper(
    stopGame,
    config,
    storage,
    controller
)

showResult()
looper.initGame()