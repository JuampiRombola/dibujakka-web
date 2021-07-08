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
              <RoomForm ref="roomForm"></RoomForm>
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
import { mapMutations } from "vuex";

export default {
  components: {
    MatchItem,
    RoomForm
  },

  name: "Matches",

  data: () => ({
    roomFormDialog: false,
    matches: []
  }),

  methods: {
    ...mapMutations([
      'postRoom',
    ]),

    createRoom () {
      const name = this.$refs.roomForm.name
      const players = this.$refs.roomForm.players
      const rounds = this.$refs.roomForm.rounds
      const language = this.$refs.roomForm.language
      this.postRoom({ name, players, rounds, language })
      this.roomFormDialog = false
    }
  },

  mounted() {
    this.axios.get('/room').then(data => {
      this.matches = data?.data?.rooms
    })
  }
}
</script>
