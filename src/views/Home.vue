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
            <p>10th Dec 2019</p>
            <p>Julio Lopez</p>
            <p>-50</p>
        </div>
        <div class="buttons">
            <button @click="showTransferBox">Make a transfer</button>
            <button>Deposit</button>
        </div>
        <div v-if="getTransferBox">
            <div v-for="account in getAccount" :key="account.total" class="transferDetails" >
            <p>From: {{account.accountNumber}}</p>

            <div class="date">
                <label>Enter date:</label><input type="text" placeholder="ex: 23rd Nov 2018" v-model="date">
                <p>{{date}}</p>
            </div>
           
           <div class="amount">
               <label>Enter amount: </label><input type="text" v-model="amount">
                  <p>{{amount}}</p>
            </div>

           <div class="recipient">
               <label>Enter recipient:</label><input type="text" v-model="recipient">
                  <p>{{recipient}}</p>
            </div>
          
           <button class="sendTransference" @click="sendTransferDetails">SEND</button>
           <p>{{getTransferResponse}}</p>
        </div>
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
            // transferDetails: false
        }
    },

    computed: {
        date: {
            get() {
                return this.getDate
            },

            set(value) {
                return this.updateDate(value);
            },
        },


        amount: {
            get() {
                return this.getAmount
            },

            set(value) {
                return this.updateAmount(value);
            },
        },

        recipient: {
            get() {
                return this.getRecipient
            },

            set(value) {
                return this.updateRecipient(value);
            },
        },


        
        ...mapGetters(['getAccount', 'getDate', 'getAmount', 'getRecipient', 'getTransferBox','getTransferResponse'])
      
    },

    created() {
        this.getAccountInfo();
    },

    methods: {
        ...mapActions(['getAccountInfo', 'updateDate', 'updateAmount', 'updateRecipient', 'showTransferBox', 'sendTransferDetails']),

        // showDetailsForTransfer() {
        //     this.transferDetails = true
        // }
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

.transferDetails {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
}
.date {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 16px;
}
.amount {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 16px;
}
.recipient {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 16px;
}
.sendTransference {
    width: 70px;

}

</style>