<template>
  <div>
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

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="guestLogin(username)">
        <v-icon left>mdi-login</v-icon>
        Ingresar como invitado
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "GuestForm",

  data () {
    return {
      username: ''
    }
  },

  methods: {
    ...mapMutations([
      'guestLogin',
    ])
  }
}
</script>
