import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueAxios from 'vue-axios';
import axios from "axios";
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'

Vue.prototype.$apiIp = "http://127.0.0.1:8000"

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

import Video from './components/Video.vue';
import Upload from './components/Upload.vue';
import Home from './components/Home.vue';
import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer);

const routes = [
  {
      name: 'video',
      path: '/video',
      component: Video
  },
  {
    name: 'upload',
    path: '/upload',
    component: Upload
  },
  {
    name: 'home',
    path: '/',
    component: Home
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');