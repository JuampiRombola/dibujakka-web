<template>
  <div>
    <v-card-text class="mb-1">
      <v-form>
        <v-text-field
            dense
            outlined
            label="Usuario"
            type="text"
            prepend-icon="mdi-account"
            v-model="username"
        ></v-text-field>
        <v-text-field
            dense
            outlined
            hide-details
            label="Contraseña"
            type="password"
            prepend-icon="mdi-lock"
            v-model="password"
        ></v-text-field>
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
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "LoginForm",

  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    ...mapMutations([
      'login',
    ])
  }
}
</script>
