<template>
    <div>
        <div v-for="account in getAccount" :key="account.accountNumber">
             <h2>Welcome, {{account.accountNumber}}</h2>
            <div class="balance"> 
                <h2>BALANCE:</h2>
                <h2>{{account.total}}</h2>
            </div>
        </div>
       
       <div class="transaction-wrapper">
            <p>10/12/2019</p>
            <p>Julio Lopez</p>
            <p>-50</p>
        </div>
        <div class="buttons">
            <button>Make a transfer</button>
            <button>Deposit</button>
        </div>
    
    </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    components: {

    }, 
    data() {
        return {

        }
    },

    computed: {
        ...mapGetters(['getAccount'])
      
    },

    created() {
        this.getAccountInfo();
    },

    methods: {
        ...mapActions(['getAccountInfo'])
    }
}
</script>
<style>
.balance {
    display: flex;
    flex-direction: row;
}

.transaction-wrapper {
    display: flex;
    flex-direction: row;
    border: 2px solid lightseagreen;
    justify-content: space-around
}

.import {
    display: flex;
    align-items: flex-end
}

</style>