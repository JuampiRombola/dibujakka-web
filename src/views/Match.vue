<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <DrawingTool></DrawingTool>
      </v-col>
      <v-col cols="4">chat</v-col>
    </v-row>
  </v-container>
</template>

<script>
import DrawingTool from "@/components/DrawingTool";

export default {
  components: {
    DrawingTool
  },

  name: "Match"
}
</script>

<style scoped>

</style>
