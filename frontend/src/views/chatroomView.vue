<template>
  <div>

    <!-- <button v-on:click = sendMessage()> Send Message</button>
    <button v-on:click= receiveMessage()>Receive Message</button> -->
    {{ title }}

  </div>
</template>

<script>
//import socketio from 'socket.io';
//import { server } from "../helper";
//import axios from "axios";
//import router from '../router';
import io from "socket.io-client"
export default {
  name: 'App',
  data: function() {
    return {
        title:'',
      connection: null
    }
  },
  methods: {
    sendMessage: function() {
        console.log('Message sent !')
      this.connection.emit("Message", 'hello from client')
    },
    receiveMessage: function(){
        console.log('Messsage reieved !')
        this.connection.on("Message", (data) => {
            this.title = data;
        //console.log(data) //Print data
    })
    }
  },
  mounted(){
  //  console.log("Starting connection to WebSocket Server")
  //  this.connection = new WebSocket("wss://echo.websocket.org") //http://localhost:3000
        this.connection = io('http://127.0.0.1:3000')
        
        this.connection.emit("Message", 'hey')

        this.connection.on("sendMesssage", (data) => {this.title = data;console.log("++"+data)})
       // console.log(this.title)
    
   setInterval(() => {
        this.connection.emit("Message", new Date());

    }, 5000)
    // this.connection.onmessage = function(event) {
    //  // console.log(event);
    //  console.log("data received ...");
    // }

    // this.connection.onopen = function(event) {
    //     console.log(`[Connection established ...]`)
    // }
    // this.connection.onerror = function(error){
    // //    alert($error.message)
    // alert(`ERROR !`)
    // }
        

  }
}
</script>

<style>

</style>