<template>
  <div>
    <vue-google-autocomplete
        id="address"
        ref="address"
        class="search-location"
        placeholder="Start typing"
        v-on:placechanged="getAddressData"
        v-on:error="handleError"
        country="au"
    >
    </vue-google-autocomplete>
    <div class="message is-success" v-show="address">
        <div class="message-body">{{error}}</div>
    </div>
    <GoogleMap ref="map" ></GoogleMap>
  </div>
</template>
<script>
    import VueGoogleAutocomplete from 'vue-google-autocomplete'
    import GoogleMap from './../components/GoogleMap.vue'   
    export default {
      components: { VueGoogleAutocomplete , GoogleMap },

      data: function () {
          return {
            address: '',
            error:'',
            position:null
          }
      },
      mounted() {
        if(this.$refs.address) this.$refs.address.focus();
      },

      methods: {
        getAddressData: function (addressData, placeResultData, id) {
          this.address = addressData
          var destinationPlace = this.address.street_number + this.address.route + this.address.locality + this.address.administrative_area_level_1 + this.address.country;
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
              this.$refs.map.setRoute( position, destinationPlace);
            });
          }
        },
        handleError(error) {
          console.log(error)
        }
      }
    }
</script> 
<style scoped>
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  .search-location {
    display: block;
    width: 596px;
    margin: 0 auto;
    margin-top: 5vw;
    font-size: 20px;
    font-weight: 400;
    outline: none;
    height: 30px;
    line-height: 30px;
    text-align: center;
  
  }

</style>
