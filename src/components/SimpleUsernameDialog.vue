<template>
  <v-row justify="center">
    <v-dialog
      v-model="showLoginDialog"
      persistent
      max-width="450"
    >
      <v-card elevation="4" light tag="section">

        <v-card-title class="mb-2">
          <v-col class="text-center">
            <v-img
              alt="dibujakka logo"
              contain
              height="150px"
              :src="require('../assets/dibujakka-logo-name.png')"
            ></v-img>
          </v-col>
        </v-card-title>

        <v-form v-model="valid">
          <v-card-text class="mb-0 pb-1">
            <v-text-field
              required
              :rules="rules"
              outlined
              label="Username"
              type="text"
              prepend-icon="mdi-account"
              v-model="username"
              class="mb-0 pb-0"
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block color="primary" @click="submitForm" :disabled="!valid">
              <v-icon left>mdi-login</v-icon>
              Continue
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SimpleUsernameDialog",

  data () {
    return {
      tab: null,
      username: '',
      valid: false,
      rules: [
        v => !!v || 'Name is required',
      ],
    }
  },

  computed: {
    ...mapGetters([
      'showLoginDialog'
    ])
  },

  methods: {
    ...mapMutations([
      'setUsername'
    ]),

    submitForm () {
      if (this.valid) {
        this.setUsername(this.username)
      }
    }
  }
}
</script>
