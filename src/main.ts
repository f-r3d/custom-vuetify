import { createApp } from 'vue'
import App from './App.vue'
import createVuetify from './plugins/vuetify-desys'
import router from './router'
import { i18n } from "../src/i18n";

createApp(App)
  .use(createVuetify)
  .use(i18n)
  .use(router)
  .mount('#app')
