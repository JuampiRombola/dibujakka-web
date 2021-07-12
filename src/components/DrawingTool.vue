<template>
  <div>
    <Editor class="drawing-canvas" :canvasWidth="500" :canvasHeight="500" ref="editor"/>
    <div class="text-center">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="mx-2">
            <v-icon large :color="strokeColor">mdi-circle</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-color-picker
            v-model="strokeColor"
            dot-size="25"
            swatches-max-height="200"
            hide-inputs
          ></v-color-picker>
          <v-slider
            v-model="strokeWidth"
            min="1"
            max="20"
            color="grey darken-1"
            thumb-color="black"
            class="pl-5 pr-3"
            label="Line"
            :thumb-size="1.8*strokeWidth"
          >
            <template v-slot:thumb-label="{ value }">
              <v-icon color="black" :size="1.8*value">mdi-circle</v-icon>
            </template>
          </v-slider>
        </v-card>
      </v-menu>
      <v-btn @click="freeDrawing()" icon class="mx-2">
        <v-icon large :color="colorIfSelected('freeDrawing')">mdi-pencil</v-icon>
      </v-btn>
      <v-btn @click="eraser()" icon class="mx-2">
        <v-icon large :color="colorIfSelected('eraser')">mdi-eraser</v-icon>
      </v-btn>
      <v-btn @click="clear()" icon class="mx-2">
        <v-icon large color="grey">mdi-delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import Editor from 'vue-image-markup';

export default {
  components: {
    Editor
  },

  props: {
    webSocket: {}
  },

  name: "DrawingTool",

  data: () => ({
    pollingInterval: undefined,
    strokeColor: '#000000',
    strokeWidth: 2,
    currentTool: 'freeDrawing',
    menu: false
  }),

  computed: {
    drawing2String () {
      return (this.$refs.editor) ? this.$refs.editor.canvas.toDataURL('image/jpeg', 0.5) : ''
    }
  },

  methods: {
    enableDrawingMode () {
      this.freeDrawing()
      // this.pollingInterval = setInterval(this.sendDrawingToServer, 1000)
      // setTimeout(() => clearInterval(this.pollingInterval), 60000)
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
      const chunks = this.chunkSubstr(this.drawing2String + 'END', 200);
      for (let i=0; i < chunks.length; i++) {
        setTimeout(() => {
          this.webSocket.send(JSON.stringify({
            messageType: "draw",
            payload: chunks[i]
          }))
        }, i*10)
      }
    },
    colorIfSelected (tool) {
      return this.currentTool === tool ? 'blue' : 'grey'
    },
    setDimensions ({ width, height }) {
      this.$refs.editor.canvas.setDimensions({width: width, height: height});
    },
    chunkSubstr (str, size) {
      const numChunks = Math.ceil(str.length / size)
      const chunks = new Array(numChunks)

      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size)
      }

      return chunks
    }
  },

  mounted() {
    this.enableDrawingMode()
    this.$refs.editor.canvas.on('mouse:up', () => {
      this.sendDrawingToServer()
    })
    this.$refs.editor.canvas.on('canvas:cleared', () => {
      this.sendDrawingToServer()
    })
  },

  watch: {
    strokeColor () {
      this.freeDrawing()
    },
    strokeWidth () {
      this.freeDrawing()
    }
  }
}
</script>

<style scoped>
.drawing-canvas {
  outline: gray solid 1px;
}
</style>
