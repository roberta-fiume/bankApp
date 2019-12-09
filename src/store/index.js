import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'



Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    response: ""
  },

  getters: {
    responseFromApi: (state) => state.response,
  },

  mutations: {
    updateEmail(state, email) {
      state.email = email
    },

    updatePassword(state, password) {
      state.password = password
    },

    responseApi: (state, message) => state.response = message
  },

  actions: {
    
    async getData({ commit }) {
      console.log(commit);
     
      const axios = require('axios');
      let email = this.state.email;
      let password = this.state.password;
      let users = "users"
      const response = await axios.get(`https://bank-api-dot-apicreation-260015.appspot.com/${users}/${email}/${password}`);
      console.log("this is the response", response);
      alert(response.data.message);
      commit('responseApi', response.data.message)
      console.log(router)
      router.push('/');

    }
  },

  modules: {
  }
})
