<template>
 <div id="login">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <div>
        <input type="text" v-model="email" name="email"  placeholder="Email" />
      </div>
      <div>
        <input type="text" v-model="password" name="password"  placeholder="Password" />
      </div>
      <div>
        <button class="btn btn-primary"  type="submit">Login</button>
      </div>
      <h3 class="error">{{error}}</h3>
   </form>
 </div>
</template>
<script>
	export default {
		data(){
			return {
				email : "",
        password : "",
        error : "",
        submitted: false
      }
		},
		methods: {
		 	login: function () {
          this.submitted = true;
		   		let email = this.email 
		   		let password = this.password
		   		this.$store.dispatch('login', { email, password })
		   		.then(() => this.$router.push('/'))
		   		.catch((error)=>{
             this.error = error
           })
		   	}
		}
	}
</script>
<style scoped>
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 30px;
    padding: 0 10px 40px;
  }

  input {
    padding: 16px;
    margin: 10px;
  }
  .btn{
    padding: 16px;
    margin: 10px;
    width: 205px;
    background-color: #45B8AC;
    border: 0;
  }
  .error{
    color:brown;
  }
</style>