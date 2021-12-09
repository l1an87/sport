<script>
import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  components: {
    LMap,
    LTileLayer,
    LPolyline,
  },
  props: {
    zoom: {
      type: [Number, String],
      default: 15,
    },
    points: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: '300px',
    },
    width: {
      type: String,
      default: '100%',
    },
  },
  data: () => ({
    center: [],
  }),
  computed: {
    styles() {
      return {
        height: this.height,
        width: this.width,
        'z-index': 1,
      };
    },
  },
  methods: {
    getCenter() {
      let latMin = 9999;
      let latMax = 0;
      let lngMin = 9999;
      let lngMax = 0;
      this.points.forEach(([lat, lng]) => {
        if (lat > latMax) latMax = lat;
        if (lat < latMin) latMin = lat;
        if (lng > lngMax) lngMax = lng;
        if (lng < lngMin) lngMin = lng;
      });
      this.center = [
        latMin + ((latMax - latMin) / 2),
        lngMin + ((lngMax - lngMin) / 2),
      ];
    },
  },
  watch: {
    points() {
      this.getCenter();
    },
  },
  mounted() {
    this.getCenter();
  },
};
</script>
<template>
  <LMap
    :style="styles"
    :zoom="zoom"
    :center="center"
    v-if="center.length&&points.length"
    ref="map"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LPolyline
      :color="$vuetify.theme.themes.light.primary"
      :lat-lngs="points"
    />
  </LMap>
</template>
<style lang="scss">

</style>
