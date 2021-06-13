<template>
  <v-row justify="center">
    <v-dialog
        v-model="showLoginDialog"
        persistent
        max-width="450"
    >
      <v-card elevation="4" light tag="section">

        <v-card-title class="mb-2">
          <v-row align-center>
            <v-col>
              <v-img
                  alt="dibujakka logo"
                  class="ml-3"
                  contain
                  height="150px"
                  position="center"
                  :src="require('../assets/dibujakka-logo-name.png')"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-title>

        <v-divider></v-divider>

        <v-tabs centered color="primary" v-model="tab">
          <v-tab>Ingresar</v-tab>
          <v-tab>Registrarse</v-tab>
          <v-tab>Invitado</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <LoginForm></LoginForm>
          </v-tab-item>

          <v-tab-item>
            <RegisterForm></RegisterForm>
          </v-tab-item>

          <v-tab-item>
            <GuestForm></GuestForm>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import GuestForm from "@/components/GuestForm";

export default {
  components: {
    LoginForm,
    RegisterForm,
    GuestForm
  },

  name: "LoginDialog",

  data () {
    return {
      tab: null
    }
  },

  computed: {
    ...mapGetters([
      'showLoginDialog',
    ])
  }
}
</script>
