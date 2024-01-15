import {controllerSocket, dateSocket, stocksSocket} from "../../data/socket";
import {setDelay, startClock, stopClock} from "../../data/requests";
import './settings.css'
import {selectDate, updateDate} from "../charts/dateSlice";
import {useAppDispatch, useAppSelector} from "../../data/hooks";

export function Settings() {
    const dispatch = useAppDispatch()
    const currentDate = selectDate(useAppSelector((state) => state));
    controllerSocket.on('clockStocks', (date: string) => {
        dispatch(updateDate({ date: formatDate(date.date) }));
    })

    return (
        <div className="Settings">
            <h1>{currentDate}</h1>
            <div className="input-container">
                <label>
                    Delay:
                </label>
                <div>
                    <input type="text" id="delay" defaultValue="1000" />
                    <button onClick={() => onSetDelay(document.getElementById("delay"))}>Set</button>
                </div>
            </div>
            <div className="input-container">
                <label>
                    Date:
                </label>
                <div>
                    <input type="text" id="date" defaultValue="2020-10-13" />
                    <button onClick={() => setDate(document.getElementById("date"))}>Set</button>
                </div>
            </div>
            <button onClick={() => onStartClock()}>Start Clock</button>
            <button onClick={() => onStopClock()}>Stop Clock</button>
        </div>
    )
}

function formatDate(inputDate) {
    const parts = inputDate.split('T')[0].split('-');
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
}


function setDate(dateElement: any | null) {
    if (dateElement === null) {
        return;
    }
    controllerSocket.emit('setDate', dateElement.value);
}

function onStartClock() {
    startClock();
}

function onStopClock() {
    stopClock();
}

function onSetDelay(delayElement: any | null) {
    if (delayElement === null) {
        document.getElementById('delay').value = 1000
        return false;
    }
    if (delayElement.value < 0 || delayElement.value > 1000000){
        document.getElementById('delay').value = 1000
    }
    setDelay(delayElement.value);
}