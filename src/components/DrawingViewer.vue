<template>
  <canvas ref="canvasViewer" width="500" height="500"></canvas>
</template>

<script>
export default {
  name: "DrawingViewer",

  data: () => ({
    canvas: null,
    pollingInterval: undefined,
  }),

  methods: {
    setDimensions ({ width, height }) {
      this.$refs.canvasViewer.width = width
      this.$refs.canvasViewer.height = height
    },
    setDrawing (strDataURI) {
      const img = new Image();
      img.addEventListener("load", () => {
        this.$refs.canvasViewer
          .getContext("2d")
          .drawImage(img, 0, 0, img.width, img.height, 0, 0, this.$refs.canvasViewer.width, this.$refs.canvasViewer.height);
      });
      img.setAttribute("src", strDataURI);
    }
  }
}
</script>

<style scoped>

</style>
