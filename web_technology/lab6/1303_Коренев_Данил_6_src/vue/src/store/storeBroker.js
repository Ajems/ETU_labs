import {Broker} from "@/types/broker.js";
export const storeBroker = {
    state: {
        authorizedLogin: "",
        currentBroker: {}
    },
    actions: {
        updateBroker(ctx, brokerData) {
            if (this.currentBroker === undefined) {
                const newBroker = new Broker();
                Object.assign(newBroker, brokerData);
                ctx.commit('updateBroker', newBroker);
                return;
            }

            const updatedBroker = { ...this.currentBroker, ...brokerData };
            ctx.commit('updateBroker', updatedBroker);
        },
        setAuthLogin(ctx, login) {
            ctx.commit('setAuthLogin', login)
        }
    },
    mutations: {
        updateBroker(state, broker) {
            state.currentBroker = { ...broker }
        },
        setAuthLogin(state, login) {
            state.authorizedLogin = login
        }
    },
    getters: {
        getBroker(state) {
          return state.currentBroker
        },
        getBrokerId(state) {
            return state.currentBroker.id
        },
        getBrokerLogin(state) {
            return state.currentBroker.login
        },
        getAuthLogin(state) {
            return state.authorizedLogin
        },
        getBrokerActives(state) {
            const showActives = []
            for (let id in state.currentBroker.actives) {
                if (state.currentBroker.actives.hasOwnProperty(id)) {
                    if (state.currentBroker.actives[id].quantity > 0) {
                        showActives.push(state.currentBroker.actives[id])
                    }
                }
            }
            return showActives
        },
        getBrokerBalance(state) {
            return Math.round(state.currentBroker.balance*100)/100
        },
    }
}