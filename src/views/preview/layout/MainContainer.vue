<template>
    <div >
    <!---Navigation-->
    <Navbar
      :topbarColor="topbarColor"
      :logo="require('@/assets/images/logo/icon.png')"
      :title="logotitle"
    />
    <!---Sidebar-->
    <!-- <SideBar parent=".main-wrapper" :sidebarLinks="sidebarLinks"/> -->
    <!---Page Container-->
    <div class="main-container-fluid preview-product-layout">
      <!-- <Breadcrumb/>	 -->
      <transition
        name="router-anim"
        enter-active-class="fade-enter-active fade-enter"
        leave-active-class="fade-leave-active fade-enter"
      >
        <router-view></router-view>
      </transition>
      <!---Customizer / Settings-->
      <!-- <Customizer @updateTopbarColor="updateTopbarColor" /> -->
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './header/Navbar.vue';
import Footer from "./footer/Footer.vue";
import themeConfig from "@/../themeConfig.js";

export default {
  name: "MainContainer",
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    topbarColor: "white",
    logotitle: themeConfig.logotitle,
  }),

  methods: {
    updateTopbarColor(val) {
      this.topbarColor = val;
    },
   
  },
  created() {
    this.$store.dispatch('productManage/setCurrentProduct', this.current_product)
  },
  computed: {

    current_product: {
      get() {
        return this.$store.getters["productManage/current_product"]
      },
    },
    sidebarWidth: function () {
      return this.$store.state.sidebarWidth;
    },
    mainWrapperClass: function () {
      if (this.sidebarWidth == "default") {
        return "main-wrapper-default";
      } else if (this.sidebarWidth == "mini") {
        return "main-wrapper-mini";
      } else if (this.sidebarWidth) {
        return "main-wrapper-full";
      }
      return "default";
    },
    themeClass: function () {
      if (this.$store.state.theme == "light") {
        return "light-theme";
      } else if (this.$store.state.theme == "dark") {
        return "dark-theme";
      }
      return "default";
    },
     status_got: {
      get() {
        return this.$store.getters["status_got"];
      },
    },
  },
};
</script>
<style>
</style>