import type {StockElement} from "../domain/charts/stockElement";
import {Observable, from} from 'rxjs';
import {controllerSocket} from "./socket";

const BASE_URL = 'http://localhost:3000';

const STOCKS_URL = `${BASE_URL}/stocks`;
const GET_ALL_STOCKS = `${STOCKS_URL}/stockInfo`;

const CONTROLLER_URL = `${BASE_URL}/controller`;
const START_CLOCK_URL = `${CONTROLLER_URL}/start-clock`;
const STOP_CLOCK_URL = `${CONTROLLER_URL}/stop-clock`;
const GET_DATE_URL = `${CONTROLLER_URL}/date`;
const SET_DELAY_URL = `${CONTROLLER_URL}/set-clock-delay`;

interface GetStocksResponse {
    id: number;
    name: string;
    prices: { date: string; price: number }[];
    quantity: number;
    enabled: boolean;
}

interface GetElementsResponse {
    date: string,
    stockElement: StockElement
}

export function getStocks(): Observable<GetStocksResponse[]> {
    return from(fetch(GET_ALL_STOCKS)
        .then(response => response.json())
        .then(data => data)
    )
}

export function getStockElements(): Observable<GetElementsResponse[]> {
    return from(fetch(STOCKS_URL)
        .then(response => response.json())
        .then(data => data)
    )
}

export function startClock(){
    controllerSocket.emit('startClock', {});
}

export function stopClock(){
    controllerSocket.emit('stopClock', {});
}

export function getDate(): Observable<string> {
    return from(fetch(GET_DATE_URL)
        .then(response => response.json())
        .then(data => new Date(data).toISOString().split('T')[0])
    )
}

export function setDelay(delay: number) {
    controllerSocket.emit('setDelay', (delay));
}