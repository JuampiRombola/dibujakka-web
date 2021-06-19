<template>
  <v-card flat>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-img
              alt="dibujakka logo"
              contain
              height="150px"
              :src="require('../assets/dibujakka-logo-name.png')"
          ></v-img>
        </v-col>
      </v-row>
      <v-col class="text-center">
        <MatchItem
            v-for="match in matches"
            :key="match.id"
            :match="match"
        />
      </v-col>
    </v-container>
  </v-card>
</template>

<script>
import MatchItem from "@/components/MatchItem";

export default {
  components: {
    MatchItem
  },

  name: "Matches",

  data: () => ({
    matches: [{
      id: 0,
      name: 'Test match',
      currentRound: 1,
      totalRounds: 10,
      playersCount: 2,
      totalPlayers: 8,
      language: 'english',
      status: 'Waiting'
    }, {
      id: 1,
      name: 'Partida test',
      currentRound: 1,
      totalRounds: 10,
      playersCount: 1,
      totalPlayers: 10,
      language: 'spanish',
      status: 'In progress'
    }]
  })
}
</script>
