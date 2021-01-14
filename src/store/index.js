import Vue from "vue";
import Vuex from "vuex";
import themeConfig from "@/../themeConfig.js";
import { auth } from "./auth.module";
import { apiManage } from "./api.module";
import { twofaManage } from "./twofactor.module";
import { productManage } from "./product.module";
import { categoryManage } from "./category.module";
import { offerManage } from "./offers.module";
import { lessonManage } from "./lesson.module";
import { peopleManage } from "./people.module";
import { couponManage } from "./coupon.module";
import { commentManage } from "./comments.module";
import { templateManage } from "./templates.module";
import { integrationManage } from "./integration.module";
import { settingManage } from "./settings.module";
import { subuserManage } from "./subuser.module";
import { siteDetailsManage } from "./sitedetails.module";
import { paymentManage } from "./payment.module";
import { prodCustomizeManage } from "./prodcustomize.module";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
/* eslint-disable */
export default new Vuex.Store({
  modules: {
    auth,
    apiManage,
    twofaManage,
    productManage,
    categoryManage,
    offerManage,
    lessonManage,
    peopleManage,
    couponManage,
    commentManage,
    templateManage,
    integrationManage,
    settingManage,
    subuserManage,
    siteDetailsManage,
    paymentManage,
    prodCustomizeManage,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    theme: themeConfig.theme,
    isSidebarActive: false,
    isSidebarReduced: themeConfig.sidebarCollapsed,
    sidebarWidth: "default",
    themeColor: themeConfig.themeColor,
    error_text: "",
    notification_color: "",
    notification_icon: "",
    notification_text: "",
    loading_status: 0,
    currentSidebar: "default",
    current_checkoutmenu: "home",
    status: {
      inRequest: false,
      got: false,
    },
    custom_warning: "#ff3300",
    current_productcustomize_menu: "home",
  },
  mutations: {
    LOADING_STATUS(state, loading_status) {
      state.loading_status = loading_status;
    },
    // REQUEST FAILED
    REQUEST_FAILED(state, error) {
      state.status = {};
      state.notification_icon = "warning";
      state.notification_color = state.custom_warning;
      state.notification_text = error.data.message;
    },
    // Network Error
    NETWORK_ERROR(state) {
      state.notification_icon = "warning";
      state.notification_color = state.custom_warning;
      state.notification_text = "Network Connection Error";
    },
    //This is for Sidbar trigger in mobile
    TOGGLE_SIDEBAR_ACTIVE(state, value) {
      state.isSidebarActive = value;
    },
    //This is for Sidebar toggle in desktop
    TOGGLE_REDUCE_SIDEBAR(state, val) {
      state.isSidebarReduced = val;
    },
    UPDATE_THEME(state, val) {
      state.theme = val;
    },
    UPDATE_THEME_COLOR(state, val) {
      state.themeColor = val;
    },
    UPDATE_SIDEBAR_WIDTH(state, width) {
      state.sidebarWidth = width;
    },

    CHANGE_SIDEBAR(state, current_sidebar) {
      state.currentSidebar = current_sidebar;
    },

    SET_CURRENT_CHECKOUTMENU(state, current_checkoutmenu) {
      state.current_checkoutmenu = current_checkoutmenu;
    },

    SET_CURRENT_PRODUCTCUSTOMIZE_MENU(state, current_productcustomize_menu) {
      state.current_productcustomize_menu = current_productcustomize_menu;
    },

    RESET_MODULE(state) {
      state.currentSidebar = "default";
      state.current_checkoutmenu = "home";
    },
  },
  actions: {
    updateSidebarWidth({ commit }, width) {
      commit("UPDATE_SIDEBAR_WIDTH", width);
    },
    loadingStatus({ commit }, loading_status) {
      commit("LOADING_STATUS", loading_status);
    },
    changeSideBar({ commit }, current_sidebar) {
      commit("CHANGE_SIDEBAR", current_sidebar);
    },
    setCurrentCheckoutMenu({ commit }, current_checkoutmenu) {
      commit("SET_CURRENT_CHECKOUTMENU", current_checkoutmenu);
    },
    setCurrentProductCustomizeMenu({ commit }, current_productcustomize_menu) {
      commit(
        "SET_CURRENT_PRODUCTCUSTOMIZE_MENU",
        current_productcustomize_menu
      );
    },
  },
  getters: {
    notification_text: (state) => state.notification_text,
    inRequest: (state) => state.status.inRequest,
    status_got: (state) => state.status.got,
    notification_color: (state) => state.notification_color,
    notification_icon: (state) => state.notification_icon,
    loading_status: (state) => state.loading_status,
    currentSidebar: (state) => state.currentSidebar,
  },
});
