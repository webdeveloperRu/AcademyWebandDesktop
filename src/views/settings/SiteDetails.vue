<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-xs="12">
      <span
        class="ml-2 mb-2 mt-2 primary-font"
        @click="backToSettings"
        style="cursor: pointer;"
        ><i class="ti-angle-left" style="font-size: 14px;"></i> Settings</span
      >
      <br />
      <div class="mb-4 mt-3">
        <div class="d-flex">
          <h2>Site Details</h2>
        </div>
      </div>
    </vs-col>
    <!-- 
      ***@ --------main part---------------
     -->
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="9"
      vs-xs="12"
      code-toggler
    >
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Site Info</h3>
          <div class="mt-2">
            Edit your site title and domain here.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-input
              label="Title"
              placeholder="Site Title here..."
              v-model="site_title"
              class="w-100 mt-4"
            />
            <vs-input
              label="Subdomain"
              placeholder="Subdomain here..."
              v-model="site_subdomain"
              class="w-100 mt-4"
            />
            <div class="mt-2 mb-2">
              Want to use a custom domain? <a href="">Start here</a>
            </div>
            <vs-input
              label="Support email"
              placeholder="support@email.com"
              v-model="support_email"
              class="w-100 mt-4"
            />
            <vs-input
              label="Support phone number"
              placeholder="123-4567"
              v-model="support_phone"
              class="w-100 mt-4"
            />

            <vs-select class="w-100 mt-3" label="Language" v-model="language">
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in languages"
              />
            </vs-select>

            <vs-input
              label="Default Currency"
              v-model="default_currency"
              class="w-100 mt-4"
            />
            <div
              style="display: flex;justify-content: flex-end;"
              v-if="info_changed"
            >
              <vs-button
                class="mt-4"
                color="primary"
                @click="saveSiteDetails('info')"
              >
                save
              </vs-button>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Branding</h3>
          <div class="mt-2">
            Choose the default logo and favicon that will be used across your
            whole Academy site.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <h5 class="text-left mb-3">Logo</h5>
            <!-- 
            @ select image logo part
           -->

            <div
              class="logo-aspect-ratio "
              :style="{ 'background-image': cssBrandingLogoUrl }"
            ></div>
            <div
              class="d-flex mt-2 file-select"
              style="justify-content: flex-start; align-items: center;"
            >
              <!-- select thumb nail-->
              <div
                class="d-flex align-items-center dropdownbtn-alignment justify-content-center"
              >
                <vs-dropdown vs-trigger-click>
                  <vs-button
                    class="btn-drop"
                    type="border"
                    icon="expand_more"
                    color="#5c6369"
                    >Select Image</vs-button
                  >
                  <vs-dropdown-menu>
                    <vs-dropdown-item>
                      <label class="logo-image-select-button">
                        <input
                          type="file"
                          @change="onSelectLogo"
                          style="overflow: hidden"
                          class="custom-file-input"
                          accept="image/png, image/jpeg"
                        />
                        <h6>Upload Logo Image</h6>
                      </label>
                    </vs-dropdown-item>
                    <vs-dropdown-item class="remove-thumb-menu">
                      <div
                        @click="onClickRemoveLogo"
                        color="danger"
                        class="text-center"
                      >
                        <h6 style="color: red">Remove</h6>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>

            <!-- 
            @ select  favi-icon part
           -->

            <h5 class="text-left mb-3 mt-3">FavIcon</h5>

            <div
              class="favicon-aspect-ratio "
              :style="{ 'background-image': cssBrandingFavIconUrl }"
            ></div>
            <div>
              Recommended dimensions of
              <strong>32<i class="mdi mdi-close"></i>32</strong>
            </div>
            <div
              class="d-flex mt-2 file-select"
              style="justify-content: flex-start; align-items: center;"
            >
              <!-- select favicon -->
              <div
                class="d-flex align-items-center dropdownbtn-alignment justify-content-center"
              >
                <vs-dropdown vs-trigger-click>
                  <vs-button
                    class="btn-drop"
                    type="border"
                    icon="expand_more"
                    color="#5c6369"
                    >Select Image</vs-button
                  >
                  <vs-dropdown-menu>
                    <vs-dropdown-item>
                      <label class="favicon-select-button">
                        <input
                          type="file"
                          @change="onSelectFavIcon"
                          style="overflow: hidden"
                          class="custom-file-input"
                          accept="image/png, image/jpeg"
                        />
                        <h6>Upload FavIcon</h6>
                      </label>
                    </vs-dropdown-item>
                    <vs-dropdown-item class="remove-thumb-menu">
                      <div
                        @click="onClickRemoveFavIcon"
                        color="danger"
                        class="text-center"
                      >
                        <h6 style="color: red">Remove</h6>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>
            <div
              style="display: flex;justify-content: flex-end;"
              v-if="branding_changed"
            >
              <vs-button
                class="mt-4"
                color="primary"
                @click="saveSiteDetails('branding')"
              >
                save
              </vs-button>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Instructor</h3>
          <div class="mt-2">
            Set the default Instructor information for all Products.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <!-- 
            @ select  instructor image part
           -->

            <h5 class="text-left mb-3 mt-3">Headshot</h5>

            <div
              class="instructor-aspect-ratio "
              :style="{ 'background-image': cssInstructorUrl }"
            ></div>
            <div
              class="d-flex mt-2 file-select"
              style="justify-content: flex-start; align-items: center;"
            >
              <div
                class="d-flex align-items-center dropdownbtn-alignment justify-content-center"
              >
                <vs-dropdown vs-trigger-click>
                  <vs-button
                    class="btn-drop"
                    type="border"
                    icon="expand_more"
                    color="#5c6369"
                    >Select Image</vs-button
                  >
                  <vs-dropdown-menu>
                    <vs-dropdown-item>
                      <label class="instructor-select-button">
                        <input
                          type="file"
                          @change="onSelectInstructorImage"
                          style="overflow: hidden"
                          class="custom-file-input"
                          accept="image/png, image/jpeg"
                        />
                        <h6>Upload Image</h6>
                      </label>
                    </vs-dropdown-item>
                    <vs-dropdown-item class="remove-thumb-menu">
                      <div
                        @click="onClickRemoveInstructorImage"
                        color="danger"
                        class="text-center"
                      >
                        <h6 style="color: red">Remove</h6>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>

            <vs-input
              label="Name"
              placeholder="Instructor Name here..."
              v-model="instructor_name"
              class="w-100 mt-4"
            />
            <vs-input
              label="Title"
              placeholder="Instructor Title here..."
              v-model="instructor_title"
              class="w-100 mt-4"
            />
            <div
              style="display: flex;justify-content: flex-end;"
              v-if="instructor_changed"
            >
              <vs-button
                class="mt-4"
                color="primary"
                @click="saveSiteDetails('instructor')"
              >
                save
              </vs-button>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Page Scripts</h3>
          <div class="mt-2">
            Add custom javascripts to be added to all pages of your site.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-textarea
              label="Header Page Scripts"
              v-model="page_scripts"
              class="w-100 mt-2"
            />
            <div class="mt-2">
              This code will be placed in the &lt;head&gt; section of every
              page.
            </div>
            <div
              style="display: flex;justify-content: flex-end;"
              v-if="page_script_changed"
            >
              <vs-button
                class="mt-4"
                color="primary"
                @click="saveSiteDetails('pagescript')"
              >
                save
              </vs-button>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>SEO and Sharing</h3>
          <div class="mt-2">
            Information about this page for SEO and sharing with social networks
            like Facebook and Twitter
          </div>
          <div class="mt-2">
            It is okay to leave these fields blank, we will fall back to
            reasonable defaults.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-input
              label="Page title"
              placeholder="Page title here..."
              v-model="page_title"
              class="w-100 mt-4"
            />
            <div class="mt-2">
              A clear title without branding or mentioning the domain itself.
              Best between 60 - 70 characters long.
            </div>
            <vs-textarea
              label="Page description"
              v-model="page_description"
              class="w-100 mt-4"
            />
            <div class="mt-0">
              A clear description, at least two sentences long. Best between 150
              - 160 characters long.
            </div>

            <!-- 
            @ select  page image part
           -->

            <h5 class="text-left mb-3 mt-3">Page Image</h5>

            <div
              class="page-aspect-ratio "
              :style="{ 'background-image': cssPageImageUrl }"
            ></div>
            <div
              class="d-flex mt-2 file-select"
              style="justify-content: flex-start; align-items: center;"
            >
              <div
                class="d-flex align-items-center dropdownbtn-alignment justify-content-center"
              >
                <vs-dropdown vs-trigger-click>
                  <vs-button
                    class="btn-drop"
                    type="border"
                    icon="expand_more"
                    color="#5c6369"
                    >Select Image</vs-button
                  >
                  <vs-dropdown-menu>
                    <vs-dropdown-item>
                      <label class="page-select-button">
                        <input
                          type="file"
                          @change="onSelectPageImage"
                          style="overflow: hidden"
                          class="custom-file-input"
                          accept="image/png, image/jpeg"
                        />
                        <h6>Upload Image</h6>
                      </label>
                    </vs-dropdown-item>
                    <vs-dropdown-item class="remove-thumb-menu">
                      <div
                        @click="onClickRemovePageImage"
                        color="danger"
                        class="text-center"
                      >
                        <h6 style="color: red">Remove</h6>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>
            <div
              style="display: flex;justify-content: flex-end;"
              v-if="sharing_changed"
            >
              <vs-button
                class="mt-4"
                color="primary"
                @click="saveSiteDetails('sharing')"
              >
                save
              </vs-button>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "SiteDetails",

  data: () => ({
    site_title: "",
    site_subdomain: "",
    support_email: "",
    support_phone: "",
    language: "",
    homepage: "",
    instructor_name: "",
    instructor_title: "",
    page_scripts: "",
    page_title: "",
    page_description: "",
    homepages: [],
    languages: [
      {
        text: "English",
        value: "EN",
      },
      {
        text: "Italian",
        value: "IT",
      },
      {
        text: "Russian",
        value: "RU",
      },
      {
        text: "Romanian",
        value: "RO",
      },
    ],
    default_currency: "",
    cssBrandingFavIconUrl: "",
    cssBrandingLogoUrl: "",
    branding_logo_file: "",
    branding_favicon_file: "",
    instructor_imagefile: "",
    pageimage_file: "",
    cssPageImageUrl: "",
    cssInstructorUrl: "",
    info_changed: false,
    branding_changed: false,
    instructor_changed: false,
    remove_instructor_image: false,
    remove_logo_image: false,
    remove_favicon_image: false,
    remove_page_image: false,
    sharing_changed: false,
    page_script_changed: false,
  }),

  watch: {
    site_title: function(newValue) {
      if (this.site_details !== null) {
        if (this.site_details.title !== newValue) {
          this.info_changed = true;
        } else {
          this.info_changed = false;
        }
      } else {
        if (newValue !== "") this.info_changed = true;
        else this.info_changed = false;
      }
    },

    site_subdomain: function(newValue) {
      if (this.site_details !== null) {
        if (this.site_details.subdomain !== newValue) {
          this.info_changed = true;
        } else {
          this.info_changed = false;
        }
      } else {
        if (newValue !== "") this.info_changed = true;
        else this.info_changed = false;
      }
    },

    support_email: function(newValue) {
      if (this.site_details !== null) {
        if (this.site_details.support_email !== newValue) {
          this.info_changed = true;
        } else {
          this.info_changed = false;
        }
      } else {
        if (newValue !== "") this.info_changed = true;
        else this.info_changed = false;
      }
    },

    support_phone: function(newValue) {
      if (this.site_details !== null) {
        if (this.site_details.phone_number !== newValue) {
          this.info_changed = true;
        } else {
          this.info_changed = false;
        }
      } else {
        if (newValue !== "") this.info_changed = true;
        else this.info_changed = false;
      }
    },

    language: function(newValue) {
      if (this.site_details !== null) {
        if (this.site_details.language !== newValue) {
          this.info_changed = true;
        } else {
          this.info_changed = false;
        }
      } else {
        if (newValue !== "") this.info_changed = true;
        else this.info_changed = false;
      }
    },

    default_currency: function(newValue) {
      if (this.site_details !== null) {
        if (this.site_details.default_currency !== newValue) {
          this.info_changed = true;
        } else {
          this.info_changed = false;
        }
      } else {
        if (newValue !== "") this.info_changed = true;
        else this.info_changed = false;
      }
    },

    instructor_title: function(newValue) {
      if (this.site_details !== null && this.site_details.instructor !== null) {
        if (this.site_details.instructor.title !== newValue) {
          this.instructor_changed = true;
        } else {
          this.instructor_changed = false;
        }
      } else {
        if (newValue !== "") this.instructor_changed = true;
        else this.instructor_changed = false;
      }
    },

    instructor_name: function(newValue) {
      if (this.site_details !== null && this.site_details.instructor !== null) {
        if (this.site_details.instructor.name !== newValue) {
          this.instructor_changed = true;
        } else {
          this.instructor_changed = false;
        }
      } else {
        if (newValue !== "") this.instructor_changed = true;
        else this.instructor_changed = false;
      }
    },

    page_title: function(newValue) {
      if (
        this.site_details !== null &&
        this.site_details.seo_and_sharing !== null
      ) {
        if (this.site_details.seo_and_sharing.page_title !== newValue) {
          this.sharing_changed = true;
        } else {
          this.sharing_changed = false;
        }
      } else {
        if (newValue !== "") this.sharing_changed = true;
        else this.sharing_changed = false;
      }
    },

    page_description: function(newValue) {
      if (
        this.site_details !== null &&
        this.site_details.seo_and_sharing !== null
      ) {
        if (this.site_details.seo_and_sharing.page_description !== newValue) {
          this.sharing_changed = true;
        } else {
          this.sharing_changed = false;
        }
      } else {
        if (newValue !== "") this.sharing_changed = true;
        else this.sharing_changed = false;
      }
    },

    page_scripts: function(newValue) {
      if (
        this.site_details !== null &&
        this.site_details.page_scripts !== null
      ) {
        if (this.site_details.page_scripts.script !== newValue) {
          this.page_script_changed = true;
        } else {
          this.page_script_changed = false;
        }
      } else {
        if (newValue !== "") this.page_script_changed = true;
        else this.page_script_changed = false;
      }
    },
  },
  /**
   * --------------computed part-------------
   */
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

    site_details: {
      get() {
        return this.$store.getters["siteDetailsManage/site_details"];
      },
    },

    instructorImageUrl: function() {
      if (this.site_details !== null && this.site_details.instructor !== null)
        return "url(" + this.site_details.instructor.headshot + ")";
      else return "";
    },

    pageImageUrl: function() {
      if (
        this.site_details !== null &&
        this.site_details.seo_and_sharing !== null
      )
        return "url(" + this.site_details.seo_and_sharing.page_image + ")";
      else return "";
    },

    brandingLogoUrl: function() {
      if (this.site_details !== null && this.site_details.branding !== null)
        return "url(" + this.site_details.branding.logo + ")";
      else return "";
    },

    brandingFavIconUrl: function() {
      if (this.site_details !== null && this.site_details.branding !== null)
        return "url(" + this.site_details.branding.favicon + ")";
      else return "";
    },
  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", false);
    this.initSiteDetails();
  },

  /**
   * --------------method part-------------
   */
  methods: {
    updateSiteDetailsData() {
      this.site_title = this.site_details.title;
      this.site_subdomain = this.site_details.subdomain;
      this.support_phone = this.site_details.phone_number;
      this.support_email = this.site_details.support_email;
      this.language = this.site_details.language;
      this.default_currency = this.site_details.default_currency;
      if (this.site_details.instructor !== null) {
        this.instructor_name = this.site_details.instructor.name;
        this.instructor_title = this.site_details.instructor.title;
      }
      if (this.site_details.seo_and_sharing !== null) {
        this.page_title = this.site_details.seo_and_sharing.page_title;
        this.page_description = this.site_details.seo_and_sharing.page_description;
      }
      if (this.site_details.page_scripts !== null) {
        this.page_scripts = this.site_details.page_scripts.script;
      }
      this.cssInstructorUrl = this.instructorImageUrl;
      this.cssPageImageUrl = this.pageImageUrl;
      this.cssBrandingLogoUrl = this.brandingLogoUrl;
      this.cssBrandingFavIconUrl = this.brandingFavIconUrl;
    },
    /**
     * --------------init site details-------------
     */
    initSiteDetails() {
      this.$store
        .dispatch("siteDetailsManage/getSiteDetails")
        .then(() => {
          this.updateSiteDetailsData();
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    /**
     * --------------save site details-------------
     */
    saveSiteDetails(saveItem) {
      let site_info = {
        title: this.site_title,
        subdomain: this.site_subdomain,
        support_email: this.support_email,
        phone_number: this.support_phone,
        language: this.language,
        default_currency: this.default_currency,
      };
      if (this.cssInstructorUrl == "") this.instructor_imagefile = null;

      let instructor = {
        name: this.instructor_name,
        title: this.instructor_title,
        headshot: this.instructor_imagefile,
      };

      let branding = {
        logo: this.branding_logo_file,
        favicon: this.branding_favicon_file,
      };

      if (this.cssPageImageUrl == "") this.pageimage_file = null;

      let seo_and_sharing = {
        page_title: this.page_title,
        page_description: this.page_description,
        page_image: this.pageimage_file,
      };

      let script = {
        script: this.page_scripts,
      };

      if (saveItem == "info") {
        this.$store
          .dispatch("siteDetailsManage/setupSiteDetailsInfo", site_info)
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.info_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      if (saveItem == "branding") {
        this.$store
          .dispatch("siteDetailsManage/setupBranding", branding)
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.branding_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });

        if (this.remove_logo_image) {
          this.$store
            .dispatch("siteDetailsManage/removeBrandingImage", "logo")
            .then(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.remove_logo_image = false;
            })
            .catch(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.remove_logo_image = false;
            });
        }
        if (this.remove_favicon_image) {
          this.$store
            .dispatch("siteDetailsManage/removeBrandingImage", "favicon")
            .then(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.remove_favicon_image = false;
            })
            .catch(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.remove_favicon_image = false;
            });
        }
      }

      if (saveItem == "instructor") {
        this.$store
          .dispatch("siteDetailsManage/setupDefaultInstructor", instructor)
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.instructor_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
        if (this.remove_instructor_image) {
          this.$store
            .dispatch("siteDetailsManage/removeInstructorImage")
            .then(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.remove_instructor_image = false;
            })
            .catch(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.remove_instructor_image = false;
            });
        }
      }

      if (saveItem === "pagescript") {
        this.$store
          .dispatch("siteDetailsManage/setupPageScript", script)
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.page_script_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      if (saveItem == "sharing") {
        this.$store
          .dispatch("siteDetailsManage/setupSeoAndSharing", seo_and_sharing)
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.sharing_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });

        if (this.remove_page_image) {
          this.$store
            .dispatch("siteDetailsManage/removePageImage")
            .then(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.remove_page_image = false;
            })
            .catch(() => {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.remove_page_image = false;
            });
        }
      }
    },

    /**
     * --------------remove image-------------
     */

    onClickRemoveLogo() {
      this.cssBrandingLogoUrl = "";
      this.remove_logo_image = true;
      this.branding_changed = true;
      this.branding_logo_file = null;
    },

    /**
     * --------------select logo -------------
     */
    onSelectLogo(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.branding_logo_file = file;
        this.cssBrandingLogoUrl = "url(" + URL.createObjectURL(file) + ")";
        this.branding_changed = true;
      }
    },

    /**
     * --------------select favicon -------------
     */
    onSelectFavIcon(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.branding_favicon_file = file;
        this.cssBrandingFavIconUrl = "url(" + URL.createObjectURL(file) + ")";
        this.branding_changed = true;
      }
    },

    /**
     * --------------remove favicon-------------
     */

    onClickRemoveFavIcon() {
      this.cssBrandingFavIconUrl = "";
      this.remove_favicon_image = true;
      this.branding_changed = true;
      this.branding_favicon_file = null;
    },

    /**
     * --------------select instructor -------------
     */
    onSelectInstructorImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.instructor_imagefile = file;
        this.cssInstructorUrl = "url(" + URL.createObjectURL(file) + ")";
        this.instructor_changed = true;
      }
    },

    /**
     * --------------remove favicon-------------
     */

    onClickRemoveInstructorImage() {
      this.remove_instructor_image = true;
      this.instructor_changed = true;
      this.cssInstructorUrl = "";
      this.instructor_imagefile = null;
    },

    /**
     * --------------select page -------------
     */
    onSelectPageImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.pageimage_file = file;
        this.cssPageImageUrl = "url(" + URL.createObjectURL(file) + ")";
        this.sharing_changed = true;
      }
    },

    /**
     * --------------remove page image-------------
     */

    onClickRemovePageImage() {
      this.cssPageImageUrl = "";
      this.sharing_changed = true;
      this.remove_page_image = true;
      this.pageimage_file = null;
    },

    backToSettings() {
      this.$router.push("/settings");
    },
  },
};
</script>
<style lang="scss">
.logo-aspect-ratio,
.instructor-aspect-ratio,
.page-aspect-ratio,
.favicon-aspect-ratio {
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 5px;
  overflow: hidden;
  height: 0;
  width: 50%;
  padding-top: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.page-aspect-ratio {
  padding-top: 28.1%;
}

.favicon-aspect-ratio {
  width: 10%;
  padding-top: 10%;
}

input[type="file"] {
  display: none;
}
.btn-drop {
  border-radius: 0.3rem !important;
}
.logo-image-select-button,
.favicon-select-button,
.instructor-select-button,
.page-select-button {
  margin-top: 8px;
  display: inline-block;
  padding: 10px 12px;
  height: 38px;
  cursor: pointer;
  border-right: none;
  color: #5c6369;
  background-color: white;
  border-radius: 0.3rem;
  // border-bottom-left-radius: 0.3rem;
}
</style>
