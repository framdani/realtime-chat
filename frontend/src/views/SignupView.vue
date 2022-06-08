<template>
 
<main class="login">
  
    <sectiom class="forms">
        <form class="Login" @submit.prevent="signup">
            <!-- <h2> Register </h2> -->
               <h1> Regitration Form </h1>
            <input 
            v-model="player.username"
            type="text" 
            placeholder="username"/>
            <br><br>
            <input
                v-model="player.password"
                type="password"
                placeholder="password"
            
            />
            <br><br>
            <button type="submit"> Register </button>
        </form>

    </sectiom>
</main>
</template>

<script>
import axios from "axios";
import { server } from "../helper";
import router from "../router";
export default {
    data(){
        return {
            player :{
            username:"",
            password:"",
            }
        };
    },
    methods:{
        signup(){
            let userdata = {
                username : this.player.username,
                password : this.player.password,
            };
            this.__submitToServer(userdata);
        },
        __submitToServer(data){
            axios.post(`${server.baseURL}/api/signup`, data).then(
                data => {router.push({name:"Login"});}
                );
        }
    },

};

</script>