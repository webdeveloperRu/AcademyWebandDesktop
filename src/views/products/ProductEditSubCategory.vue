<template>
  <div class="primary-font">
    <vs-list class="product-sub-category">
      <div class="category-header">
        <div class="category-header-inner" style="font-size: 20px;">
          <vs-list-header icon-pack="mdi" class="primary-font">
          </vs-list-header>
          <span @click="editCategoryItem(category_id)" class="cagtegory-header">
            <vs-icon
              icon="drag_handle"
              color="#5c6369"
              style="font-size: 22px; margin-top: -5px"
            ></vs-icon>
            {{ title }}
          </span>
          <i
            class="mdi mdi-plus-circle-outline ml-0"
            style="color: #2962ff; font-size: 20px; margin-top: -3px;"
            @click="addLessonPopup"
          ></i>
        </div>
        <div class="category-status-icon">
          <!-- 
            show category icon with dropdown menu
          -->
          <span v-if="category_status === 'drip'" class="mr-2"
            >{{ category.drip }} Days</span
          >
          <vs-dropdown vs-trigger-click>
            <vs-icon
              v-if="category_status == 'published'"
              icon="check_circle"
              color="green"
              class="mr-2"
            ></vs-icon>
            <vs-icon
              v-if="category_status == 'draft'"
              icon="check_circle"
              color="#5c6369"
              class="mr-2 prim"
            ></vs-icon>
            <vs-icon
              v-if="category_status == 'lock'"
              icon="lock"
              class="mr-2 primary-font"
            ></vs-icon>
            <vs-icon
              v-if="category_status == 'drip'"
              icon="watch_later"
              color="#3980d6"
              class="mr-2"
            ></vs-icon>
            <vs-dropdown-menu>
              <!-- published menu -->
              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3"
                  cla
                  style="font-size: 14px"
                  @click="setCategoryStatus('published')"
                >
                  <vs-icon
                    icon="check_circle"
                    color="green"
                    class="mr-2"
                  ></vs-icon>
                  Published
                </div>
              </vs-dropdown-item>

              <!-- Drip menu -->
              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3 "
                  style="font-size: 14px"
                  @click="activeSetDrip = true"
                >
                  <vs-icon
                    icon="watch_later"
                    color="#3980d6"
                    class="mr-2"
                  ></vs-icon>
                  Drip
                </div>
              </vs-dropdown-item>

              <!-- Lock menu -->
              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3 "
                  style="font-size: 14px"
                  @click="setCategoryStatus('lock')"
                >
                  <vs-icon icon="lock" class="mr-2"></vs-icon>
                  Lock
                </div>
              </vs-dropdown-item>

              <!-- Draft menu -->
              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3"
                  style="font-size: 14px"
                  @click="setCategoryStatus('draft')"
                >
                  <vs-icon
                    icon="check_circle"
                    color="#5c6369"
                    class="mr-2"
                  ></vs-icon>
                  Draft
                </div>
              </vs-dropdown-item>

              <!-- delete menu -->
              <vs-dropdown-item>
                <div
                  class="ml-3 mr-3"
                  @click="deleteCategoryConfirm = true"
                  style="color : #990000; font-size: 14px"
                >
                  <vs-icon icon="close" color="red" class="mr-2"></vs-icon>
                  Delete
                </div>
              </vs-dropdown-item>
              <!--  -->
            </vs-dropdown-menu>
          </vs-dropdown>
          <vs-icon
            icon="expand_more"
            class="mr-2 ml-2"
            color="#5c6369"
            @click="toggleAccordion"
            v-if="!post_toggle"
          ></vs-icon>
          <vs-icon
            icon="chevron_right"
            class="mr-2 ml-2"
            color="#5c6369"
            @click="toggleAccordion"
            v-else
          >
          </vs-icon>
        </div>
      </div>
      <draggable
        :list="currentList"
        class="cursor-move"
        @change="updateLessonOrder"
        group="lesson-group"
      >
        <transition-group>
          <vs-list-item
            icon-pack="mdi"
            class="animation post-detail-order"
            :style="
              post_toggle
                ? 'overflow: hidden; height: 0;padding-top:0;padding-bottom:0;border: 0'
                : 'visibility: visible;'
            "
            v-for="listitem in currentList"
            :key="listitem.id"
          >
            <!-- 
            show hidden function icons 
          -->

            <span
              @click="editLessonItem(listitem.id)"
              class="lesson-header"
              v-if="listitem.id !== 0"
            >
              <vs-icon
                icon="insert_drive_file"
                class="lesson-file-icon"
                color="#5c6369"
                style="font-size: 22px; margin-top: -5px;  visibility: visible"
              ></vs-icon>
              <vs-icon
                icon="drag_handle"
                class="lesson-drag-icon"
                color="#5c6369"
                style="font-size: 22px; margin-top: -5px; display: none "
              ></vs-icon>
              {{ listitem.title }}
            </span>
            <span
              v-if="listitem.id !== 0"
              class="post-item-extra-icon mr-1"
              style="font-size: 15px"
              >7</span
            >
            <vs-icon
              v-if="listitem.id !== 0"
              icon="chat_bubble"
              color="#5c6369"
              class="mr-4 post-item-extra-icon"
            ></vs-icon>
            <vs-icon
              v-if="listitem.id !== 0"
              icon="remove_red_eye"
              color="#5c6369"
              class="mr-4 post-item-extra-icon"
            ></vs-icon>
            <vs-icon
              v-if="listitem.id !== 0"
              icon="edit"
              color="#5c6369"
              class="mr-4 post-item-extra-icon"
              @click="editLessonItem(listitem.id)"
            ></vs-icon>

            <!-- 
            show icon with dropdown menu
          -->
            <vs-dropdown vs-trigger-click v-if="listitem.id !== 0">
              <vs-icon
                v-if="lesson_status[listitem.id] == 'draft'"
                icon="check_circle"
                color="#5c6369"
                class="mr-2"
                :key="updatedLesson"
              ></vs-icon>
              <vs-icon
                v-if="lesson_status[listitem.id] == 'published'"
                icon="check_circle"
                color="green"
                class="mr-2 "
                :key="updatedLesson"
              ></vs-icon>
              <vs-icon
                v-if="lesson_status[listitem.id] == 'lock'"
                icon="lock"
                class="mr-2 primary-font"
                :key="updatedLesson"
              ></vs-icon>
              <vs-dropdown-menu>
                <!-- published menu -->
                <vs-dropdown-item>
                  <div
                    class="ml-3 mr-3"
                    style="font-size: 14px"
                    @click="setLessonStatus(listitem, 'published')"
                  >
                    <vs-icon
                      icon="check_circle"
                      color="green"
                      class="mr-2"
                    ></vs-icon>
                    Published
                  </div>
                </vs-dropdown-item>

                <!-- Lock menu -->
                <vs-dropdown-item>
                  <div
                    class="ml-3 mr-3"
                    style="font-size: 14px"
                    @click="setLessonStatus(listitem, 'lock')"
                  >
                    <vs-icon icon="lock" class="mr-2"></vs-icon>
                    Lock
                  </div>
                </vs-dropdown-item>

                <!-- Draft menu -->
                <vs-dropdown-item>
                  <div
                    class="ml-3 mr-3"
                    style="font-size: 14px"
                    @click="setLessonStatus(listitem, 'draft')"
                  >
                    <vs-icon
                      icon="check_circle"
                      color="#5c6369"
                      class="mr-2"
                    ></vs-icon>
                    Draft
                  </div>
                </vs-dropdown-item>

                <!-- delete menu -->
                <vs-dropdown-item>
                  <div
                    class="ml-3 mr-3"
                    @click="
                      confirmDeleteLessonByID(listitem.id, listitem.category_id)
                    "
                    style="color : #990000; font-size: 14px"
                  >
                    <vs-icon icon="close" color="red" class="mr-2"></vs-icon>
                    Delete
                  </div>
                </vs-dropdown-item>
                <!--  -->
              </vs-dropdown-menu>
            </vs-dropdown>
            <!-- 
            collapse and expand icon 
          -->
            <vs-icon
              icon="chevron_right"
              class="mr-2 ml-2"
              style="visibility: hidden;"
              color="#5c6369"
            ></vs-icon>
          </vs-list-item>
        </transition-group>
      </draggable>
    </vs-list>
    <!-- 
      ***@  --------add subcategory Popup---------------
     -->
    <vs-popup
      color="success"
      :active.sync="activeAddLesson"
      title="Please insert your lesson information."
    >
      <vs-row>
        <vs-col>
          <h5 class="mt-3">Lesson Name</h5>
          <vs-input
            v-model="lessonName"
            class="w-100 mt-3 mb-2"
            ref="lesson_create"
            v-on:keyup.enter="addLesson"
          ></vs-input>
          <!--  <h5 class="mt-3">Lesson Description</h5>
          <vs-input v-model="lessonDescription" class="w-100 mt-3 mb-5"></vs-input> -->
          <div class="d-flex">
            <vs-button
              color="dark"
              type="border"
              class="save-cancel-button"
              style="margin-left:auto;"
              @click.native="activeAddLesson = false"
              >Cancel</vs-button
            >
            <vs-button class="ml-3 mr-3 save-cancel-button" @click.native="addLesson"
              >Save</vs-button
            >
          </div>
        </vs-col>
      </vs-row>
    </vs-popup>

    <!-- 
      ***@  --------set Drip Popup---------------
     -->
    <vs-popup
      color="success"
      :active.sync="activeSetDrip"
      title="Configure Drip Settings"
    >
      <vs-row>
        <vs-col>
          <h5 class="mt-5">Drip days</h5>
          <vs-input
            v-model="dripDays"
            class="w-100 mt-3 mb-5"
            type="number"
            min="0"
          ></vs-input>
          <div class="d-flex">
            <vs-button
              color="dark"
              type="border"
              class="save-cancel-button"
              style="margin-left:auto;"
              @click.native="activeSetDrip = false"
              >Cancel</vs-button
            >
            <vs-button class="ml-3 mr-3 save-cancel-button" @click.native="setDrip"
              >Save</vs-button
            >
          </div>
        </vs-col>
      </vs-row>
    </vs-popup>

    <!-- 
       @@ ----- delete category popup
      -->
    <vs-popup
      title="Delete this Category?"
      :active.sync="deleteCategoryConfirm"
    >
      <br /><br /><br />
      <h5>
        Are you sure you want to delete this category?
      </h5>
      <br /><br /><br />
      <div class="btn-alignment text-right">
        <vs-button
          color="primary"
          type="flat"
          @click,native="deleteCategoryConfirm = false"
          >Cancel</vs-button
        >
        <vs-button color="danger" type="filled" @click.native="deleteCategory"
          >Delete Cagegory</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Lesson from "../../models/lesson";
export default {
  name: "ProductEditSubCategory",

  props: {
    title: String,
    category_id: String,
    category: Object,
  },

  data: () => ({
    lesson: new Lesson("", ""),
    post_toggle: false,
    activeAddLesson: false,
    activeSetDrip: false,
    delete_lesson_id: "",
    deleteCategoryConfirm: false,
    categoryIDForDelete: "",
    lessonName: "",
    currentList: [],
    dripDays: "",
    lesson_status: {},
    category_status: "",
    updatedLesson: 0,
    lesson_list: [],
  }),

  components: {
    draggable,
  },

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.category_status = this.category.status;
    this.dripDays = this.category.drip;
    this.updateLessonList();
  },

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
  },

  methods: {
    /*
    @this is for auto focus
     */
    addLessonPopup() {
      this.activeAddLesson = true;
      this.$nextTick(() => this.setFocusOnInput("lesson_create"));
    },
    setFocusOnInput(inputName) {
      let inputEl = this.$refs[inputName].$el.querySelector("input");
      inputEl.focus();
    },

    initLessonStatus() {
      for (let i = 0; i < this.currentList.length; i++) {
        this.lesson_status[this.currentList[i].id] = this.currentList[i].status;
      }
    },

    /**
     * --------------------update lesson list order for category id------------------
     */
    updateLessonListOrder: function(newList, category_id) {
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id == 0) {
          newList.splice(i, 1);
        }
      }
      for (let i = 0; i < newList.length; i++) {
        newList[i].category_id = category_id;
      }
      this.initLessonStatus();
      this.$store
        .dispatch("lessonManage/updateLessonListOrder", [newList, category_id])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.updateLessonList();
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
      this.updatedLesson++;
    },

    /**
     * --------------------update lesson list for category id------------------
     */
    updateLessonList: function() {
      this.lesson_list = this.$store.getters["lessonManage/lesson_list"][
        this.category_id
      ];
      if (this.lesson_list !== undefined)
        this.currentList = this.lesson_list.slice(0);
      else this.currentList = [];

      if (this.currentList.length == 0) {
        this.currentList = [{ title: "", id: 0 }];
      }
      this.initLessonStatus();
    },

    toggleAccordion() {
      this.post_toggle = !this.post_toggle;
    },
    onPostItemEdit() {
      this.$router.push("/products/edit-post");
    },
    initInputValues() {
      this.lessonName = "";
    },

    /**
     *   ------------delete category----------------
     **/

    deleteCategory() {
      this.$store
        .dispatch("categoryManage/deleteCategoryByID", this.category_id)
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
      this.deleteCategoryConfirm = false;
    },

    /**
     *   ------------edit lesson id category----------------
     **/
    editLessonItem(lesson_id) {
      this.$router.push(
        "/products/edit-post/" + this.category_id + "/" + lesson_id
      );
    },
    editCategoryItem(category_id) {
      this.$router.push("/products/edit-category-detail/" + category_id);
    },

    confirmDeleteLessonByID(lesson_id, category_id) {
      this.delete_lesson_id = lesson_id;
      this.categoryIDForDelete = category_id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: `Please confirm!`,
        text: "Are you sure delete this lesson?",
        accept: this.deleteLessonByID,
      });
    },

    updateLessonOrder() {
      this.updateLessonListOrder(this.currentList, this.category_id);
    },

    /**
     *   delete Lesson by id
     **/

    deleteLessonByID() {
      this.$store
        .dispatch("lessonManage/deleteLessonByID", [
          this.delete_lesson_id,
          this.categoryIDForDelete,
        ])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.updateLessonList();
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
     *   Add lesson
     **/

    addLesson() {
      // alert(this.category_id)
      this.lesson.title = this.lessonName;
      this.lesson.body = "";
      this.lesson.video_url = "";
      this.lesson.video_type = "no_video";
      this.lesson.status = "draft";
      if (this.lesson.title === "") {
        this.$vs.notify({
          color: this.$custom_warning,
          text: "Lesson name must be filled",
        });
      } else {
        this.$store
          .dispatch("lessonManage/addLesson", [this.lesson, this.category_id])
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.updateLessonList();
            this.initInputValues();
            this.updatedLesson++;
            this.activeAddLesson = false;
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.updateLessonList();
            this.initInputValues();
            this.updatedLesson++;
            this.activeAddLesson = false;
          });
      }
      this.lessonName = "";
    },

    /**
     *   set drip for category
     **/
    setDrip() {
      this.category_status = "drip";
      this.category.drip = this.dripDays;
      this.$store
        .dispatch("categoryManage/updateCategoryByID", this.category)
        .then(() => {
          if (this.status_got) {
            this.setCategoryStatus("drip");
            this.category_status = "drip";
            this.category.drip = this.dripDays;
          }
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
      this.activeSetDrip = false;
    },

    /**
     *   set drip for category
     **/
    setCategoryStatus(status) {
      this.category.status = status;
      this.$store
        .dispatch("categoryManage/updateCategoryByID", this.category)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          if (!this.status_got) {
            this.category.status = this.category_status;
          } else {
            this.category_status = status;
          }
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.category.status = this.category_status;
        });
    },

    /**
     *   set drip for category
     **/
    setLessonStatus(lesson, status) {
      lesson.status = status;
      this.$store
        .dispatch("lessonManage/updateLessonByID", lesson)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          if (!this.status_got) {
            lesson.status = this.lesson_status[lesson.id];
            this.updatedLesson++;
          } else {
            this.lesson_status[lesson.id] = status;
            this.updatedLesson++;
          }
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          lesson.status = this.lesson_status[lesson.id];
          this.updatedLesson++;
        });
    },
  },
};
</script>
<style>
.animation {
  transition: all 0.5s;
}
.vs-list--header.vs-header-list-primary.with-icon {
  box-shadow: none;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.06);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 0px 10px;
}
.category-header-inner {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.product-sub-category .cursor-move {
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0px 0px;
}
.post-detail-order {
  position: relative;
  color: #5c6369;
  /* transition-property: none !important; */
}
.post-item-extra-icon {
  visibility: hidden;
  opacity: 0;
  font-size: 22px;
  /* transition: visibility 0s, opacity 0.5s linear; */
}
.product-sub-category .vs-list--item:hover .post-item-extra-icon {
  visibility: visible;
  opacity: 1;
}

.product-sub-category .vs-list--item:hover .lesson-drag-icon {
  display: inline !important;
}
.product-sub-category .vs-list--item:hover .lesson-file-icon {
  display: none;
}
.vs-list--header {
  box-shadow: none;
}
.vs-list--title {
  font-weight: 500 !important;
  font-size: 18px;
}

.vs-list--item.post-detail-order {
  padding-left: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.vs-icon {
  font-size: 14px;
}
.lesson-header {
  position: absolute;
  left: 40px;
  font-size: 15px;
  font-weight: 400;
  justify-content: cetner;
}
.cagtegory-header {
  padding: 8px;
  font-size: 18px;
  font-weight: 500;
}
</style>
