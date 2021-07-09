<template>
  <canvas ref="canvasViewer" width="500" height="500"></canvas>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DrawingViewer",

  data: () => ({
    canvas: null,
    pollingInterval: undefined,
  }),

  computed: {
    ...mapState([
      'drawingFromServer'
    ]),
  },

  methods: {
    setDimensions ({ width, height }) {
      this.$refs.canvasViewer.width = width
      this.$refs.canvasViewer.height = height
    }
  },

  watch: {
    drawingFromServer (strDataURI) {
      const img = new Image();
      img.addEventListener("load", () => {
        this.$refs.canvasViewer
          .getContext("2d")
          .drawImage(img, 0, 0);
      });
      img.setAttribute("src", strDataURI);
    }
  }
}
</script>

<style scoped>

</style>
