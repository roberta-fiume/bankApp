<template>
    <div class="form">
        <h1>Login</h1>
        <input type="text" v-model="email" placeholder="Enter your email">
        <p>{{email}}</p>
        <input type="text" v-model="password" placeholder="Enter your password">
        <p>{{password}}</p>
        <button @click="getData">Login</button>
        <p>{{ responseFromApi }}</p>
        <!-- <button  v-if="getParagraph" @click="clearFieldsLogin">CLEAR</button> -->
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
         ...mapActions(['getData', 'updatePassword', 'updateEmail']),
    }
}
</script>