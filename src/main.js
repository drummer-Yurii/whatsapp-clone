import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'

import vue3GoogleLogin from 'vue3-google-login'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia);
app.use(router);
app.use(vue3GoogleLogin, {
    clientId: "844822171206-0p3p1bisn1kj02f3mcad5rd7tdj9llqu.apps.googleusercontent.com",
});

app.mount('#app')
