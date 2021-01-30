<template>
  <div class="product-customize-page" style="margin-top: -24px">
    <div
      class="outline-edit"
      @click="selectProductCustomizeMenu('header')"
      v-if="prod_header"
    >
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
          v-bind:style="[
            prod_settings
              ? {
                  'font-family': prod_settings.base_font_family,
                }
              : '',
          ]"
        >
          {{ prod_header.announcement_text }}
        </div>
      </div>
    </div>
    <div v-if="prod_header">
      <header
        class="vs-navbar topnavbar vs-navbar-null vs-navbar-color-white studentapp-header"
        style="background: white; margin-left: -20px"
        v-bind:style="{
          top: navbar_header_height,
        }"
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
            <div v-if="prod_header.logo_type == 'image'" class="ml-3">
              <a style="display: block; width: 300px">
                <img
                  :src="header_logo"
                  alt="Dashboard"
                  :height="header_logo_height"
                />
              </a>
            </div>
            <div v-else class="ml-3">
              <span class="logo-text" style="display: block; width: 300px">
                {{ prod_header.logo_text }}
              </span>
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
            <div
              class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
              v-bind:style="[
                prod_settings
                  ? {
                      'font-family': prod_settings.heading_font_family,
                    }
                  : '',
              ]"
            >
              My Library
            </div>
            <button
              type="button"
              left=""
              class="vs-con-dropdown parent-dropdown cursor-pointer pr-2 pl-2 ml-1 mr-1"
            >
              <a
                href="#"
                href.prevent=""
                class="text-white-dark"
                v-bind:style="[
                  prod_settings
                    ? {
                        'font-family': prod_settings.heading_font_family,
                      }
                    : '',
                ]"
              >
                Search
              </a>
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
    </div>
    <div
      v-bind:style="{ 'padding-top': header_height }"
      class="product-body-layout"
      v-if="prod_hero"
    >
      <!-- This is the main body sections -->
      <div
        class="outline-edit"
        style="padding-bottom: 3px; margin-left: -20px; margin-right: -20px"
        title="Edit Hero Section"
        @click="selectProductCustomizeMenu('hero')"
        v-if="prod_hero.show_hero"
      >
        <div
          class="category-banner"
          v-bind:style="{
            'background-image': convertBackgroundCssImageUrl(
              hero_background_image_url
            ),
            'text-align': hero_alignment,
          }"
        >
          <div
            class="hero-overlay"
            v-bind:style="{
              'padding-top': hero_spacing,
              'padding-bottom': hero_spacing,
              background: hero_overlay_color,
            }"
          >
            <p
              class="producttitle-category"
              v-bind:style="[
                prod_settings
                  ? {
                      color: hero_text_color,
                      'font-family': prod_settings.heading_font_family,
                    }
                  : {
                      color: hero_text_color,
                    },
              ]"
            >
              {{ current_product.title }}
            </p>
            <p
              class="product-description-category"
              v-bind:style="[
                prod_settings
                  ? {
                      color: hero_text_color,
                      'font-family': prod_settings.base_font_family,
                    }
                  : { color: hero_text_color },
              ]"
            >
              {{ current_product.description }}
            </p>
            <vs-button
              class="start-course mt-2"
              style="color: white"
              v-bind:style="[
                prod_settings
                  ? {
                      'font-family': prod_settings.heading_font_family,
                    }
                  : '',
              ]"
              >Start Course</vs-button
            >
          </div>
        </div>
        <label class="edit-button" size="small">Edit</label>
      </div>
      <br />
      <br />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="9"
          vs-sm="10"
          vs-xs="12"
          code-toggler
        >
          <vs-row vs-justify="center" class="category-responsive">
            <vs-col
              type="flex"
              vs-justify="center"
              vs-align="center"
              vs-lg="8"
              vs-sm="12"
              vs-xs="12"
              code-toggler
            >
              <div v-if="prod_welcome">
                <div
                  class="outline-edit mb-4"
                  title="Edit Category Item"
                  @click="selectProductCustomizeMenu('welcome')"
                  v-if="prod_welcome.show_welcome"
                >
                  <vs-card>
                    <div
                      @click="selectProductCustomizeMenu('welcome')"
                      v-bind:style="[
                        prod_settings
                          ? {
                              'text-align': welcome_text_aligment,
                              color: prod_settings.dark_font_color,
                            }
                          : { 'text-align': welcome_text_aligment },
                      ]"
                    >
                      <p
                        class="product-welcome-title"
                        v-bind:style="[
                          prod_settings
                            ? {
                                'font-family':
                                  prod_settings.heading_font_family,
                                color: prod_settings.dark_font_color,
                              }
                            : '',
                        ]"
                      >
                        {{ current_product.title }}
                      </p>
                      <p
                        class="product-welcome-description"
                        v-bind:style="[
                          prod_settings
                            ? {
                                'font-family': prod_settings.base_font_family,
                                color: prod_settings.dark_font_color,
                              }
                            : '',
                        ]"
                      >
                        {{ current_product.description }}
                      </p>
                    </div>
                  </vs-card>
                  <label class="edit-button" size="small">Edit</label>
                </div>
              </div>
              <div v-if="syllabus_type == 'Posts'">
                <div
                  class="outline-edit mb-4"
                  title="Edit Category Item"
                  @click="selectProductCustomizeMenu('product-syllabus')"
                  v-for="(category, index_card) in category_list"
                  v-bind:key="index_card"
                >
                  <vs-card v-if="show_syllabus">
                    <h3
                      class="mb-3"
                      style="cursor: pointer"
                      v-bind:style="[
                        prod_settings
                          ? {
                              'font-family': prod_settings.heading_font_family,
                              color: prod_settings.dark_font_color,
                            }
                          : '',
                      ]"
                    >
                      {{ category.name }}
                    </h3>
                    <div
                      style="cursor: pointer"
                      v-for="(lesson, index) in lesson_list[category.id]"
                      v-bind:key="index"
                    >
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
                            v-bind:style="{
                              'background-image':
                                'url(' +
                                getLessonThumbnail(lesson.thumbnail) +
                                ')',
                            }"
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
                            <h4
                              class="mb-2"
                              v-bind:style="[
                                prod_settings
                                  ? {
                                      'font-family':
                                        prod_settings.base_font_family,
                                      color: prod_settings.dark_font_color,
                                    }
                                  : '',
                              ]"
                            >
                              {{ lesson.title }}
                            </h4>
                            <div
                              class="category-description"
                              v-bind:style="[
                                prod_settings
                                  ? {
                                      'font-family':
                                        prod_settings.base_font_family,
                                      color: prod_settings.dark_font_color,
                                    }
                                  : '',
                              ]"
                            >
                              <span v-html="lesson.body"></span>
                            </div>
                          </div>
                        </vs-col>
                      </vs-row>
                    </div>
                    <div>
                      <div
                        color="danger"
                        style="cursor: pointer; color: dodgerblue"
                        v-bind:style="[
                          prod_settings
                            ? {
                                'font-family': prod_settings.base_font_family,
                              }
                            : '',
                        ]"
                      >
                        {{ show_more_text }}
                      </div>
                    </div>
                  </vs-card>
                  <label class="edit-button" size="small">Edit</label>
                </div>
              </div>
              <div v-else>
                <div
                  class="outline-edit mb-4"
                  title="Edit Category Item"
                  @click="selectProductCustomizeMenu('product-syllabus')"
                >
                  <vs-card v-if="show_syllabus">
                    <h3
                      class="mb-3"
                      style="cursor: pointer"
                      v-bind:style="[
                        prod_settings
                          ? {
                              'font-family': prod_settings.heading_font_family,
                              color: prod_settings.dark_font_color,
                            }
                          : '',
                      ]"
                    >
                      {{ prod_syllabus.categories_text }}
                    </h3>
                    <div
                      v-for="(category, index) in category_list"
                      v-bind:key="index"
                      @click="viewCategory(category.id)"
                      style="cursor: pointer"
                    >
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
                            v-bind:style="{
                              'background-image':
                                'url(' +
                                getCategoryThumbnail(category.thumbnail) +
                                ')',
                            }"
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
                          <h4
                            class="mb-2"
                            v-bind:style="[
                              prod_settings
                                ? {
                                    'font-family':
                                      prod_settings.base_font_family,
                                    color: prod_settings.dark_font_color,
                                  }
                                : '',
                            ]"
                          >
                            {{ category.name }}
                          </h4>
                          <div class="category-description">
                            <span
                              v-html="category.description"
                              v-bind:style="[
                                prod_settings
                                  ? {
                                      'font-family':
                                        prod_settings.base_font_family,
                                      color: prod_settings.dark_font_color,
                                    }
                                  : '',
                              ]"
                            ></span>
                          </div>
                        </vs-col>
                      </vs-row>
                    </div>
                  </vs-card>
                  <label class="edit-button" size="small">Edit</label>
                </div>
              </div>
              <div v-if="category_list.length == 0">
                <vs-card>
                  <div class="mt-5 mb-5">
                    <h3>There is no course data in this product...</h3>
                  </div>
                </vs-card>
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
              v-if="prod_sidebar && prod_sidebar.show_sidebar"
            >
              <vs-card class="progress-product_thumbnail">
                <div title="Edit Product Image">
                  <div
                    class="instructor-image"
                    v-bind:style="{
                      'background-image':
                        'url(' + current_product.thumbnail + ')',
                    }"
                  ></div>
                  <label class="edit-button" size="small">Edit</label>
                </div>
                <div class="mx-4 mt-3">
                  <div title="Edit Progress Text">
                    <h4
                      class="mt-3"
                      v-bind:style="[
                        prod_settings
                          ? {
                              'font-family': prod_settings.heading_font_family,
                              color: prod_settings.dark_font_color,
                            }
                          : '',
                      ]"
                    >
                      12 of 23 Lessons Completed
                    </h4>
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
                  <div
                    v-bind:style="[
                      prod_settings
                        ? {
                            'font-family': prod_settings.heading_font_family,
                            color: prod_settings.dark_font_color,
                          }
                        : '',
                    ]"
                  >
                    Instructor
                    <label class="edit-button" size="small">Edit</label>
                  </div>
                </h4>
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: flex-start"
                >
                  <div>
                    <vs-avatar
                      size="70px"
                      :src="instructor_headshot"
                    ></vs-avatar>
                    <label class="edit-button" size="small">Edit</label>
                  </div>
                  <div class="ml-3">
                    <div class="mb-1">
                      <div
                        v-bind:style="[
                          prod_settings
                            ? {
                                'font-family': prod_settings.base_font_family,
                                color: prod_settings.dark_font_color,
                              }
                            : '',
                        ]"
                      >
                        <strong>{{ instructor_name }}</strong>
                        <label class="edit-button" size="small">Edit</label>
                      </div>
                    </div>
                    <div>
                      <div
                        style="color: dodgerblue"
                        v-bind:style="[
                          prod_settings
                            ? {
                                'font-family': prod_settings.base_font_family,
                              }
                            : '',
                        ]"
                      >
                        Instructor
                      </div>
                      <label class="edit-button" size="small">Edit</label>
                    </div>
                  </div>
                </div>
                <div class="mt-3">
                  <div
                    v-bind:style="[
                      prod_settings
                        ? {
                            'font-family': prod_settings.base_font_family,
                            color: prod_settings.dark_font_color,
                          }
                        : '',
                    ]"
                  >
                    {{ instructor_title }}
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
      v-if="prod_footer"
      @click="selectProductCustomizeMenu('footer')"
    >
      <footer
        class="footer footer--dark footer--left"
        v-if="prod_footer.show_footer"
        v-bind:style="{
          background: prod_footer.background_color,
        }"
      >
        <div class="container">
          <div class="footer__text-container">
            <span v-if="prod_footer.show_logo" class="footer__copyright mr-3"
              ><img :src="footer_logo" alt="Dashboard" height="50" />
            </span>
            <span
              v-if="prod_footer.show_copyright"
              class="footer__copyright"
              v-bind:style="[
                prod_settings
                  ? {
                      color: prod_footer.text_color,
                      'font-family': prod_settings.heading_font_family,
                    }
                  : { color: prod_footer.text_color },
              ]"
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
  data: () => ({
    default_logo: require("@/assets/logo.png"),
    default_product_thumbnail: require("@/assets/images/default-product.png"),
  }),
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
      return this.$store.getters["customize_product_id"];
      // let id = this.$route.params.product_id;
      // if (id !== undefined) {
      //   return id.slice(0, id.length);
      // } else
      // return "";
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

    header_height: {
      get() {
        let value = 60;
        if (parseInt(this.header_logo_height) < 65) {
          if (this.prod_header) {
            if (this.prod_header.show_header) {
              if (this.prod_header.show_announcement) value = 110;
              else value = 60;
            } else {
              value = 0;
            }
          }
        } else {
          if (this.prod_header) {
            if (this.prod_header.show_header) {
              if (this.prod_header.show_announcement)
                value = 46 + this.header_logo_height;
              else value = this.header_logo_height;
            } else {
              value = 0;
            }
          }
        }
        return value.toString() + "px";
      },
    },

    navbar_header_height: {
      get() {
        if (this.prod_header.show_announcement) {
          return "108px";
        } else return "58px";
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

    category_list: {
      get() {
        let list = [];
        list = this.$store.getters["productManage/category_list"];
        if (list == undefined) return [];
        else return list;
      },
    },

    lesson_list: {
      get() {
        let list = [];
        list = this.$store.getters["lessonManage/lesson_list"];
        if (list == undefined) return [];
        else return list;
      },
    },

    instructor_image: {
      get() {
        return "../../assets/images/users/2.jpg";
      },
    },

    header_logo: {
      get() {
        if (this.header_logo_url == "") {
          return this.default_logo;
        } else {
          return this.header_logo_url;
        }
      },
    },

    footer_logo: {
      get() {
        if (this.footer_logo_url == "") {
          return this.default_logo;
        } else {
          return this.footer_logo_url;
        }
      },
    },

    footer_logo_url: {
      get() {
        return this.$store.getters["footer_logo_url"];
      },
    },

    header_logo_url: {
      get() {
        return this.$store.getters["header_logo_url"];
      },
    },

    hero_background_image_url: {
      get() {
        if (this.$store.getters["hero_background_image_url"] == "")
          // return require("@/assets/images/hero-default-banner.png");
          return "";
        else return this.$store.getters["hero_background_image_url"];
      },
    },

    header_logo_height: {
      get() {
        if (this.prod_header == null) return "50";
        let height = parseInt(this.prod_header.custom_logo_height);
        if (isNaN(height)) {
          return "50";
        } else {
          return height;
        }
      },
    },

    page_background_image_url: {
      get() {
        return this.$store.getters["page_background_image_url"];
      },
    },

    page_box_shadow: {
      get() {
        // return "inset 0 0 0 2000px" + this.prod_settings.ga_background
      },
    },

    hero_overlay_color: {
      get() {
        if (this.prod_hero.overlay_color == null) return "#005fcc87";
        else return this.prod_hero.overlay_color;
      },
    },

    hero_text_color: {
      get() {
        if (this.prod_hero.text_color == null) return "#ffffff";
        else return this.prod_hero.text_color;
      },
    },

    site_details: {
      get() {
        return this.$store.getters["siteDetailsManage/site_details"];
      },
    },

    instructor_headshot: {
      get() {
        if (
          this.site_details.instructor == undefined ||
          this.site_details.instructor == null
        )
          return "";
        else return this.site_details.instructor.headshot;
      },
    },

    instructor_name: {
      get() {
        if (
          this.site_details.instructor == undefined ||
          this.site_details.instructor == null
        )
          return "";
        else return this.site_details.instructor.name;
      },
    },

    instructor_title: {
      get() {
        if (
          this.site_details.instructor == undefined ||
          this.site_details.instructor == null
        )
          return "";
        else return this.site_details.instructor.title;
      },
    },

    syllabus_type: {
      get() {
        if (this.prod_syllabus == null) return "Posts";
        else return this.prod_syllabus.syllabus_type;
      },
    },
    show_syllabus: {
      get() {
        if (this.prod_syllabus == null) return true;
        else return this.prod_syllabus.show_syllabus;
      },
    },
    show_more_text: {
      get() {
        if (this.prod_syllabus == null) return "show more";
        else this.prod_syllabus.show_more_text;
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", "product-customize");
    this.$store.dispatch("updateSidebarWidth", "checkout");
    this.initSiteDetails();
  },
  methods: {
    initSiteDetails() {
      this.$store
        .dispatch("siteDetailsManage/getSiteDetails")
        .then(() => {})
        .catch(() => {});
    },
    selectProductCustomizeMenu(menu_option) {
      this.$store.dispatch("setCurrentProductCustomizeMenu", menu_option);
    },
    linkToAnnouncementUrl() {
      window.open(this.prod_header.announcement_url, "_blank");
    },
    linkToSocial(url) {
      window.open(url, "_blank");
    },
    convertBackgroundCssImageUrl(url) {
      return "url(" + url + ")";
    },

    getCategoryThumbnail(url) {
      if (url == "" || url == null) {
        return require("@/assets/images/default-product.png");
      } else {
        return url;
      }
    },

    getLessonThumbnail(url) {
      if (url == "" || url == null) {
        return require("@/assets/images/default-product.png");
      } else {
        return url;
      }
    },
  },
};
</script>

<style lang="scss">
.category-banner {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  margin-left: -2px;
  margin-right: -2px;
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
  margin: 0 100px;
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
}
.instructor-image {
  border-top-left-radius: 5px;
  border-top-left-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
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
  margin: 0 -22px;
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
  border-radius: 5px;
  cursor: pointer;
  border: 2px transparent dashed;
  // width: calc(100% - 4px);
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
  min-height: 100vh;
}

.product-announcement {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 58px;
  width: 100%;
  z-index: 101;
  margin-left: -22px;
}
.hero-overlay {
  width: 100%;
  height: 100%;
}
@media (min-width: 1169px) {
  .product-announcement {
    width: calc(100% - #{$custom-sidebar});
  }
}

.product-announcement-text {
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
.logo-text {
  font-size: 20px;
  font-weight: 700;
}
.outline-edit .vs-card--content {
  margin-bottom: 0px !important;
}
.outline-edit .con-vs-card {
  margin-bottom: 0px !important;
}
</style>
