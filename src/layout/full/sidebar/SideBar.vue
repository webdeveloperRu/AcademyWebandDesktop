<template>
  <div id="parentx">
    <vs-sidebar
      default-index="1"
      :parent="parent"
      :hiddenBackground="doNotClose"
      color="primary"
      :class="currentSidebar == 'default' ? 'left-sidebar' : 'custom-sidebar'"
      spacer
      v-model="isSidebarActive"
      :click-not-close="doNotClose"
      :reduce="isSidebarReduced"
    >
      <!-- 
        @@  default side bar
        -->
      <div v-if="currentSidebar == 'default'" :key="updatedSidebar">
        <div class="header-sidebar text-center" slot="header">
          <vs-avatar size="70px" :src="logged_user.data.avatar" />
          <h4>
            {{ logged_user.data.name }}<br />
            <small>{{ logged_user.data.email }}</small>
          </h4>
        </div>

        <div v-bar class="vs-scrollable mt-2">
          <template v-for="(sidebarLink, index) in sidebarLinks">
            <!-- Small Cap -->
            <span
              v-if="sidebarLink.title"
              :key="index + '.' + index"
              class="small-cap"
              >{{ $t(sidebarLink.i18n) || sidebarLink.title }}</span
            >
            <template v-else-if="!sidebarLink.title">
              <!-- Single Menu -->
              <vs-sidebar-item
                :key="sidebarLink.index"
                :icon-pack="sidebarLink.icon"
                :index="sidebarLink.index"
                v-if="!sidebarLink.child"
                :to="sidebarLink.url"
              >
                <span class="hide-in-minisidebar">{{
                  $t(sidebarLink.i18n) || sidebarLink.name
                }}</span>
              </vs-sidebar-item>
              <!-- Dropdown Menu -->
              <template v-else>
                <vs-sidebar-group
                  :title="sidebarLink.name"
                  :key="sidebarLink.index"
                  :icon-pack="sidebarLink.icon"
                  :open="isSubLinkActive(sidebarLink)"
                >
                  <li v-for="subLink in sidebarLink.child" :key="subLink.index">
                    <vs-sidebar-item
                      :icon-pack="subLink.icon"
                      :to="subLink.url"
                      :index="subLink.index"
                    >
                      <span class="hide-in-minisidebar">{{
                        $t(subLink.i18n) || subLink.name
                      }}</span>
                    </vs-sidebar-item>
                  </li>
                </vs-sidebar-group>
                <!-- /Dropdown Menu -->
              </template>
            </template>
          </template>
        </div>
      </div>

      <div v-else-if="currentSidebar == 'checkout'">
        <!-- 
          @@  **********************  Check out sidebar *******************************************
          -->
        <div v-if="current_checkoutmenu == 'home'">
          <!-- save part -->
          <div class="d-flex m-4" style="justify-content: space-between">
            <div class="primary-font" style="padding: 10px">OFFER CHECKOUT</div>
            <div>
              <vs-button @click.native="backToOffers" class="mr-2">
                back
              </vs-button>
              <vs-button @click.native="saveEditCheckout"> save </vs-button>
            </div>
          </div>
          <hr />

          <!-- new check out design part -->
          <div class="m-4">
            <h4 class="primary-font">New Checkout Design</h4>
            <vs-switch
              v-model="new_design"
              color="green"
              class="mt-2 ml-2 design-switch"
            >
              <span slot="on" style="font-size: 11px">ON</span>
              <span slot="off" style="font-size: 11px">OFF</span>
            </vs-switch>
          </div>
          <hr />

          <!-- Offer Details -->
          <div
            class="m-4 d-flex primary-font"
            style="cursor: pointer; align-items: center"
          >
            <vs-icon icon="subject"></vs-icon>
            <h6
              class="checkout-menu ml-2"
              @click="selectCheckoutMenu('offer-details')"
            >
              Offer Details
            </h6>
          </div>
          <hr />

          <!-- Extra contact info -->
          <div
            class="m-4 d-flex primary-font"
            style="cursor: pointer; align-items: center"
          >
            <vs-icon icon="contacts"></vs-icon>
            <h6
              class="checkout-menu ml-2"
              @click="selectCheckoutMenu('extra-contact')"
            >
              Extra Contact Info
            </h6>
          </div>
          <hr />
          <!-- service agreement info -->
          <div
            class="m-4 d-flex primary-font"
            style="cursor: pointer; align-items: center"
          >
            <vs-icon icon="info"></vs-icon>
            <h6
              class="checkout-menu ml-2"
              @click="selectCheckoutMenu('service-agreement')"
            >
              Service Agreement
            </h6>
          </div>
          <hr />
          <!-- Testimonials -->
          <div
            class="m-4 d-flex primary-font"
            style="cursor: pointer; align-items: center"
          >
            <vs-icon icon="forum"></vs-icon>
            <h6
              class="checkout-menu ml-2"
              @click="selectCheckoutMenu('testimonials')"
            >
              Testimonials
            </h6>
          </div>
          <hr />
        </div>

        <!-- 
          @@  **********************  Offer Details Part *******************************************
          -->
        <div v-if="current_checkoutmenu == 'offer-details'">
          <!-- save part -->
          <div
            class="d-flex offer-details-sticky"
            style="justify-content: space-between"
          >
            <div
              class="primary-font ml-4"
              style="padding: 10px; cursor: pointer"
              @click="selectCheckoutMenu('home')"
            >
              <vs-icon icon="keyboard_arrow_left"></vs-icon> Back
            </div>
            <vs-button class="mr-4" @click.native="saveOfferDetails">
              save
            </vs-button>
          </div>
          <div class="m-4">
            <h4>Offer Details</h4>
          </div>
          <hr />
          <div class="m-4">
            <!-- title -->
            <vs-input
              label="Title"
              class="w-100"
              v-model="offer_title"
            ></vs-input>
            <span class="description-font"
              >user a short, descriptive title. Example: "Mastermind 3 pay" or
              "Cardio workout Bundle"</span
            >
            <vs-checkbox
              class="justify-content-start mt-4"
              v-model="banner_enable"
              >Enable Banner</vs-checkbox
            >

            <!-- banner image select part -->
            <label class="primary-font mt-4">Banner Image</label>
            <div
              class="banner-image"
              :style="{
                'background-image': banner_image_url,
                height: banner_height,
              }"
            ></div>
            <label class="bannerimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectBanner"
                style="overflow: hidden"
                class="bannerimage-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>

            <!-- banner image height -->
            <vs-input
              v-model="banner_height"
              label="Banner image height"
              class="mt-4 w-100"
            ></vs-input>

            <!-- video part -->
            <!-- <div class="primary-font mt-4 mb-1">video</div>
              <div class="video-container">
                <video width="100%" height="" controls v-if="video_file != null" :key="loaded_video">
                  <source :src="video_url" type="video/ogg" />
                  <source :src="video_url" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <img style="opacity: 0.1; width: 80px;"  src="@/assets/images/video_icon.svg"  v-if="video_file==null" />
              </div>
              <label class="video-select-button mt-3">
                <input
                  type="file"
                  @change="onSelectVideo"
                  style="overflow: hidden"
                  class="video-input"
                  accept="video/*"
                />
                Add Video
              </label>
              <vs-button color="danger" type="flat" @click.native="removeVideo">remove</vs-button> -->

            <!-- image part -->
            <div class="primary-font mt-4 mb-1">image</div>
            <div
              class="content-image"
              :style="{ 'background-image': thumbnail_image_url }"
            ></div>
            <label class="contentimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectThumbNail"
                style="overflow: hidden"
                class="contentimage-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>
            <vs-button
              color="danger"
              type="flat"
              @click.native="removeContentImage"
              >remove</vs-button
            >

            <!-- logo image part -->
            <div class="primary-font mt-4 mb-1">Logo Image</div>
            <div
              class="logo-image"
              :style="{ 'background-image': logoimage_url }"
            ></div>
            <div class="description-font mt-2 mb-2" style="font-size: 12px">
              Recommended dimensions of
              <b>540<i class="mdi mdi-close"></i>120</b>
            </div>
            <label class="logoimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectLogoImage"
                style="overflow: hidden"
                class="logo-image-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>

            <!-- checkout copy -->
            <div class="primary-font mt-4 mb-1">Checkout Copy</div>
            <VueEditor v-model="checkout_copy"></VueEditor>
          </div>
        </div>

        <!-- 
          @@  **********************  extra contact *******************************************
          -->
        <div v-if="current_checkoutmenu == 'extra-contact'">
          <!-- save part -->
          <div
            class="d-flex offer-details-sticky"
            style="justify-content: space-between"
          >
            <div
              class="primary-font ml-4"
              style="padding: 10px; cursor: pointer"
              @click="selectCheckoutMenu('home')"
            >
              <vs-icon icon="keyboard_arrow_left"></vs-icon> Back
            </div>
            <vs-button class="mr-4" @click.native="saveExtraContactInformation">
              save
            </vs-button>
          </div>
          <div class="m-4">
            <h4>Extra Contact Information</h4>
          </div>
          <hr />
          <div class="m-4">
            <vs-checkbox
              class="justify-content-start mt-4"
              v-model="collect_address"
              >Collect address</vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-4"
              v-model="collect_phone"
              >Collect phone number</vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-4"
              v-model="collect_name_password"
              >Collect name and password</vs-checkbox
            >
            <vs-button
              class="mt-4 w-100 add-custom-field"
              icon="playlist_add"
              size="large"
              type="border"
            >
              Add a custom filed
            </vs-button>
          </div>
        </div>

        <!-- 
          @@  **********************  service agreement *******************************************
          -->
        <div v-if="current_checkoutmenu == 'service-agreement'">
          <!-- save part -->
          <div
            class="d-flex offer-details-sticky"
            style="justify-content: space-between"
          >
            <div
              class="primary-font ml-4"
              style="padding: 10px; cursor: pointer"
              @click="selectCheckoutMenu('home')"
            >
              <vs-icon icon="keyboard_arrow_left"></vs-icon> Back
            </div>
            <vs-button class="mr-4" @click.native="saveServiceAgreement">
              save
            </vs-button>
          </div>
          <div class="m-4">
            <h4>Service agreement</h4>
          </div>
          <hr />
          <div class="m-4 service-agreement">
            <vs-radio
              v-model="service_agreestatus"
              vs-name="radios1"
              vs-value="not_required"
              >Not Required</vs-radio
            >
            <vs-radio
              v-model="service_agreestatus"
              vs-name="radios1"
              vs-value="required"
              >Required</vs-radio
            >
            <p class="description-font ml-4">
              "I have read read and agree to the terms and conditions of this
              page"
            </p>
            <vs-radio
              v-model="service_agreestatus"
              vs-name="radios1"
              vs-value="custom_agreement"
              >Custom agreement text</vs-radio
            >
            <p class="description-font ml-4">
              "I have read read and agree to the terms and conditions of this
              page as follows"
            </p>
            <VueEditor
              v-model="custom_agreetext"
              v-if="service_agreestatus == 'custom_agreement'"
            ></VueEditor>
          </div>
        </div>

        <!-- 
          @@  **********************  testimonials *******************************************
          -->
        <div v-if="current_checkoutmenu == 'testimonials'">
          <!-- save part -->
          <div
            class="d-flex offer-details-sticky"
            style="justify-content: space-between"
          >
            <div
              class="primary-font ml-4"
              style="padding: 10px; cursor: pointer"
              @click="selectCheckoutMenu('home')"
            >
              <vs-icon icon="keyboard_arrow_left"></vs-icon> Back
            </div>
            <vs-button class="mr-4"> save </vs-button>
          </div>
          <div class="m-4">
            <h4>Testimonials</h4>
          </div>
          <hr />
          <div class="m-4">
            <vs-input
              label="Testimonial title"
              class="w-100"
              v-model="testimonial_title"
            ></vs-input>
            <vs-button
              class="mt-4 w-100 add-custom-field"
              icon="playlist_add"
              size="large"
              type="border"
              @click.native="linkToNewTestmonial"
            >
              Add Testimonial
            </vs-button>
          </div>
        </div>
      </div>
      <!-- --------------------product customize sidebar part --------------------------------- -->
      <div v-else>
        <!-- header part -->
        <div class="product-sidebar-head primary-font">
          <div
            class="d-flex"
            style="justify-content: space-between; align-items: center"
          >
            <div
              class="product-sidebar-backbutton"
              @click="linkBackInProductSidebar"
            >
              <i class="ti-angle-left"></i>
              <span class="ml-1" v-if="currentProductCustomizeMenu != 'home'"
                >Back</span
              >
              <span class="ml-1" v-else>Products</span>
            </div>
            <div class="process-customization-form">
              <div
                class="processing-customization-indicator vs-con-loading__container loading"
                ref="loading"
                id="loading"
              ></div>
              <div v-if="customization_processing">
                <vs-button
                  color="primary"
                  disabled
                  type="filled"
                  @click.native="saveProductCustomizeChange"
                  >Saving...</vs-button
                >
              </div>
              <div v-else>
                <vs-button
                  color="primary"
                  type="filled"
                  @click.native="saveProductCustomizeChange"
                  >Save</vs-button
                >
              </div>
            </div>
          </div>
          <div
            class="product-title-head mt-2"
            v-if="currentProductCustomizeMenu == 'home'"
          >
            <span>{{ current_product.title }}</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
        </div>
        <!-- 
          @@@ ------------------ product customize side bar body part---------------------
         -->
        <div
          class="product-sidebar-body"
          v-if="currentProductCustomizeMenu == 'home'"
        >
          <div class="product-section-tabs">
            <div
              class="product-section-tab"
              @click="selectCustomizeTab('sections')"
              v-bind:class="currentCustomizeTab == 'sections' ? 'active' : ''"
            >
              Sections
            </div>
            <div
              class="product-section-tab"
              @click="selectCustomizeTab('settings')"
              v-bind:class="currentCustomizeTab == 'settings' ? 'active' : ''"
            >
              Settings
            </div>
          </div>
          <div v-if="currentCustomizeTab == 'sections'">
            <div class="product-section-item">
              <i
                class="mdi mdi-page-layout-header product-section-item-icon primary-font"
              ></i>
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('header')"
                >Header</span
              >
            </div>
            <!-- <div class="product-section-item">
              <i class="ti-search product-section-item-icon primary-font"></i>
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('search')"
                >Search Bar</span
              >
            </div> -->
            <div class="product-section-item">
              <i
                class="mdi mdi-image product-section-item-icon primary-font"
              ></i>
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('hero')"
                >Hero</span
              >
            </div>
            <div class="product-section-item">
              <i
                class="mdi mdi-buffer product-section-item-icon primary-font"
              ></i>
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('welcome')"
                >Welcome Body</span
              >
            </div>
            <div class="product-section-item">
              <i
                class="mdi mdi-format-list-numbers product-section-item-icon primary-font"
              ></i>
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('product-syllabus')"
              >
                Product Syllabus</span
              >
            </div>
            <div class="product-section-item">
              <i
                class="mdi mdi-page-layout-sidebar-right product-section-item-icon primary-font"
              ></i>
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('sidebar')"
              >
                Product Sidebar</span
              >
            </div>
            <div class="product-section-item">
              <i
                class="mdi mdi-page-layout-footer product-section-item-icon primary-font"
              ></i>
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('footer')"
              >
                Footer</span
              >
            </div>
          </div>

          <div v-if="currentCustomizeTab == 'settings'">
            <div class="product-section-item">
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('favicon')"
                >Favicon</span
              >
            </div>
            <div class="product-section-item">
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('typography')"
                >Typography</span
              >
            </div>
            <div class="product-section-item">
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('color-scheme')"
                >Color Scheme</span
              >
            </div>
            <div class="product-section-item">
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('message-color')"
                >Message Colors</span
              >
            </div>
            <div class="product-section-item">
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('general-appearance')"
                >General Appearance</span
              >
            </div>
          </div>
        </div>
        <!-- --------------------------------header menu body part -------------------------------------------->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'header'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Header</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="show-header-option">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_header"
              ><span class="ml-3">Show Header</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menu-section">
            <span>Logo</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Logo Type</div>
            <vs-radio
              v-model="header_logo_type"
              vs-name="logo-type"
              vs-value="text"
              >Text</vs-radio
            >
            <vs-radio
              v-model="header_logo_type"
              vs-name="logo-type"
              vs-value="image"
              >Image</vs-radio
            >
          </div>
          <!-- <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Logo Action</div>
            <vs-radio
              v-model="product_logo_action"
              vs-name="logo-action"
              vs-value="Site"
              >Site Home</vs-radio
            >
            <vs-radio
              v-model="product_logo_action"
              vs-name="logo-action"
              vs-value="Product"
              >Product Home</vs-radio
            >
          </div> -->
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Logo Text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="header_logo_text"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Logo Image</div>
            <div
              class="logo-image"
              :style="{
                'background-image': convertBackgroundCssImageUrl(
                  header_logo_image_url
                ),
              }"
            ></div>
            <label class="logoimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectProductLogoImage"
                style="overflow: hidden"
                class="bannerimage-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Custom Logo Height</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="header_logo_height"
            />
          </div>
          <div
            class="product-sidebar-menu-section mt-3"
            style="border-top: solid 1px #dddddd"
          >
            <span>Menu</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="header_show_menu"
              ><span class="ml-3">Show Menu</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Logout Text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="header_menu_logouttext"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Settings Text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="header_menu_settingstext"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Library Text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="header_menu_librarytext"
            />
          </div>

          <div
            class="product-sidebar-menu-section mt-3"
            style="border-top: solid 1px #dddddd"
          >
            <span>Optional Announcement</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="header_show_announcement"
              ><span class="ml-3">Show Announcement</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Announcement text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="header_announcement_text"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Announcement link URL</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="header_announcement_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="announcement_new_window"
              ><span class="ml-3">Open In New Window </span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="header_announcement_color">
              </verte>
              <span class="ml-3">Announcement Color</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="header_announcement_textcolor">
              </verte>
              <span class="ml-3">Announcement Text Color</span>
            </div>
          </div>
          <div style="height: 50px"></div>
        </div>
        <!-- ---------------------------------------------------hero menu body part --------------------------------------  -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'hero'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Hero</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="show-header-option">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_hero"
              ><span class="ml-3">Show Hero</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menu-section">
            <span>Section Appearance</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Background Image</div>
            <div
              class="logo-image"
              :style="{
                'background-image': convertBackgroundCssImageUrl(
                  hero_background_image_url
                ),
              }"
            ></div>
            <label class="logoimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectProductAppearanceImage"
                style="overflow: hidden"
                class="bannerimage-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="product_hero_textcolor"> </verte>
              <span class="ml-3">Text Color</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="product_hero_overlaycolor">
              </verte>
              <span class="ml-3">Overlay Color</span>
            </div>
          </div>
          <!-- <verte  picker="square"   > </verte> -->
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Spacing</div>
            <vs-select class="w-100 mt-3" v-model="hero_appearance_spacing">
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in hero_appearance_spacings"
              />
            </vs-select>
          </div>

          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Alignment</div>
            <vs-radio
              v-model="hero_appearance_textalign"
              vs-name="appearance-algin"
              vs-value="Left"
              >Left</vs-radio
            >
            <vs-radio
              v-model="hero_appearance_textalign"
              vs-name="appearance-algin"
              vs-value="Centered"
              >Centered</vs-radio
            >
            <vs-radio
              v-model="hero_appearance_textalign"
              vs-name="appearance-algin"
              vs-value="Right"
              >Right</vs-radio
            >
          </div>

          <!-- <div class="product-sidebar-submenu mt-3">
            <i
              class="mdi mdi-information-outline product-section-item-icon primary-font"
            ></i>
            <span
              class="product-section-item-title"
              @click="selectProductCustomizeMenu('product-info')"
              >Product Info</span
            >
          </div>
          <div class="product-sidebar-submenu">
            <i
              class="mdi mdi-buffer product-section-item-icon primary-font"
            ></i>
            <span
              class="product-section-item-title"
              @click="selectProductCustomizeMenu('start-button')"
              >Start Button</span
            >
          </div> -->

          <div style="height: 50px"></div>
        </div>
        <!-- --------------------------------- welcome body menu part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'welcome'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Welcome Body</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="show-header-option">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_wellcomebody"
              ><span class="ml-3">Show Welcome Body</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Text Alignment</div>
            <vs-radio
              v-model="product_welcome_textalign"
              vs-name="welcome-text-algin"
              vs-value="Left"
              >Left</vs-radio
            >
            <vs-radio
              v-model="product_welcome_textalign"
              vs-name="welcome-text-algin"
              vs-value="Centered"
              >Centered</vs-radio
            >
            <vs-radio
              v-model="product_welcome_textalign"
              vs-name="welcome-text-algin"
              vs-value="Right"
              >Right</vs-radio
            >
          </div>
          <!-- <div class="product-sidebar-submenu mt-3">
            <i
              class="mdi mdi-play-box-outline product-section-item-icon primary-font"
            ></i>
            <span
              class="product-section-item-title"
              @click="selectProductCustomizeMenu('video')"
              >Video</span
            >
          </div>
          <div class="product-sidebar-submenu">
            <i
              class="mdi mdi-information-outline product-section-item-icon primary-font"
            ></i>
            <span
              class="product-section-item-title"
              @click="selectProductCustomizeMenu('welcome-product-info')"
              >Product Info</span
            >
          </div> -->
          <div style="height: 50px"></div>
        </div>
        <!-- --------------------------------- product syllabus body part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'product-syllabus'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Product Syllabus</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_syllabus"
              ><span class="ml-2">Show Syllabus</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Syllabust Type</div>
            <vs-radio
              v-model="product_syllabus_type"
              vs-name="welcome-text-algin"
              vs-value="Categories"
              >Categories</vs-radio
            >
            <vs-radio
              v-model="product_syllabus_type"
              vs-name="welcome-text-algin"
              vs-value="Posts"
              >Posts</vs-radio
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Truncate At</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="product_syllabus_truncate"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Categories Text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="product_syllabus_categoriestext"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Comming Soon Text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="product_syllabus_comingsoontext"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Show More Text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="product_syllabus_showmoretext"
            />
          </div>
          <div style="height: 50px"></div>
        </div>
        <!-- --------------------------------- product sidebar body part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'sidebar'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Product Sidebar</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_sidebar"
              ><span class="ml-2">Show Sidebar</span></vs-checkbox
            >
          </div>
          <!-- <div class="product-sidebar-submenu mt-3">
            <i
              class="mdi mdi-chart-pie product-section-item-icon primary-font"
            ></i>
            <span
              class="product-section-item-title"
              @click="selectProductCustomizeMenu('course-progress')"
              >Course Progress</span
            >
          </div>
          <div class="product-sidebar-submenu ">
            <i
              class="mdi mdi-account product-section-item-icon primary-font"
            ></i>
            <span
              class="product-section-item-title"
              @click="selectProductCustomizeMenu('instructor')"
              >Instructor</span
            >
          </div> -->
          <!-- <div style="height:50px"></div> -->
        </div>

        <!-- --------------------------------- instructor body part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'instructor'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Instructor</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Heading</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="product_instructor_heading"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_sidebar"
              ><span class="ml-2">Show Sidebar</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Headshot</div>
            <div
              class="logo-image"
              :style="{
                'background-image': instructor_headshot_image_url,
              }"
            ></div>
            <label class="logoimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectInstructorHeadshotImage"
                style="overflow: hidden"
                class="bannerimage-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Name</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="instructor_name"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Title</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="instructor_title"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Bio</div>
            <textarea
              class="instructor-bio"
              v-model="instructor_bio"
            ></textarea>
          </div>
          <div style="height: 50px"></div>
        </div>

        <!-- --------------------------------- course progress body part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'course-progress'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Course Progress</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_image"
              ><span class="ml-2">Show Product image</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Completed Text</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="course_completed_text"
            />
          </div>

          <div style="height: 50px"></div>
        </div>
        <!-- --------------------------------- footer body part --------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'footer'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Footer</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_footer"
              ><span class="ml-2">Show Footer</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_footercopyright"
              ><span class="ml-2">Show Copyright</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Copyright</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_copyright_text"
            />
          </div>
          <div
            class="product-sidebar-menu-section mt-3"
            style="border-top: solid 1px #dddddd"
          >
            <span>Logo</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="show_footer_logo"
              ><span class="ml-2">Show Logo</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <label class="primary-font mt-4">Logo Image</label>
            <div
              class="banner-image"
              :style="{
                'background-image': convertBackgroundCssImageUrl(
                  footer_logo_image_url
                ),
              }"
            ></div>
            <label class="bannerimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectFooterLogo"
                style="overflow: hidden"
                class="bannerimage-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>
          </div>
          <div
            class="product-sidebar-menu-section mt-3"
            style="border-top: solid 1px #dddddd"
          >
            <span>Menu</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_footermenu"
              ><span class="ml-2">Show Menu</span></vs-checkbox
            >
          </div>
          <div
            class="product-sidebar-menu-section mt-3"
            style="border-top: solid 1px #dddddd"
          >
            <span>Section Appearance</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte
                picker="square"
                v-model="footer_appearance_backgroundcolor"
              >
              </verte>
              <span class="ml-3">Background Color</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="footer_appearance_textcolor">
              </verte>
              <span class="ml-3">Text Color</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Alginment</div>
            <vs-radio
              v-model="footer_appearance_alignment"
              vs-name="footer_appearance_alignment"
              vs-value="Inline"
              >Inline</vs-radio
            >
            <vs-radio
              v-model="footer_appearance_alignment"
              vs-name="footer_appearance_alignment"
              vs-value="Stacked"
              >Stacked</vs-radio
            >
          </div>
          <div
            class="product-sidebar-menu-section mt-3"
            style="border-top: solid 1px #dddddd"
          >
            <span>Social Icons</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="show_social_icons"
              ><span class="ml-2">Show Social Icons</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="social_new_window"
              ><span class="ml-2">Open Links in New Window</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Social Icon Background Style</div>
            <vs-select
              class="w-100 mt-3"
              v-model="social_icon_background_style"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in social_icon_background_styles"
              />
            </vs-select>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Social Icon Alignment</div>
            <vs-select class="w-100 mt-3" v-model="social_icon_alignment">
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in social_icon_alignments"
              />
            </vs-select>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="social_icon_color"> </verte>
              <span class="ml-3">Social Icon Color</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="social_icon_background_color">
              </verte>
              <span class="ml-3">Social Icon Background Color</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Facebook</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_facebook_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Twitter</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_twitter_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Instagram</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_instagram_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">YouTube</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_youtoube_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Vimeo</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_vimeo_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Github</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_github_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">iTunes</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_itunes_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">LinkedIn</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_linkedin_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Soundcloud</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_soundcloud_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Tumblr</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_tumblr_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Slack</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_slack_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Flickr</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_flickr_url"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Dribble</div>
            <vs-input
              class="inputx"
              style="width: 100%"
              v-model="footer_dribble_url"
            />
          </div>
          <div style="height: 50px"></div>
        </div>
        <!-- --------------------------------- favicon body menu part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'favicon'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Favicon</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Favicon Image</div>
            <div
              class="logo-image"
              :style="{
                'background-image': convertBackgroundCssImageUrl(
                  product_favicon_url
                ),
              }"
            ></div>
            <label class="logoimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectProductFaviconImage"
                style="overflow: hidden"
                class="bannerimage-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>
          </div>
        </div>
        <!-- --------------------------------- typography body menu part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'typography'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Typography</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_darkfont_color"> </verte>
              <span class="ml-3">Dark Font Color</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_lightfont_color">
              </verte>
              <span class="ml-3">Light Font Color</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Base Font Family</div>
            <vs-select
              class="w-100 mt-3"
              v-model="base_font_family"
              v-bind:style="{
                'font-family': base_font_family,
              }"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in font_family"
                v-bind:style="{
                  'font-family': item.value,
                }"
              />
            </vs-select>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Heading Font Family</div>
            <vs-select
              class="w-100 mt-3"
              v-model="heading_font_family"
              v-bind:style="{
                'font-family': heading_font_family,
              }"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in font_family"
                v-bind:style="{
                  'font-family': item.value,
                }"
              />
            </vs-select>
          </div>
        </div>
        <!-- --------------------------------- color scheme body menu part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'color-scheme'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Color Scheme</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_cs_primary"> </verte>
              <span class="ml-3">Primary</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_cs_offset"> </verte>
              <span class="ml-3">Offset</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_cs_dark"> </verte>
              <span class="ml-3">Dark</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_cs_darker"> </verte>
              <span class="ml-3">Darker</span>
            </div>
          </div>
        </div>
        <!-- ---------------------------------message color body menu part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'message-color'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">Message Colors</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_mc_success"> </verte>
              <span class="ml-3">Success</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_mc_info"> </verte>
              <span class="ml-3">Info</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_mc_warning"> </verte>
              <span class="ml-3">Warning</span>
            </div>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_mc_danger"> </verte>
              <span class="ml-3">Danger</span>
            </div>
          </div>
        </div>
        <!-- ---------------------------------General Appearance color body menu part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'general-appearance'"
        >
          <div class="product-sidebar-menu-section">
            <span class="mr-2">General Appearance</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor: pointer"
            ></i>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="d-flex" style="align-items: center">
              <verte picker="square" v-model="settings_ga_background_color">
              </verte>
              <span class="ml-3">Background</span>
            </div>
          </div>

          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Page Background Image</div>
            <div
              class="logo-image"
              :style="{
                'background-image': convertBackgroundCssImageUrl(
                  page_background_image_url
                ),
              }"
            ></div>
            <label class="logoimage-select-button mt-3">
              <input
                type="file"
                @change="onSelectPageBackgroundImage"
                style="overflow: hidden"
                class="bannerimage-input"
                accept="image/png, image/jpeg"
              />
              Pick File
            </label>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Alginment</div>
            <vs-radio
              v-model="settings_ga_vertical_align"
              vs-name="settings_ga_vertical_align"
              vs-value="Top"
              >Top</vs-radio
            >
            <vs-radio
              v-model="settings_ga_vertical_align"
              vs-name="settings_ga_vertical_align"
              vs-value="Middle"
              >Middle</vs-radio
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Alginment</div>
            <vs-radio
              v-model="settings_ga_body_colwidth"
              vs-name="settings_ga_body_colwidth"
              vs-value="Auto"
              >Auto</vs-radio
            >
            <vs-radio
              v-model="settings_ga_body_colwidth"
              vs-name="settings_ga_body_colwidth"
              vs-value="Small"
              >Small</vs-radio
            >
          </div>
        </div>
      </div>

      <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="flat" to="/login"
          ><span class="hide-in-minisidebar">log out</span></vs-button
        >
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import { VueEditor } from "vue2-editor";
import font_settins from "../../../models/font_family";

// import { ImageDrop } from "quill-clipboard-module";

export default {
  name: "SideBar",
  components: {
    VueEditor,
  },
  props: {
    parent: {
      type: String,
    },
    sidebarLinks: {
      type: Array,
      required: true,
    },
    subLink: {
      type: Object,
    },
    index: {
      default: null,
      type: [String, Number],
    },
    logged_user: Object,
  },
  data: () => ({
    doNotClose: false,
    windowWidth: window.innerWidth,
    round: true,
    updatedSidebar: 0,
    new_design: true,
    selected_menu: 0,
    banner_enable: false,
    banner_file: null,
    banner_height: 150,
    banner_image_url: "",
    updated_banner: false,
    video_url: "",
    video_file: null,
    changedVideo: false,
    loaded_video: 0,
    thumbnail_image_url: "",
    thumbnail_image_file: null,
    updated_thumbnail: false,
    logoimage_url: "",
    logoimage_file: null,
    updated_logoimage: false,
    offer_title: "",
    collect_address: false,
    collect_phone: false,
    collect_name_password: false,
    service_agreestatus: "not_required",
    custom_agreetext: "",
    testimonial_title: "",
    checkout_copy: "",

    // product customize sidebar variables
    currentCustomizeTab: "sections",
    product_show_header: true,
    header_logo_type: "image",
    product_logo_action: "Site",
    header_logo_text: "Student App",
    header_logo_image_url: "",
    header_logo_file: null,
    header_logo_height: "",
    product_show_hero: true,
    hero_background_image_url: "",
    hero_background_image_file: null,
    hero_appearance_textalign: "Centered",
    hero_appearance_spacing: "",
    previous_sidebar_menu: "home",
    current_sidebar_menu: "home",
    product_show_wellcomebody: false,
    product_welcome_textalign: "Centered",
    hero_appearance_spacings: [
      { text: "Extra Small", value: 0 },
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 },
    ],
    product_syllabus_type: "Categories",
    product_show_syllabus: true,
    product_syllabus_truncate: "",
    product_syllabus_categoriestext: "Categories",
    product_syllabus_comingsoontext: "Coming Soon",
    product_syllabus_showmoretext: "Show More",
    product_show_sidebar: true,
    product_instructor_heading: "Instructor",
    instructor_headshot_image_url: "",
    instructor_headshot_file: null,
    instructor_name: "John Doe",
    instructor_title: "Instructor",
    instructor_bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed sapien quam. Sed dapibus est id enim facilisis, at posuere turpis adipiscing. Quisque sit amet dui dui.",
    product_show_image: true,
    course_completed_text: "Lesssons Completed",
    header_announcement_text: "Announcement",
    header_show_announcement: false,
    header_announcement_url: "",
    header_announcement_textcolor: "",
    header_announcement_color: "",
    announcement_new_window: false,
    header_show_menu: true,
    header_menu_id: null,
    header_menu_logouttext: "Logout",
    header_menu_settingstext: "Settings",
    header_menu_librarytext: "My Library",
    product_hero_overlaycolor: "",
    product_hero_textcolor: "",
    product_show_footer: true,
    product_show_footercopyright: true,
    footer_copyright_text: "",
    show_footer_logo: false,
    footer_logo_image_url: "",
    footer_logo_file: null,
    product_show_footermenu: false,
    footer_appearance_backgroundcolor: "",
    footer_appearance_textcolor: "",
    show_social_icons: false,
    social_new_window: false,
    social_icon_background_styles: [
      { text: "Round", value: 0 },
      { text: "Square", value: 1 },
      { text: "None", value: 2 },
    ],
    social_icon_background_style: "",
    social_icon_alignments: [
      { text: "Left", value: 0 },
      { text: "Center", value: 1 },
      { text: "Right", value: 2 },
    ],
    social_icon_alignment: "",
    social_icon_color: "#ffffff",
    social_icon_background_color: "#ffffff",
    footer_facebook_url: "",
    footer_twitter_url: "",
    footer_instagram_url: "",
    footer_youtoube_url: "",
    footer_vimeo_url: "",
    footer_github_url: "",
    footer_itunes_url: "",
    footer_linkedin_url: "",
    footer_soundcloud_url: "",
    footer_yelp_url: "",
    footer_tumblr_url: "",
    footer_slack_url: "",
    footer_flickr_url: "",
    footer_dribble_url: "",
    footer_appearance_alignment: "Inline",
    product_favicon_url: "",
    product_favicon_file: null,
    settings_darkfont_color: "",
    settings_lightfont_color: "",
    settings_cs_primary: "",
    settings_cs_offset: "",
    settings_cs_dark: "",
    settings_cs_darker: "",
    settings_mc_success: "",
    settings_mc_info: "",
    settings_mc_warning: "",
    settings_mc_danger: "",
    settings_ga_background_color: "",
    settings_ga_vertical_align: "",
    settings_ga_body_colwidth: "",
    customization_processing: false,
    page_background_image_url: "",
    page_background_file: null,
    heading_font_family: "",
    base_font_family: "",
    font_family: font_settins.font_family,
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
      set(newValue) {
        this.$store.dispatch[("productManage/setCurrentProduct", newValue)];
      },
    },
    product_id: function () {
      return this.$store.getters["customize_product_id"];
    },

    offer_id: function () {
      let id = "";
      if (this.$route.params.offer_id !== undefined) {
        id = this.$route.params.offer_id;
        return id.slice(0, id.length);
      } else return "";
    },

    testimonials: {
      get() {
        return this.$store.state.offerManage.testimonials;
      },
    },

    service_agreement: {
      get() {
        return this.$store.state.offerManage.service_agreement;
      },
    },
    extra_contact_info: {
      get() {
        return this.$store.state.offerManage.extra_contact_information;
      },
    },

    banner: {
      get() {
        return this.$store.state.offerManage.banner;
      },
    },

    selected_offer: function () {
      let offer = [];
      offer = this.$store.state.offerManage.current_offer;
      if (offer == undefined) return [];
      else return offer;
    },
    // check out status
    currentSidebar: function () {
      return this.$store.state.currentSidebar;
    },
    // current checkout menu
    current_checkoutmenu: function () {
      return this.$store.state.current_checkoutmenu;
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
    getActive: function getActive() {
      return this.$destroy();
    },
    //This is for mini sidebar
    reduceSidebar() {
      return Boolean(this.isSidebarReduced);
    },
    isSidebarReduced: {
      get() {
        return this.$store.state.isSidebarReduced;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_SIDEBAR", val);
      },
    },
    //This is for active group link
    isSubLinkActive() {
      return (sidebarLink) => {
        let open = false;
        if (sidebarLink.child) {
          sidebarLink.child.forEach((link) => {
            if (this.$route.fullPath == link.url) {
              open = true;
            }
          });
        }
        return open;
      };
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
      set(value) {
        this.$store.commit("prodCustomizeManage/updateProdHeader", value);
      },
    },

    prod_hero: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_hero"];
      },
      set(value) {
        this.$store.commit("prodCustomizeManage/updateProdHero", value);
      },
    },
    prod_footer: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_footer"];
      },
      set(value) {
        this.$store.commit("prodCustomizeManage/updateProdFooter", value);
      },
    },
    prod_sidebar: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_sidebar"];
      },
      set(value) {
        this.$store.commit("prodCustomizeManage/updateProdSidebar", value);
      },
    },
    prod_settings: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_settings"];
      },
      set(value) {
        this.$store.commit("prodCustomizeManage/updateProdSettings", value);
      },
    },
    prod_welcome: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_welcome"];
      },
      set(value) {
        this.$store.commit("prodCustomizeManage/updateProdWelcome", value);
      },
    },
    prod_syllabus: {
      get() {
        return this.$store.getters["prodCustomizeManage/prod_syllabus"];
      },
    },
  },

  watch: {
    current_checkoutmenu: function () {
      this.initOfferCheckoutData();
    },
    new_design: function (newValue) {
      this.$store.dispatch("offerManage/setNewDesign", newValue);
    },
    currentSidebar: function (newValue) {
      if (newValue == "product-customize") {
        this.initProductCustomizeData();
      }
    },
    product_show_hero: function (newValue) {
      this.prod_hero.show_hero = newValue;
    },
    hero_appearance_textalign: function (newValue) {
      this.prod_hero.alignment = newValue;
    },
    hero_appearance_spacing: function (newValue) {
      switch (newValue) {
        case 1:
          this.prod_hero.spacing = "Small";
          break;
        case 2:
          this.prod_hero.spacing = "Medium";
          break;
        case 3:
          this.prod_hero.spacing = "Large";
          break;
        case 0:
          this.prod_hero.spacing = "Extra Small";
          break;
      }
    },
    product_hero_textcolor: function (newValue) {
      this.prod_hero.text_color = newValue;
    },

    product_hero_overlaycolor: function (newValue) {
      this.prod_hero.overlay_color = newValue;
    },

    product_show_wellcomebody: function (newValue) {
      this.prod_welcome.show_welcome = newValue;
    },

    product_welcome_textalign: function (newValue) {
      this.prod_welcome.text_alignment = newValue;
    },

    product_show_sidebar: function (newValue) {
      this.prod_sidebar.show_sidebar = newValue;
    },

    product_show_footer: function (newValue) {
      this.prod_footer.show_footer = newValue;
    },
    product_show_footercopyright: function (newValue) {
      this.prod_footer.show_copyright = newValue;
    },
    footer_copyright_text: function (newValue) {
      this.prod_footer.copyright_text = newValue;
    },
    footer_appearance_backgroundcolor: function (newValue) {
      this.prod_footer.background_color = newValue;
    },
    footer_appearance_textcolor: function (newValue) {
      this.prod_footer.text_color = newValue;
    },

    social_icon_color: function (newValue) {
      this.prod_footer.social_icon_color = newValue;
    },
    social_icon_background_color: function (newValue) {
      this.prod_footer.social_icon_background_color = newValue;
    },
    social_icon_background_style: function (newValue) {
      switch (newValue) {
        case 0:
          this.prod_footer.social_icon_style = "Round";
          break;
        case 1:
          this.prod_footer.social_icon_style = "Square";
          break;
        case 2:
          this.prod_footer.social_icon_style = "None";
          break;
      }
    },

    social_icon_alignment: function (newValue) {
      switch (newValue) {
        case 0:
          this.prod_footer.social_icon_alignment = "Left";
          break;
        case 1:
          this.prod_footer.social_icon_alignment = "Center";
          break;

        case 2:
          this.prod_footer.social_icon_alignment = "Right";
          break;
      }
    },

    footer_facebook_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_facebook = newValue;
    },

    footer_twitter_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_twitter = newValue;
    },

    footer_instagram_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_instagram = newValue;
    },

    footer_youtoube_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_youtube = newValue;
    },

    footer_vimeo_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_vimeo = newValue;
    },

    footer_github_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_github = newValue;
    },

    footer_itunes_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_itunes = newValue;
    },

    footer_linkedin_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_linkedin = newValue;
    },

    footer_soundcloud_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_soundcloud = newValue;
    },

    footer_yelp_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_yelp = newValue;
    },

    footer_tumblr_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_tumblr = newValue;
    },

    footer_slack_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_slack = newValue;
    },

    footer_flickr_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_flickr = newValue;
    },

    footer_dribble_url: function (newValue) {
      if (this.prod_footer) this.prod_footer.sil_dribbble = newValue;
    },

    show_social_icons: function (newValue) {
      if (this.prod_footer) this.prod_footer.show_social_icons = newValue;
    },

    header_show_announcement: function (newValue) {
      if (this.prod_header) this.prod_header.show_announcement = newValue;
    },

    header_announcement_url: function (newValue) {
      if (this.prod_header) this.prod_header.announcement_url = newValue;
    },

    header_announcement_textcolor: function (newValue) {
      if (this.prod_header) this.prod_header.announcement_text_color = newValue;
    },

    header_announcement_color: function (newValue) {
      if (this.prod_header) this.prod_header.announcement_color = newValue;
    },

    product_show_header: function (newValue) {
      if (this.prod_header) this.prod_header.show_header = newValue;
    },

    header_announcement_text: function (newValue) {
      if (this.prod_header) this.prod_header.announcement_text = newValue;
    },

    header_logo_type: function (newValue) {
      if (this.prod_header) this.prod_header.logo_type = newValue;
    },

    announcement_new_window: function (newValue) {
      if (this.prod_header) this.prod_header.announcement_new_window = newValue;
    },

    header_logo_image_url: function (newValue) {
      this.$store.commit("SET_CUSTOMIZE_HEADER_LOGO", newValue);
    },

    header_logo_height: function (newValue) {
      this.prod_header.custom_logo_height = newValue;
    },

    hero_background_image_url: function (newValue) {
      this.$store.commit("SET_CUSTOMIZE_HERO_BACKGROUND", newValue);
    },

    product_syllabus_showmoretext: function (newValue) {
      this.prod_syllabus.show_more_text = newValue;
    },

    show_footer_logo: function (newValue) {
      this.prod_footer.show_logo = newValue;
    },

    footer_logo_image_url: function (newValue) {
      this.$store.commit("SET_CUSTOMIZE_FOOTER_LOGO", newValue);
    },

    settings_ga_background_color: function (newValue) {
      this.prod_settings.ga_background = newValue;
    },

    page_background_image_url: function (newValue) {
      this.$store.commit("SET_PAGE_BACKGROUND_IMAGE", newValue);
    },

    product_favicon_url: function (newValue) {
      // this.setFavIcon(newValue);
      this.$store.commit("SET_PRODUCT_FAVICON", newValue);
    },

    heading_font_family: function(newValue) {
      this.prod_settings.heading_font_family = newValue
    },

    base_font_family: function(newValue) {
      this.prod_settings.base_font_family = newValue;
    },

    product_show_syllabus: function(newValue) {
      this.prod_syllabus.show_syllabus = newValue;
    },

    settings_darkfont_color: function(newValue) {
      this.prod_settings.dark_font_color = newValue;
    }

  },

  created() {
    this.$store.commit("SET_CUSTOMIZE_HEADER_LOGO", "");
    this.initOfferCheckoutData();
    this.initProductCustomizeData();
  },

  updated() {},

  methods: {
    // setFavIcon(fav_icon) {
    //   const favicon = document.getElementById("favicon");
    //   if(fav_icon == "") {
    //     favicon.href=process.env.BASE_URL + 'icon.png'
    //   }
    //   else{
    //     favicon.href = fav_icon;
    //   }
    // },
    /**
     * init offecr checkout data
     */
    initOfferCheckoutData() {
      if (this.current_checkoutmenu == "testimonials") {
        this.testimonial_title = this.$store.state.offerManage.testimonial_title;
        this.$store
          .dispatch("offerManage/getTestimonial", this.offer_id)
          .then(() => {})
          .catch(() => {
            // this.$vs.notify({
            //   color: this.notification_color,
            //   text: this.notification_text,
            //   icon: this.notification_icon
            // })
          });
      }
      if (this.current_checkoutmenu == "service-agreement") {
        this.$store
          .dispatch("offerManage/getServiceAgreement", this.offer_id)
          .then(() => {
            if (this.service_agreement.status == null) {
              this.service_agreestatus = "not_required";
              this.custom_agreetext = "";
            } else {
              this.service_agreestatus = this.service_agreement.status;
              this.custom_agreetext = this.service_agreement.custom_agreement_text;
            }
          })
          .catch(() => {
            // this.$vs.notify({
            //   color: this.notification_color,
            //   text: this.notification_text,
            //   icon: this.notification_icon
            // })
          });
      }
      if (this.current_checkoutmenu == "extra-contact") {
        this.$store
          .dispatch("offerManage/getExtraContactInformation", this.offer_id)
          .then(() => {
            this.collect_address = this.extra_contact_info.collect_address;
            this.collect_phone = this.extra_contact_info.collect_phone;
            this.collect_name_password = this.extra_contact_info.collect_name_password;
          })
          .catch(() => {
            // this.$vs.notify({
            //   color: this.notification_color,
            //   text: this.notification_text,
            //   icon: this.notification_icon
            // })
          });
      }

      if (this.current_checkoutmenu == "offer-details") {
        this.offer_title = this.selected_offer.name;
        this.banner_enable = this.selected_offer.banner_enable;
        this.banner_height = this.selected_offer.banner_height;
        this.banner_image_url = "url(" + this.selected_offer.banner_img + ")";
        this.thumbnail_image_url = "url(" + this.selected_offer.thumbnail + ")";
        this.checkout_copy = this.selected_offer.description_html;
      }
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1170) {
        this.$store.commit("TOGGLE_SIDEBAR_ACTIVE", false);
        this.doNotClose = false;
        this.$store.dispatch("updateSidebarWidth", "no-sidebar");
      } else {
        this.$store.commit("TOGGLE_SIDEBAR_ACTIVE", true);
        this.doNotClose = true;
        if (this.isSidebarReduced)
          this.$store.dispatch("updateSidebarWidth", "mini");
        else if (this.currentSidebar == "default")
          this.$store.dispatch("updateSidebarWidth", "default");
        else this.$store.dispatch("updateSidebarWidth", "checkout");
      }
    },

    selectCheckoutMenu(menu_option) {
      this.$store.dispatch("setCurrentCheckoutMenu", menu_option);
    },
    /**
     * select banner image
     */
    onSelectBanner(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.banner_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.banner_image_url = "url(" + URL.createObjectURL(file) + ")";
        this.updated_banner = true;
      }
    },
    /**
     * select content image
     */

    onSelectThumbNail(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.thumbnail_image_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.thumbnail_image_url = "url(" + URL.createObjectURL(file) + ")";
        this.changedThumbNail = true;
      }
    },

    /**
     * select video
     */
    onSelectVideo(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.loaded_video++;
        this.video_url = URL.createObjectURL(file);
        this.video_file = file;
        this.changedVideo = true;
      }
    },

    /**
     * @@ Select Logo Image
     */

    onSelectLogoImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.logoimage_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.logoimage_url = "url(" + URL.createObjectURL(file) + ")";
        this.updated_logoimage = true;
      }
    },
    /**
     * @@ remove video
     */
    removeVideo() {},

    /**
     * remove content image
     */

    removeContentImage() {},
    /**
     * Link to Testmonial
     */
    linkToNewTestmonial() {
      this.$store.dispatch(
        "offerManage/setTestimonialTitle",
        this.testimonial_title
      );
      this.$store.dispatch("changeSideBar", false);
      this.$store.dispatch("setCurrentCheckoutMenu", "home");
      this.$store.dispatch("updateSidebarWidth", "default");
      this.$router.push("/offers/new-testimonial/" + this.offer_id);
    },
    async saveOfferDetails() {
      // save banner
      if (this.banner_enable == false) {
        this.banner_enable = "";
      }
      let banner = {
        banner_enable: this.banner_enable,
        banner_height: this.banner_height,
        banner: this.banner_file,
      };
      await this.$store
        .dispatch("offerManage/saveBanner", [this.offer_id, banner])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.banner_height = this.selected_offer.banner_height;
          this.banner_enable = this.selected_offer.banner_enable;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });

      // save htmlbody offer description
      this.selected_offer.title = this.offer_title;
      this.selected_offer.description = this.checkout_copy;
      if (this.selected_offer.title === "") {
        this.$vs.notify({
          color: this.$custom_warning,
          text: "Offer title must be filled",
          icon: "warning",
        });
      } else {
        this.$store
          .dispatch("offerManage/updateOfferByID", this.selected_offer)
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            if (this.status_got != true) {
              this.$store
                .dispatch("offerManage/getOfferByID", this.offer_id)
                .then(() => {});
            }
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // save thumbnail part
      if (this.changedThumbNail) {
        this.saveThumbNail(this.thumbnail_image_file);
      }

      this.$store.dispatch("setCurrentCheckoutMenu", "home");
    },
    /**
     * save ThumbNail
     **/
    saveThumbNail(thumbFile) {
      this.$store
        .dispatch("offerManage/saveThumbNail", [this.offer_id, thumbFile])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.changedThumbNail = false;
          this.$store
            .dispatch("offerManage/getOfferByID", this.offer_id)
            .then(() => {});
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
     * remove ThumbNail
     **/
    removeThumbNail() {
      this.$store
        .dispatch("offerManage/removeThumbNail", this.offer_id)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
      this.changedThumbNail = false;
    },

    /**
     * saveServiceAgreement
     */
    saveServiceAgreement() {
      let agreement = {
        status: this.service_agreestatus,
        custom_agreement_text: this.custom_agreetext,
      };
      this.$store
        .dispatch("offerManage/saveServiceAgreement", [
          agreement,
          this.offer_id,
        ])
        .then(() => {
          this.$store.dispatch("setCurrentCheckoutMenu", "home");
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },
    backToOffers() {
      this.$router.push("/offers/edit-offer/" + this.offer_id);
    },

    /**
     *   save extra contact information
     */
    saveExtraContactInformation() {
      let extra_info = {
        collect_address: this.collect_address,
        collect_phone: this.collect_phone,
        collect_name_password: this.collect_name_password,
      };
      this.$store
        .dispatch("offerManage/saveExtraContactInformation", [
          extra_info,
          this.offer_id,
        ])
        .then(() => {
          this.$store.dispatch("setCurrentCheckoutMenu", "home");
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
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
     * save Edit check out
     */
    saveEditCheckout() {
      this.selected_offer.title = this.offer_title;
      this.selected_offer.new_design = this.new_design;
      // if (this.new_design == false) {
      //   this.selected_offer.new_design = ''
      // }
      this.$store
        .dispatch("offerManage/updateOfferByID", this.selected_offer)
        .then(() => {
          if (this.status_got != true) {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.$store
              .dispatch("offerManage/getOfferByID", this.offer_id)
              .then(() => {});
          } else {
            this.$router.push("/offers/edit-offer/" + this.offer_id);
          }
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    // ---------------------------------- product sidebar working methods part- ------------------------
    initProductCustomizeData() {
      if (this.currentSidebar == "product-customize") {
        this.$store.dispatch("productManage/getProductList").then(() => {
          this.header_logo_image_url = this.current_product.header_logo_image;
          this.hero_background_image_url = this.current_product.hero_background_image;
          this.footer_logo_image_url = this.current_product.footer_logo_image;
          this.page_background_image_url = this.current_product.page_background_image;
          this.product_favicon_url = this.current_product.favicon_image;
          this.$store.commit(
            "SET_CUSTOMIZE_HEADER_LOGO",
            this.header_logo_image_url
          );
          this.$store.commit(
            "SET_CUSTOMIZE_FOOTER_LOGO",
            this.footer_logo_image_url
          );
          this.$store.commit(
            "SET_CUSTOMIZE_HERO_BACKGROUND",
            this.hero_background_image_url
          );
          this.$store.commit(
            "SET_PAGE_BACKGROUND_IMAGE",
            this.page_background_image_url
          );

          this.$store.commit("SET_PRODUCT_FAVICON", this.product_favicon_url);
        });
        this.getProductCustomizeHeader();
        this.getProductCustomizeHero();
        this.getProductCustomizeWelcome();
        this.getProductCustomizeSyllabus();
        this.getProductCustomizeSidebar();
        this.getProductCustomizeFooter();
        this.getProductCustomizeSettings();
      }
    },
    getProductCustomizeHeader() {
      this.$store
        .dispatch("prodCustomizeManage/getProdHeader", this.product_id)
        .then(() => {
          this.header_announcement_text = this.prod_header.announcement_text;
          this.header_announcement_url = this.prod_header.announcement_url;
          this.header_announcement_textcolor = this.prod_header.announcement_text_color;
          this.header_announcement_color = this.prod_header.announcement_color;
          this.header_show_announcement = this.prod_header.show_announcement;
          this.announcement_new_window = this.prod_header.announcement_new_window;
          this.header_show_menu = this.prod_header.show_menu;
          this.product_show_header = this.prod_header.show_header;
          this.header_logo_text = this.prod_header.logo_text;
          this.header_logo_type = this.prod_header.logo_type;
          this.header_logo_height = this.prod_header.custom_logo_height;
          this.header_menu_id = this.prod_header.menu_id;
        });
    },

    getProductCustomizeHero() {
      this.$store
        .dispatch("prodCustomizeManage/getProdHero", this.product_id)
        .then(() => {
          this.hero_appearance_textalign = this.prod_hero.alignment;
          this.product_hero_overlaycolor = this.prod_hero.overlay_color;
          this.product_show_hero = this.prod_hero.show_hero;
          this.product_hero_textcolor = this.prod_hero.text_color;
          switch (this.prod_hero.spacing) {
            case "Small":
              this.hero_appearance_spacing = 1;
              break;
            case "Medium":
              this.hero_appearance_spacing = 2;
              break;
            case "Large":
              this.hero_appearance_spacing = 3;
              break;
            case "Extra Small":
              this.hero_appearance_spacing = 0;
              break;
            default:
              this.hero_appearance_spacing = 1;
              break;
          }
        });
    },

    getProductCustomizeWelcome() {
      this.$store
        .dispatch("prodCustomizeManage/getProdWellcome", this.product_id)
        .then(() => {
          this.product_welcome_textalign = this.prod_welcome.text_alignment;
          this.product_show_wellcomebody = this.prod_welcome.show_welcome;
        });
    },

    getProductCustomizeSyllabus() {
      this.$store
        .dispatch("prodCustomizeManage/getProdSyllabus", this.product_id)
        .then(() => {
          this.product_show_syllabus = this.prod_syllabus.show_syllabus;
          this.product_syllabus_type = this.prod_syllabus.syllabus_type;
          this.product_syllabus_truncate = this.prod_syllabus.truncate_at;
          this.product_syllabus_comingsoontext = this.prod_syllabus.coming_soon_text;
          this.product_syllabus_categoriestext = this.prod_syllabus.categories_text;
          this.product_syllabus_showmoretext = this.prod_syllabus.show_more_text;
        });
    },

    getProductCustomizeSidebar() {
      this.$store
        .dispatch("prodCustomizeManage/getProdSlidebar", this.product_id)
        .then(() => {
          this.product_show_sidebar = this.prod_sidebar.show_sidebar;
        });
    },

    getProductCustomizeFooter() {
      this.$store
        .dispatch("prodCustomizeManage/getProdFooter", this.product_id)
        .then(() => {
          this.product_show_footer = this.prod_footer.show_footer;
          this.product_show_footercopyright = this.prod_footer.show_copyright;
          this.footer_copyright_text = this.prod_footer.copyright_text;
          this.show_footer_logo = this.prod_footer.show_logo;
          this.product_show_footermenu = this.prod_footer.show_menu;
          this.footer_appearance_backgroundcolor = this.prod_footer.background_color;
          this.footer_appearance_textcolor = this.prod_footer.text_color;
          this.show_social_icons = this.prod_footer.show_social_icons;
          this.social_new_window = this.prod_footer.links_in_new_window;
          this.social_icon_background_style = this.prod_footer.social_icon_style;
          this.social_icon_background_color = this.prod_footer.social_icon_background_color;
          this.social_icon_color = this.prod_footer.social_icon_color;
          this.footer_appearance_alignment = this.prod_footer.alignment;
          this.footer_dribble_url = this.prod_footer.sil_dribbble;
          this.footer_facebook_url = this.prod_footer.sil_facebook;
          this.footer_flickr_url = this.prod_footer.sil_flickr;
          this.footer_github_url = this.prod_footer.sil_github;
          this.footer_instagram_url = this.prod_footer.sil_instagram;
          this.footer_itunes_url = this.prod_footer.sil_itunes;
          this.footer_linkedin_url = this.prod_footer.sil_linkedin;
          this.footer_slack_url = this.prod_footer.sil_slack;
          this.footer_soundcloud_url = this.prod_footer.sil_soundcloud;
          this.footer_tumblr_url = this.prod_footer.sil_tumblr;
          this.footer_twitter_url = this.prod_footer.sil_twitter;
          this.footer_vimeo_url = this.prod_footer.sil_vimeo;
          this.footer_yelp_url = this.prod_footer.sil_yelp;
          this.footer_youtoube_url = this.prod_footer.sil_youtube;
          switch (this.prod_footer.social_icon_alignment) {
            case "Left":
              this.social_icon_alignment = 0;
              break;
            case "Center":
              this.social_icon_alignment = 1;

              break;
            case "Right":
              this.social_icon_alignment = 2;
              break;
            default:
              break;
          }
          switch (this.prod_footer.social_icon_style) {
            case "Round":
              this.social_icon_background_style = 0;
              break;
            case "Square":
              this.social_icon_background_style = 1;

              break;
            case "None":
              this.social_icon_background_style = 2;
              break;
            default:
              break;
          }
        });
    },

    getProductCustomizeSettings() {
      this.$store
        .dispatch("prodCustomizeManage/getProdSettings", this.product_id)
        .then(() => {
          this.settings_darkfont_color = this.prod_settings.dark_font_color;
          this.settings_lightfont_color = this.prod_settings.light_font_color;
          this.settings_cs_dark = this.prod_settings.cs_dark;
          this.settings_cs_darker = this.prod_settings.cs_darker;
          this.settings_cs_offset = this.prod_settings.cs_offset;
          this.settings_cs_primary = this.prod_settings.cs_primary;
          this.settings_mc_success = this.prod_settings.mc_success;
          this.settings_mc_info = this.prod_settings.mc_info;
          this.settings_mc_warning = this.prod_settings.mc_warning;
          this.settings_mc_danger = this.prod_settings.mc_danger;
          this.settings_ga_background_color = this.prod_settings.ga_background;
          this.settings_ga_vertical_align = this.prod_settings.ga_vertical_alignment;
          this.settings_ga_body_colwidth = this.prod_settings.ga_body_column_width;
          this.heading_font_family = this.prod_settings.heading_font_family;
          this.base_font_family = this.prod_settings.base_font_family;
        });
    },

    saveProductCustomizeChange() {
      switch (this.currentProductCustomizeMenu) {
        case "header":
          this.saveProductCustomizeHeader();
          break;
        case "hero":
          this.saveProductCustomizeHero();
          break;
        case "welcome":
          this.saveProductCustomizeWelcome();
          break;
        case "product-syllabus":
          this.saveProductCustomizeSyllabus();
          break;
        case "sidebar":
          this.saveProductCustomizeSidebar();
          break;
        case "footer":
          this.saveProductCustomizeFooter();
          break;
        case "general-appearance":
          this.saveProductCustomizeSettings("general-appearance");
          break;
        case "message-color":
          this.saveProductCustomizeSettings("message-color");
          break;
        case "typography":
          this.saveProductCustomizeSettings("typography");
          break;
        case "color-scheme":
          this.saveProductCustomizeSettings("color-scheme");
          break;
        case "favicon":
          this.saveProductCustomizeSettings("favicon");
          break;

        default:
          break;
      }
    },

    saveProductCustomizeSettings(settings_menu) {
      let settings = {
        base_font_family: this.base_font_family,
        cs_dark: this.settings_cs_dark,
        cs_darker: this.settings_cs_darker,
        cs_offset: this.settings_cs_offset,
        cs_primary: this.settings_cs_primary,
        dark_font_color: this.settings_darkfont_color,
        ga_background: this.settings_ga_background_color,
        ga_body_column_width: this.settings_ga_body_colwidth,
        ga_vertical_alignment: this.settings_ga_vertical_align,
        heading_font_family: this.heading_font_family,
        light_font_color: this.settings_lightfont_color,
        mc_danger: this.settings_mc_danger,
        mc_info: this.settings_mc_info,
        mc_success: this.settings_mc_success,
        mc_warning: this.settings_mc_warning,
      };
      this.$vs.loading({
        container: "#loading",
        scale: 0.7,
        type: "material",
      });
      this.customization_processing = true;
      this.$store
        .dispatch("prodCustomizeManage/saveProdSettings", [
          settings,
          this.product_id,
        ])
        .then(async () => {
          if (
            this.status_got &&
            this.page_background_file !== null &&
            settings_menu == "general-appearance"
          ) {
            await this.saveProductImage(
              this.page_background_file,
              "page_background_image"
            );
          } else if (
            this.status_got &&
            this.product_favicon_file !== null &&
            settings_menu == "favicon"
          ) {
            await this.saveProductImage(
              this.product_favicon_file,
              "favicon_image"
            );
          } else {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.$vs.loading.close(this.$refs.loading);
            this.customization_processing = false;
          }
          // this.$vs.notify({
          //   color: this.notification_color,
          //   text: this.notification_text,
          //   icon: this.notification_icon,
          // });
          // this.$vs.loading.close(this.$refs.loading);
          // this.customization_processing = false;
          this.getProductCustomizeSettings();
          this.$store.dispatch("productManage/getProductList");
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        });
    },

    saveProductCustomizeHeader() {
      let header = {
        announcement_text: this.header_announcement_text,
        announcement_url: this.header_announcement_url,
        announcement_text_color: this.header_announcement_textcolor,
        announcement_color: this.header_announcement_color,
        announcement_new_window: this.announcement_new_window,
        show_announcement: this.header_show_announcement,
        show_menu: this.header_show_menu,
        show_header: this.product_show_header,
        logo_text: this.header_logo_text,
        logo_type: this.header_logo_type,
        custom_logo_height: this.header_logo_height,
        menu_id: this.header_menu_id,
      };
      this.$vs.loading({
        container: "#loading",
        scale: 0.7,
        type: "material",
      });
      this.customization_processing = true;
      this.$store
        .dispatch("prodCustomizeManage/saveProdHeader", [
          header,
          this.product_id,
        ])
        .then(async () => {
          if (this.status_got && this.header_logo_file !== null) {
            await this.saveProductImage(
              this.header_logo_file,
              "header_logo_image"
            );
          } else {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.$vs.loading.close(this.$refs.loading);
            this.customization_processing = false;
          }
          // this.$vs.notify({
          //   color: this.notification_color,
          //   text: this.notification_text,
          //   icon: this.notification_icon,
          // });
          // this.$vs.loading.close(this.$refs.loading);
          // this.customization_processing = false;
          this.getProductCustomizeHeader();
          this.$store.dispatch("productManage/getProductList");
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        });
    },

    saveProductCustomizeHero() {
      let spacing = "";
      switch (this.hero_appearance_spacing) {
        case 1:
          spacing = "Small";
          break;
        case 2:
          spacing = "Medium";
          break;
        case 3:
          spacing = "Large";
          break;
        case 0:
          spacing = "Extra Small";
          break;
      }
      let hero = {
        alignment: this.hero_appearance_textalign,
        overlay_color: this.product_hero_overlaycolor,
        show_hero: this.product_show_hero,
        text_color: this.product_hero_textcolor,
        spacing: spacing,
        background_image: this.hero_background_image_url,
      };
      this.$vs.loading({
        container: "#loading",
        scale: 0.7,
        type: "material",
      });
      this.customization_processing = true;
      this.$store
        .dispatch("prodCustomizeManage/saveProdHero", [hero, this.product_id])
        .then(async () => {
          if (this.status_got && this.hero_background_image_file !== null) {
            await this.saveProductImage(
              this.hero_background_image_file,
              "hero_background_image"
            );
          } else {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.$vs.loading.close(this.$refs.loading);
            this.customization_processing = false;
          }
          this.getProductCustomizeHero();
          this.$store.dispatch("productManage/getProductList");
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        });
    },

    saveProductCustomizeWelcome() {
      let welcome = {
        text_alignment: this.product_welcome_textalign,
        show_welcome: this.product_show_wellcomebody,
      };
      this.$vs.loading({
        container: "#loading",
        scale: 0.7,
        type: "material",
      });
      this.customization_processing = true;
      this.$store
        .dispatch("prodCustomizeManage/saveProdWellcome", [
          welcome,
          this.product_id,
        ])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
          this.getProductCustomizeWelcome();
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        });
    },

    saveProductCustomizeSyllabus() {
      let syllabus = {
        show_syllabus: this.product_show_syllabus,
        syllabus_type: this.product_syllabus_type,
        truncate_at: this.product_syllabus_truncate,
        coming_soon_text: this.product_syllabus_comingsoontext,
        categories_text: this.product_syllabus_categoriestext,
        show_more_text: this.product_syllabus_showmoretext,
      };
      this.$vs.loading({
        container: "#loading",
        scale: 0.7,
        type: "material",
      });
      this.customization_processing = true;
      this.$store
        .dispatch("prodCustomizeManage/saveProdSyllabus", [
          syllabus,
          this.product_id,
        ])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
          this.getProductCustomizeSyllabus();
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        });
    },

    saveProductCustomizeSidebar() {
      let sidebar = {
        show_sidebar: this.product_show_sidebar,
      };
      this.$vs.loading({
        container: "#loading",
        scale: 0.7,
        type: "material",
      });
      this.customization_processing = true;
      this.$store
        .dispatch("prodCustomizeManage/saveProdSlidebar", [
          sidebar,
          this.product_id,
        ])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
          this.getProductCustomizeSidebar();
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        });
    },

    saveProductCustomizeFooter() {
      let alignment = "";
      let icon_style = "";
      switch (this.social_icon_alignment) {
        case 0:
          alignment = "Left";
          break;
        case 1:
          alignment = "Center";

          break;
        case 2:
          alignment = "Right";
          break;
        default:
          break;
      }
      switch (this.social_icon_background_style) {
        case 0:
          icon_style = "Round";
          break;
        case 1:
          icon_style = "Square";

          break;
        case 2:
          icon_style = "None";
          break;
        default:
          break;
      }
      let footer = {
        show_footer: this.product_show_footer,
        show_copyright: this.product_show_footercopyright,
        copyright_text: this.footer_copyright_text,
        show_logo: this.show_footer_logo,
        show_menu: this.product_show_footermenu,
        background_color: this.footer_appearance_backgroundcolor,
        text_color: this.footer_appearance_textcolor,
        alignment: this.footer_appearance_alignment,
        show_social_icons: this.show_social_icons,
        links_in_new_window: this.social_new_window,
        social_icon_style: icon_style,
        social_icon_background_color: this.social_icon_background_color,
        social_icon_color: this.social_icon_color,
        social_icon_alignment: alignment,
        sil_dribbble: this.footer_dribble_url,
        sil_facebook: this.footer_facebook_url,
        sil_flickr: this.footer_flickr_url,
        sil_github: this.footer_github_url,
        sil_instagram: this.footer_instagram_url,
        sil_itunes: this.footer_itunes_url,
        sil_linkedin: this.footer_linkedin_url,
        sil_slack: this.footer_slack_url,
        sil_soundcloud: this.footer_soundcloud_url,
        sil_tumblr: this.footer_tumblr_url,
        sil_twitter: this.footer_twitter_url,
        sil_vimeo: this.footer_vimeo_url,
        sil_yelp: this.footer_yelp_url,
        sil_youtube: this.footer_youtoube_url,
      };
      this.$vs.loading({
        container: "#loading",
        scale: 0.7,
        type: "material",
      });
      this.customization_processing = true;
      this.$store
        .dispatch("prodCustomizeManage/saveProdFooter", [
          footer,
          this.product_id,
        ])
        .then(async () => {
          if (this.status_got && this.footer_logo_file !== null) {
            await this.saveProductImage(
              this.footer_logo_file,
              "footer_logo_image"
            );
          } else {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.$vs.loading.close(this.$refs.loading);
            this.customization_processing = false;
          }
          this.getProductCustomizeFooter();
          this.$store.dispatch("productManage/getProductList");
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        });
    },

    linkBackInProductSidebar() {
      if (this.currentProductCustomizeMenu == "home") {
        this.$router.push("/products/edit-product/" + this.current_product.id);
      } else if (
        this.currentProductCustomizeMenu == this.previous_sidebar_menu
      ) {
        this.$store.dispatch("setCurrentProductCustomizeMenu", "home");
        this.current_sidebar_menu = "home";
      } else {
        this.$store.dispatch(
          "setCurrentProductCustomizeMenu",
          this.previous_sidebar_menu
        );
        this.current_sidebar_menu = this.previous_sidebar_menu;
      }
    },

    previewCustomizedProductPage() {
      // window.open("/products/preview/" + this.product_id, "_blank");
      let token = this.$store.state.auth.user.token;
      window.open(
        "http://localhost:8081/product/" +
          this.product_id +
          "?academy_token=" +
          token +
          "&id=" +
          this.product_id,
        "_blank"
      );
    },

    selectCustomizeTab(select_tab) {
      this.currentCustomizeTab = select_tab;
    },

    selectProductCustomizeMenu(menu_option) {
      this.previous_sidebar_menu = this.current_sidebar_menu;
      this.current_sidebar_menu = menu_option;
      this.$store.dispatch("setCurrentProductCustomizeMenu", menu_option);
    },

    onSelectProductLogoImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.header_logo_file = file;
        this.header_logo_image_url = URL.createObjectURL(file);
      }
    },

    onSelectProductAppearanceImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.hero_background_image_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.hero_background_image_url = URL.createObjectURL(file);
      }
    },

    onSelectInstructorHeadshotImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.instructor_headshot_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.instructor_headshot_image_url =
          "url(" + URL.createObjectURL(file) + ")";
      }
    },

    onSelectFooterLogo(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.footer_logo_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.footer_logo_image_url = URL.createObjectURL(file);
      }
    },

    onSelectProductFaviconImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.product_favicon_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.product_favicon_url = URL.createObjectURL(file);
      }
    },

    onSelectPageBackgroundImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.page_background_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.page_background_image_url = URL.createObjectURL(file);
      }
    },

    convertBackgroundCssImageUrl(image) {
      return "url(" + image + ")";
    },

    async saveProductImage(file, place_type) {
      await this.$store
        .dispatch("prodCustomizeManage/saveProductImages", [
          file,
          this.product_id,
          place_type,
        ])
        .then(() => {
          if (this.status_got) {
            this.$vs.notify({
              color: this.notification_color,
              text: "Successfully updated! ",
              icon: this.notification_icon,
            });
          } else {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          }
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.$vs.loading.close(this.$refs.loading);
          this.customization_processing = false;
        });
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.setSidebarWidth();
  },
};
</script>
<style lang="scss">
.design-switch.vs-switch {
  transform: scale(1.3);
}
.checkout-menu {
  &:hover {
    text-decoration: underline;
  }
}

.bannerimage-select-button,
.video-select-button,
.contentimage-select-button,
.logoimage-select-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  margin: 0;
  padding: 0 10px;
  color: "primary-font";
  background-color: #c9c9c9dd;
  border-radius: 0.1rem;
}

input[type="file"] {
  display: none;
}
.banner-image,
.content-image,
.logo-image {
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.video-container {
  display: flex;
  border: 1px solid #c9c9c9dd;
  border-radius: 0.2rem;
  height: 150px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.offer-details-sticky {
  position: -webkit-sticky;
  position: sticky;
  background-color: white;
  top: 0;
  padding: 10px 0px;
  z-index: 100;
  border-bottom: 1px solid #e8e8e8;
}
.custom-sidebar .vs-sidebar--items {
  overflow: auto;
}
.custom-sidebar .vs-sidebar--items {
  padding: 0px;
}
.add-custom-field {
  .vs-button--text {
    font-size: 16px;
  }
  .vs-icon {
    font-size: 30px;
  }
}
.service-agreement {
  .vs-radio {
    width: 15px;
    height: 15px;
  }
}
.con-vs-radio {
  justify-content: flex-start;
  font-size: 16px;
}
.vs-sidebar-item-active {
  width: 100% !important;
  overflow: hidden !important;
}
/** -------------------------product-customize side bar -------------------------*/
.product-sidebar-head {
  position: sticky;
  top: 0;
  border-bottom: 1px solid #e5e9ed;
  font-size: 12px;
  padding: 10px 20px;
  color: #111;
  background: white;
  width: 100%;
  z-index: 100;
}
.product-sidebar-backbutton {
  cursor: pointer;
}
.product-title-head {
  font-size: 18px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}

.product-section-tabs {
  display: flex;
}
.product-section-tab {
  border-bottom: solid 1px #dddddd;
  border-left: solid 1px #eeeeee;
  width: 50%;
  height: 60px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.active {
  border-bottom: solid 3px #0072ef;
  color: black;
}
.product-section-item {
  height: 60px;
  border-bottom: solid 1px #dddddd;
  display: flex;
  padding: 10px 40px;
  align-items: center;
}
.product-section-item-icon {
  font-size: 24px;
  margin-right: 30px;
}
.product-section-item-title {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
.product-sidebar-body {
  min-height: 600px;
}
.product-sidebar-menu-section {
  height: 70px;
  border-bottom: solid 1px #dddddd;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 40px;
  align-items: center;
  display: flex;
  color: black;
}
.product-sidebar-menucontent-section {
  padding: 20px 40px 0px 40px;
  .con-vs-radio {
    font-size: 14px;
  }
}
.show-header-option {
  display: flex;
  padding: 5px 30px;
  height: 70px;
  border-bottom: solid 1px #dddddd;
  align-items: center;
}
.product-sidebar-submenu {
  height: 60px;
  border-bottom: solid 1px #dddddd;
  border-top: solid 1px #dddddd;
  border-left: solid 1px #dddddd;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 20px;
  margin-left: 20px;
  align-items: center;
  font-size: 14px;
  display: flex;
  cursor: pointer;
  &:hover {
    border-left: solid 3px #0072ef;
  }
}
.instructor-bio {
  width: 100%;
  height: 150px;
  border-radius: 4px;
  padding: 10px;
  &:focus {
    border-color: #0072ef;
  }
}
.color_picker_button {
  margin-right: 20px;
  width: 35px;
  height: 35px;
}
.processing-customization-indicator {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.process-customization-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
