import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#fd8168',
        secondary: '#7a3838',
        accent: '#fdb0ad',
        info: '#fecd50',
        error: '#b71c1c'
      }
    }
  }
});
