import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'



Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    response: "",

    emailRegistration: "",
    passwordRegistration: "",
    responseRegistraton: "",
    // responseRegistration: []
  },

  getters: {
    getEmail: (state) => state.email,
    getPassword: (state) => state.password,
    responseFromApi: (state) => state.response,
  

    getEmailRegistration: (state) => state.emailRegistration,
    getPasswordRegistration: (state) => state.passwordRegistration,
    // responsePostRequest: (state) => state.responseRegistraton 
  },


  mutations: {
    updateEmail(state, email) {
      state.email = email
    },

    updatePassword(state, password) {
      state.password = password
    },

    responseApi: (state, message) => state.response = message,

    clearFields(state) {
      state.email = "";
      state.password = ""
    },



    updateEmailRegistration(state, email) {
      state.emailRegistration = email
    },

    updatePasswordRegistration(state, password) {
      state.passwordRegistration = password
    },

   
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
      
      if(response.data.logedIn) {
        
        router.push('/');
      } else {
        alert(response.data.message);
        // router.push('/login');
      }
      commit('responseApi', response.data.message)
    },

    updatePassword({ commit }, password) {
      commit('updatePassword', password);
    },

    updateEmail({ commit }, email) {
      commit('updateEmail', email);
    },

    clearFields({ commit }) {
      commit('clearFields');
    },


    updateEmailRegistration({ commit }, email) {
      commit('updateEmailRegistration', email);
    },

    updatePasswordRegistration({ commit }, password) {
      commit('updatePasswordRegistration', password);
    },

    postData() {
      console.log("this is the email", this.getters.getEmailRegistration);
      console.log("this is the password", this.getters.getPasswordRegistration);
      console.log("I workkk")
      const axios = require('axios');
      let users = "users"
      const postPromise = axios.post(`https://bank-api-dot-apicreation-260015.appspot.com/${users}`, {
        email: this.getters.getEmailRegistration,
        password:  this.getters.getPasswordRegistration,
      });
      postPromise.then((response) => {
        console.log("this is the  POST RESPONSE", response);
        // commit('postResponse', response.data);

      },(error) => {
        console.log("this is the error",error);
      });
      
      return postPromise;
    }

  
  },

  modules: {
  }
})
