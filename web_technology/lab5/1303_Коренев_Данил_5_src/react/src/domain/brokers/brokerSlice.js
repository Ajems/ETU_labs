import {createSlice} from "@reduxjs/toolkit";

interface BrokerState {
    id: number;
    login: string;
    balance: number;
}

interface BrokersState {
    brokers: { [id: number]: BrokerState}
}

const initialState: BrokersState = {
    brokers: {}
}

export const slice = createSlice({
    name: 'brokers',
    initialState,
    reducers: {
        addBroker(state, action){
            state.brokers[action.payload.id] = action.payload
        },
        deleteBroker(state, action) {
            delete state.brokers[action.payload]
        },
        updateBroker(state, action) {
            state.brokers[action.payload.id] = action.payload
        }
    }
})

export const {addBroker,
    deleteBroker,
    updateBroker} = slice.actions

export function getBrokersList(state){
    return Object.keys(state.brokers.brokers).map(id => {
    const broker = state.brokers.brokers[Number(id)]
    return {
        id: broker.id,
        login: broker.login,
        balance: broker.balance
    }
})}

export default slice.reducer;