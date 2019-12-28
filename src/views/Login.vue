<template>
  <div class="login">
   <Form />
  </div>
</template>

<script>
import Form from '@/components/Form.vue'

export default {

  name: 'login',
  components: {
    Form
  },

  data() {
    return {
    
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Solway&display=swap');

body {
  font-family: 'Solway', serif;
}

</style>
