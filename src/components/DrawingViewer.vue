<template>
  <div>
    <div v-show="src.length !== 0">
      <img :src="src" alt="" ref="imgViewer"/>
    </div>
    <div v-show="src.length === 0">
      <canvas ref="canvasViewer" width="500" height="500" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawingViewer",

  data: () => ({
    src: ''
  }),

  methods: {
    setDimensions ({ width, height }) {
      this.$refs.imgViewer.width = width
      this.$refs.imgViewer.height = height
      this.$refs.canvasViewer.width = width
      this.$refs.canvasViewer.height = height
    },
    setDrawing (strDataURI) {
      this.src = strDataURI
    }
  },

  mounted() {
    this.setDrawing('')
  }
}
</script>

<style scoped>

</style>
