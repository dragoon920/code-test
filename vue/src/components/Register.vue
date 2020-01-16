<template>
  <div id="register">
    <h4>Register</h4>
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
    </form>
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
        options: [
          { text: 'Read Only', value: false },
          { text: 'Admin', value: true }
        ]
      }
    },
    methods: {
      register: function () {
        // check if the password input are match 
        if(this.password != this.password_confirmation  ){
          this.error = "Password is not match"
        }else{
          let data = {
              email: this.email,
              password: this.password,
              isAdmin: this.isAdmin
          }
          this.$store.dispatch('register', data)
          .then(() => {
            this.error = ""
            this.$router.push('/')
          })
          .catch((msg)=>{
            this.error = msg
          })
        }
      }
    }
  }
</script>
<style scoped>
  #register {
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
  }
</style>