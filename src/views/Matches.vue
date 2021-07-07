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
        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          v-model="roomFormDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">Create Room</v-btn>
          </template>
          <v-card>
            <v-toolbar color="primary" dark dense>Create Room</v-toolbar>
            <v-card-text class="mt-2">
              <RoomForm></RoomForm>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="roomFormDialog = false">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="createRoom">Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
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
import RoomForm from "@/components/RoomForm";

export default {
  components: {
    MatchItem,
    RoomForm
  },

  name: "Matches",

  data: () => ({
    roomFormDialog: false,
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
  }),

  methods: {
    createRoom () {
      this.roomFormDialog = false
    }
  }
}
</script>
