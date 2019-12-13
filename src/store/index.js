import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    response: "",
    paragraphWithResponse: false,

    emailRegistration: "",
    passwordRegistration: "",
    responseRegistraton: "",

    accountNumber: [],
    date: "",
    amount: "",
    recipient: "",
    transferResponse: ""
   
  },

  getters: {
    getEmail: (state) => state.email,
    getPassword: (state) => state.password,
    responseFromApi: (state) => state.response,
    getParagraph: (state) => state.paragraphWithResponse,
  
    getEmailRegistration: (state) => state.emailRegistration,
    getPasswordRegistration: (state) => state.passwordRegistration,
    responsePostRequest: (state) => state.responseRegistraton,

    getAccount: (state) => state.accountNumber,
    getDate: (state) => state.date,
    getAmount: (state) => state.amount,
    getRecipient: (state) => state.recipient,
    getTransferResponse: (state) => state.transferResponse
  },

  actions: {
    getData({commit}) {
      const axios = require('axios');
        let email = this.state.email;
        let password = this.getters.getPassword;
        let users = "users";
        axios.get(`https://bank-api-dot-apicreation-260015.appspot.com/${users}/${email}/${password}`).then(response => {
         console.log(response);
    
         if (response.data.loggedIn) {
          commit('responseApi', response.data.message);
            setTimeout(() => {
              commit('clearFieldsLogin');
              router.push('/');
              commit('responseApi')
            }, 3000);
         } else {
          commit('responseApi',response.data.message);
          setTimeout(() => {
            commit('clearFieldsLogin');
            commit('responseApi')
          }, 3000);
         }
        }).catch(error => {
          console.log(error.response.data.message)
      })
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

    updateDate({ commit }, date) {
      commit('updateDate', date);
    },

    updateAmount({ commit }, amount) {
      commit('updateAmount', amount);
    },

    updateRecipient({ commit }, recipient) {
      commit('updateRecipient', recipient);
    },

    /* eslint-disable */
    postData({commit}) {
      const axios = require('axios');
      let users = "users"
      const postPromise = axios.post(`https://bank-api-dot-apicreation-260015.appspot.com/${users}`, {
        email: this.getters.getEmailRegistration,
        password: this.getters.getPasswordRegistration,
      });
      postPromise.then((response) => {
        console.log(response)
          commit('postResponse', response.data.message);
          setTimeout(() => {
            router.push('/login');
            commit('clearFieldsRegister');
            commit('postResponse');
          }, 2000);
        
      },(error) => {
        console.log("this is the error",error);
      });
      return postPromise;
    },

    
    /* eslint-disable */
    getAccountInfo({commit}) {
      const axios = require('axios');
      let account = "account";
      axios.get(`https://bank-api-dot-apicreation-260015.appspot.com/${account}`).then(response => {
  
        commit('accountInfoFromApi', response.data)
      }).catch(err => {
        console.log(err)
      })
    },

    /* eslint-disable */
    sendTransferDetails({commit}) {
      const axios = require('axios');
      let account = "account";
      let accountNumber = this.getters.getAccount[0].accountNumber;
      console.log("this is the account number",accountNumber)
      let date = this.getters.getDate;
      console.log("this is the date", date)
      let amount = this.getters.getAmount;
      console.log("this is the amount", amount)
      let recipient = this.getters.getRecipient;
      console.log("this is the recipient", recipient)

      const postPromise = axios.post(`https://bank-api-dot-apicreation-260015.appspot.com/${account}/${accountNumber}/${date}/${amount}/${recipient}`, {
      accountNumber: accountNumber,
      date: date,
      amount: amount,
      recipient: recipient
      });
      postPromise.then((response) => {
        console.log(response)
          commit('responseTransfer', response.data.message);
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

    responseApi: (state, message) => state.response = message,

    clearFieldsLogin(state) {
      state.email = "";
      state.password = "";
    },

    updateEmailRegistration(state, email) {
      state.emailRegistration = email
    },

    updatePasswordRegistration(state, password) {
      state.passwordRegistration = password
    },

    clearFieldsRegister(state) {
      state.emailRegistration = "";
      state.passwordRegistration = "";
    },
    postResponse: (state, message) => state.responseRegistraton = message,

    clearPostResponse: (state) => state.responseRegistraton = "",

    accountInfoFromApi: (state, accountNumber) => state.accountNumber = accountNumber,

    updateDate(state, date) {
      state.date = date
    },

    updateAmount(state, amount) {
      state.amount = amount
    },

    updateRecipient(state, recipient) {
      state.recipient = recipient
    },

    responseTransfer: (state, message) => state.transferResponse = message 
  },

  modules: {
  }
})
