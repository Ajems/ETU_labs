import io from "socket.io-client";

const BASE_URL = 'http://localhost:3000';

const STOCKS_URL = `${BASE_URL}/stocks`;
const CONTROLLER_URL = `${BASE_URL}/controller`;
const BROKERS_URL = `${BASE_URL}/brokers`;

export const stocksSocket = io(STOCKS_URL)
export const controllerSocket = io(CONTROLLER_URL)
export const brokersSocket = io(BROKERS_URL)