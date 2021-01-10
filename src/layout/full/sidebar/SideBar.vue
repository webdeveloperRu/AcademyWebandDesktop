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
          <div class="d-flex m-4 " style="justify-content: space-between">
            <div class="primary-font" style="padding: 10px">OFFER CHECKOUT</div>
            <div>
              <vs-button @click="backToOffers" class="mr-2"> back </vs-button>
              <vs-button @click="saveEditCheckout"> save </vs-button>
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
            style="cursor: pointer; align-items:center"
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
            style="cursor: pointer; align-items:center"
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
            style="cursor: pointer; align-items:center"
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
            style="cursor: pointer; align-items:center"
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
            <vs-button class="mr-4" @click="saveOfferDetails"> save </vs-button>
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
              <vs-button color="danger" type="flat" @click="removeVideo">remove</vs-button> -->

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
            <vs-button color="danger" type="flat" @click="removeContentImage"
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
            <vs-button class="mr-4" @click="saveExtraContactInformation">
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
            <vs-button class="mr-4" @click="saveServiceAgreement">
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
              @click="linkToNewTestmonial"
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
            <vs-button color="primary" type="filled">Save</vs-button>
          </div>
          <div
            class="product-title-head mt-2"
            v-if="currentProductCustomizeMenu == 'home'"
          >
            <span>{{ selected_product.title }}</span>
            <i
              class="mdi mdi-open-in-new"
              @click="previewCustomizedProductPage"
              style="cursor:pointer"
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
            <div class="product-section-item">
              <i class="ti-search product-section-item-icon primary-font"></i>
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('search')"
                >Search Bar</span
              >
            </div>
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
                @click="selectProductCustomizeMenu('colorscheme')"
                >Color Scheme</span
              >
            </div>
            <div class="product-section-item">
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('messagecolor')"
                >Message Colors</span
              >
            </div>
            <div class="product-section-item">
              <span
                class="product-section-item-title"
                @click="selectProductCustomizeMenu('generalappearance')"
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
            <span>Header</span>
          </div>
          <div class="show-header-option">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_header"
              ><span class="ml-3 ">Show Header</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menu-section">
            <span>Logo</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Logo Type</div>
            <vs-radio
              v-model="product_logo_type"
              vs-name="logo-type"
              vs-value="Text"
              >Text</vs-radio
            >
            <vs-radio
              v-model="product_logo_type"
              vs-name="logo-type"
              vs-value="Image"
              >Image</vs-radio
            >
          </div>
          <div class="product-sidebar-menucontent-section">
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
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Logo Text</div>
            <vs-input
              class="inputx"
              style="width:100%"
              v-model="proudct_logo_text"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Logo Image</div>
            <div
              class="logo-image"
              :style="{
                'background-image': product_logo_image_url,
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
              style="width:100%"
              v-model="product_logo_height"
            />
          </div>
        </div>
        <!-- ---------------------------------------------------hero menu body part --------------------------------------  -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'hero'"
        >
          <div class="product-sidebar-menu-section">
            <span>Hero</span>
          </div>
          <div class="show-header-option">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_hero"
              ><span class="ml-3 ">Show Hero</span></vs-checkbox
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
                'background-image': product_appearance_image_url,
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
            <div class="mb-2">Alignment</div>
            <vs-radio
              v-model="product_appearance_textalign"
              vs-name="appearance-algin"
              vs-value="Left"
              >Left</vs-radio
            >
            <vs-radio
              v-model="product_appearance_textalign"
              vs-name="appearance-algin"
              vs-value="Centered"
              >Centered</vs-radio
            >
            <vs-radio
              v-model="product_appearance_textalign"
              vs-name="appearance-algin"
              vs-value="Right"
              >Right</vs-radio
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Spacing</div>
            <vs-select class="w-100 mt-3" v-model="appearance_spacing">
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in appearance_spacings"
              />
            </vs-select>
          </div>
          <div class="product-sidebar-submenu mt-3">
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
          </div>
          <div style="height:50px"></div>
        </div>
        <!-- --------------------------------- welcome body menu part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'welcome'"
        >
          <div class="product-sidebar-menu-section">
            <span>Welcome Body</span>
          </div>
          <div class="show-header-option">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_welcomebody"
              ><span class="ml-3 ">Show Welcome Body</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Text Alignment</div>
            <vs-radio
              v-model="product_welcom_textalign"
              vs-name="welcome-text-algin"
              vs-value="Left"
              >Left</vs-radio
            >
            <vs-radio
              v-model="product_welcom_textalign"
              vs-name="welcome-text-algin"
              vs-value="Centered"
              >Centered</vs-radio
            >
            <vs-radio
              v-model="product_welcom_textalign"
              vs-name="welcome-text-algin"
              vs-value="Right"
              >Right</vs-radio
            >
          </div>
          <div class="product-sidebar-submenu mt-3">
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
          </div>
          <div style="height:50px"></div>
        </div>
        <!-- --------------------------------- product syllabus body part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'product-syllabus'"
        >
          <div class="product-sidebar-menu-section">
            <span>Product Syllabus</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_syllabus"
              ><span class="ml-2 ">Show Syllabus</span></vs-checkbox
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
              style="width:100%"
              v-model="product_truncate_at"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Categories Text</div>
            <vs-input
              class="inputx"
              style="width:100%"
              v-model="product_categories_text"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Comming Soon Text</div>
            <vs-input
              class="inputx"
              style="width:100%"
              v-model="product_comingsoon_text"
            />
          </div>
          <div class="product-sidebar-menucontent-section">
            <div class="mb-2">Show More Text</div>
            <vs-input
              class="inputx"
              style="width:100%"
              v-model="product_showmore_text"
            />
          </div>
          <div style="height:50px"></div>
        </div>
        <!-- --------------------------------- product sidebar body part -------------------------------- -->
        <div
          class="product-sidebar-body"
          v-else-if="currentProductCustomizeMenu == 'sidebar'"
        >
          <div class="product-sidebar-menu-section">
            <span>Product Sidebar</span>
          </div>
          <div class="product-sidebar-menucontent-section">
            <vs-checkbox
              class="justify-content-start"
              v-model="product_show_sidebar"
              ><span class="ml-2 ">Show Sidebar</span></vs-checkbox
            >
          </div>
          <div class="product-sidebar-submenu mt-3">
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
          </div>
          <div style="height:50px"></div>
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
import { VueEditor, Quill } from "vue2-editor";
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
    product_logo_type: "Image",
    product_logo_action: "Site",
    proudct_logo_text: "Student App",
    product_logo_image_url: "",
    product_logo_file: null,
    product_logo_height: "",
    product_show_hero: true,
    product_appearance_image_url: "",
    product_appearance_file: null,
    product_appearance_textalign: "Centered",
    appearance_spacing: "",
    previous_sidebar_menu: "home",
    current_sidebar_menu: "home",
    product_show_welcomebody: false,
    product_welcom_textalign: "Centered",
    appearance_spacings: [
      { text: "Extra small", value: 0 },
      { text: "Small", value: 1 },
      { text: "Medium", value: 2 },
      { text: "Large", value: 3 },
    ],
    product_syllabus_type: "Categories",
    product_show_syllabus: true,
    product_truncate_at: "",
    product_categories_text: "Categories",
    product_comingsoon_text: "Coming Soon",
    product_showmore_text: "Show More",
    product_show_sidebar: true,
  }),

  // watch: {
  //   currentSidebar: function(newValue) {
  //     this.updatedSidebar++;
  //   }
  // },
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

    offer_id: function() {
      var id = this.$route.params.offer_id;
      return id.slice(0, id.length);
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

    selected_offer: function() {
      let offer = [];
      offer = this.$store.state.offerManage.current_offer;
      if (offer == undefined) return [];
      else return offer;
    },
    // check out status
    currentSidebar: function() {
      return this.$store.state.currentSidebar;
    },
    // current checkout menu
    current_checkoutmenu: function() {
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
  },

  watch: {
    current_checkoutmenu: function() {
      this.initOfferCheckoutData();
    },
    new_design: function(newValue) {
      this.$store.dispatch("offerManage/setNewDesign", newValue);
    },
  },

  created() {
    this.initOfferCheckoutData();
  },

  methods: {
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
    linkBackInProductSidebar() {
      if (this.currentProductCustomizeMenu == "home") {
        this.$router.push("/products/edit-product/" + this.selected_product.id);
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
      alert("clicked preview");
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
        this.product_logo_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.product_logo_image_url = "url(" + URL.createObjectURL(file) + ")";
      }
    },
    onSelectProductAppearanceImage(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.product_appearance_file = file;
        // this.banner_url = URL.createObjectURL(file);
        this.product_appearance_image_url =
          "url(" + URL.createObjectURL(file) + ")";
      }
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
  overflow-y: auto;
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
</style>
