<template>
 
<main class="login">
  
    <sectiom class="forms">
        <form class="Login">
            <!-- <h2> Register </h2> -->
               <h1>This is a Login page</h1>
            <input 
            type="email" 
            placeholder="username"/>
            <input
                type="password"
                placeholder="password"
            
            />
            <input type="submit" value="Login"/>
        </form>

    </sectiom>
</main>
</template>

<script>
//import {ref} from 'vue'
export default{
    //properties will be exposed on this
    data(){
        return 0
    },
    //functions that mutate state
    methods :{

    },
    //lifecycle hooks

    mounted(){
        console.log('lgoin form')
    }
}
</script>

<style></style>