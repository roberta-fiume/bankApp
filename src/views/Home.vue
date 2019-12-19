<template>
    <div>
        <div v-if="!getIsUserLoggedIn">
            <h2>Welome to SaveUp! Please log in or register to access our services</h2>
        </div>
        <button v-if="getIsUserLoggedIn" @click="logOut">Log out</button>
        <div class="wrapper"  v-if="getIsUserLoggedIn">
            <h1>Welcome {{getUserEmail}}</h1>
            <h2>Your current balance is: {{getBalance}} </h2>
            <div class="transaction-wrapper">
                <p>10th Dec 2019</p>
                <p>Julio Lopez</p>
                <p>-50</p>
            </div>
            <div class="buttons">
                <button @click="showTransferBox">Make a transfer</button>
            </div>
            <div v-if="getTransferBox" class="transferDetails" >
                <div >
                    <p>From: {{getAccountNumber}}</p>
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

                    <div class="recipientAccountNumber">
                        <label>Enter recipient account number:</label><input type="text" v-model="recipientAccountNumber">
                        <p>{{recipientAccountNumber}}</p>
                    </div>

                    <button class="sendTransference" @click="sendTransaction">SEND</button>
                    <p>{{getTransferResponse}}</p>
                    <p>{{getRecipientResponse}}</p>
                </div>
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

        
        recipientAccountNumber: {
            get() {
                return this.getRecipientAccountNumber
            },

            set(value) {
                return this.updateRecipientAccountNumber(value);
            },
        },

        // ...mapGetters(['getWelcomeMessage','getLoginButton', 'getLogOutButton', 'getWrapper','getDate', 'getUserEmail','getAmount', 'getRecipient', 'getRecipientAccountNumber','getTransferBox','getTransferResponse','getRecipientResponse', 'getAccountNumber', 'getBalance'])
        ...mapGetters(['getIsUserLoggedIn','getDate', 'getUserEmail','getAmount', 'getRecipient', 'getRecipientAccountNumber','getTransferBox','getTransferResponse','getRecipientResponse', 'getAccountNumber', 'getBalance'])
      
    },

    methods: {
        ...mapActions(['updateDate', 'updateAmount', 'updateRecipient', 'updateRecipientAccountNumber', 'showTransferBox', 'sendTransaction', 'logOut', 'getTransactions']),
    }
}
</script>
<style>
.wrapper {
    border: 2px solid lightsalmon
}
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
     border: 2px solid lightslategray
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