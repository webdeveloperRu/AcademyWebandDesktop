<template>
  <div class="product-customize-page" style="margin-top: -24px">
    <div
      class="product-announcement"
      v-if="prod_header.show_announcement && prod_header.show_header"
      v-bind:style="{
        background: prod_header.announcement_color,
        color: prod_header.announcement_text_color,
      }"
    >
      <div
        class="product-announcement-text"
        @click="linkToAnnouncementUrl"
        v-if="prod_header.announcement_new_window"
      >
        {{ prod_header.announcement_text }}
      </div>
      <a
        v-if="!prod_header.announcement_new_window"
        class="product-announcement-text"
        :href="prod_header.announcement_url"
        v-bind:style="{
          color: prod_header.announcement_text_color,
        }"
      >
        {{ prod_header.announcement_text }}
      </a>
    </div>
    <header
      class="vs-navbar topnavbar vs-navbar-null vs-navbar-color-white studentapp-header"
      style="background: white; margin-left: -20px"
      v-if="prod_header.show_header"
    >
      <div class="vs-navbar--header">
        <button class="vs-navbar--btn-responsive">
          <span class="btn-responsive-line line--1"></span>
          <span class="btn-responsive-line line--2"></span>
          <span class="btn-responsive-line line--3"></span>
        </button>
        <div
          class="outline-edit"
          title="Edit Logo and Site Title"
          @click="selectProductCustomizeMenu('header')"
        >
          <div class="themelogo">
            <a>
              <img
                src="data:image/png;base64,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"
                alt="Dashboard"
                width="50"
              />
            </a>
            <span class="logo-text" style="display: block; width: 300px">
              Student App</span
            >
          </div>
          <label class="edit-button" size="small">Edit</label>
        </div>
      </div>

      <div
        class="outline-edit"
        title="Edit Product Items"
        @click="selectProductCustomizeMenu('header')"
      >
        <div class="vs-con-items">
          <div class="vs-spacer"></div>
          <div class="cursor-pointer pr-2 pl-2 ml-1 mr-1">My Library</div>
          <button
            type="button"
            left=""
            class="vs-con-dropdown parent-dropdown cursor-pointer pr-2 pl-2 ml-1 mr-1"
          >
            <a href="#" href.prevent="" class="text-white-dark"> Search </a>
          </button>
          <button
            type="button"
            left=""
            class="vs-con-dropdown parent-dropdown cursor-pointer pr-2 pl-2 ml-1 mr-md-3"
          >
            <a href="#" class="text-white-dark">
              <vs-avatar size="50px"></vs-avatar>
            </a>
          </button>
        </div>
        <label class="edit-button" size="small">Edit</label>
      </div>
    </header>

    <div style="padding-top: 69px" class="product-body-layout">
      <!-- This is the main body sections -->
      <div
        class="outline-edit"
        style="padding-top: 27px; padding-bottom: 3px; margin: 0 -25px"
        title="Edit Hero Section"
        @click="selectProductCustomizeMenu('hero')"
        v-if="prod_hero.show_hero"
      >
        <div
          class="category-banner"
          v-bind:style="{
            'background-image': prod_hero.background_image,
            'text-align': hero_alignment,
            'padding-top': hero_spacing,
            'padding-bottom': hero_spacing,
          }"
        >
          <p
            class="producttitle-category"
            v-bind:style="{ color: prod_hero.text_color }"
          >
            {{ current_product.title }}
          </p>
          <p
            class="product-description-category"
            v-bind:style="{ color: prod_hero.text_color }"
          >
            {{ current_product.description }}
          </p>
          <vs-button class="start-course">Start Course</vs-button>
        </div>
        <div
          class="hero-overlay"
          v-bind:style="{
            background: prod_hero.overlay_color,
          }"
        ></div>
        <label class="edit-button" size="small">Edit</label>
      </div>
      <br />
      <br />
      <vs-row vs-justify="center" class="primary-font">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="9"
          vs-sm="10"
          vs-xs="12"
          code-toggler
        >
          <vs-row vs-justify="center" class="primary-font category-responsive">
            <vs-col
              type="flex"
              vs-justify="center"
              vs-align="center"
              vs-lg="8"
              vs-sm="12"
              vs-xs="12"
              code-toggler
            >
              <div
                class="outline-edit"
                title="Edit Category Item"
                @click="selectProductCustomizeMenu('welcome')"
                v-if="prod_welcome.show_wellcome"
              >
                <vs-card>
                  <div
                    @click="selectProductCustomizeMenu('hero')"
                    v-bind:style="{
                      'text-align': welcome_text_aligment,
                    }"
                  >
                    <p class="product-welcome-title">
                      {{ current_product.title }}
                    </p>
                    <p class="product-welcome-description">
                      {{ current_product.description }}
                    </p>
                  </div>
                </vs-card>
                <label class="edit-button" size="small">Edit</label>
              </div>
              <div
                class="outline-edit"
                title="Edit Category Item"
                @click="selectProductCustomizeMenu('product-syllabus')"
              >
                <vs-card>
                  <h3 class="mb-3" style="cursor: pointer">category name</h3>
                  <div style="cursor: pointer">
                    <vs-row
                      vs-justify="center"
                      vs-align="center"
                      class="category-item mb-4 p-2"
                    >
                      <vs-col
                        type="flex"
                        vs-justify="center"
                        vs-align="center"
                        vs-lg="3"
                        vs-sm="12"
                        vs-xs="12"
                        code-toggler
                      >
                        <div
                          class="category-image"
                          style="cursor: pointer"
                        ></div>
                      </vs-col>
                      <vs-col
                        type="flex"
                        vs-justify="center"
                        vs-align="center"
                        vs-lg="8"
                        vs-sm="12"
                        vs-xs="12"
                        code-toggler
                      >
                        <div style="cursor: pointer">
                          <h4 class="mb-2">lesson title</h4>
                          <div class="category-description">lesson body</div>
                        </div>
                      </vs-col>
                      <vs-col
                        type="flex"
                        vs-justify="center"
                        vs-align="center"
                        vs-lg="1"
                        vs-sm="12"
                        vs-xs="12"
                        code-toggler
                        :title="'This lesson is completed'"
                      >
                        <vs-icon
                          icon="check"
                          color="danger"
                          style="font-size: 20px"
                        ></vs-icon>
                      </vs-col>
                    </vs-row>
                  </div>
                  <div>
                    <div
                      color="danger"
                      style="cursor: pointer; color: dodgerblue"
                    >
                      View More
                    </div>
                  </div>
                </vs-card>
                <label class="edit-button" size="small">Edit</label>
              </div>
            </vs-col>

            <vs-col
              type="flex"
              vs-justify="center"
              vs-align="center"
              vs-lg="4"
              vs-sm="12"
              vs-xs="12"
              code-toggler
              v-if="prod_sidebar.show_sidebar"
            >
              <vs-card class="progress-product_thumbnail">
                <div title="Edit Product Image">
                  <div class="category-image"></div>
                  <label class="edit-button" size="small">Edit</label>
                </div>
                <div class="mx-4 mt-3">
                  <div title="Edit Progress Text">
                    <h4 class="mt-3">12 of 23 Lessons Completed</h4>
                    <label class="edit-button" size="small">Edit</label>
                  </div>
                  <div title="Edit Progress bar Color">
                    <vs-progress :percent="80" color="primary"
                      >primary</vs-progress
                    >
                    <label class="edit-button" size="small">Edit</label>
                  </div>
                </div>
              </vs-card>

              <!-- <div class="outline-edit" title="Edit Product Description">
                <vs-card>
                  <h4 class="mb-3">Product Description</h4>

                  <div class="mt-3">
                    current product description current product description
                    current product description current product description
                    current product description current product description
                    current product description current product description
                    current product description
                  </div>
                </vs-card>
                <label class="edit-button" size="small">Edit</label>
              </div> -->
              <!-- <div class="outline-edit"> -->
              <vs-card>
                <h4 class="mb-3">
                  <div>
                    Instructor
                    <label class="edit-button" size="small">Edit</label>
                  </div>
                </h4>
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: flex-start"
                >
                  <div>
                    <vs-avatar size="70px"></vs-avatar>
                    <label class="edit-button" size="small">Edit</label>
                  </div>
                  <div class="ml-3">
                    <div class="mb-1">
                      <div>
                        <strong>instructor name</strong>
                        <label class="edit-button" size="small">Edit</label>
                      </div>
                    </div>
                    <div>
                      <div style="color: dodgerblue">Instructor</div>
                      <label class="edit-button" size="small">Edit</label>
                    </div>
                  </div>
                </div>
                <div class="mt-3">
                  <div>
                    current product instructor description current product
                    instructor description current product instructor
                    description current product instructor description current
                    product instructor description
                    <label class="edit-button" size="small">Edit</label>
                  </div>
                </div>
              </vs-card>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
    </div>
    <!-- footer section -->
    <div
      class="outline-edit footer-layout"
      title="Edit footer section"
      @click="selectProductCustomizeMenu('footer')"
    >
      <footer
        class="footer footer--dark footer--left"
        kjb-settings-id="sections_footer_settings_background_color"
        v-if="prod_footer.show_footer"
        v-bind:style="{
          background: prod_footer.background_color,
        }"
      >
        <div class="container">
          <div class="footer__text-container">
            <span
              v-if="prod_footer.show_copyright"
              kjb-settings-id="sections_footer_settings_copyright"
              class="footer__copyright"
              v-bind:style="{
                color: prod_footer.text_color,
              }"
              >{{ prod_footer.copyright_text }}</span
            >
          </div>
          <div
            class="footer-icon-layout"
            v-if="prod_footer.show_social_icons"
            v-bind:style="{
              'justify-content': social_icon_alignment,
            }"
          >
            <div
              v-if="prod_footer.sil_facebook != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-facebook"></i>
            </div>
            <div
              v-if="prod_footer.sil_twitter != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="mdi mdi-twitter"></i>
            </div>
            <div
              v-if="prod_footer.sil_instagram != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-instagram"></i>
            </div>
            <div
              v-if="prod_footer.sil_youtube != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-youtube"></i>
            </div>
            <div
              v-if="prod_footer.sil_vimeo != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-vimeo"></i>
            </div>
            <div
              v-if="prod_footer.sil_github != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-github"></i>
            </div>
            <div
              v-if="prod_footer.sil_itunes != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="mdi mdi-itunes"></i>
            </div>
            <div
              v-if="prod_footer.sil_linkedin != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-linkedin"></i>
            </div>
            <div
              v-if="prod_footer.sil_soundcloud != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="mdi mdi-soundcloud"></i>
            </div>
            <div
              v-if="prod_footer.sil_tumblr != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-tumblr"></i>
            </div>
            <div
              v-if="prod_footer.sil_flickr != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-flickr"></i>
            </div>
            <div
              v-if="prod_footer.sil_slack != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="mdi mdi-slack"></i>
            </div>
            <div
              v-if="prod_footer.sil_dribbble != ''"
              class="footer-icon"
              v-bind:style="{
                color: prod_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-dribbble"></i>
            </div>
          </div>
        </div>
      </footer>
      <label class="edit-button" size="small">Edit</label>
    </div>
  </div>
</template>

<script>
// import Navbar from "../../layout/full/header/Navbar";

// import Navbar from "../../layout/full/header/Navbar.vue";
export default {
  name: "CustomizeProduct",
  components: {},
  data: () => ({}),
  computed: {
    user_logged: {
      get() {
        return this.$store.getters["auth/user_logged"];
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

    status_got: {
      get() {
        return this.$store.getters["status_got"];
      },
    },
    selected_product: {
      get() {
        let product = [];
        product = this.$store.state.productManage.current_product;
        if (product == undefined) return [];
        else return product;
      },
    },
    product_id: function () {
      var id = this.$route.params.product_id;
      return id.slice(0, id.length);
    },

    // check out status
    currentSidebar: function () {
      return this.$store.state.currentSidebar;
    },

    //This is for mobile trigger
    isSidebarActive: {
      get() {
        return this.$store.state.isSidebarActive;
      },
      set(val) {
        this.$store.commit("TOGGLE_SIDEBAR_ACTIVE", val);
      },
    },

    //current product sidebar menu
    currentProductCustomizeMenu() {
      return this.$store.state.current_productcustomize_menu;
    },
    // ----------------------- prod customize part -----------------------
    prod_header: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_header"];
      },
    },

    prod_hero: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_hero"];
      },
    },
    prod_footer: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_footer"];
      },
    },
    prod_sidebar: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_sidebar"];
      },
    },
    prod_settings: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_settings"];
      },
    },
    prod_welcome: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_welcome"];
      },
    },
    prod_syllabus: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_syllabus"];
      },
    },
    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },

    current_product: {
      get() {
        let product = [];
        for (let i = 0; i < this.product_list.length; i++) {
          if (this.product_list[i].id == this.product_id) {
            product = this.product_list[i];
          }
        }
        return product;
      },
    },

    hero_alignment: {
      get() {
        let value = "";
        switch (this.prod_hero.alignment) {
          case "Centered":
            value = "center";
            break;
          case "Left":
            value = "left";
            break;
          case "Right":
            value = "right";
            break;
        }
        return value;
      },
    },

    hero_spacing: {
      get() {
        let value = "";
        switch (this.prod_hero.spacing) {
          case "Small":
            value = "30px";
            break;
          case "Medium":
            value = "50px";
            break;
          case "Large":
            value = "100px";
            break;
          case "Extra Small":
            value = "10px";
            break;
        }
        return value;
      },
    },

    welcome_text_aligment: {
      get() {
        let value = "";
        switch (this.prod_welcome.text_alignment) {
          case "Centered":
            value = "center";
            break;
          case "Left":
            value = "left";
            break;
          case "Right":
            value = "right";
            break;
        }
        return value;
      },
    },

    social_icon_border_radius: {
      get() {
        if (this.prod_footer.social_icon_style != "Round") return "0px";
        else return "18px";
      },
    },
    social_icon_background_color: {
      get() {
        if (this.prod_footer.social_icon_style != "None")
          return this.prod_footer.social_icon_background_color;
        else return "none";
      },
    },

    social_icon_alignment: {
      get() {
        let value = "";
        switch (this.prod_footer.social_icon_alignment) {
          case "Left":
            value = "flex-start";
            break;
          case "Center":
            value = "center";
            break;

          case "Right":
            value = "flex-end";
            break;
        }
        return value;
      },
    },
  },
  created() {
    this.$store.dispatch("changeSideBar", "product-customize");
    this.$store.dispatch("updateSidebarWidth", "checkout");
  },
  methods: {
    selectProductCustomizeMenu(menu_option) {
      this.$store.dispatch("setCurrentProductCustomizeMenu", menu_option);
    },
    linkToAnnouncementUrl() {
      console.log(this.prod_header.announcement_url);
      window.open(this.prod_header.announcement_url, "_blank");
    },
  },
};
</script>

<style lang="scss">
.category-banner {
  margin: 0 -20px;
  padding: 10px 200px;
  margin-top: calc(-24px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
}

.producttitle-category {
  color: white;
  font-size: 50px;
  font-weight: 600;
  z-index: 1;
}
.product-description-category {
  font-size: 16px;
  font-weight: 500;
}

.product-welcome-title {
  font-size: 40px;
  font-weight: 600;
}
.product-welcome-description {
  font-size: 16px;
  font-weight: 500;
}
.product-image {
  width: 30%;
  background-position: center;
  background-image: url("../../assets/images/big/img3.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 170px;
}

.category-image {
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("../../assets/images/big/img4.jpg");
}

.category-item .category-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
  --max-lines: 3;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
  padding-right: 1rem;
}

.category-item .category-description::before {
  position: absolute;
  content: "";
  inset-block-end: 0;
  /* "bottom" */
  inset-inline-end: 0;
}

.category-item .category-description::after {
  content: "";
  position: absolute;
  inset-inline-end: 0;
  /* "right" */
  width: 1rem;
  height: 1rem;
  background: transparent;
}

.category-item:hover .category-description::after {
  background-color: transparent;
}

/* .category-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
} */

.progress-product_thumbnail .vs-card--content {
  padding: 0;
  padding-bottom: 20px;
}

.progress-product_thumbnail .vs-card--content .category-image {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* @media only screen and (min-width: 400px) {
  .product-card .vs-card--content {
    height: 0;
    padding: 0;
  }
  .product-card .producttitle {
    position: absolute;
    left: 32%;
    top: 40%;
    font-size: 20px;
    font-weight: 700;
  }
  .product-card {
    position: relative;
  }

  .view-product {
    position: absolute;
    right: 20px;
    top: 20px;
  }
} */

@media only screen and (max-width: 900px) {
  .category-responsive {
    flex-direction: column-reverse;
  }

  .category-banner .producttitle-category {
    font-size: 45px;
    font-weight: 500;
    margin-top: -40px;
  }
}

@media only screen and (max-width: 400px) {
  .product-image {
    width: 100%;
    background-position: center;
    background-image: url("../../assets/images/big/img3.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
  }

  .product-card .vs-card--content {
    height: auto;
    padding: 20px;
  }

  .product-card .producttitle {
    position: relative;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .view-product {
    position: relative;
  }

  .category-banner .producttitle-category {
    font-size: 35px;
    font-weight: 500;
    margin-top: -40px;
  }
}

/* footer */

.footer {
  padding: 15px 0;
  margin: 0 -20px;
  margin-bottom: -24px;
}

.footer__text-container {
  overflow: hidden;
  text-align: center;
  min-height: 30px;
}

.footer__copyright {
  line-height: 40px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.footer__menu,
.footer__powered-by {
  display: inline-block;
  float: right;
}

.footer__menu-item,
.footer__powered-by a {
  line-height: 40px;
  display: inline-block;
  margin-left: 20px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.social-icons--left {
  text-align: left;
}

.social-icons {
  font-size: 0;
  display: block;
  margin-bottom: 30px;
  text-align: left;
}

.social-icons__row {
  margin: -10px;
}

.social-icons__icon {
  font-family: "FontAwesome" !important;
  font-size: 24px;
  line-height: 40px;
  display: inline-block;
  margin: 10px;
  text-decoration: none;
}

@media (max-width: 767px) {
  .footer {
    text-align: center;
  }

  .footer__copyright {
    line-height: 30px;
    display: block;
    float: none;
  }

  .footer__menu,
  .footer__powered-by {
    display: block;
    float: none;
  }

  .footer__menu-item,
  .footer__powered-by a {
    line-height: 30px;
    display: block;
    margin-right: 0;
    margin-left: 0;
  }

  .footer__menu,
  .footer__powered-by {
    display: block;
    float: none;
  }

  .social-icons--left,
  .social-icons--right {
    text-align: center;
  }
}

@media (min-width: 1169px) {
  .studentapp-header {
    width: calc(100% - #{$custom-sidebar});
  }
}

/* For edit button */

.outline-edit {
  position: relative;
  border: 2px transparent dashed;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}

.outline-edit:hover {
  border: 2px dodgerblue dashed;
  background-color: rgba(98, 120, 243, 0.1);
}

.outline-edit:hover .edit-button {
  display: block;
}

.edit-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  background-color: #3498db;
  color: white;
  padding: 3px 10px;
  cursor: pointer;
  border-radius: 3px;
  z-index: 100;
}
.hero-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.footer-layout {
  .footer {
    min-height: 120px;
  }
}
.footer-icon {
  font-size: 22px;
  margin: 0px 5px 0px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: white;
}
.footer-icon-layout {
  display: flex;
}
.product-body-layout {
  min-height: 80vh;
}
.product-announcement {
  height: 50px;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-announcement-text {
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
</style>
