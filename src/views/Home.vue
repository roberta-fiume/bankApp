<template>
    <div>
        <div class="balance"> 
            <h2>BALANCE:</h2>
            <h2>1200</h2>
        </div>
       
       <div class="transaction-wrapper">
            <div class="transactions">
                <p>Date reference</p>
                <p>name of who get the money</p>
            </div>
            <div class="import">
                <p>-import that you send</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {

    }, 
    data() {
        return {

        }
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