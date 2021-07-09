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
            v-for="player in players"
            :key="player"
          >
            <v-list-item-icon>
              <v-icon color="primary">mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="player"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item>
            <v-btn block color="primary" :disabled="!canStart()">Start Game</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Room",

  props: {
    players: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
  }),

  methods: {
    canStart () {
      return this.players.length > 1
    }
  }

}
</script>

<style scoped>

</style>
