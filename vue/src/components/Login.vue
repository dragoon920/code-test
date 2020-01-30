<template>
 <div id="login">
  <form class="form-signin" @submit.prevent="login">

    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" v-model="email" class="form-control" placeholder="Email address" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" v-model="password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="submitted === true" >{{text}}</button>
    <div v-if="error" class="my-2 alert alert-danger" role="alert">
      {{error}}
    </div>
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
        submitted: false,
        text : "Sign in"
      }
		},
		methods: {
		 	login: function () {
          this.submitted = true
          this.text = "Sending"
		   		let email = this.email 
		   		let password = this.password
		   		this.$store.dispatch('login', { email, password })
		   		.then(() => {
            this.$router.push('/')
           })
		   		.catch((error)=>{
            this.submitted = false
            this.text = "Sign in"
            this.error = error
           })
		   	}
		}
	}
</script>
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 150px 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>