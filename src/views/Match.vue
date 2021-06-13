<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
          sm="2"
      >
        <v-sheet
            rounded="lg"
            min-height="268"
        >
          <!--  -->
        </v-sheet>
      </v-col>

      <v-col
          cols="12"
          sm="7"
      >
        <v-sheet
            min-height="70vh"
            rounded="lg"
        >
          <DrawingTool></DrawingTool>
        </v-sheet>
      </v-col>

      <v-col
          cols="12"
          sm="3"
      >
        <v-sheet
            rounded="lg"
            min-height="268"
        >
          <!--  -->
        </v-sheet>
      </v-col>
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
