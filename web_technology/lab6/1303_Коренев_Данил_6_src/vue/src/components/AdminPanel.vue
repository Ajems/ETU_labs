<template>
  <div class="admin-panel">
    <div class="admin-panel">
      <h2>Admin Panel</h2>

      <table class="broker-table">
        <thead>
        <tr>
          <th>Участник</th>
          <th>Баланс</th>
          <th>Акции</th>
          <th>Прибыль</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="brokerId in getBrokersIds" :key="brokerId" class="broker-row">
          <td>{{ getBrokersLogins(brokerId) }}</td>
          <td class="balance-cell">{{ getBrokerBalanceById(brokerId) | roundToTwoDecimals }}</td>
          <td class="stocks-cell">
            <div v-for="stock in getBrokerActivesById(brokerId)" :key="stock.id" class="stock-item">
              {{ stock.quantity }} - {{ stock.name }} : {{ getStockProfit(stock.id, stock.price, stock.quantity) | roundToTwoDecimals }}
            </div>
          </td>
          <td class="profit-cell">
            <div>{{ this.calculateTotalProfit(brokerId) | roundToTwoDecimals }}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="go-to-trading">
      <button @click="goToTrading(getAuthLogin)">К торгам</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {brokersSocket} from "@/service/socket.js";
import router from "@/router.js";

export default {
  computed: {
    ...mapGetters(['getBrokersIds', 'getBrokers', 'getBrokerBalanceById', 'getBrokerActivesById', 'getBrokersLogins', 'getStockProfit','getAuthLogin'])
  },
  mounted() {
    brokersSocket.emit('findAll', brokers => {
      brokers.forEach(broker => {
        this.updateBrokers(broker)
      })
    })
  },
  methods: {
    ...mapActions(['updateBrokers']),
    calculateTotalProfit(brokerId) {
      const brokerActives = this.getBrokerActivesById(brokerId);
      let totalProfit = 0;

      brokerActives.forEach((active) => {
        totalProfit += this.getStockProfit(active.id, active.price, active.quantity);
      });

      return totalProfit.toFixed(2);
    },
    goToTrading(login) {
      console.log(login)
      router.push({name: "Account", params: {login: login}});
    }
  },
  filters: {
    roundToTwoDecimals(value) {
      return Math.round(value * 100) / 100;
    }
  }
}
</script>

<style scoped>
.admin-panel-container {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.admin-panel {
  flex-grow: 1;
}

.go-to-trading {
  margin-top: 10px;
}

.go-to-trading button {
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.go-to-trading button:hover {
  background-color: #45a049;
}

.admin-panel {
  margin: 20px;
}

.broker-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.broker-table th, .broker-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.broker-table th {
  background-color: #f2f2f2;
}

.broker-row:hover {
  background-color: #f5f5f5;
}

.balance-cell, .profit-cell {
  text-align: right;
}

.stocks-cell {
  max-width: 200px;
  overflow: hidden;
}

.stock-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>