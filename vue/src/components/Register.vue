<template>
  <div id="register">

 

  <div class="row py-5"> 
    <div class="col-md-8 order-md-1">
      <div v-if="error" class="alert alert-danger" role="alert">
        {{error}}
      </div>
      <h4 class="mb-3">Register</h4>
      <form @submit.prevent="register" class="needs-validation">

        <div class="mb-3">
          <label for="email">Email <span class="text-muted"></span></label>
          <input id="email"  class="form-control" type="email" v-model="email" placeholder="you@example.com" required>
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div class="mb-3">
          <label for="password">Password</label>
          <input id="password" class="form-control"  type="password" v-model="password" placeholder="your password"  required>
          <div class="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

        <div class="mb-3">
          <label for="password-confirm">Confirm Password</label>
          <input id="password-confirm"  class="form-control"  type="password" v-model="password_confirmation" placeholder="your password" required>
        </div>

        <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="submitted === true"  >Register</button>
      </form>
    </div>
  </div>










   <!-- <h4>Register</h4>
    <form @submit.prevent="register">
      <div>
        <input id="email" type="email" v-model="email" placeholder="Email" required>
      </div>
      <div>
        <input id="password" type="password" v-model="password" placeholder="Password"  required>
      </div>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" placeholder="Confirm Password" required>
      </div>
      <div>
        <select v-model="isAdmin">
          <option v-for = "option in options" v-bind:key="option.value" v-bind:value = "option.value">{{ option.text }}</option>
        </select>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
      <h3 class="error">{{error}}</h3>
    </form>-->
  </div>
</template>
<script>
  export default {
    data(){
      return {
        email : "",
        password : "",
        password_confirmation : "",
        error : "",
        isAdmin: false,
        submitted: false,
        options: [
          { text: 'Read Only', value: false },
          { text: 'Admin', value: true }
        ]
      }
    },
    methods: {
      register: function () {
        this.submitted = true;
        // check if the password input are match 
        if(this.password != this.password_confirmation  ){
          this.error = "Password is not match"
          this.submitted = false
        }else{
          let data = {
              email: this.email,
              password: this.password,
              isAdmin: this.isAdmin
          }
          this.$store.dispatch('register', data)
          .then(() => {
            this.submitted = false
            this.error = ""
            this.$router.push('/')
          })
          .catch((msg)=>{
            this.submitted = false
            this.error = msg
          })
        }
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

  /*#register {
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
  select{
    padding: 16px;
    margin: 10px;
    width: 205px;
  }
  .error{
    color:brown;
  }*/
</style>