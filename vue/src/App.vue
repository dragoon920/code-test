<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div class="container">
        <a class="navbar-brand" href="#">      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mx-auto" role="img" viewBox="0 0 24 24" focusable="false"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" @click="collapse = (collapse + 1) % 2"  >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="[collapse == 1? 'show':'','collapse navbar-collapse' ]" >
          <ul class="navbar-nav mr-auto">
            <li class="nav-item ">
              <router-link :class="[currentPage == '/' ? activeClass:'','nav-link' ]" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :class="[currentPage.includes('/about') ? activeClass:'','nav-link' ]" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link :class="[currentPage.includes('/admin') ? activeClass:'','nav-link' ]" to="/admin">Admin</router-link>
            </li>
            <li class="nav-item">
              <router-link :class="[currentPage.includes('/map') ? activeClass:'','nav-link' ]" to="/map">Map</router-link>
            </li>

          </ul>
          <form class="form-inline my-2 my-md-0">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item" v-if="isLoggedIn">
                <a @click="logout" class="nav-link">Logout</a>
              </li>
              <li class="nav-item"  v-else>
                <router-link :class="[currentPage.includes('/login') ? activeClass:'','nav-link' ]" to="/login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios';
  export default {
    data(){
      return{
        activeClass: 'active',
        collapse:false
      }
    },
    computed : {
      isLoggedIn : function(){
        return this.$store.getters.isLoggedIn},
      currentPage(){
        return this.$route.path;
      }
      
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    watch:{

    },
    created: function () {
      this.$store.dispatch('checkUser')
    }
  }
</script>

<style>
.nav-link{
   text-align:left;
}
.router-link-exact-active {
  color: #42b983;
}
</style>
