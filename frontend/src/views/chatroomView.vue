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
  data() {
    return  {
        title:'',
        // titel:[],
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
  created(){
    this.connection = io('http://127.0.0.1:3000', {extraHeaders: { Authorization : `Bearer ${localStorage.getItem('user')}`}})
    alert(`Connection started ...`)
  //  console.log(`${localStorage.getItem('user')}`)
  },
  mounted(){
  
        console.log(this.title);
        this.connection.on("message", (data) => {this.title = data;console.log("++"+data)})
       // console.log(this.title)
    
  //  setInterval(() => {
  //       this.connection.emit("Message", new Date());

  //   }, 5000)
 
        

  }
}
</script>

<style>

</style>