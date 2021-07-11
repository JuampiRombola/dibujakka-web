<template>
  <v-card flat>
    <v-text-field
      label="Nombre de la sala"
      v-model="name"
    ></v-text-field>
    <v-select
      label="Cantidad máxima de jugadores"
      v-model="players"
      :items="playersItems"
    ></v-select>
    <v-select
      label="Cantidad de rondas"
      v-model="rounds"
      :items="roundsItems"
    ></v-select>
    <v-select
      label="Idioma"
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
      text: 'Español',
      value: 'spanish'
    }]
  }),

  mounted() {
    this.name = `${this.$store.state.username}'s room`
  }
}
</script>

<style scoped>

</style>
