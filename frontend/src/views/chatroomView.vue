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
    <div>
      <h1>rooms</h1>
      <MDBListGroup>
        <MDBListGroupItem v-for="room in title" :key="room._id" tag="a" href="#" action>{{room.name}} : {{room.id}}<br></MDBListGroupItem>
      </MDBListGroup>  
    </div>

    <div>
      <h1>my room</h1>
      <input type="text" placeholder="Enter your message"/> <button>send</button>
    </div>
    </div>
  </div>
</template>

<script>
  import { MDBListGroup, MDBListGroupItem } from "mdb-vue-ui-kit";
import io from "socket.io-client";
export default {
  components: {
      MDBListGroup,
      MDBListGroupItem
    },
  data() {
    return  {
        message:{}, //make it a table and store all the messages
        user:'',
        title:[], //containes all the rooms
        connection: null,
        room: {
          name:"",
          password:"",
          players:[],
        }        
    }
  },
  methods: {
    //createRoomAsOwner()
    sendRoom() {
        console.log('Message sent !')
       // this.room.players.push(2);
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
      // this.connection = io('http://127.0.0.1:3000', {extraHeaders: { Authorization : `Bearer ${localStorage.getItem('user')}`}})
        this.connection.on("message", (data) => {this.title = data;console.log("++"+data)})
    },
    addMember(){
      this.room.players.push(this.user);
    }
  },
  created(){
    //! setup socket connection
    this.connection = io('http://127.0.0.1:3000', {extraHeaders: { Authorization : `Bearer ${localStorage.getItem('user')}`}})
    alert(`Connection started ...`)
  },
  mounted(){
      this.connection.on("message", (data) => {this.title = data;console.log("++"+data)})
      //this
  }
  
}
</script>


<style>
.chatroom{
  display:flex; 
  justify-content:center; 
  justify-content:space-evenly;
}
</style>