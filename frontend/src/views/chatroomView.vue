<template>
  <div class="container">
      <div>
      <input v-model = "room.name" placeholder="channel_name" type="text"/> <br><br>
      <input v-model = "room.isPublic" /> <br><br>
      <input v-model="room.password" placeholder="password" type="text"/> <br><br>
      <input v-model="user" placeholder="add players"/> <button @click="addMember">Add member</button><br><br>
      <button type="submit" @click="sendRoom" > create channel</button>
      </div>

    <div class="chatroom">
    <div class="channels">
      <h1>rooms</h1>
     
    <button v-for="room in rooms" :key="room._id" @click="receiveMessages(room.id, room.name)">{{room.name}} : {{room.id}}</button><br>
      
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <th><h1>my room {{roomName}}</h1></th>
          </tr>
        </thead>

        <tbody>
         <tr v-for="message in messages" :key="message._id">
                  <td>{{message.playerid}} : {{ message.content }}</td>
                  </tr>
          </tbody>


    
      <input v-model ="messageDto.content" type="text" placeholder="Enter your message" /> <button @click="sendMessage">send</button>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
 // import { MDBListGroup, MDBListGroupItem } from "mdb-vue-ui-kit";
import io from "socket.io-client";
import { server } from "../helper";
import axios from "axios";
//import router from '../router';
export default {
  // components: {
  //     MDBListGroup,
  //     MDBListGroupItem
  //   },
  data() {
    return  {
        messages:[], //make it a table and store all the messages
        user:'',
        rooms:[], //containes all the rooms
        connection: null,
        roomName:"",
        room: {
          name:"",
          password:"",
          players:[],
        },
        messageDto:{
          id:null,
          content:"",
        }      
    }
  },
  methods: {
    //createRoomAsOwner()
    sendRoom() {
        console.log('Message sent !')
        let roomdata={
          name:this.room.name,
          password:this.room.password,
          players:this.room.players,
        }
        this.connection.emit("createRoom", roomdata);
       // console.log(roomdata);
        this.room.players.splice(0);
        //I should sent a room
    },
    //GeMytRooms()
    receiveRooms(){
        console.log("Message received !")
        this.connection.on("message", (data) => {this.rooms = data;})
        this.messageDto.id = this.rooms[0].id;
    },
  
    addMember(){
      this.room.players.push(this.user);
    },
    sendMessage(){
      let messagedata={
        id : this.messageDto.id,
        content : this.messageDto.content,
      }
      console.log(this.messageDto);
      this.connection.emit("createMessage",messagedata);
    },
    receiveMessages(id, roomname){
      this.roomName = roomname;
      this.messageDto.id = id;
      console.log(id);
      //getMessageby roomid
      
     // this.connection.on("sendMessage", (data)=>{this.messages = data;});
    //  this.messages.splice(0) ;
      this.messages.length = 0;
      axios.get(`${server.baseURL}/api/chat/room`,{params:{roomid:id}},{headers:{'Authorization' : `Bearer ${localStorage.getItem('user')}`}}).then( (data) => {this.messages = data.data; console.log(data.data);});

    }
  },
  created(){
    //! setup socket connection
    this.connection = io('http://127.0.0.1:3000', {extraHeaders: { Authorization : `Bearer ${localStorage.getItem('user')}`}})
    alert(`Connection started ...`)
  },
  mounted(){
      this.connection.on("message", (data) => {this.rooms = data;this.messageDto.id = this.rooms[0].id;this.roomName = this.rooms[0].name});
      this.connection.on("sendMessage", (data)=>{this.messages = data;})
     // this.messageDto.id = this.rooms[0].id;
      //add connection on for messages => and printed in a sorted way
  }
  
}
</script>


<style>
.chatroom{
  display:flex; 
  justify-content:center; 
  justify-content:space-evenly;
}

.channels{
  display: flex;
  flex-direction: column;
}
</style>