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
    purchaser_email: "",
    purchaser_offer_id: "",
    purchaser_password: "",
    purchaser_fullname: "",
    student_email_code: "",
    customize_product_id: "",
    header_logo_url: "",
    hero_background_image_url: "",
    footer_logo_url: "",
    page_background_image_url: "",
    fav_icon_url: "",
    student_email_exist: false,
    student_register_required: true,
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
      if(error.data.errors)
        state.notification_text = JSON.stringify(error.data.errors);
      else
        state.notification_text = JSON.stringify(error.data.message);
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

    SET_PURCHASER_EMAIL(state, email){
      state.purchaser_email = email;
    },
    SET_PURCHASER_OFFER_ID(state, offer_id){
      state.purchaser_offer_id = offer_id;
    },

    SET_PURCHASER_PASSWORD(state, password) {
      state.purchaser_password = password;
    },

    SET_PURCHASER_FULLNAME(state, fullname) {
      state.purchaser_fullname = fullname;
    },

    RESET_MODULE(state) {
      state.currentSidebar = "default";
      state.current_checkoutmenu = "home";
      state.status = {};
      state.custom_warning = "#ff3300";
      state.current_productcustomize_menu = "home";
      state.purchaser_email = "";
      state.purchaser_offer_id = "";
      state.student_email_code= "";
      state.customize_product_id= "";
      state.header_logo_url= "";
      state.hero_background_image_url= "";
      state.footer_logo_url= "";
      state.page_background_image_url= "";
      state.fav_icon_url = "";
      state.student_email_exist = false;
      state.student_register_required = true;
      state.purchaser_fullname = "";
      state.purchaser_password = "";
    },

    SET_CUSTOMIZE_PRODUCT_ID(state, product_id) {
      state.customize_product_id = product_id
    },
    
    SET_CUSTOMIZE_HEADER_LOGO(state, header_logo_url) {
      state.header_logo_url = header_logo_url;
    },

    SET_CUSTOMIZE_HERO_BACKGROUND(state, hero_background_image_url) {
      state.hero_background_image_url = hero_background_image_url;
    },

    SET_CUSTOMIZE_FOOTER_LOGO(state, footer_logo_url) {
      state.footer_logo_url = footer_logo_url;
    },

    SET_PAGE_BACKGROUND_IMAGE(state, page_background_image_url) {
      state.page_background_image_url = page_background_image_url
    },

    SET_PRODUCT_FAVICON(state, fav_icon_url) {
      state.fav_icon_url = fav_icon_url
    },

    SET_STUDENT_EMAIL_EXIST(state, flag) {
      state.student_email_exist = flag;
    },

    SET_REGISTER_REQUIRE(state, flag) {
      state.student_register_required = flag;
    }
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
    purchaser_email: (state) => state.purchaser_email,
    purchaser_offer_id: (state) => state.purchaser_offer_id,
    student_email_code: (state) => state.student_email_code,
    customize_product_id: (state) => state.customize_product_id,
    header_logo_url: (state) => state.header_logo_url,
    hero_background_image_url: (state) => state.hero_background_image_url,
    footer_logo_url: (state) => state.footer_logo_url,
    page_background_image_url: (state) =>state.page_background_image_url,
    fav_icon_url: (state) => state.fav_icon_url,
    student_email_exist: (state) => state.student_email_exist,
    student_register_required: (state) => state.student_register_required,
    purchaser_password: (state) => state.purchaser_password,
    purchaser_fullname: (state) => state.purchaser_fullname,
  },
});
