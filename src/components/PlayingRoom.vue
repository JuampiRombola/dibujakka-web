<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <v-toolbar
        flat
        dense
        color="grey lighten-4"
      >
        <v-card-title>
          <span class="overline">ROUND: {{ room.currentRound }}/{{ room.totalRounds }}</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-title v-if="localPlayerIsDrawing">
          <span class="overline">{{ room.word }}</span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-title>
          <v-icon left>mdi-timer-sand</v-icon>
          <span class="overline">{{ remainingTime }}</span>
        </v-card-title>
      </v-toolbar>
    </v-col>
    <v-col
      cols="2"
      v-if="$vuetify.breakpoint.lgAndUp"
    >
      <v-sheet
        color="grey lighten-4"
        rounded="lg"
        min-height="268"
      >
        <div class="overline text-center">SCORES</div>
        <v-divider></v-divider>
        <v-row v-for="player in getOrderedScores()" :key="player" :class="['ma-0 py-0 px-3 overline', { 'blue--text': player === fullUsername }]" no-gutters >
          <v-col cols="8">
            {{ extractUsername(player) }}
            <v-icon x-small v-if="player===room.whoIsDrawing">mdi-brush</v-icon>
            <v-icon x-small v-if="room.playersWhoGuessed.includes(player)">mdi-check</v-icon>
          </v-col>
          <v-col cols="4" class="text-right">{{ room.scores[player] }}</v-col>
        </v-row>
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
          <DrawingTool ref="drawingTool" :web-socket="webSocket"></DrawingTool>
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
        height="377"
        rounded="lg"
        color="grey lighten-4"
        class="px-2"
      >
        <div class="overline text-center">CHAT</div>
        <v-divider></v-divider>
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
          :disabled="chatDisabled"
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
    webSocket: {},
    remainingTime: {}
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
    },
    extractUsername (fullUsername) {
      return fullUsername.substring(0, fullUsername.length-36)
    },
    getOrderedScores () {
      return Object.entries(this.room.scores).sort((a, b) => a[1] > b[1] ? -1 : 1).map(e => e[0])
    }
  },

  computed: {
    ...mapState([
      'room',
      'chatMessages'
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
    },
    chatDisabled () {
      return this.drawingModeEnabled || !this.inProgress || this.hasGuessed
    },
    hasGuessed () {
      return this.room.playersWhoGuessed.includes(this.fullUsername)
    }
  },

  updated() {
    if (document.getElementById("drawingSheet")) {
      this.handleResize()
    }
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
    }
  }
}
</script>

<style scoped>
.drawing-sheet {
  outline: gray solid 1px;
}
</style>
