<template>
  <v-app>
    <v-main class="white">
      <router-view/>
    </v-main>
    <SimpleUsernameDialog/>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import SimpleUsernameDialog from "@/components/SimpleUsernameDialog";

export default {
  components: {
    SimpleUsernameDialog
  },

  data: () => ({
  }),

  methods: {
    ...mapMutations([
      'generateUserToken'
    ])
  },

  mounted() {
    if (!this.$store.state.token) {
      this.generateUserToken()
    }
  }
}
</script>
