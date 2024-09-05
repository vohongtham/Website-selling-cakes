import { createApp } from 'vue'
import store from './store';
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";


// createApp(App).mount('#app'); createApp(App).use(router).mount("#app");

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');