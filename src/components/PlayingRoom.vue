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
      </v-sheet>
    </v-col>

    <v-col
      cols="8"
      lg="3"
    >
      <v-sheet
        height="344"
        rounded="lg"
        color="grey lighten-4"
        class="px-2"
      >
        <v-virtual-scroll
          height="280"
          item-height="30"
          :items="chatMessages"
          id="virtual-scroll"
        >
          <template v-slot:default="{ item }">
            <v-chip small class="ma-1">{{ item }}</v-chip>
          </template>
        </v-virtual-scroll>
        <v-divider class="my-2"></v-divider>
        <v-text-field
          v-model="word"
          hide-details
          outlined
          dense
          @keydown.enter="sendWord"
          color="grey"
          append-icon="mdi-send"
          @click:append="sendWord"
          :disabled="drawingModeEnabled"
        >
        </v-text-field>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import DrawingTool from '@/components/DrawingTool';
import DrawingViewer from '@/components/DrawingViewer';
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    DrawingTool,
    DrawingViewer
  },

  props: {
    // room: {
    //   type: Object,
    //   default: () => ({
    //     currentRound: "0",
    //     language: "",
    //     players: [],
    //     playersWhoGuessed: [],
    //     remainingTime: "60",
    //     scores: {},
    //     status: "interval",
    //     totalRounds: "10",
    //     totalTime: "60",
    //     whoIsDrawing: "",
    //     word: ""
    //   })
    // }
    webSocket: {}
  },

  name: "PlayingRoom",

  data: () => ({
    canvasWidth: 512,
    canvasHeight: 512,
    word: ''
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
    },
    sendWord () {
      if (this.word.length !== 0) {
        this.webSocket.send(JSON.stringify({
          messageType: "chat",
          word: this.word,
          userName: this.fullUsername
        }))
        this.word = ''
      }
    }
  },

  computed: {
    ...mapState([
      'room',
      'chatMessages',
      'drawingFromServer'
    ]),
    ...mapGetters([
      'fullUsername',
    ]),
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

  updated() {
    const element = document.getElementById('virtual-scroll')
    element.scrollTop = element.scrollHeight
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },

  watch: {
    room: {
      handler: () => {
        console.log()
      },
      deep: true
    },
    chatMessages: {
      handler: () => {
        console.log()
      },
      deep: true
    },
    drawingFromServer () {
      console.log('')
    }
  }
}
</script>

<style scoped>
.drawing-sheet {
  outline: gray solid 1px;
}
</style>
