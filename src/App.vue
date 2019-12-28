<template>
  <div id="app">
   <div class="nav">
      <router-link to="/" class="router-link">Home</router-link> 
      <router-link to="/login" v-if="!getIsUserLoggedIn" class="router-link">Login</router-link> 
      <router-link to="/register" class="router-link">Register</router-link> 
      <p class="logout" v-if="getIsUserLoggedIn" @click="logOut">Logout</p>

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
    },

    methods: {
      ...mapActions(['logOut'])
    }

   
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Solway&display=swap');


#app {
  /* font-family: 'Solway', serif; */
  color: #2c3e50;
}

.nav {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
}

.router-link {
  text-decoration: none;
  color: black;
  margin-right: 10px;
  font-size: 20px;
}

.logout {
  font-size: 20px;
  color: black;
}


</style>
