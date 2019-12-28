<template>
    <div class="form">
        <h1>Login</h1>
        <input type="text" v-model="email" placeholder="Enter your email" class="inputText">
        <p>{{email}}</p>
        <input type="text" v-model="password" placeholder="Enter your password" class="inputText">
        <p>{{password}}</p>
        <button @click="logIn" class="loginButton ">Login</button>
        <p class="response">{{ responseFromApi }}</p>
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
          email: {
            get() {
                return this.getEmail
            },

            set(value) {
                return this.updateEmail(value);
            }, 
        },

        password: {
            get() {
                return this.getPassword
            },

            set(value) {
                return this.updatePassword(value);
            }, 
        },
        ...mapGetters(['getEmail', 'getPassword','responseFromApi', 'getParagraph']),
    },

    methods: {
         ...mapActions(['logIn', 'updatePassword', 'updateEmail']),
    }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Solway&display=swap'); */

    
    .inputText {
        border: none;
        border-bottom: #41b883 2px solid;
        height: 25px;
        outline: none;
        margin-bottom: 20px;
        font-family: 'Solway', serif;
    }

    .loginButton {
        border-radius: 3px;
        height: 30px;
        width: 70px;
        box-shadow: none;
        border: 2px solid #41b883;
        background: white;
        outline: none;
        margin-top: 15px;
        font-family: 'Solway', serif;
    }

    .response {
        margin-top: 40px;
    }
</style>