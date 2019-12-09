<template>
    <div class="form">
        <input type="text" :value="email" @input="updateEmail" placeholder="Enter your email">
        <p>{{email}}</p>
        <input type="text" v-model="password" placeholder="Enter your password">
        <p>{{password}}</p>
        <button @click="getData">Login</button>
        <p>{{responseFromApi}}</p>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
        
        }
    },

    computed: {
        email() {
            return this.$store.state.email
        },

        password: {
            get() {
                return this.$store.state.password
            },

            set(value) {
                return this.$store.commit('updatePassword', value)
            },

           
        },

        ...mapGetters(['responseFromApi']),
    },

    created() {
            console.log(mapState);
             console.log(mapActions)
    },

    
    methods: {
        // getData() {
        //     const axios = require('axios');
        //     let users = "users"
        //     axios.get(`https://bank-api-dot-apicreation-260015.appspot.com/${users}/${this.email}/${this.password}`).then(res => {
        //         console.log(res)
        //         alert(res.data.message)
        //         // this.response = res.data.message
        //         console.log("this is the responsee ",res.data.message)
        //         this.$router.push('/');
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // }

         ...mapActions(['getData']),

        updateEmail(e) {
            this.$store.commit('updateEmail', e.target.value)
        }
    }
}
</script>