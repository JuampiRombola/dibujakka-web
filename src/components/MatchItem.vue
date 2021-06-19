<template>
  <v-card class="text-left my-1" flat color="grey lighten-4" outlined>
    <v-card-title class="py-2 px-3">
      <v-row no-gutters>
        <v-col cols="10">
          {{ match.name }}
        </v-col>
        <v-col cols="2" class="text-right">
          <v-chip small outlined :color="match.status === 'Waiting' ? 'yellow darken-3' : 'green'">
            {{ match.status }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-actions class="pb-2 px-3 pt-0 my-0">
      <v-row no-gutters>
        <v-col cols="2">
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    color="green"
                    dark
                    left
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
        <v-col cols="2">
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
            <span class="overline">{{ match.playersCount }} / {{ match.totalPlayers }}</span>
          </div>
        </v-col>
        <v-col cols="2">
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
        <v-spacer></v-spacer>
        <v-col cols="3" class="text-right">
          <v-btn color="primary" small>
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

  name: "MatchItem"
}
</script>

<style scoped>

</style>
