<template>
  <header class="gridx">
    <vs-navbar
      class="product-announcement topnavbar"
      style="min-height:50px"
      v-bind:style="{
        background: current_product.customize_header.announcement_color,
        color: current_product.customize_header.announcement_text_color,
      }"
    >
      <div
        class="product-announcement-text"
        @click="linkToAnnouncementUrl"
        v-if="current_product.customize_header.announcement_new_window"
      >
        {{ current_product.customize_header.announcement_text }}
      </div>
      <a
        v-if="!current_product.customize_header.announcement_new_window"
        class="product-announcement-text"
        :href="current_product.customize_header.announcement_url"
        v-bind:style="{
          color: current_product.customize_header.announcement_text_color,
        }"
      >
        {{ current_product.customize_header.announcement_text }}
      </a>
    </vs-navbar>
    <vs-navbar
      v-model="indexActive"
      :color="topbarColor"
      class="topnavbar"
      text-color="rgba(255,255,255,0.7)"
      active-text-color="rgba(255,255,255,1)"
      v-bind:style="{
        top: navbar_header_height,
      }"
      v-if="current_product.customize_header.show_header"
    >
      <!---
      Template logo
      -->
      <div slot="title" class="themelogo">
        <!-- <a href="/"> <img src="@/assets/images/logo.s" v-if="logo" alt="Dashboard" width="50" /></a> -->
        <span class="logo-text" style="display: block; width: 300px"
          >Student App</span
        >
      </div>

      <vs-spacer></vs-spacer>

      <div class="cursor-pointer pr-2 pl-2 ml-1 mr-1" @click="linkToMyproducts">
        My Library
      </div>
      <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
      >
        <a class="text-white-dark" href="#" href.prevent>
          Search
          <!-- <vs-icon icon="search"></vs-icon> -->
        </a>
        <vs-dropdown-menu class="topbar-dd">
          <div class="p-2 m-1">
            <vs-input
              placeholder="Search & hit enter"
              v-model="keyword"
              v-on:keyup.enter="searchLessons"
            />
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
      <div class="pr-2 pl-2 ml-1 mr-md-3">
        <vs-avatar
          size="50px"
          v-if="
            logged_user.data.avatar != null || logged_user.data.avatar != ''
          "
          :src="logged_user.data.avatar"
        ></vs-avatar>
      </div>
      <!-- <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-md-3"
      >
        <a class="text-white-dark" href="#">
          <vs-avatar
            size="50px"
            v-if="
              logged_user.data.avatar != null || logged_user.data.avatar != ''
            "
            :src="logged_user.data.avatar"
          ></vs-avatar>
        </a>
        <vs-dropdown-menu class="user-dd common-dd topbar-dd">
          <div v-for="user in users" :user="user" :key="user.usertitle">
            <div
              class="d-flex align-items-center p-3 text-white mb-2"
              style="background-color: #272d34"
            >
              <div class>
                <vs-avatar
                  size="60px"
                  v-if="
                    logged_user.data.avatar != null ||
                    logged_user.data.avatar != ''
                  "
                  :src="logged_user.data.avatar"
                ></vs-avatar>
              </div>
              <div class="ml-2">
                <h4
                  v-if="
                    logged_user.data.name != null || logged_user.data.name != ''
                  "
                  class="mb-0 text-white"
                >
                  {{ logged_user.data.name }}
                </h4>
                <p
                  v-if="
                    logged_user.data.email != null ||
                    logged_user.data.email != ''
                  "
                  class="mb-0"
                >
                  {{ logged_user.data.email }}
                </p>
              </div>
            </div>

            <vs-button
              color="#272d34"
              type="filled"
              size="small"
              class="rounded-button ml-3 mb-3"
              @click.native="logOut"
              >Logout</vs-button
            >
          </div>
        </vs-dropdown-menu>
      </vs-dropdown> -->
    </vs-navbar>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  props: {
    topbarColor: {
      type: String,
      default: "#2962ff",
    },
    title: {
      type: String,
    },
    logo: {
      type: String,
    },
    user: Object,
    mail: Object,
    chat: Object,
  },
  data: () => ({
    indexActive: 0,
    showToggle: false,
    keyword: "",
    fake_data: true,
    // Data For User Dropdown
    users: [
      {
        img: "",
        name: "",
        email: "",
        dditem1: "My Profile",
        dditem2: "My Balance",
        dditem3: "Inbox",
        dditem4: "Account Setting",
        dditem5: "Fake Data",
        twoFactorAuthSetup: "Two Factor Authentication SetUp",
      },
    ],
    activeTwoFactorSetup: false,
  }),

  created() {},

  methods: {
    //This is for sidebar trigger in mobile
    activeSidebar() {
      this.$store.commit("TOGGLE_SIDEBAR_ACTIVE", true);
    },
    //This is for sidebar trigger in Desktop
    reduceSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", true);
      this.$store.dispatch("updateSidebarWidth", "mini");
      // this.showToggle = true;
    },
    fullSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", false);
      this.$store.dispatch("updateSidebarWidth", "default");
      // this.showToggle = false;
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
    LinkToSettings() {
      this.$router.push("/settings").catch(() => {});
    },

    setFakeData() {
      if (this.is_fake) {
        this.$store.dispatch("setFakeData", false);
        this.fake_data = false;
      } else {
        this.$store.dispatch("setFakeData", true);
        this.fake_data = true;
      }
    },
    logOut() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.replace("/login").catch(() => {});
        // this.$vs.notify({
        //   color: this.notification_color,
        //   text: this.notification_text,
        //   icon: this.notification_icon,
        // });
      });
    },
    async searchLessons() {
      this.$router.push("/search/" + this.keyword);

      this.$vs.loading({ type: "material" });

      await this.$store
        .dispatch("lessonManage/searchLesson", this.keyword)
        .then(() => {
          this.$vs.notify({
            text: this.notification_text,
            icon: this.notification_icon,
            color: this.notification_color,
          });
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });

      this.$vs.loading.close(this.$refs.loading);

      this.keyword = "";
    },
    linkToMyproducts() {
      this.$router.push("/library").catch(() => {});
    },
    linkToAnnouncementUrl() {
      window.open(
        this.current_product.customize_header.announcement_url,
        "_blank"
      );
    },
  },
  watch: {
    current_product: function (newValue) {
      console.log(newValue);
    },
  },
  computed: {
    logged_user: {
      get() {
        return this.$store.getters["auth/logged_user"];
      },
    },
    notification_text: {
      get() {
        return this.$store.getters["notification_text"];
      },
    },

    notification_icon: {
      get() {
        return this.$store.getters["notification_icon"];
      },
    },

    notification_color: {
      get() {
        return this.$store.getters["notification_color"];
      },
    },

    current_product: {
      get() {
        return this.$store.getters["productManage/current_product"];
      },
    },
    navbar_header_height: {
      get() {
        if (this.product_id !== "") {
          if (this.current_product.customize_header.show_announcement && this.current_product.customize_header.show_header) {
            return "50px";
          } else return "0px";
        }else return "0px"
      },
    },

    product_id: function () {
      var id = this.$route.params.product_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
  },
};
</script>

<style>
/* .con-vs-dropdown--menu {
  width: 100%;
} */
.product-announcement {
  /* height: 50px;
  display: flex;
  justify-content: center;
  align-items: center; */
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 101;
}
.product-announcement-text {
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
</style>
