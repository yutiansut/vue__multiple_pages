<template>
  <div class="city">
    <img src="../assets/images/city.png">
    <span>{{ city }}</span>
  </div>
</template>

<script>
export default {
  name: 'city',
  data () {
    return {
      city: '定位中'
    }
  },
  mounted () {
    var _this = this;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        if (position) {
          var myGeo = new BMap.Geocoder();
          var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
          myGeo.getLocation(point, function (result) {
            _this.city = result.addressComponents.city.slice(0, -1);
          });
        } else {
          var myCity = new BMap.LocalCity();
          myCity.get(function (result) {
            _this.city = result.name.slice(0, -1);
          });
        }
      },
      function () {
        var myCity = new BMap.LocalCity();
        myCity.get(function (result) {
          _this.city = result.name.slice(0, -1);
        });
      }
    )
  }
}
</script>
