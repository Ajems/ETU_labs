import {createStore} from "vuex";
import {storeBroker} from "@/store/storeBroker.js";
import {storeStocks} from "@/store/storeStocks.js";
import {storeDate} from "@/store/storeDate.js";
import {storeBrokers} from "@/store/storeBrokers.js";

export default createStore({
    modules: {
        broker: storeBroker,
        stocks: storeStocks,
        date: storeDate,
        brokers: storeBrokers
    }
})