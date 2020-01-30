<template>

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

 

          <div class="mb-3">
            <label for="country">Admin User</label>
            <select v-model="isAdmin" class="custom-select d-block w-100" >
              <option v-for = "option in options" v-bind:key="option.value" v-bind:value = "option.value">{{ option.text }}</option>
            </select>
          </div>
 



          <button type="submit" class="btn btn-primary btn-lg btn-block my-5" :disabled="submitted === true">{{text}}</button>
        </form>
      </div>
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
        ],
        text : "Register"
      }
    },
    methods: {
      register: function () {
        this.submitted = true;
        this.text = "Sending"
        // check if the password input are match 
        if(this.password != this.password_confirmation  ){
          this.error = "Password is not match"
          this.submitted = false
          this.text = "Register"
        }else{
          let data = {
              email: this.email,
              password: this.password,
              isAdmin: this.isAdmin
          }
          this.$store.dispatch('register', data)
          .then(() => {
            this.submitted = false
            this.text = "Register"
            this.error = ""
            this.$router.push('/')
          })
          .catch((msg)=>{
            this.submitted = false
            this.text = "Register"
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
</style>