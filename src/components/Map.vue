<template>
  <div class="map-container">
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  props: ["lat", "lng"],

  data() {
    return {
      google: null,
      map: null,
    };
  },

  async mounted() {
    const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    });
    const mapOptions = {
      center: {
        lat: this.lat || 0,
        lng: this.lng || 0,
      },
      zoom: 14,
    };

    this.initializeMap(loader, mapOptions);
  },

  methods: {
    initializeMap(loader, mapOptions) {
      loader
        .load()
        .then((google) => {
          const mapContainer = this.$refs.googleMap;
          this.map = new google.maps.Map(mapContainer, mapOptions);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.map-container,
.google-map {
  width: 100%;
  height: 500px;
}
</style>