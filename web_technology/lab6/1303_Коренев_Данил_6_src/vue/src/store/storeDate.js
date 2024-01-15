export const storeDate = {
    state: {
        currentDate: ""
    },
    actions: {
        updateDate(ctx, date) {
            const parsedDate = new Date(date.date);
            const day = String(parsedDate.getDate()).padStart(2, '0');
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const year = parsedDate.getFullYear();
            ctx.commit('updateDate', `${day}.${month}.${year}`)
        }
    },
    mutations: {
        updateDate(state, newDate) {
            state.currentDate = newDate
        }
    },
    getters: {
        getCurrentDate(state){
            return state.currentDate
        },
        getCurrentDateStock(state) {
            const [day, month, year] = state.currentDate.split('.');
            return `${month}/${day}/${year}`;
        }
    }
}