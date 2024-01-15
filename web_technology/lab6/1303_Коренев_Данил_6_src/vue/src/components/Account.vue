<template>
  <div class="dashboard-container">
    <div class="stocks-column">
      <h2>Акции на {{getCurrentDate}}</h2>
      <table class="stocks-table">
        <div>
          <table width="100%">
            <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="stock in getStocksPrice" :key="stock.id">
              <td>{{ stock.name }}</td>
              <td>{{ stock.price !== null ? stock.price : 'Нет торгов' }}</td>
              <td>
                <button @click="showChart(stock.id)" class="action-button active-button">График</button>
              </td>
              <td>
                <button id="buyButton" @click="buyStock(stock.id)" :disabled="stock.price === null"
                        class="action-button"
                        :class="{ 'active-button': stock.price !== null, 'disabled-button': stock.price === null }">
                  Купить
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </table>
    </div>
    <div class="account-info-column">
      <h2>Информация о счете</h2>
      <div class="account-details">
        <div class="account-info">
          <div>
            <strong id="login">Логин: {{ getBrokerLogin }}</strong>
          </div>
          <div>
            <strong id="stocks-price">Текущая стоимость акций: {{ getBrokerStocksPrice(getBrokerActives) }}</strong>
          </div>
          <div>
            <strong id="balance">Доступные средства: {{ getBrokerBalance}}</strong>
          </div>
          <div>
            <button v-if="getBrokerLogin && getBrokerLogin.includes('admin')" @click="goToAdminPanel" class="action-button active-button">Admin Panel</button>
          </div>
        </div>
        <div class="stock-details">
          <h3>Купленные акции</h3>
          <div class="stock-list-container">
            <ul>
              <li v-for="stock in getBrokerActives" :key="stock.id">
                <strong>{{ stock.name }}</strong><br>
                <span>Количество: {{ stock.quantity }}</span><br>
                <span>Цена продажи: {{ getStockPrice(stock.id) !== null ? getStockPrice(stock.id) : 'Нет торгов' }}</span><br>
                <span>Цена покупки: {{ Math.round(stock.price*100)/100 }}</span><br>
                <span>Прибыль: {{ getStockProfit(stock.id, stock.price, stock.quantity) }}</span><br>
                <button id="sellButton" @click="sellStock(stock.id)" :disabled="getStockPrice(stock.id) === null" class="action-button" :class="{ 'active-button': getStockPrice(stock.id) !== null, 'disabled-button': getStockPrice(stock.id) === null }">Продать</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <v-dialog v-if="dialogVisible" max-width="600px" class="dialog-content">
    <v-card class="dialog-card">
      <v-card-title>{{ this.dialogTitle + " " + getStockName(this.selectedStockId)}}</v-card-title><br/>
      <strong id="dialogStockPrice">{{getStockPrice(this.selectedStockId) !== null ?  "Текущая цена: " + getStockPrice(this.selectedStockId) : 'Нет торгов'}}</strong><br/>
      <input id="dialogInputQuantity" v-model="quantity" class="quantity-input" placeholder="Введите количество" />
      <button id="dialogOrderButton" @click="orderStock(this.selectedStockId, getStockName(this.selectedStockId), getStockPrice(this.selectedStockId), this.quantity*this.multiplyCoef, getBrokerId)" :class="{ 'active-button': getStockPrice(this.selectedStockId) !== null, 'disabled-button': getStockPrice(this.selectedStockId) === null }" :disabled="getStockPrice(this.selectedStockId) === null">{{ buttonName }}</button><br/>
      <v-card-actions>
        <v-btn id="dialogCloseButton" @click="closeDialog" class="close-button">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-if="chartVisible" max-width="800px" max-height="600px" class="dialog-content" style="width: 800px;">
    <v-card class="dialog-card">
      <v-card-title>{{ this.dialogTitle + " " + getStockName(this.selectedStockId)}}</v-card-title><br/>
      <Line :data="createChart(getStockHistoryPrice(chartId, getCurrentDateStock), getStockName(this.selectedStockId))" :options="options" />
      <v-card-actions>
        <v-btn @click="closeChart" class="close-button">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
<script>
import {mapGetters, mapActions} from "vuex";
import {brokersSocket, controllerSocket, stocksSocket} from "@/service/socket.js";
import {Chart as ChartJS} from 'chart.js/auto';
import { Line } from 'vue-chartjs';
import {CategoryScale, LinearScale, LineElement, PointElement,  Tooltip} from "chart.js";
import router from "@/router.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
);

export default {
  props: ['login'],
  components: {
    Line
  },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Show', value: 'show', align: 'center' },
        { text: 'Buy', value: 'buy', align: 'center' },
      ],
      dialogVisible: false,
      chartVisible: false,
      selectedStockId: null,
      chartId: null,
      dialogTitle: '',
      buttonName: '',
      quantity: 0,
      multiplyCoef: 0,
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    }
  },
  computed: {
    ...mapGetters(["getCurrentDate", "getBrokerLogin", "getBrokerId", "getBrokerBalance", "getBrokerActives", "getBrokerStocksPrice", "getStockPrice", "getStockProfit", "getStocksPrice", "getStockName", "getCurrentDateStock", "getStockHistoryPrice"])
  },
  mounted() {
    controllerSocket.on('clockStocks', date => {
      console.log(date)
      this.updateDate(date)
      stocksSocket.emit('findAllStocksByDate', date)
    })

    stocksSocket.on('updateStockElement', UpdateStockResponse => {
      this.updateStockPrice(UpdateStockResponse.stockElement)
      this.addStockHistoryPrice({ date: UpdateStockResponse.date, stock: UpdateStockResponse.stockElement });
    })

    brokersSocket.emit('findOneByLogin', this.login)
    brokersSocket.on('findOne', broker => {
      this.updateBroker(broker)
    })
    brokersSocket.on('update', broker => {
      this.updateBroker(broker)
    })

    this.updateBroker({login: this.login})
    this.setAuthLogin(this.login)
  },
  methods: {
    ...mapActions(['updateDate', 'updateBroker', 'updateStockPrice', 'addStockHistoryPrice', 'setAuthLogin']),
    buyStock(stockId) {
      this.selectedStockId = stockId
      this.dialogTitle = "Купить акции"
      this.buttonName = 'Купить'
      this.multiplyCoef = 1
      this.openDialog()
    },
    sellStock(stockId) {
      this.selectedStockId = stockId
      this.dialogTitle = "Продать акции"
      this.buttonName = 'Продать'
      this.multiplyCoef = -1
      this.openDialog()
    },
    orderStock(stockId, stockName, stockPrice, quantity, brokerId) {
      brokersSocket.emit('order', {stockId, stockName, stockPrice, quantity, brokerId})
      this.dialogVisible = false
    },
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.selectedStockId = null
      this.dialogTitle = ''
      this.buttonName = ''
      this.quantity = 0
      this.multiplyCoef = 0
    },
    showChart(stockId) {
      this.chartVisible = true;
      this.dialogTitle = "График "
      this.selectedStockId = stockId
      this.chartId = stockId
    },
    closeChart() {
      this.chartVisible = false;
      this.dialogTitle = ""
      this.selectedStockId = null
      this.chartId = null
    },
    createChart({ dates, prices}, name) {
      return {
        labels: dates,
        datasets: [
          {
            label: name,
            backgroundColor: '#4caf50',
            data: prices
          },
        ],
      }
    },
    goToAdminPanel() {
      router.push({name: "AdminPanel"});
    }
  },
  filters: {
    roundToTwoDecimals(value) {
      return Math.round(value * 100) / 100;
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
}

.stocks-column {
  width: 60%;
  padding: 20px;
}

.account-info-column {
  width: 40%;
  padding: 20px;
}

.stocks-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.stocks-table th,
.stocks-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.stocks-table th {
  background-color: #f2f2f2;
}

.stocks-table tr:hover {
  background-color: #f5f5f5;
}

.action-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.active-button {
  background-color: #4CAF50;
  color: white;
}

.disabled-button {
  background-color: #ddd;
  color: #888;
  cursor: not-allowed;
}

h3 {
  color: #333;
}

.stock-list-container {
  max-height: 350px;
  overflow-y: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ddd;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

strong {
  font-size: 18px;
  color: #333;
}

span {
  color: #333;
}

.dialog-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  z-index: 4;
}



</style>
