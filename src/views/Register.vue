<template>
  <div class="register">
    <h1>Register</h1>
   <input type="text" v-model="emailRegistration" placeholder="Enter an email">
   <p>{{emailRegistration}}</p>
   <input type="text" v-model="passwordRegistration" placeholder="Enter a password">
    <p>{{passwordRegistration}}</p>
   <button @click="postData()">Sign up</button>
   <p>{{responsePostRequest}}</p>
   <p></p>
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

  
    created() {
            console.log(mapState);
            console.log(mapActions)
    },

  methods: {
      ...mapActions(['updatePasswordRegistration', 'updateEmailRegistration', 'postData']),
  }
}
</script>

<style>

</style>
