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
            label="Email"
            type="text"
            prepend-icon="mdi-email"
            v-model="email"
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

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary">
        <v-icon left>mdi-lock</v-icon>
        Registrarse
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "RegisterForm",

  data () {
    return {
      username: '',
      password: '',
      email: ''
    }
  },

  methods: {
    ...mapMutations([
      'login',
    ])
  }
}
</script>
