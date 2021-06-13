<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat
        dense
    >
      <v-avatar
          :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
          size="32"
      ></v-avatar>

      <v-avatar
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view/>
    </v-main>

    <LoginDialog></LoginDialog>
  </v-app>
</template>

<script>
import LoginDialog from "@/components/LoginDialog";

export default {
  components: {
    LoginDialog
  },

  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
}
</script>
