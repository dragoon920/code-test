<template>
  <div class="row  p-3">
    <div class="col-md-8">
      <div class="card mb-8 shadow-sm">

      <div class="message is-success" v-show="address">
          <div class="message-body">{{error}}</div>

      </div>
      <GoogleMap ref="map"  @setValue="setOriginPlace"  ></GoogleMap>
        <div class="card-body">
          <p class="card-text">This is a google auto complete with map direction </p>
        </div>
      </div>
    </div>
    <div class="col-md-4 order-md-2 mb-4">
      <vue-google-autocomplete
        id="address"
        ref="address"
        class="form-control"
        placeholder="Please input address here"
        v-on:placechanged="getAddressData"
        v-on:error="handleError"
        country="au">
      </vue-google-autocomplete>

      <div class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">From</h6>
          <small class="text-muted">{{originPlace}}</small>
        </div>

      </div>
      <div class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">To</h6>
          <small class="text-muted">{{destinationPlace}}</small>
        </div>
      </div>
   
    </div>
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
            position:null,
            destinationPlace :'',
            originPlace:''
          }
      },
      mounted() {
        if(this.$refs.address) this.$refs.address.focus();
      },

      methods: {
        getAddressData: function (addressData, placeResultData, id) {
          this.destinationPlace = "";
          this.address = addressData
          if ( this.address.street_number !== 'undefined' && this.address.street_number ){
            this.destinationPlace  +=  this.address.street_number;
          }
          if ( this.address.route !== 'undefined' && this.address.route ){
            this.destinationPlace  += " " + this.address.route;
          }
          if ( this.address.locality !== 'undefined' && this.address.locality ){
            this.destinationPlace  +=  " " + this.address.locality;
          }
          if ( this.address.administrative_area_level_1 !== 'undefined' && this.address.administrative_area_level_1 ){
            this.destinationPlace += " " + this.address.administrative_area_level_1;
          }
          if ( this.address.country !== 'undefined' && this.address.country ){
            this.destinationPlace += " " + this.address.country;
          }
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
              //console.log(position);
              //this.originPlace = position
              this.$refs.map.setRoute( position, this.destinationPlace);
            });
          }
        },
        setOriginPlace: function( place ){
          this.originPlace = place.originPlace
        },
        handleError(error) {
          console.log(error)
        }
      }
    }
</script> 
<style scoped>

</style>
