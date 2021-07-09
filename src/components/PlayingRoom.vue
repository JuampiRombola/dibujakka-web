<template>
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
        <div v-if="drawingModeEnabled">
          <DrawingTool ref="drawingTool"></DrawingTool>
        </div>
        <div v-else>
          <DrawingViewer ref="drawingViewer"></DrawingViewer>
        </div>
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
</template>

<script>
import DrawingTool from '@/components/DrawingTool';
import DrawingViewer from '@/components/DrawingViewer';

export default {
  components: {
    DrawingTool,
    DrawingViewer
  },

  props: {
    room: {
      type: Object,
      default: () => ({
        currentRound: "0",
        language: "",
        players: [],
        playersWhoGuessed: [],
        remainingTime: "60",
        scores: {},
        status: "interval",
        totalRounds: "10",
        totalTime: "60",
        whoIsDrawing: "",
        word: ""
      })
    },
    webSocket: {}
  },

  name: "PlayingRoom",

  data: () => ({
    canvasWidth: 512,
    canvasHeight: 512
  }),

  methods: {
    handleResize () {
      this.canvasWidth = document.getElementById("drawingSheet").offsetWidth - 2
      this.canvasHeight = this.$vuetify.breakpoint.lgAndUp
        ? (window.innerHeight - 200)
        : (window.innerHeight / 2)

      if (this.drawingModeEnabled) {
        this.$refs.drawingTool.setDimensions({width: this.canvasWidth, height: this.canvasHeight});
      } else {
        this.$refs.drawingViewer.setDimensions({width: this.canvasWidth, height: this.canvasHeight});
      }
    }
  },

  computed: {
    drawingModeEnabled () {
      return this.inProgress && this.localPlayerIsDrawing
    },
    localPlayerIsDrawing () {
      return this.room.whoIsDrawing === this.$store.getters.fullUsername
    },
    inProgress () {
      return this.room.status === 'in progress'
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
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
