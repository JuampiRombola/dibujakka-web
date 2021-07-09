<template>
  <v-card flat>
    <v-text-field
      label="Name"
      v-model="name"
    ></v-text-field>
    <v-select
      label="Players"
      v-model="players"
      :items="playersItems"
    ></v-select>
    <v-select
      label="Rounds"
      v-model="rounds"
      :items="roundsItems"
    ></v-select>
    <v-select
      label="Language"
      v-model="language"
      :items="languageItems"
    ></v-select>
  </v-card>
</template>

<script>
export default {
  name: "RoomForm",

  data: () => ({
    name: '',
    players: 10,
    rounds: 10,
    language: 'spanish',
    playersItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    roundsItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    languageItems: [{
      text: 'Spanish',
      value: 'spanish'
    }, {
      text: 'English',
      value: 'english'
    }]
  }),

  mounted() {
    this.name = `${this.$store.state.username}'s room`
  }
}
</script>

<style scoped>

</style>
