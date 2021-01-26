<template>
  <div class="main-wrapper" :class="[mainWrapperClass, themeClass]">
    <!---Navigation-->
    <Navbar
      :topbarColor="topbarColor"
      :logo="require('@/assets/images/logo/icon.png')"
      :title="logotitle"
      :logged_user="logged_user"
    />
    <!---Sidebar-->
    <SideBar
      parent=".main-wrapper"
      :sidebarLinks="sidebarLinks"
      :logged_user="logged_user"
    />

    <!---Page Container-->
    <div
      class="main-container-fluid"
      v-bind:style="{
        'background-image': convertBackgroundCssImageUrl(
          page_background_image_url
        ),
        'background-color': ga_background,
      }"
    >
      <!-- <Breadcrumb /> -->
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
  </div>
</template>

<script>
import Navbar from "@/layout/full/header/Navbar.vue";
import SideBar from "@/layout/full/sidebar/SideBar.vue";
// import Customizer from "@/layout/full/customizer/Customizer.vue";
import sidebarLinks from "@/layout/full/sidebar/sidebarlinks.js";
// import Breadcrumb from "@/layout/full/breadcrumb/Breadcrumb.vue";
import themeConfig from "@/../themeConfig.js";

export default {
  name: "MainContainer",
  components: {
    Navbar,
    SideBar,
    // Customizer,
    // Breadcrumb,
  },

  data: () => ({
    // topbarColor: themeConfig.topbarColor,
    topbarColor: "white",
    logotitle: themeConfig.logotitle,
    sidebarLinks: sidebarLinks,
    changeSidebar: false,
  }),

  methods: {
    convertBackgroundCssImageUrl(url) {
      return "url(" + url + ")";
    },

    updateTopbarColor(val) {
      this.topbarColor = val;
    },

    setFavIcon() {
      let sidebar = this.$store.state.currentSidebar;
      const favicon = document.getElementById("favicon");
      if (sidebar !== "product-customize")
        favicon.href = favicon.href = process.env.BASE_URL + "icon.png";
    },
  },
  updated() {
    // this.setFavIcon();
    if (this.logged_user == null) {
      this.$router.replace("./login");
    }
  },
  beforeUpdate() {
    if (this.logged_user == null) {
      this.$router.replace("./login");
    }
  },
  created() {
    if (this.logged_user == null) {
      this.$router.replace("./login");
    }
  },

  computed: {
    page_background_image_url: {
      get() {
        let sidebar = this.$store.state.currentSidebar;
        if (sidebar == "product-customize")
          return this.$store.getters["page_background_image_url"];
        else return "none";
      },
    },
    current_product: {
      get() {
        return this.$store.getters["productManage/current_product"];
      },
    },

    prod_settings: {
      get() {
        let sidebar = this.$store.state.currentSidebar;
        if (sidebar == "product-customize")
          return this.$store.getters["prodCustomizeManage/prod_settings"];
        else return "none";
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
      } else if (this.sidebarWidth == "checkout") {
        return "main-wrapper-checkout";
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
    logged_user: {
      get() {
        return this.$store.getters["auth/logged_user"];
      },
    },
    ga_background: {
      get() {
        if (this.prod_settings == null)
          return "#ffffff00";
        if (this.prod_settings.ga_background == null)
          return "#ffffff00"
        else
          return this.prod_settings.ga_background
      }
    }
  },
};
</script>
<style lang="scss">
.main-container-fluid {
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-blend-mode: multiply;
  background-attachment: fixed;
}
</style>