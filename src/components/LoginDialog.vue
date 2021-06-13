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
              <v-img alt="dibujakka logo" class="ml-3" contain height="150px" position="center" :src="require('../assets/dibujakka-logo-name.png')"></v-img>
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
            <v-card-text class="mb-1">
              <v-form>
                <v-text-field
                    dense
                    outlined
                    label="Usuario"
                    type="text"
                    prepend-icon="mdi-account"
                    v-model="username"></v-text-field>
                <v-text-field
                    dense
                    outlined
                    hide-details
                    label="Contraseña"
                    type="password"
                    prepend-icon="mdi-lock"
                    v-model="password"></v-text-field>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn color="secondary" text>
                Olvidé mi contraseña
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary">
                <v-icon left>mdi-lock</v-icon>
                Ingresar
              </v-btn>
            </v-card-actions>
          </v-tab-item>

          <v-tab-item>
            <v-card-text class="mb-1">
              <v-form>
                <v-text-field
                    dense
                    outlined
                    label="Usuario"
                    type="text"
                    prepend-icon="mdi-account"
                    v-model="username"></v-text-field>
                <v-text-field
                    dense
                    outlined
                    label="Email"
                    type="text"
                    prepend-icon="mdi-email"
                    v-model="email"></v-text-field>
                <v-text-field
                    dense
                    outlined
                    hide-details
                    label="Contraseña"
                    type="password"
                    prepend-icon="mdi-lock"
                    v-model="password"></v-text-field>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-spacer></v-spacer>
              <v-btn color="primary">
                <v-icon left>mdi-lock</v-icon>
                Registrarse
              </v-btn>
            </v-card-actions>
          </v-tab-item>

          <v-tab-item>
            <v-card-text class="mb-0 pb-0">
              <v-form>
                <v-text-field
                    dense
                    outlined
                    label="Usuario"
                    type="text"
                    prepend-icon="mdi-account"
                    v-model="username"
                    class="mb-0 pb-0"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-spacer></v-spacer>
              <v-btn color="primary">
                <v-icon left>mdi-login</v-icon>
                Ingresar como invitado
              </v-btn>
            </v-card-actions>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "LoginDialog",

  data () {
    return {
      dialog: true,
      username: '',
      password: '',
      email: '',
      guestUsername: '',
      tab: null
    }
  },

  computed: {
    ...mapGetters([
      'showLoginDialog',
    ])
  },

  methods: {
    ...mapMutations([
      'guestLogin',
      'login',
      'logout',
    ])
  }
}
</script>

<style scoped>

</style>
