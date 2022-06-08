<template>
 
<main class="login">
  
    <section class="forms">
        <form class="Login" @submit.prevent="signin">
            <!-- <h2> Register </h2> -->
               <h1> Login Form </h1>
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
            <button type="submit"> login </button>
        </form>

    </section>
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
        signin(){
            let userdata = {
                username : this.player.username,
                password : this.player.password,
            };
            this.__submitToServer(userdata);
        },
        __submitToServer(data){
            axios.post(`${server.baseURL}/api/login`, data).then(response =>
             {//store this token
                if (response.data.accessToken)
                    localStorage.setItem('user', response.data.accessToken);
                  //  localStorage.setItem('user', JSON.stringify(response.data) );
                    
                   axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
               // console.log(response.data.accessToken);
                    router.push({name:"Users"});
                  //  alert(`Token received ! : ${response.data.accessToken}`);
            });
        }
    },

};

//Get toekn let user = JSON.parse(localStorage.getItem('user'));
</script>