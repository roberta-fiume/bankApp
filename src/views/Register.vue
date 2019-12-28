<template>
  <div class="register">
    <h1>Register</h1>
   <input type="text" v-model="emailRegistration" placeholder="Enter an email" class="inputText">
   <p>{{emailRegistration}}</p>
   <input type="text" v-model="passwordRegistration" placeholder="Enter a password" class="inputText">
    <p>{{passwordRegistration}}</p>
   <button @click="createUser()" class="registerButton">Sign up</button>
   <p>{{responsePostRequest}}</p>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {

    }
  },

  computed: {
      emailRegistration: {
        get() {
            return this.getEmailRegistration
        },

        set(value) {
            return this.updateEmailRegistration(value);
        },
      },

      passwordRegistration: {
        get() {
            return this.getPasswordRegistration
        },

        set(value) {
            return this.updatePasswordRegistration(value);
        },
      },

      ...mapGetters(['getEmailRegistration', 'getPasswordRegistration', 'responsePostRequest']),
  },

  methods: {
      ...mapActions(['updatePasswordRegistration', 'updateEmailRegistration', 'createUser']),
  }
}
</script>

<style>
    .inputText {
        border: none;
        border-bottom: #41b883 2px solid;
        height: 25px;
        outline: none;
        
    }

    .registerButton {
        border-radius: 3px;
        height: 30px;
        width: 70px;
        box-shadow: none;
        border: 2px solid #41b883;
        background: white;
    }
</style>
