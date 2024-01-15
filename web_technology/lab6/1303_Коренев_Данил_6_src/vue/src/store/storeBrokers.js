import {Broker} from "@/types/broker.js";

export const storeBrokers = {
    state: {
        brokers: new Map()
    },
    actions: {
        updateBrokers(ctx, broker) {
            ctx.commit('updateBrokers', broker);
        },
    },
    mutations: {
        updateBrokers(state, broker) {
            if (state.brokers.get(broker.id) === undefined) {
                const newBroker = new Broker();
                Object.assign(newBroker, broker);
                state.brokers.set(broker.id, newBroker)
            } else {
                const updatedBroker = { ...this.brokers.get(broker.id), ...broker };
                if (state.brokers.has(updatedBroker.id)) {
                    state.brokers.set(updatedBroker.id, { ...state.brokers.get(updatedBroker.id), ...updatedBroker });
                }
            }
            console.log(state.brokers)
        },
    },
    getters: {
        getBrokers(state) {
            const brokersObject = {};
            state.brokers.forEach((value, key) => {
                brokersObject[key] = value;
            });
            return brokersObject;        },
        getBrokersIds(state) {
            return Array.from(state.brokers.keys());
        },
        getBrokersLogins: (state) => (id) => {
            return state.brokers.get(id).login
        },
        getBrokerActivesById: (state) => (id) => {
            const showActives = []
            const currentBroker = state.brokers.get(id)
            for (let id in currentBroker.actives) {
                if (currentBroker.actives.hasOwnProperty(id)) {
                    if (currentBroker.actives[id].quantity > 0) {
                        showActives.push(currentBroker.actives[id])
                    }
                }
            }
            return showActives
        },
        getBrokerBalanceById: (state) => (id) => {
            return state.brokers.get(id).balance
        },
    }
}