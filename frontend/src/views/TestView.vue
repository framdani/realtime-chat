<template>
 
 <div>
 <h1>List of ALL Users</h1>
<!-- <div v-if="players.length === 0">
        <h2> No customer found at the moment </h2> -->
<!-- </div> -->
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Username</th>
                </tr>
              </thead>

              <tbody>
                  <tr v-for="player in players" :key="player._id">
                  <td>{{ player.username }}</td>
                  </tr>
              </tbody>

              <button type="submit"  @click="logout"> logout </button>
            </table>
 </div>
    
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import router from '../router';
export default {
    data(){
        return {
            players:[],
        };
    },
   mounted() {
    this.fetchUsers();
     },


    methods:{
        fetchUsers(){
        axios.get(`${server.baseURL}/api/find-by-username`, {headers:{'Authorization' : `Bearer ${localStorage.getItem('user')}`}}).then(
          data => {(this.players = data.data);
        // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user')}`;}
    })},
        logout(){ 
          localStorage.clear();
          axios.defaults.headers.common['Authorization'] = ''
          //redirectin
          router.push({name:"home"});
        },
    },

}
</script>

<style>

</style>