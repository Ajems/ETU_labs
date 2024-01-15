import {gameManager} from "./manager/gameManager.js";
import {storageManager} from "./manager/storageManager.js";
import {soundManager} from "./manager/soundManager.js";
let level = 1
let maxLevel = 2
let username = null  //todo
const limitLeaderboard = 10
const dialog = document.getElementById('dialogInputName');
const gameOverDialog = document.getElementById('gameOverDialog');
const gameReplayDialog = document.getElementById('gameReplayDialog');
const health = document.getElementById('health');
const money = document.getElementById('money');
const leaderboardName = document.getElementById('leaderboardName');

export function nextLevel() {
    if (level === maxLevel){
        gameReplayDialog.onclick=replayGame
        gameReplayDialog.style.display = 'block'
    } else {
        level += 1
        startLevel()
    }
}

export function updateData(player){
    health.textContent = `Health: ${player.lives}`
    money.textContent = `Money: ${player.money}`
}

function restartLevel() {
    closeGameOverDialog();
    startLevel()
}

function openDialog() {
    dialog.style.display = 'block';
    const submitButton = document.getElementById('submitButton');
    submitButton.onclick=submitName
    const closeButton = document.getElementById('closeButton');
    closeButton.onclick=closeDialog
}

function closeDialog() {
    if (username !== undefined && username !== null) {
        dialog.style.display = 'none';
    } else {
        alert('Please enter a valid name.');
    }
}

function submitName() {
    const usernameInput = document.getElementById('usernameInput');
    const usernameTrim = usernameInput.value.trim();

    if (usernameTrim !== '') {
        username = usernameTrim
        gameManager.setPlayerName(username)
        const usernameView = document.getElementById('username');
        usernameView.textContent = `Player: ${username}`
        closeDialog();
        startLevel()
    } else {
        alert('Please enter a valid name.');
    }
}

function openGameOverDialog() {
    console.log("game over dialog")
    gameOverDialog.style.display = 'block';
    const buttonRestart = document.getElementById('restartLevel')
    buttonRestart.onclick=restartLevel
}

function closeGameOverDialog() {
    gameOverDialog.style.display = 'none';
}

export function gameOver() {
    openGameOverDialog()
}

function startLevel(){
    ctx.clearRect(0, 0, 480, 480)
    leaderboardName.textContent = `Leaderboard: Level ${level}`
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";
    gameManager.setLevel(level)
    storageManager.loadRecords(level)
    showResult();
    gameManager.loadAll(level)
    gameManager.play()
}

function showResult(){
    let records = storageManager.getAllRecords(level).sort((a, b) => b.score - a.score)
    console.log(records)
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';

    for(let i = 0; i < Math.min(records.length, limitLeaderboard); i++){
        const newRecord = document.createElement('li');
        let playerName = records[i].player
        if (playerName.length > 13){
            playerName = `${playerName.slice(0, 10)}...`
        }
        newRecord.textContent = `${playerName}: ${records[i].score}`;
        console.log(newRecord)
        leaderboard.appendChild(newRecord)
    }
}

function replayGame() {
    level=1
    gameReplayDialog.style.display = 'none';
    startLevel()
}

openDialog()
soundManager.init()
soundManager.loadArray(['/Game/fire.mp3'])
