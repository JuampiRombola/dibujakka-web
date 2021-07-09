<template>
  <v-row class="mt-2">
    <v-col class="text-center" cols="12">
      <v-img
        alt="dibujakka logo"
        contain
        height="150px"
        :src="require('../assets/dibujakka-logo-name.png')"
      ></v-img>
    </v-col>
    <v-col cols="12">
      <v-card max-width="500" class="mx-auto" flat>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="(player, i) in players"
            :key="player"
          >
            <v-list-item-icon>
              <v-icon color="primary" v-if="i === players.length -1">mdi-crown</v-icon>
              <v-icon color="primary" v-else>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="extractUsername(player)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item>
            <v-btn block color="primary" :disabled="!canStart()" v-if="isOwner()" @click="startGame">Start Game</v-btn>
            <v-btn block color="primary" disabled v-else>Only the owner can start the game</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Room",

  props: {
    webSocket: {}
  },

  data: () => ({
  }),

  computed: {
    ...mapState([
      'room'
    ]),
    players () {
      return this.room?.players || []
    }
  },

  methods: {
    canStart () {
      return this.players.length > 1
    },
    isOwner () {
      return this.$store.state.lastCreatedRoomId === this.$route.params.id
    },
    extractUsername (fullUsername) {
      return fullUsername.substring(0, fullUsername.length-36)
    },
    startGame () {
      this.webSocket.send(JSON.stringify({
        messageType: "start",
        payload: ""
      }))
    }
  }

}
</script>

<style scoped>

</style>
