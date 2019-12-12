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
  },

  getters: {
    getEmail: (state) => state.email,
    getPassword: (state) => state.password,
    responseFromApi: (state) => state.response,
    getParagraph: (state) => state.paragraphWithResponse,
  
    getEmailRegistration: (state) => state.emailRegistration,
    getPasswordRegistration: (state) => state.passwordRegistration,
    responsePostRequest: (state) => state.responseRegistraton 
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
          setTimeout(() => {
            // commit('postResponse');
            router.push('/login');
            commit('clearFieldsRegister');
            commit('clearPostResponse');
          }, 2000);
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

    // clearEmail: (state) => state.email = "",
    // clearPassword: (state) => state.password = "",


    responseApi: (state, message) => state.response = message,

    // editParagraphState: (state) => state.paragraphWithResponse = true,

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
    postResponse: (state) => state.responseRegistraton = "Registration completed",

    clearPostResponse: (state) => state.responseRegistraton = ""
  },

  modules: {
  }
})
