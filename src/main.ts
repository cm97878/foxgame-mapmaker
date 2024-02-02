import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// import './style.css'

//import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
const pinia = createPinia();

createApp(App)
    .use(pinia)
  .mount('#vueWrapper')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
