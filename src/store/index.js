import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    // response: "",

    emailRegistration: "",
    passwordRegistration: "",
    responseRegistraton: "",
  },

  getters: {
    getEmail: (state) => state.email,
    getPassword: (state) => state.password,
    // responseFromApi: (state) => state.response,
  
    getEmailRegistration: (state) => state.emailRegistration,
    getPasswordRegistration: (state) => state.passwordRegistration,
    responsePostRequest: (state) => state.responseRegistraton 
  },

  actions: {
    async getData() {
      const axios = require('axios');
      let email = this.state.email;
      console.log("THIS IS THE EMAIL", email);
      let password = this.getters.getPassword;
      console.log("THIS IS THE PASSWORD", password)
      let users = "users"
      const response = await axios.get(`https://bank-api-dot-apicreation-260015.appspot.com/${users}/${email}/${password}`);  
      console.log(response);
      if(response.data.loggedIn) {
        // commit('responseApi', response.data.message);
        alert(response.data.message);
        router.push('/');
      } else {
        alert(response.data.message);
      }
  
    },

    updatePassword({ commit }, password) {
      commit('updatePassword', password);
    },

    updateEmail({ commit }, email) {
      commit('updateEmail', email);
    },

    clearFieldsLogin({ commit }) {
      commit('clearFieldsLogin');
    },


    updateEmailRegistration({ commit }, email) {
      commit('updateEmailRegistration', email);
    },

    updatePasswordRegistration({ commit }, password) {
      commit('updatePasswordRegistration', password);
    },

    postData({commit}) {
      const axios = require('axios');
      let users = "users"
      const postPromise = axios.post(`https://bank-api-dot-apicreation-260015.appspot.com/${users}`, {
        email: this.getters.getEmailRegistration,
        password: this.getters.getPasswordRegistration,
      });
      postPromise.then((response) => {
        if(response.status == "200") {
           commit('postResponse');
        }
      },(error) => {
        console.log("this is the error",error);
      });
      return postPromise;
    }
  },

  mutations: {
    updateEmail(state, email) {
      state.email = email
    },

    updatePassword(state, password) {
      state.password = password
    },

    // responseApi: (state, message) => state.response = message,
  

    clearFieldsLogin(state) {
      state.email = "";
      state.password = ""
    },

    updateEmailRegistration(state, email) {
      state.emailRegistration = email
    },

    updatePasswordRegistration(state, password) {
      state.passwordRegistration = password
    },

    postResponse: (state) => state.responseRegistraton = "Registration completed",

  },

  modules: {
  }
})
