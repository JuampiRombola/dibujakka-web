<template>
  <v-card class="text-left my-1" flat color="grey lighten-4" outlined>
    <v-card-title class="py-2 px-3">
      <v-row no-gutters>
        <v-col cols="8">
          {{ match.name }}
        </v-col>
        <v-col cols="4" class="text-right">
          <v-chip small outlined :color="match.status === 'Waiting' ? 'yellow darken-3' : 'green'">
            {{ match.status }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-actions class="pb-2 px-3 pt-0 my-0">
      <v-row no-gutters fluid>

        <v-col sm="2" cols="4">
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    color="red"
                    dark
                    left
                    v-bind="attrs"
                    v-on="on"
                >
                  mdi-account-group
                </v-icon>
              </template>
              <span>Players</span>
            </v-tooltip>
            <span class="overline">{{ match.playersCount }} / {{ match.maxPlayers }}</span>
          </div>
        </v-col>
        <v-col sm="2" cols="4">
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    color="blue"
                    dark
                    left
                    v-bind="attrs"
                    v-on="on"
                >
                  mdi-counter
                </v-icon>
              </template>
              <span>Rounds</span>
            </v-tooltip>
            <span class="overline">{{ match.currentRound }} / {{ match.totalRounds }}</span>
          </div>
        </v-col>
        <v-col sm="2" :cols="4">
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="green"
                  dark
                  :left="$vuetify.breakpoint.mdAndUp"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-chat
                </v-icon>
              </template>
              <span>Language</span>
            </v-tooltip>
            <span class="overline">{{ match.language }}</span>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col sm="4" cols="12" :class="($vuetify.breakpoint.smAndUp) ? 'text-right' : 'mt-2'">
          <v-btn color="primary" small :block="!$vuetify.breakpoint.smAndUp" @click="joinRoom">
            <v-icon left>mdi-location-enter</v-icon>
            join
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    match: {
      type: Object
    }
  },

  name: "MatchItem",

  methods: {
    joinRoom () {
      this.$router.push({ name: 'Match', params: { id: this.match.id } })
    }
  }
}
</script>

<style scoped>

</style>
