<template>
  <div class="container">
    <form @submit.prevent="sendMessage" >
      <div>
      <input v-model = "room.name" placeholder="channel_name" type="text"/> <br><br>
      <input v-model = "room.isPublic" /> <br><br>
      <input v-model="room.password" placeholder="password" type="text"/> <br><br>
      <input v-model="room.players" placeholder="add players"/> <br><br>
      <button type="submit" > create channel</button>
      </div>
    </form>

    <div class="chatroom">
    <div>
      <h1>rooms</h1>
      <form @submit.prevent="receiveMessage">
      <MDBListGroup>
        <MDBListGroupItem v-for="room in title" :key="room._id" tag="a" href="#" action>{{room.name}} : {{room.id}}<br></MDBListGroupItem>
      </MDBListGroup>  
      <button type="submit" >Display rooms</button>
      </form>
    </div>

    <div>
      <h1>my room</h1>
      {{message}}
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
  ///name: 'App',
  data() {
    return  {
        message:{},
        title:[],
        // titel:[],
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
    sendMessage() {
        console.log('Message sent !')
       // this.room.players.push(2);
        let roomdata={
          name:this.room.name,
          password:this.room.password,
          players:this.room.players,
        }
        this.connection.emit("createRoom", roomdata);
        console.log(roomdata);
        //I should sent a room
    },
    //GeMytRooms()
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
    // this.connection = io('http://127.0.0.1:3000', {extraHeaders: { Authorization : `Bearer ${localStorage.getItem('user')}`}})
      this.connection.on("message", (data) => {this.title = data;console.log("++"+data)})
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