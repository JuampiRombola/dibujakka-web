<template>
  <v-container>
    <v-row>
      <v-col
        cols="2"
        v-if="$vuetify.breakpoint.lgAndUp"
      >
        <v-sheet
          color="grey"
          rounded="lg"
          min-height="268"
        >
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        lg="7"
      >
        <v-sheet
          class="drawing-sheet"
          color="white"
          rounded="lg"
          id="drawingSheet"
        >
          <Editor class="drawing-sheet" :canvasWidth="canvasWidth" :canvasHeight="canvasHeight" ref="editor"/>
          <v-btn @click="freeDrawing()" icon>
            <v-icon :color="colorIfSelected('freeDrawing')">mdi-pencil</v-icon>
          </v-btn>
          <v-btn @click="eraser()" icon>
            <v-icon :color="colorIfSelected('eraser')">mdi-eraser</v-icon>
          </v-btn>
          <v-btn @click="clear()" icon>
            <v-icon color="grey">mdi-delete</v-icon>
          </v-btn>
        </v-sheet>
      </v-col>

      <v-col
        cols="4"
        v-if="$vuetify.breakpoint.mdAndDown"
      >
        <v-sheet
          color="grey"
          rounded="lg"
          min-height="268"
        >
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col
        cols="8"
        lg="3"
      >
        <v-sheet
          color="grey"
          rounded="lg"
          min-height="268"
        >
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Editor from 'vue-image-markup';

export default {
  components: {
    Editor
  },

  name: "Match",

  data: () => ({
    canvasWidth: 512,
    canvasHeight: 512,
    canvasMargin: 20,
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
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
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
    handleResize () {
      // Calculate new canvas size based on window
      const drawingSheet = document.getElementById("drawingSheet")
      this.canvasWidth = drawingSheet.offsetWidth - 2
      if (this.$vuetify.breakpoint.lgAndUp) {
        this.canvasHeight = window.innerHeight - 200
      } else {
        this.canvasHeight = window.innerHeight / 2
      }
      this.$refs.editor.canvas.setDimensions({width: this.canvasWidth, height: this.canvasHeight});
    },
  },

  mounted() {
    this.enableDrawingMode()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.drawing-sheet {
  outline: gray solid 1px;
}
</style>
