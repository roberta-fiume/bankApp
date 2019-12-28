<template>
  <div id="app">
   <div id="nav">
      <router-link to="/" class="router-link">Home</router-link> |
      <router-link to="/login" v-if="!getIsUserLoggedIn" class="router-link">Login</router-link> |
      <router-link to="/register" class="router-link">Register</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    components: {
    
    },

    computed: {
      ...mapGetters(['getIsUserLoggedIn'])
    }

   
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Solway&display=swap');


#app {
  font-family: 'Solway', serif;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-link {
  text-decoration: none;
  color: black;
}


</style>
