<template>
 
<main class="login">
  
    <sectiom class="forms">
        <form class="register">
            <!-- <h2> Register </h2> -->
               <h1>This is a Login page</h1>
            <input 
            type="email" 
            placeholder="username"/>
            <input
                type="password"
                placeholder="password"
            
            />
            <input type="submit" value="Register"/>
        </form>

        <form class="login"></form>
    </sectiom>
</main>
</template>

<script>
import {ref} from 'vue'
export default{
    setup(){
        const login_form = ref({});
		const register_form = ref({});
    }
}
</script>

<style></style>