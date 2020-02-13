<template>
  <div class="row  p-3">

    <div class="col-md-4 mb-4">
      <h6 class="my-0">From</h6>
      <vue-google-autocomplete 
        id="from_address"
        ref="from_address"
        class="form-control mb-2"
        :placeholder= "originPlace"
        v-on:placechanged="updateFromAddress"
        v-on:error="handleError"
        country="au" >
      </vue-google-autocomplete>
      <h6 class="my-0">To</h6>
      <vue-google-autocomplete
        id="to_address"
        ref="to_address"
        class="form-control mb-2"
        placeholder="Please input address here"
        v-on:placechanged="getAddressData"
        v-on:error="handleError"
        country="au">
      </vue-google-autocomplete>

  
 
      <div v-show="hide"  id = "panelParent"  class="list-group-item   no-padding">
          <div  id="panel"  ></div>  
      </div>
    </div>
    <div class="col-md-8 mb-2" v-show="hide"  >
      <div class="card mb-8 shadow-sm" id="mapParent">

        <div class="message is-success" v-show="address">
            <div class="message-body">{{error}}</div>
        </div>
        <GoogleMap ref="map"  @setValue="setOriginPlace" id='mapx' ></GoogleMap>
      </div>
    </div>
    <div class="col-md-8 mb-4">
      <button v-show="display"  v-on:click="flip" type="button" class="btn btn-primary btn-lg btn-block">{{front?"Change to Route":"Change to Map"}}</button>

      <div  v-show="display" class="flipcard h mb-2 my-2" id="cardId">
          <div class="front " id = "cardfront">

          </div>
          <div class="back">
            <div id = "cardback" class="list-group-item d-flex justify-content-between lh-condensed no-padding">
               
            </div>
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
            originPlace:'',
            display: true,
            front: true 
          }
      },  
      computed: {
        // a computed getter
        /*showMap: function () {
          var showMap = true
          if(this.display){
            if(!this.mapView ){
              showMap = false
            }
          }
          return showMap
        },
        showRoute: function () {
          var showRoute = true
          if(this.display){
            if(this.mapView ){
              showRoute = false
            }
          }
          return showRoute
        }*/
        hide: function () {
          return !this.display
        }
      },
      mounted() {
        if(this.$refs.address) this.$refs.address.focus();

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            //console.log(position);
            //this.originPlace = position
            //this.$refs.map.setRoute( position, this.destinationPlace);
            this.position = position

            var geocoder = new google.maps.Geocoder;
            let originPlace = new google.maps.LatLng(position.coords.latitude , position.coords.longitude)
            geocoder.geocode({'latLng': originPlace}, function (locations, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                for (var location of locations) {
                  //if (location.types.indexOf("locality") != -1  ) {
                  this.originPlace = location.formatted_address;
                  //this.$emit("setValue", { originPlace:this.originPlace  });
                  break;
                  //}
                };
              }
            }.bind(this));

          });
        }

        this.onResize()
        window.addEventListener('resize', this.onResize)

/*
          if (window.innerWidth >= 768) {
            this.display = false
          } else {
            this.display = true
          }
 
            console.log('change')
            if(this.display){
              document.getElementById('cardback').appendChild(document.getElementById("panel"))
              document.getElementById('cardfront').appendChild(document.getElementById("mapx"))
             
            }else{
              document.getElementById('panelParent').appendChild(document.getElementById("panel"))
              document.getElementById('mapParent').appendChild(document.getElementById("mapx"))
            }

*/

      },

      methods: {
        flip:function(event){
          document.querySelector('#cardId').classList.toggle('flip')
          this.front = !this.front
        },
        updateFromAddress: function( addressData , placeResultData, id ){
          this.originPlace = "";
          this.address = addressData
          if ( this.address.street_number !== 'undefined' && this.address.street_number ){
            this.originPlace  +=  this.address.street_number;
          }
          if ( this.address.route !== 'undefined' && this.address.route ){
            this.originPlace  += " " + this.address.route;
          }
          if ( this.address.locality !== 'undefined' && this.address.locality ){
            this.originPlace  +=  " " + this.address.locality;
          }
          if ( this.address.administrative_area_level_1 !== 'undefined' && this.address.administrative_area_level_1 ){
            this.originPlace += " " + this.address.administrative_area_level_1;
          }
          if ( this.address.country !== 'undefined' && this.address.country ){
            this.originPlace += " " + this.address.country;
          }
          this.updateMap();
        },
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
          this.$refs.map.setRoute( this.originPlace, this.destinationPlace);
        },
        updateMap: function(){
         
          if(this.destinationPlace != ''){
            this.$refs.map.setRoute( this.originPlace, this.destinationPlace);
          }
        },  
        onResize: function() {
          var preDisplay = this.display
          if (window.innerWidth >= 768) {
            this.display = false
          } else {
            this.display = true
          }
          //if( preDisplay !== this.display){
            console.log('change')
            if(this.display){
              document.getElementById('cardback').appendChild(document.getElementById("panel"))
              document.getElementById('cardfront').appendChild(document.getElementById("mapx"))
             
            }else{
              document.getElementById('panelParent').appendChild(document.getElementById("panel"))
              document.getElementById('mapParent').appendChild(document.getElementById("mapx"))
            }
          //}
          
        },
        setOriginPlace: function( place ){
          //this.originPlace = place.originPlace
        },
        handleError(error) {
          console.log(error)
        }
      },
      created() {

 
      },

      beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
      }
    }
</script> 
<style scoped>
.no-padding{
  padding: 0;
}

.flipcard {
  position: relative;

  height: 160px;
  perspective: 500px;
}
.flipcard.v:hover .front, .flipcard.v.flip .front{
  transform: rotateX(180deg);
}
.flipcard.v:hover .back, .flipcard.v.flip .back{
  transform: rotateX(0deg);
}
.flipcard.v .back{
  transform: rotateX(-180deg);
}
.flipcard.h.front, .flipcard.h.flip .front{
  transform: rotateY(180deg);
}
.flipcard.h.back, .flipcard.h.flip .back{
  transform: rotateY(0deg);
}
.flipcard.h .back{
  transform: rotateY(-180deg);
}
.flipcard .front, .flipcard .back
{
  position:absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: all 0.5s ease-in;
  color: white;
  padding: 10px;
  backface-visibility: hidden;
}
</style>
