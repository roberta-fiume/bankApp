<template>
    <div>
        <div v-if="!getIsUserLoggedIn">
            <h2>Welome to SaveUp! Please log in or register to access our services</h2>
        </div>
        <button v-if="getIsUserLoggedIn" @click="logOut" class="logOutButton">Log out</button>
        <div class="wrapper"  v-if="getIsUserLoggedIn">
            <h1>Welcome {{getUserEmail}}</h1>
            <div class="wrapper-balance">
                <p>Balance afer pending</p>
                <h2 class="balance">£{{getFlagForTotal === true ? getTotal : getUpdatedTotalAfterSendingTransaction}}</h2>  
            </div>
            <div class="transaction-wrapper" v-for="transaction in getterTransactions" :key="transaction.amount">
                    <div>{{transaction.date}}</div>
                    <div class="details-wrapper">
                        <div class="row">{{transaction.recipientReference}}</div>
                        <div class="row-second">{{transaction.type === "send" ? "£"+ -transaction.amount : "+" + "£"+transaction.amount}}</div>
                    </div>
                <!-- <p>{{transaction.recipientAccountNumber}}</p> -->
                <!-- <p> FROM: {{transaction.senderAccountNumber}}</p> -->
                <!-- <p> SENDER REFERENCE: {{transaction.senderReference}}</p> -->
                <!-- <p> TYPE: {{transaction.type}}</p> -->
            </div>
            <div class="buttons">
                <button @click="showTransferBox" class="doTransfer">Make a transfer</button>
            </div>
            <div v-if="getTransferBox" class="transferDetails" >
                <div >
                    <p>From: {{getAccountNumber}}</p>
                    <div class="date">
                        <label>Enter date:</label><input type="text" placeholder="ex: 23rd Nov 2018" v-model="date">
                        <p>{{date}}</p>
                    </div>
                
                    <div class="amount">
                        <label>Enter amount: £</label><input type="text" v-model="amount">
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

        ...mapGetters(['getIsUserLoggedIn','getDate', 'getUserEmail','getAmount', 'getRecipient', 'getRecipientAccountNumber','getTransferBox','getTransferResponse','getRecipientResponse', 'getAccountNumber', 'getBalance', 'getterTransactions','getFlagForTotal', 'getTotal', 'getUpdatedTotalAfterSendingTransaction'])
      
    },

    methods: {
        ...mapActions(['updateDate', 'updateAmount', 'updateRecipient', 'updateRecipientAccountNumber', 'showTransferBox', 'sendTransaction', 'logOut', 'getTransactions', 'updateTotalAfterTransaction']),
    }
}
</script>
<style>
h2 {
    margin: 0;
}
p {
    margin: 0;
}
.wrapper {
    border: 2px solid lightsalmon
}
.balance {
    display: flex;
    flex-direction: row;
}

.wrapper-balance {
    border-bottom: 1px solid gray;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    padding-left: 15px;
    padding-bottom: 15px;
}

.transaction-wrapper {
    border-bottom: 1px solid gray;
    padding-left: 15px;
    padding-bottom: 15px;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start
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
.logOutButton {
    border-radius: 3px;
    height: 30px;
    width: 70px;
    box-shadow: none;
    border: 2px solid #41b883;
    background: white;
}

.doTransfer {
    border-radius: 3px;
    height: 30px;
    width: 70px;
    box-shadow: none;
    border: 2px solid #41b883;
    background: white;
}

.details-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    align-items: flex-start

}

.row {
  display: flex; 
}

.row-second {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
}


</style>