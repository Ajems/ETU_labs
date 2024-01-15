export const storeStocks = {
    state: {
        stocks: new Map(),
        stocksHistory: new Map()
    },
    actions: {
        updateStockPrice(ctx, stock) {
            ctx.commit('updateStockPrice', stock);
        },
        addStockHistoryPrice(ctx, payload) {
            ctx.commit('addStockHistoryPrice', payload)
        }
    },
    mutations: {
        updateStockPrice(state, stock) {
            state.stocks.set(stock.id, stock);
        },
        addStockHistoryPrice(state, {date, stock}) {
            if (state.stocksHistory.has(stock.id)) {
                const stockHistory = state.stocksHistory.get(stock.id);
                stockHistory.push({ date, price: stock.price });
            } else {
                state.stocksHistory.set(stock.id, [{ date, price: stock.price }]);
            }
        }
    },
    getters: {
        getStockPrice: (state) => (id) => {
            if (state.stocks.has(id)) {
                return state.stocks.get(id).price
            }
            return null
        },
        getStockName: (state) => (id) => {
            console.log(id)
            if (state.stocks.has(id)) {
                return state.stocks.get(id).name
            }
            return null
        },
        getBrokerStocksPrice: (state) => (brokerActives) => {
            let totalPrice = 0;
            for (const stockId in brokerActives) {
                const stock = brokerActives[stockId];
                if (state.stocks.has(parseInt(stockId))) {
                    const price = state.stocks.get(parseInt(stockId)).price;
                    totalPrice += price * stock.quantity;
                }
            }
            return Math.round(totalPrice*100)/100;
        },
        getStockProfit: (state) => (id, price, quantity) => {
            if (state.stocks.has(id)) {
                if (state.stocks.get((parseInt(id))).price === null) return null
                return Math.round((state.stocks.get((parseInt(id))).price - price) * quantity * 100) / 100
            }
            return null
        },
        getStocksPrice(state) {
            const stocks = []
            state.stocks.forEach((stock, id) => {
                stocks.push(stock)
            })
            return stocks
        },
        getStockHistoryPrice: (state) => (id, date) => {
            const prices = state.stocksHistory.get(id);

            if (!prices) {
                return { dates: [], prices: [] };
            }

            const currentDate = new Date(date);

            const filteredPrices = prices.filter(entry => entry.price !== null && new Date(entry.date) <= currentDate);

            const dates = filteredPrices.map(entry => entry.date);
            const pricesArray = filteredPrices.map(entry => entry.price);

            return { dates, prices: pricesArray };
        }

    }
}
