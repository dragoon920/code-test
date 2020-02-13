import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'
Vue.use(Vuex)

// Copy firebaseConfig key here
var firebaseConfig = {
  apiKey: "AIzaSyCidLGjGzEzf4acYGcdkYpwl-m8OoZXRuQ",
  authDomain: "mapapp-1578565139331.firebaseapp.com",
  databaseURL: "https://mapapp-1578565139331.firebaseio.com",
  projectId: "mapapp-1578565139331",
  storageBucket: "mapapp-1578565139331.appspot.com",
  messagingSenderId: "52472939874",
  appId: "1:52472939874:web:5bebaa9e379513b267583b",
  measurementId: "G-8E2LVEYSTP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default new Vuex.Store({
	state: {
  		status: '',
      token: localStorage.getItem('token')?"tokenset":"",
      user : localStorage.getItem('user') || '',
      admin: (localStorage.getItem('admin') === 'true' )|| '',
	},
	mutations: {
		  auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, {token, user, admin}){
		    state.status = 'success'
		    state.token = token
        state.user = user
        state.admin = admin
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
        state.token = ''
        state.user = ''
        state.admin = ''
	  	},
	},
	actions: {

    checkUser({commit, dispatch} ){
      axios({url: 'http://localhost:3000/api/auth', data: { }, method: 'GET' })
      .then(resp => {
      })
      .catch(err => {
        dispatch('clearLocalStorage');
        commit('logout')
      })
    },
    login({commit}, user){
        return new Promise((resolve, reject) => {
            commit('auth_request')
            //login into firebase by email and password, then get id token
            firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
              firebase.auth().currentUser.getIdTokenResult(true)
              .then((getIdTokenResult)=>{
                var token = getIdTokenResult.token
                const user = 'true'
                //This is for testing purpose, get id token to check backend API
                //console.log(token)
                const admin = getIdTokenResult.claims.admin 
                // setup token, user login status and admin flag 
                localStorage.setItem('token', token)
                localStorage.setItem('user', user)
                localStorage.setItem('admin', admin)
                // setup token header
                Vue.prototype.$http.defaults.headers.common['x-auth-token'] = token
                token = 'tokenset'
                commit('auth_success', { token, user, admin})
                resolve()
              });
            })
            .catch((err) => {
              reject( err.message)
            })
        })
    },
    register({commit}, userData){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        // call backend to setup user and return the register result and costom token
        axios({url: 'http://localhost:3000/api/users/', data: userData, method: 'POST' })
        .then(resp => {
          const customToken = resp.data
          firebase.auth().signInWithCustomToken(customToken)
          .then(resp => {
            // if return custom token, then get id token by custom token
            firebase.auth().currentUser.getIdToken(true).then(function(token) {
              var admin = ( userData.isAdmin ) 
              var user = 'true'
              // setup token, user login status and admin flag 
              localStorage.setItem('token', token)
              localStorage.setItem('user', user)
              localStorage.setItem('admin', admin)
              Vue.prototype.$http.defaults.headers.common['x-auth-token'] = token
              // fake token for debug status
              token = 'tokenset'
              commit('auth_success', {token, user, admin })
              resolve(resp)
            }).catch(function(error) {
              reject( err.message)
              // Handle error
            });
          })
          .catch(function(error) {

            reject( err.message)
            // ...
          })

        })
        .catch(err => {
          // show error on screen
          if (typeof err.response === "undefined"  ) {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject('Something wrong pleas contact IT')
          }else if (typeof err.response.status !== "undefined" && (err.response.status === 400 || err.response.status === 403 )) {
            reject( err.response.data.error)
          }else{
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject('Something wrong pleas contact IT')
          }
        })
      })
    },
    logout({commit,dispatch}){
      return new Promise((resolve, reject) => {
        dispatch('clearLocalStorage')
        commit('logout')
        resolve()
      })
    },
    clearLocalStorage(){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('admin')
      delete axios.defaults.headers.common['x-auth-token']
    }

	},
	getters : {
	  isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isAdmin: state => state.admin
	}
})
