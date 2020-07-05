import Vue from 'vue'
import Vuex from 'vuex';
import App from './app.vue'
import iView from 'iview'
import VueRouter from 'vue-router';
import Routers from './router';
import store from './store';
import Util from './util';
import 'iview/dist/styles/iview.css'
import './theme/index.less';
import axios from 'axios';

const isDebug = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug;
Vue.config.devtools = isDebug;
Vue.config.productionTip = isDebug;

// axios config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api/';
Vue.prototype.$axios = axios;

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(iView)

// Router config
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});