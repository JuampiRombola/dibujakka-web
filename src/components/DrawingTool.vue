<template>
  <div>
    <Editor class="drawing-canvas" :canvasWidth="500" :canvasHeight="500" ref="editor"/>
    <v-btn @click="freeDrawing()" icon>
      <v-icon :color="colorIfSelected('freeDrawing')">mdi-pencil</v-icon>
    </v-btn>
    <v-btn @click="eraser()" icon>
      <v-icon :color="colorIfSelected('eraser')">mdi-eraser</v-icon>
    </v-btn>
    <v-btn @click="clear()" icon>
      <v-icon color="grey">mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Editor from 'vue-image-markup';

export default {
  components: {
    Editor
  },

  name: "DrawingTool",

  data: () => ({
    pollingInterval: undefined,
    strokeColor: 'black',
    strokeWidth: 2,
    currentTool: 'freeDrawing'
  }),

  computed: {
    drawing2String () {
      return this.$refs.editor.saveImage()
    }
  },

  methods: {
    enableDrawingMode () {
      this.freeDrawing()
      // this.pollingInterval = setInterval(this.sendDrawingToServer, 1500)
    },
    freeDrawing () {
      this.currentTool = 'freeDrawing'
      this.$refs.editor.set('freeDrawing', {
        stroke: this.strokeColor,
        strokeWidth: this.strokeWidth
      })
    },
    eraser () {
      this.currentTool = 'eraser'
      this.$refs.editor.set('eraser')
    },
    clear () {
      this.$refs.editor.clear()
    },
    sendDrawingToServer () {
      console.log(this.drawing2String)
    },
    colorIfSelected (tool) {
      return this.currentTool === tool ? 'blue' : 'grey'
    },
    setDimensions ({ width, height }) {
      this.$refs.editor.canvas.setDimensions({width: width, height: height});
    }
  },

  mounted() {
    this.enableDrawingMode()
  }
}
</script>

<style scoped>
.drawing-canvas {
  outline: gray solid 1px;
}
</style>
