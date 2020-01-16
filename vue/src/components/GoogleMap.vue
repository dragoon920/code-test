<template>
  <div class = "map-container">
    <div id="map" style="width: 600px; height: 400px;text-align: center; "></div> 
  </div>
</template>
<script>

export default {
  components: {   },
  data: function () {
      return {
        map: null
      }
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom:11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center:new google.maps.LatLng(-33.8688823,151.207896 )
    });
  },
  methods: {
    setRoute: function ( position , destinationPlace) {
      //set origin place by latitude and longtitude
      let originPlace = new google.maps.LatLng(position.coords.latitude , position.coords.longitude)
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(this.map);
      var request = {
        origin: originPlace, 
        destination: destinationPlace,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    }
  }
}
</script> 
<style>
  .map-containe{
    width: 600px; 
    height: 400px; 
    text-align: center;
  }
  #map {
    display: block;
    margin: 0 auto;
  }
</style>