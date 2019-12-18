import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)
const axios = require('axios');

export default new Vuex.Store({
  state: {
    welcomeMessage: true,
    loginButton: true,
    logOutButton: false,
    wrapper: false,

    email: "",
    password: "",
    response: "",
    paragraphWithResponse: false,
    accountNumber:"",
    balance: "",
    recipientAccountNumber: '',

    emailRegistration: "",
    passwordRegistration: "",
    responseRegistraton: "",

    userEmail: "",

    date: "",
    amount: "",
    recipient: "",
    transferResponse: "",
    recipientResponse: "",
    transferBox: false
   
  },

  getters: {
    getWelcomeMessage: (state) => state.welcomeMessage,
    getLoginButton: (state) => state.loginButton,
    getLogOutButton: (state) => state.logOutButton,
    getWrapper: (state) => state.wrapper,
    getEmail: (state) => state.email,
    getPassword: (state) => state.password,
    responseFromApi: (state) => state.response,
    getParagraph: (state) => state.paragraphWithResponse,
    getAccountNumber: (state) => state.accountNumber,
    getBalance: (state) => state.balance,
    getUserEmail: (state) => state.userEmail,
    
  
    getEmailRegistration: (state) => state.emailRegistration,
    getPasswordRegistration: (state) => state.passwordRegistration,
    responsePostRequest: (state) => state.responseRegistraton,

    // getAccount: (state) => state.accountNumber,
    getDate: (state) => state.date,
    getAmount: (state) => state.amount,
    getRecipient: (state) => state.recipient,
    getRecipientAccountNumber: (state) => state.recipientAccountNumber,
    getTransferResponse: (state) => state.transferResponse,
    getRecipientResponse: (state) => state.recipientResponse,
    getTransferBox: (state) => state.transferBox
  },

  actions: {
    getData({commit}) {
      const axios = require('axios');
        let email = this.state.email;
        let password = this.getters.getPassword;
        let users = "users";
        axios.get(`https://bank-api-dot-apicreation-260015.appspot.com/${users}/${email}/${password}`).then(response => {
         if (response.data.loggedIn) {
          commit('responseApi', response.data.message);
          commit('setAccountNumber', response.data.accountNumber);
          commit('setUserEmail', response.data.email);
            setTimeout(() => {
              commit('clearFieldsLogin');
              router.push('/');
              // dispatch('updateWrapperStatus');
              commit('setWrapperStatus');
              commit('setLoginButtonStatus');
              commit('setLogOutButtonStatus');
              commit('setWelcomeMessageStatus');
              commit('responseApi');
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

    updateRecipientAccountNumber({ commit }, recipientAccountNumber) {
      commit('updateRecipientAccountNumber', recipientAccountNumber);
    },

    /* eslint-disable */
    createUser({commit}) {
      const axios = require('axios');
      let users = "users";
      let account = "accounts";
      let accountNumber;
      let balance;

      const createBankAccount = axios.post(`https://bank-api-dot-apicreation-260015.appspot.com/${account}`);
      createBankAccount.then((response => {
        accountNumber = response.data.number;
        balance = response.data.balance;
        console.log("ACCOUNT NUMBER",accountNumber);
        console.log("BALANCE", balance)
        const postPromise = axios.post(`https://bank-api-dot-apicreation-260015.appspot.com/${users}`, {
          email: this.getters.getEmailRegistration,
          password: this.getters.getPasswordRegistration,
          accountNumber: accountNumber,
          balance: balance
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
      }))
    },

    /* eslint-disable */
    showTransferBox({commit}) {
      commit('showTransferBox');
    },

    /* eslint-disable */
    logOut({commit}) {
      commit('setLoginButtonStatusToTrue');
      commit('setWrapperStatusToFalse');
      commit('setWelcomeMessageToTrue');
      commit('setLogOutButtonStatusToFalse');
    },

    /* eslint-disable */
    sendTransaction({commit}) {   
      let accountNumber = this.getters.getAccountNumber;
      let recipientAccountNumber = this.getters.getRecipientAccountNumber;
      let userEmail = this.getters.getUserEmail;
      let date = this.getters.getDate;
      let amount = this.getters.getAmount;
      let recipient = this.getters.getRecipient;

      let one = `https://bank-api-dot-apicreation-260015.appspot.com/accounts/${accountNumber}/transactions`;
      let two = `https://bank-api-dot-apicreation-260015.appspot.com/accounts/${recipientAccountNumber}/transactions`;

      const requestOne = axios.post(one, {
        amount: amount,
        date: date,
        recipientReference: recipient,
        recipientAccountNumber: recipientAccountNumber,
        senderReference: userEmail,
        senderAccountNumber: accountNumber,
        type: "send"
      });

      const requestTwo = axios.post(two, {
        amount: amount,
        date: date,
        recipientReference: recipient,
        recipientAccountNumber: recipientAccountNumber,
        senderReference: userEmail,
        senderAccountNumber: accountNumber,
        type: "receive"
      });

      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        console.log("THIS IS RESPONSE ONE", responseOne.data.message)

        commit('responseTransfer', responseOne.data.message);
   
        const responseTwo = responses[1];
        console.log("THIS IS RESPONSE TWO", responseTwo)

        commit('setResponseRecipient');
      })).catch(errors => {
        console.log("ERROR OCCURRED",errors)
      })
    },

    
  },


  mutations: {

   setWelcomeMessageStatus: (state) => state.welcomeMessage = false,

   setWrapperStatus: (state) => state.wrapper = true,

   setLoginButtonStatus: (state) => state.loginButton = false,

   setLogOutButtonStatus: (state) => state.logOutButton = true,

   setLoginButtonStatusToTrue: (state) => state.loginButton = true,

   setLogOutButtonStatusToFalse: (state) => state.logOutButton = false,

   setWrapperStatusToFalse: (state) => state.wrapper = false,

   setWelcomeMessageToTrue: (state) => state.welcomeMessage = true,

    updateEmail(state, email) {
      state.email = email
    },

    updatePassword(state, password) {
      state.password = password
    },

    responseApi: (state, message) => state.response = message,

    setAccountNumber: (state, accountNumber) => state.accountNumber = accountNumber,

    setUserEmail: (state, email) => state.userEmail = email,

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

    updateRecipientAccountNumber(state, recipientAccountNumber) {
      state.recipientAccountNumber = recipientAccountNumber
    },

    showTransferBox: (state) => state.transferBox = true,

    responseTransfer: (state, message) => state.transferResponse = message,

    setResponseRecipient: (state) => state.recipientResponse = "MONEY HAS BEEN RECEIVED",

    changeStatusTransferBox: (state) => state.transferBox = false
  },

  modules: {
  }
})
