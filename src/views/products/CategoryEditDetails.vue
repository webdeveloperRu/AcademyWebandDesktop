<template>
  <div>
    <vs-row vs-justify="center" class="primary-font">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="10"
        vs-sm="12"
        class="mb-3"
      >
        <span
          @click="backToCurrentProduct"
          style="cursor: pointer;"
          class="ml-2 mb-5 mt-2 primary-font"
          ><i class="ti-angle-left" style="font-size: 14px;"></i>
          {{ product_title }}</span
        >
        <h2 class="ml-2 mb-2 mt-4">{{ current_category.name }}</h2>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="7"
        vs-sm="8"
        vs-xs="12"
        code-toggler
      >
        <!-- 
        Category details part
      -->
        <vs-card class="primary-font">
          <h4 class="text-left mb-3">Category Details</h4>
          <vs-row class="mt-4">
            <vs-col vs-sm="12">
              <vs-input
                class="inputx w-100"
                label="Title"
                placeholder="Category title here..."
                v-model="category_title"
              />
            </vs-col>
          </vs-row>
          <vs-row class="mt-4">
            <vs-col vs-lg="12" vs-xs="12" vs-sm="12">
              <vs-textarea
                v-model="category_description"
                class="inputx w-100"
                label="Description"
                placeholder="Category description here..."
              >
              </vs-textarea>
            </vs-col>
          </vs-row>
        </vs-card>
        <vs-card class="category-edit">
          <ProductEditSubCategory
            :id="category_id"
            title="Contents"
            :category_id="category_id"
            :category="current_category"
            :key="loaded"
          ></ProductEditSubCategory>
        </vs-card>
      </vs-col>

      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="3"
        vs-sm="4"
        vs-xs="12"
        code-toggler
      >
        <!-- 
        category status
      -->
        <vs-card class="primary-font">
          <h4 class="text-left mb-3">Visibility</h4>
          <div class="d-flex">
            <div class="">
              <vs-radio
                v-model="category_status"
                vs-name="category_status"
                vs-value="published"
                >Published</vs-radio
              >
              <vs-radio
                v-model="category_status"
                vs-name="category_status"
                vs-value="draft"
                >Draft</vs-radio
              >
              <vs-radio
                v-model="category_status"
                vs-name="category_status"
                vs-value="locked"
                >Locked</vs-radio
              >
              <div class="text-left mb-3 description-font ml-3">
                This category will become locked until the selected post is
                completed.
              </div>
              <vs-radio
                v-model="category_status"
                vs-name="category_status"
                vs-value="drip"
                >Drip</vs-radio
              >
              <div class="text-left mb-3 description-font ml-3">
                This category will become available for your memebers on a
                specified number of days after they acquire the product.
              </div>
              <div
                class="ml-5 mr-5"
                style="border: 1px solid #bbbbbb; padding: 20px; border-radius: 5px"
              >
                <vs-input
                  label="Number of Days"
                  v-model="drip_days"
                  type="number"
                  class="w-100"
                ></vs-input>
                <span class="description-font"
                  >This value should be greater than or equal 1. It should be
                  less than or equal to 731.</span
                >
              </div>
            </div>
          </div>
        </vs-card>

        <!-- 
          @   category post image
         -->
        <vs-card class="primary-font">
          <h4 class="text-left mb-3">Poster Image</h4>
          <!-- 
            @ image part
           -->
          <!-- <img :src="cssthumbImageUrl" /> -->
          <div
            class="image-aspect-ratio "
            :style="{ 'background-image': cssthumbImageUrl }"
          ></div>
          <div
            class="d-flex align-items-center mt-2 file-select"
            style="justify-content: center"
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
                    <label class="lesson-thumbnail-select-button">
                      <input
                        type="file"
                        @change="onSelectImage"
                        style="overflow: hidden"
                        class="custom-file-input"
                        accept="image/png, image/jpeg"
                      />
                      <h6>Pick Image</h6>
                    </label>
                  </vs-dropdown-item>
                  <vs-dropdown-item class="remove-thumb-menu">
                    <div
                      @click="onClickRemoveImage"
                      color="danger"
                      class="text-center"
                    >
                      <h6 style="color: red">Remove Image</h6>
                    </div>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <!-- select thumb nail-->
          </div>
          <br />

          Please use .jpg or .png with non-transparent background. Recommended
          dimensions of <b>1280<i class="mdi mdi-close"></i>720</b>.
          <!-- <vs-button color="primary" type="border">Pick File</vs-button> -->
        </vs-card>

        <!-- 
          @   add downloads files
         -->
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center" class="primary-font">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="10"
        vs-sm="12"
        class="mb-3"
      >
        <div class="btn-alignment text-right">
          <vs-button color="danger" type="flat" @click.native="deleteCurrentCategory">
            Delete Category</vs-button
          >
          <vs-button color="primary" type="filled" @click.native="saveCurrentCategory"
            >Save</vs-button
          >
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import ProductEditSubCategory from "./ProductEditSubCategory";
export default {
  name: "CategoryEditDetails",
  components: {
    ProductEditSubCategory,
  },
  data: () => ({
    category_title: "",
    category_description: "",
    category_status: "",
    cssthumbImageUrl: "",
    loaded: 0,
    changedThumbNail: false,
    category_thumbnail: "",
    drip_days: 0,
    product_title: "",
    current_category: Object,
  }),

  computed: {
    category_id: function() {
      var id = this.$route.params.category_id;
      return id.slice(0, id.length);
    },

    lesson_list: {
      get() {
        let list = this.$store.getters["lessonManage/lesson_list"];
        return list[this.category_id];
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
  },

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.updateCategory();
  },

  methods: {
    updateCategory() {
      let product_list = this.$store.getters["productManage/product_list"];

      this.$store
        .dispatch("categoryManage/getCategoryByID", this.category_id)
        .then(() => {
          if (this.status_got) {
            this.current_category = this.$store.getters[
              "categoryManage/current_category"
            ];
            this.category_title = this.current_category.name;
            this.category_description = this.current_category.description;
            this.category_status = this.current_category.status;
            this.drip_days = this.current_category.drip;
            this.cssthumbImageUrl =
              "url(" + this.current_category.thumbnail + ")";
            for (let i = 0; i < product_list.length; i++) {
              if (product_list[i].id == this.current_category.product_id) {
                this.product_title = product_list[i].title;
              }
            }
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

    /**
     * delete Category
     */
    deleteCurrentCategory() {},
    /**
     * save current category
     */
    saveCurrentCategory() {
      this.current_category.name = this.category_title;
      this.current_category.description = this.category_description;
      this.current_category.status = this.category_status;
      this.current_category.drip = this.drip_days;
      this.$store
        .dispatch("categoryManage/updateCategoryByID", this.current_category)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.loaded++;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.loaded++;
        });
      if (this.changedThumbNail) {
        if (this.cssthumbImageUrl !== "") {
          this.saveThumbNail(this.category_thumbnail);
        } else {
          this.removeThumbNail();
        }
      }
    },

    backToCurrentProduct() {
      this.$router.push(
        "/products/edit-product/" + this.current_category.product_id
      );
    },

    /**
     * save thumbnail
     **/

    saveThumbNail(thumbFile) {
      this.$store
        .dispatch("categoryManage/saveThumbNail", [this.category_id, thumbFile])
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
     * remove ThumbNail
     **/
    removeThumbNail() {
      this.$store
        .dispatch("categoryManage/removeThumbNail", this.category_id)
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
     * remove Image
     **/
    onClickRemoveImage: function() {
      this.changedThumbNail = true;
      this.cssthumbImageUrl = "";
    },

    onSelectImage(e) {
      // let image = e.target.files[0]
      // if( image !== undefined) {
      //   this.changedThumbNail = true;
      //   this.thumbNail = image
      // }
      const file = e.target.files[0];
      if (file !== undefined) {
        this.category_thumbnail = file;
        this.cssthumbImageUrl = "url(" + URL.createObjectURL(file) + ")";
        this.changedThumbNail = true;
      }
    },
  },
};
</script>

<style>
.con-vs-radio {
  justify-content: flex-start;
}
.image-wrapper-right {
  width: 210px;
  float: right;
}
.image-wrapper-left {
  width: 170px;
  float: left;
}
.image-aspect-ratio {
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

input[type="file"] {
  display: none;
}
.btn-drop {
  border-radius: 0.3rem !important;
}
.lesson-thumbnail-select-button,
.video-select-button {
  margin-top: 8px;
  display: inline-block;
  padding: 10px 12px;
  height: 38px;
  cursor: pointer;
  border-right: none;
  color: #5c6369;
  background-color: white;
  border-radius: 0.3rem;
}
.download-select-button {
  cursor: pointer;
  border: 1px solid #5c6369;
  background-color: transparent;
  padding: 10px 12px;
  border-radius: 0.3rem;
  font-weight: 100 !important;
  font-size: 14px !important;
}
.category-edit .category-status-icon {
  display: none;
}
</style>
