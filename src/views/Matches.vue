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

      <v-col class="text-center mb-0 pb-0 mt-1 overline" v-if="$store.state.username">
        Hello, {{ $store.state.username }}
        <v-icon small color="grey" @click="editUsername" class="pt-0 mt-0 pb-1">mdi-pencil</v-icon>
      </v-col>

      <v-col class="text-center">
        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          v-model="roomFormDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on" class="mb-2">Create Room</v-btn>
          </template>
          <v-card>
            <v-toolbar color="primary" dark dense>Create Room</v-toolbar>
            <v-card-text class="mt-2">
              <RoomForm ref="roomForm"></RoomForm>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="roomFormDialog = false">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="createRoom" :disabled="loadingRoomCreation">Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <v-divider></v-divider>
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
    loadingRoomCreation: false,
    matches: []
  }),

  methods: {
    ...mapMutations([
      'generateLastCreatedRoomId',
      'showNameForm'
    ]),

    createRoom () {
      this.loadingRoomCreation = true
      this.generateLastCreatedRoomId()
      const id = this.$store.state.lastCreatedRoomId
      const name = this.$refs.roomForm.name
      const players = this.$refs.roomForm.players
      const rounds = this.$refs.roomForm.rounds
      const language = this.$refs.roomForm.language
      this.axios
        .post(`/room?id=${id}&name=${name}&totalRounds=${rounds}&maxPlayers=${players}&language=${language}`)
        .then(() => {
          this.roomFormDialog = false
          this.$router.push({ name: 'Match', params: { id: id } })
          this.loadingRoomCreation = false
        })
        .catch(() => {
          this.loadingRoomCreation = false
        })
    },

    editUsername () {
      this.showNameForm()
    }
  },

  mounted() {
    this.axios.get('/room').then(data => {
      this.matches = data?.data?.rooms?.reverse()
    })
  }
}
</script>
