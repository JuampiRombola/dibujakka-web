<template>
  <v-container>
    <v-row v-if="waiting">
      <Room :players="players"></Room>
    </v-row>
    <v-row v-else>
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
          <div v-if="drawingMode">
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
  </v-container>
</template>

<script>
import DrawingTool from '@/components/DrawingTool';
import DrawingViewer from '@/components/DrawingViewer';
import Room from '@/components/Room';
import { mapGetters } from "vuex";

export default {
  components: {
    DrawingTool,
    DrawingViewer,
    Room
  },

  name: "Match",

  data: () => ({
    webSocket: undefined,
    canvasWidth: 512,
    canvasHeight: 512,
    drawingMode: true,
    room: {},
    mockRoom: {
      "currentRound": "0",
      "language": "spanish",
      "playersWhoGuessed": [],
      "remainingTime": "10",
      "scores": {
        "juampi": 0,
        "ceci": 1,
        "robin": 2,
        "ari": 4,
      },
      "players": ["juampi", "ceci", "robin", "ari"],
      "status": "waiting",
      "totalRounds": "10",
      "totalTime": "60",
      "whoIsDrawing": "juampi",
      "word": "word"
    }
  }),

  computed: {
    ...mapGetters([
      'fullUsername',
    ]),

    waiting () {
      return this.room?.status === 'waiting'
    },
    players () {
      return this.room?.players || []
    }
  },

  methods: {
    handleResize () {
      this.canvasWidth = document.getElementById("drawingSheet").offsetWidth - 2
      this.canvasHeight = this.$vuetify.breakpoint.lgAndUp
        ? (window.innerHeight - 200)
        : (window.innerHeight / 2)

      if (this.drawingMode) {
        this.$refs.drawingTool.setDimensions({width: this.canvasWidth, height: this.canvasHeight});
      } else {
        this.$refs.drawingViewer.setDimensions({width: this.canvasWidth, height: this.canvasHeight});
      }
    },
    enableDrawingMode () {
      this.drawingMode = true
    },
    disableDrawingMode () {
      this.drawingMode = false
    },
    connectSocketAndJoinRoom () {
      this.webSocket = new WebSocket(`ws://${this.axios.defaults.baseURL.substr(7)}/ws?roomId=${this.$route.params.id}`);
      this.webSocket.onopen = () => {
        this.joinRoom()
      };
    },
    joinRoom () {
      this.webSocket.send(JSON.stringify({
        messageType: "join",
        payload: this.fullUsername
      }))
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.room = this.mockRoom
    this.connectSocketAndJoinRoom()
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
