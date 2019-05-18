<template>
    <div>
    {{ currentPrice }} 
    </div>
</template>

<script>

import axios from "axios"

export default {
    name: 'btcindex',
    data: function() {
        return {
            currentPrice: "...",
            timer: ''
        }
    },
    created: function() {
        this.getCurrentIndex();
        this.timer = setInterval(this.getCurrentIndex, 5000);

    },
    methods: {
        getCurrentIndex: function() {
            
            function axiosGetRate() {
                return axios.get("http://127.0.0.1:3000/currentRate")
                    .then(response => {
                        console.log(response.data.result.rate);
                        return ""+response.data.result.rate;
                    }).catch((error) => {
                        console.log(error);
                    });
            }
            axiosGetRate().then((result) => {
                this.currentPrice = result;
            });
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
</script>

<style scoped>
</style>