<template>
  <v-container v-if="playing">
    <PlayingRoom :web-socket="webSocket" :remaining-time="remainingTime" ref="playingRoom" />
  </v-container>
  <v-container v-else>
    <Room :web-socket="webSocket" />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import Room from '@/components/Room';
import PlayingRoom from "@/components/PlayingRoom";

export default {
  components: {
    PlayingRoom,
    Room
  },

  name: "Match",

  data: () => ({
    webSocket: undefined,
    remainingTime: '',
    timerInterval: '',
    drawing: ''
  }),

  computed: {
    ...mapState([
      'room'
    ]),
    ...mapGetters([
      'fullUsername',
    ]),
    playing () {
      return ['in progress', 'interval'].includes(this.room?.status)
    },
    players () {
      return this.room?.players || []
    }
  },

  methods: {
    ...mapMutations([
      'setRoom',
      'addChatMessage'
    ]),
    connectSocketAndJoinRoom () {
      this.webSocket = new WebSocket(`ws://${this.axios.defaults.baseURL.substr(7)}/ws?roomId=${this.$route.params.id}`);
      this.webSocket.onmessage = (data) => {
        this.processNewMessage(data.data);
      }
      this.webSocket.onopen = () => {
        this.joinRoom()
      };
    },
    joinRoom () {
      this.webSocket.send(JSON.stringify({
        messageType: "join",
        payload: this.fullUsername
      }))
    },
    processNewMessage (newMessage) {
      const command = JSON.parse(newMessage)
      const messageType = command?.messageType
      if (messageType === 'room') {
        if (!this.room) {
          this.startTimer(command.payload?.remainingTime)
        } else if (command.payload?.currentRound !== this.room.currentRound) {
          this.startTimer(command.payload?.totalTime)
        }
        if (command.payload?.status !== this.room.status && command.payload.status === 'interval') {
          this.startTimer(10) // hardcoded 10s interval
          if (this.$refs.playingRoom) {
            this.$refs.playingRoom.setDrawing('')
          }
        }
        this.setRoom(command.payload)
      }
      if (messageType === 'chat') {
        this.addChatMessage(command.payload)
      }
      if (messageType === 'draw') {
        console.log(this.drawing)
        /*if (this.drawing.substring(0, 5) === 'data:') {
            this.drawing = ''
        }*/
        this.drawing += command.payload
        if (this.$refs.playingRoom && this.drawing.substring(this.drawing.length - 3) === 'END') {
          this.$refs.playingRoom.setDrawing(this.drawing.substring(0, this.drawing.length - 3))
          this.drawing = ''
        }
      }
    },
    startTimer (duration) {
      clearInterval(this.timerInterval)
      let start = Date.now(),
        diff,
        seconds;
      const timer = () => {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        seconds = diff | 0;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.remainingTime = seconds;

        if (diff <= 0) {
          // add one second so that the count down starts at the full duration
          // example 05:00 not 04:59
          start = Date.now() + 1000;
        }
      };
      // we don't want to wait a full second before the timer starts
      timer();
      this.timerInterval = setInterval(timer, 1000);
    }
  },

  mounted() {
    this.connectSocketAndJoinRoom()
  }
}
</script>

<style scoped>

</style>
