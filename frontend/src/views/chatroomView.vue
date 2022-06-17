<template>
  <div>
    <form @submit.prevent="sendMessage" >
      <h1> Create channel </h1>
      <input v-model = "room.name" type="text"/> <br><br>
      <input v-model = "room.isChannel" type=""/> <br><br>
      <input v-model = "room.isPublic" /> <br><br>
      <input v-model="room.password" type="text"/> <br><br>
      <input v-model="room.players" /> <br><br>
    <button type="submit" > create channel</button>
    </form>
    
    <form @submit.prevent="receiveMessage">
       <tbody>
        <tr v-for="room in title" :key="room._id">
        <td>{{room.name}}</td>

        </tr>
       </tbody>
    <button type="submit" >Display rooms</button>
    </form>
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
        title:[],
        // titel:[],
        connection: null,

        room: {
          name:"",
          isChannel:true,
          isPublic:true,
          password:"",
          players:[],
        }

        
    }
  },
  methods: {
    sendMessage() {
        console.log('Message sent !')
       // this.room.players.push(2);
        let roomdata={
          name:this.room.name,
          isChannel:true,
          isPublic:true,
          password:this.room.password,
          players:this.room.players,
        }
        this.connection.emit("createRoom", roomdata);
        console.log(roomdata);
        //I should sent a room
    },
    receiveMessage(){
        console.log("Message received !")
        this.connection = io('http://127.0.0.1:3000', {extraHeaders: { Authorization : `Bearer ${localStorage.getItem('user')}`}})
        this.connection.on("message", (data) => {this.title = data;console.log("++"+data)})
        //console.log(data) //Print data
    }
  },
  created(){
    //! setup socket connection
    this.connection = io('http://127.0.0.1:3000', {extraHeaders: { Authorization : `Bearer ${localStorage.getItem('user')}`}})
    alert(`Connection started ...`)
  },

  mounted(){

      this.connection.on("message", (data) => {this.title = data;console.log("++"+data)})
  }
  
}
</script>

<style>

</style>