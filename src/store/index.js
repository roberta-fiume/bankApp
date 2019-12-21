import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)
const axios = require('axios');

export default new Vuex.Store({
  state: {
    isUserLoggedIn: false,
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
    transferBox: false,
    transactions: [],
    flagForTotal: true,
    total: "",
    updatedTotalAfterSendingTransaction: ""
  },

  getters: {
    getIsUserLoggedIn: (state) => state.isUserLoggedIn,
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
    getTransferBox: (state) => state.transferBox,
    getterTransactions: (state)  => state.transactions,
    getFlagForTotal: (state) => state.flagForTotal,
    getTotal: (state) => state.total,
    getUpdatedTotalAfterSendingTransaction: (state) => state.updatedTotalAfterSendingTransaction
  },

  actions: {
    logIn({commit, dispatch}) {
        let email = this.state.email;
        let password = this.getters.getPassword;
        let users = "users";
        axios.get(`https://bank-api-dot-apicreation-260015.appspot.com/${users}/${email}/${password}`).then(response => {
         if (response.data.loggedIn) {
          commit('setFlagForTotalToTrue');
          commit('responseApi', response.data.message);
          commit('setAccountNumber', response.data.accountNumber);
          commit('setUserBalance', response.data.balance);
          commit('setUserEmail', response.data.email);
            setTimeout(() => {
              commit('clearFieldsLogin');
              router.push('/');
              commit('setIsUserLoggedInToTrue');
              commit('responseApi');
              dispatch('getTransactions');
            }, 2000);
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
          console.log("THIS IS THE RESPONSE REGISTRATION",response)
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
      commit('setIsUserLoggedInToFalse')
    },

    /* eslint-disable */
    sendTransaction({commit, dispatch}) {   
      let accountNumber = this.getters.getAccountNumber;
      let recipientAccountNumber = this.getters.getRecipientAccountNumber;
      let userEmail = this.getters.getUserEmail;
      let date = this.getters.getDate;
      let amount = this.getters.getAmount;
      console.log("THIS IS THE AMOUNT", amount);
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
        commit('responseTransfer', responseOne.data.message);
        const responseTwo = responses[1];
        commit('setResponseRecipient');
        setTimeout(() => {
          commit('hideTransferBox');
          commit('setFlagForTotalToFalse')
         dispatch('updateTotalAfterTransaction')
          commit('clearFieldsTransfer');
        }, 1500);
      })).catch(errors => {
        console.log("ERROR OCCURRED",errors)
      })
    },

    /* eslint-disable */
    getTransactions({commit, dispatch}) {
      console.log("I GET THE TRANSACTIONS");
      let accounts = 'accounts';
      let accountNumber = this.getters.getAccountNumber;
      let transactions = "transactions";
      axios.get(`https://bank-api-dot-apicreation-260015.appspot.com/${accounts}/${accountNumber}/${transactions}`).then(response => {
        console.log("ARRAY RESPONSE",response);
        console.log("FIRST TRANSACTION",response.data);
        commit('setTransactions', response.data);
        dispatch('updateBalance')
      }).catch(errors => {
        console.log("ERROR OCCURRED",errors)
      })
    },

    /* eslint-disable */
    updateBalance({commit}) {
      // this.getters.getFlagForTotal = true;
      let transactions = this.getters.getterTransactions;
      let sentTransactions = [];
      let receivedTransactions = [];
      console.log("these are the damn transactions", transactions);
        transactions.forEach(transaction => {
        transaction.type === "send" ? sentTransactions.push(transaction.amount) : receivedTransactions.push(transaction.amount)
      }); 
      console.log("SENT TRANSACTIONS", sentTransactions);
      console.log("RECEIVED TRANSACTIONS", receivedTransactions);
      let sumSent = sentTransactions.reduce((a,b) => a + b, 0);
      console.log("SUM OF SENT TRANSACTIONS", sumSent);
      let sumReceived = receivedTransactions.reduce((a,b) => a + b, 0);
      console.log("SUM OF RECEIVED TRANSACTIONS", sumReceived);

      let initialBalance = this.getters.getBalance;
      console.log("THIS IS THE INITIAL BALANCE");

      let balanceAfterReceivedTransactions = initialBalance + sumReceived;
      console.log("BALANCE AFTER RECEIVED TRANSACTIONS", balanceAfterReceivedTransactions);

      let total = balanceAfterReceivedTransactions - sumSent;

      console.log("THIS IS THE TOTAL", total)

      // Devo sottrarre il balance delle transactions ricevute a quelle mandate per ottenere il totale. Il commit e' di prova per vedere se funziona tutto
      commit('setTotal', total);
    },

      /* eslint-disable */
    updateTotalAfterTransaction({commit}) {
      console.log("I WORK IN UPDATED TOTAL AFTER TRANSACTION");
      commit('setFlagForTotalToFalse');
      let amount = this.getters.getAmount;
      let total = this.getters.getTotal;

      let updatedBalanceAfterSendingTransaction = total - amount;

      console.log("UPDATED TOTAL AFTER SENDING TRANSACTION", updatedBalanceAfterSendingTransaction);

      commit('setUpdatedBalanceAfterSendingTransaction', updatedBalanceAfterSendingTransaction);
    }
  },

  mutations: {

    setIsUserLoggedInToTrue: (state) => state.isUserLoggedIn = true,

    setIsUserLoggedInToFalse: (state) => state.isUserLoggedIn = false,

    updateEmail(state, email) {
      state.email = email
    },

    updatePassword(state, password) {
      state.password = password
    },

    responseApi: (state, message) => state.response = message,

    setAccountNumber: (state, accountNumber) => state.accountNumber = accountNumber,

    setUserEmail: (state, email) => state.userEmail = email,

    setUserBalance: (state, balance) => state.balance = balance,

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

    hideTransferBox: (state) => state.transferBox = false,

    clearFieldsTransfer(state) {
      state.date = "";
      state.amount = "";
      state.recipient = "";
      state.recipientAccountNumber = "";
      state.transferResponse = "";
      state.recipientResponse = "";
    },

    responseTransfer: (state, message) => state.transferResponse = message,

    setResponseRecipient: (state) => state.recipientResponse = "MONEY HAS BEEN RECEIVED",

    changeStatusTransferBox: (state) => state.transferBox = false,

    setTransactions: (state, transactions) => state.transactions = transactions,

    setFlagForTotalToTrue: (state) => state.flagForTotal = true,

    setFlagForTotalToFalse: (state) => state.flagForTotal = false,

    setTotal: (state, total) => state.total = total,

    setUpdatedBalanceAfterSendingTransaction: (state, updatedTotalAfterSendingTransaction) => state.updatedTotalAfterSendingTransaction = updatedTotalAfterSendingTransaction
  }

})
