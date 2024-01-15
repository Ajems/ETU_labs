import { io } from 'socket.io-client'

const STOCKS_URL = 'http://localhost:3000/stocks'
const CONTROLLER_URL = 'http://localhost:3000/controller'
const BROKERS_URL = 'http://localhost:3000/brokers'
const DATE_URL = 'http://localhost:3000/date'

export const stocksSocket = io(STOCKS_URL)
export const controllerSocket = io(CONTROLLER_URL)
export const brokerSocket = io(BROKERS_URL)
export const dateSocket = io(DATE_URL)