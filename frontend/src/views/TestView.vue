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
    created() {
    this.fetchUsers();
     },


    methods:{
        fetchUsers(){
        axios.get(`${server.baseURL}/api/users`).then(data => (this.players = data.data));},
        logout(){ 
          //         localStorage.removeItem('user');
          //       axios.defaults.headers.common['Authorization'] = '';
          //         localStorage.setItem('user', "null");
          //  alert(`${localStorage.getItem('user')}`);
          localStorage.clear();
          //redirectin
          router.push({name:"home"});
        },
    },

}
</script>

<style>

</style>