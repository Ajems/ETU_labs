<template>
  <div class="login-container">
    <div class="login-input-container">
      <input v-model="login" class="login-input" id="login-input" placeholder="Введите логин" @input="filterLogins" />
      <div v-if="filteredLogins.length > 0" class="login-suggestions">
        <ul>
          <li v-for="(item, index) in filteredLogins" :key="index" @click="selectLogin(item)">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <button @click="loginClick" class="login-button" id="login-button">Вход</button>
  </div>
</template>

<script>
import router from "@/router";
import {brokersSocket} from "@/service/socket.js";
import {mapActions} from "vuex";
export default {
  data() {
    return {
      login: "",
      allLogins: [],
      filteredLogins: [],
      socket: null,
    };
  },
  mounted() {
    brokersSocket.emit('findAll', data => {
      console.log(data)
      this.allLogins = data.map(broker => broker.login);
    });
  },
  methods: {
    filterLogins() {
      const searchTerm = this.login.toLowerCase();
      this.filteredLogins = searchTerm
          ? this.allLogins.filter(login => login.toLowerCase().includes(searchTerm))
          : this.allLogins.slice();
    },
    selectLogin(selectedLogin) {
      this.login = selectedLogin;
      this.filteredLogins = [];
    },
    loginClick() {
      if (this.allLogins.includes(this.login)) {
        router.push({name: "Account", params: {login: this.login}});
      } else {
        this.login = ''
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.login-input-container {
  position: relative;
  margin-bottom: 20px;
}

.login-input {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.login-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.login-suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.login-suggestions li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-suggestions li:hover {
  background-color: #f0f0f0;
}

.login-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

.login-button:hover {
  background-color: #45a049;
}
</style>
