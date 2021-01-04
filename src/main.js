import Vue from 'vue'
import Vuesax from 'vuesax'


import App from './App.vue'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
// Vuex Store
import store from './store/index'
// Theme Configurations
import '../themeConfig.js'
// Perfectscrollbar
// import PerfectScrollbar from "vue2-perfect-scrollbar";
// import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
// Vue.use(PerfectScrollbar);

import Vuebar from 'vuebar';

// Theme Configurations
import 'prismjs'
import 'prismjs/themes/prism.css'
import VsPrism from './components/prism/VsPrism.vue';

import VsSidebarGroup from './components/vs-sidebar-group/Sidebar-Group.vue';
import VueClipboard from 'vue-clipboard2'
// i18n
import i18n from './i18n/i18n.js'
// Vue Router
import router from './router'

import Vue2Editor from "vue2-editor";
import Multiselect from 'vue-multiselect'
import 'vue-search-select/dist/VueSearchSelect.css';
import VueHtmlToPaper from 'vue-html-to-paper';
import vueCountryRegionSelect from 'vue-country-region-select';
import VueCascaderSelect from 'vue-cascader-select';
import Dropdown from 'bp-vuejs-dropdown';

Vue.use(Dropdown)
Vue.use(vueCountryRegionSelect)
Vue.use(VueCascaderSelect);
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}
Vue.use(VueHtmlToPaper, options);
Vue.use(Multiselect)
Vue.use(Vue2Editor);
Vue.use(Vuebar);
Vue.use(VueClipboard);
Vue.component(VsSidebarGroup.name, VsSidebarGroup);
Vue.config.productionTip = false
Vue.use(Vuesax)
Vue.component(VsPrism.name, VsPrism);
Vue.prototype.$custom_warning = "#ff3300"


new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
import '@/assets/scss/style.scss'
import 'vue-multiselect/dist/vue-multiselect.min.css'