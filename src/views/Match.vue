<template>
  <v-container v-if="playing">
    <PlayingRoom :room="room" web-socket="web-socket"></PlayingRoom>
  </v-container>
  <v-container v-else>
    <Room :players="players" :web-socket="webSocket"></Room>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
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
    room: {},
    chatMessages: [],
    drawingFromServer: ''
  }),

  computed: {
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
        console.log(command.payload)
        this.room = command.payload
      }
      if (messageType === 'chat') {
        this.chatMessages.push(command.payload)
      }
      if (messageType === 'draw') {
        this.drawingFromServer = command.payload
      }
    }
  },

  mounted() {
    this.connectSocketAndJoinRoom()
  }
}
</script>

<style scoped>

</style>
