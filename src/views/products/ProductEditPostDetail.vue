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
          class="ml-2 mb-2 mt-2 primary-font"
          @click="backToCurrentProduct"
          style="cursor: pointer;"
        >
          <i class="ti-angle-left" style="font-size: 14px;"></i>
          {{ product_name }}
        </span>
        <br />
        <h2 class="ml-2 mb-2 mt-3">{{ lesson_title }}</h2>
        <span class="ml-2 mb-2 mt-2"><i class="mdi mdi-eye"></i> Preview</span>
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
        video and assessment select part 
      -->
        <vs-card class="text-center primary-font">
          <vs-row>
            <vs-col vs-sm="12" vs-lg="12" class="" vs-align="center">
              <div class="text-center">
                <!-- <img  /> -->
                <div v-if="video_url !== null">
                  <video width="95%" height="" controls class="mt-3">
                    <source :src="video_url" type="video/ogg" />
                    <source :src="video_url" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div v-if="show_progress">
                    <span class="mt-2 mb-2 primary-font"
                      >Uploading Video ({{ loading_progress }}%)</span
                    >
                    <vs-progress
                      :percent="loading_progress"
                      color="primary"
                      class="w-100 mb-3"
                      >primary</vs-progress
                    >
                  </div>
                </div>
                <div v-else></div>
                <!-- <input type="file" id="file" ref="file" v-on:change="onSelectVideo" /> -->
                <div
                  class="d-flex align-items-center dropdownbtn-alignment justify-content-center"
                  v-if="video_url === null"
                >
                  <vs-dropdown vs-trigger-click>
                    <vs-button
                      class="btn-drop"
                      type="border"
                      icon="expand_more"
                      color="#5c6369"
                      >Select Video</vs-button
                    >
                    <vs-dropdown-menu>
                      <vs-dropdown-item>
                        <label class="video-select-button">
                          <input
                            type="file"
                            @change="onSelectVideo"
                            style="overflow: hidden"
                            class="custom-file-input"
                            accept="video/*"
                          />
                          <h6>Upload Video</h6>
                        </label>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>
                <div v-else>
                  <vs-dropdown vs-trigger-click>
                    <vs-button
                      class="btn-drop"
                      type="border"
                      icon="expand_more"
                      color="#5c6369"
                      >Video Action</vs-button
                    >
                    <vs-dropdown-menu>
                      <vs-dropdown-item class="remove-thumb-menu">
                        <div>video action1</div>
                      </vs-dropdown-item>
                      <vs-dropdown-item class="remove-thumb-menu">
                        <div>video action2</div>
                      </vs-dropdown-item>
                      <vs-dropdown-item class="remove-thumb-menu">
                        <div>video action3</div>
                      </vs-dropdown-item>
                      <vs-dropdown-item class="remove-thumb-menu">
                        <div
                          @click="onClickRemoveVideo"
                          color="danger"
                          class="text-center"
                        >
                          <h6 style="color: red">Remove Video</h6>
                        </div>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>
              </div>
            </vs-col>
          </vs-row>
        </vs-card>

        <!-- 
        lesson details part
      -->
        <vs-card class="primary-font">
          <h4 class="text-left mb-3">Post Details</h4>
          <vs-row class="mt-4">
            <!-- <vs-col
              vs-sm="12"
              class="d-flex align-items-center justify-content-start"
            >
              <label class="vs-input--label mb-0">Title</label>
            </vs-col> -->
            <vs-col vs-sm="12">
              <vs-input
                class="inputx w-100"
                label="Title"
                placeholder="Post title here..."
                v-model="lesson_title"
              />
            </vs-col>
          </vs-row>
          <vs-row class="mt-4">
            <!-- <vs-col
              vs-lg="12"
              vs-xs="12"
              vs-sm="12"
              class="d-flex align-items-center justify-content-start"
            >
              <label class="vs-input--label mb-0">Category</label>
            </vs-col> -->
            <vs-col vs-lg="12" vs-xs="12" vs-sm="12">
              <vs-select
                class="w-100"
                label="Category"
                v-model="selected_categoryID"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in category_names"
                />
              </vs-select>
              <div class="mt-2 primary-font">
                Choose which category this post belongs to, or create a new one.
              </div>
            </vs-col>
          </vs-row>
          <vs-row class="mt-4">
            <vs-col vs-lg="12" vs-xs="12" vs-sm="12">
              <label style="font-weight: 600; color: #2b2b2b; padding-left: 5px"
                >Body</label
              >
            </vs-col>
            <vs-col vs-lg="12" vs-xs="12" vs-sm="12">
              <VueEditor v-model="lesson_body"></VueEditor>
            </vs-col>
          </vs-row>
        </vs-card>

        <!-- 
        @@ post ocmment
        -->
        <!--  <vs-card class="primary-font" v-if="comments_option == 'visible'">
          <h4 class="text-left mb-3">comments</h4>
          <vs-row class="mt-4">           
            <vs-col vs-sm="12">
              <vs-textarea v-model="comment_text" />
            </vs-col>
            <vs-col vs-sm="12">
              <vs-button @click.native = "postComment">post</vs-button>
            </vs-col>
          </vs-row>          
        </vs-card>-->
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
        lesson status
      -->
        <vs-card class="primary-font">
          <h4 class="text-left mb-3">Visibility</h4>
          <div class="d-flex">
            <div class="">
              <vs-radio
                v-model="lesson_status"
                vs-name="lesson_status"
                vs-value="published"
                >Published</vs-radio
              >
              <vs-radio
                v-model="lesson_status"
                vs-name="lesson_status"
                vs-value="draft"
                >Draft</vs-radio
              >
            </div>
          </div>
          <h6
            class="text-left mb-3 primary-font"
            v-if="lesson_status == 'draft'"
          >
            This post is not visible because it has draft components.
          </h6>
          <h6 class="text-left mb-3 primary-font">
            The category "<a href="">{{ selected_categoryID_title }}</a
            >" is set to:
            <span v-if="lesson_status == 'draft'"
              ><i class="mdi mdi-file-document ml-1"></i> Draft
            </span>
            <span v-else
              ><i class="mdi mdi-check-circle ml-1" style="color: green"></i>
              Pusblished
            </span>
          </h6>
        </vs-card>

        <!-- 
          @   post image
         -->
        <vs-card class="primary-font">
          <h4 class="text-left mb-3">Post Image</h4>
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
                      <h6>Upload Image</h6>
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
        <vs-card class="download-add primary-font">
          <h4 class="text-left mb-3">Downloads</h4>
          <div class="text-center">
            <div class="mb-3" v-for="file in downloadfile_list" :key="file.id">
              <vs-row class="m-0" style="cursor: pointer;">
                <vs-col vs-w="10" class="p-0">
                  <div class="d-flex">
                    <vs-icon icon="drag_handle" class="mr-2"></vs-icon>
                    {{ file.name }}
                    <!-- <div style="position: relative; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" :title="file.name" :key="file.id">{{file.name}}</div> -->
                  </div>
                </vs-col>
                <vs-col vs-w="2">
                  <div @click="removeDownload(file)">
                    <vs-icon icon="close" style="cursor: pointer;"></vs-icon>
                  </div>
                </vs-col>
              </vs-row>
            </div>
            <label class="download-select-button">
              <input
                type="file"
                @change="onSelectDownload"
                style="overflow: hidden;"
                class="custom-file-input"
              />
              Add Downloads
            </label>
          </div>
          <!-- <vs-button color="primary" type="border">Add Downloads</vs-button> -->
        </vs-card>

        <!-- 
          @   comments
         -->
        <vs-card class="primary-font">
          <h4 class="text-left mb-3">Comments</h4>
          <div class="d-flex">
            <div class="">
              <vs-radio
                v-model="comments_option"
                vs-name="comments_option"
                vs-value="visible"
                >Visible</vs-radio
              >
              <vs-radio
                v-model="comments_option"
                vs-name="comments_option"
                vs-value="hidden"
                >Hidden</vs-radio
              >
              <vs-radio
                v-model="comments_option"
                vs-name="comments_option"
                vs-value="locked"
                >Locked</vs-radio
              >
            </div>
          </div>
        </vs-card>
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
          <vs-button
            color="danger"
            type="flat"
            @click.native="deleteLessonConfirm = true"
            >Delete Lesson</vs-button
          >
          <vs-button color="primary" type="filled" @click.native="saveCurrentLesson"
            >Save</vs-button
          >
        </div>
      </vs-col>
    </vs-row>
    <!-- 
      @@delete post detail  
    -->
    <vs-popup title="Delete this Lesson?" :active.sync="deleteLessonConfirm">
      <br /><br /><br />
      <h5>
        Are you sure you want to delete this lesson?
      </h5>
      <br /><br /><br />
      <div class="btn-alignment text-right">
        <vs-button
          color="primary"
          type="flat"
          @click.native="deleteLessonConfirm = false"
          >Cancel</vs-button
        >
        <vs-button color="danger" type="filled" @click.native="deleteCurrentLesson"
          >Delete Lesson</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "ProductEditPostDetail",
  components: {
    VueEditor,
  },
  data: () => ({
    lesson_status: "draft",
    comments_option: "visible",
    selected_categoryID: "",
    selected_categoryID_title: "",
    deleteLessonConfirm: false,
    assessment_selection: "",
    lesson_title: "",
    lesson_body: "",
    category_names: [],
    thumbNail: Object,
    thumbImageUrl: "",
    cssthumbImageUrl: "",
    video_file: "",
    video_type: "no_video",
    loaded_video: 0,
    video_url: null,
    downloadfile_list: [],
    current_downloadfile_index: 0,
    assessmet_list: [
      { text: "Select assessment", value: 0 },
      { text: "assessment 1", value: 1 },
      { text: "assessment 2", value: 2 },
      { text: "assessment 3", value: 3 },
    ],
    changedThumbNail: false,
    changedVideo: false,
    show_progress: false,
    // comment_text: '',
  }),

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.setLessonItem(this.lesson_id);
  },

  watch: {
    comments_option: function(newValue) {
      this.updateCommentStatus(newValue);
    },
  },

  /**
   *   computed part
   **/
  computed: {
    // downloadfile_list: {
    //   get() {
    //     this.$store.state.lessonManage.downloadfile_list
    //   }
    // },

    category_id: function() {
      var id = this.$route.params.category_id;
      return id.slice(0, id.length);
    },

    lesson_id: function() {
      var id = this.$route.params.lesson_id;
      return id.slice(0, id.length);
    },
    product_name: function() {
      let list = this.$store.getters["productManage/product_list"];
      let title = "";
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == this.selected_lesson.product_id)
          title = list[i].title;
      }
      return title;
    },

    selected_lesson: function() {
      let lesson = [];
      lesson = this.$store.state.lessonManage.current_lesson;
      if (lesson == undefined) return [];
      else return lesson;
    },
    loading_progress: {
      get() {
        return this.$store.getters["loading_status"];
      },
    },

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

    category_list: {
      get() {
        return this.$store.getters["productManage/category_list"];
      },
    },
  },

  methods: {
    /**
     *   update comment Status
     **/
    updateCommentStatus: function(status) {
      this.$store
        .dispatch("lessonManage/changeCommentStatus", [this.lesson_id, status])
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
    },

    backToCurrentProduct() {
      this.$router.push(
        "/products/edit-product/" + this.selected_lesson.product_id
      );
    },
    onSelectVideo(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.loaded_video++;
        this.video_url = URL.createObjectURL(file);
        this.video_file = file;
        this.changedVideo = true;
      }
    },
    onClickRemoveVideo() {
      this.changedVideo = true;
      this.video_url = null;
      this.loaded_video++;
    },

    /**
     *   set component property with selected Lesson Item
     **/
    getCommentByLessonID(lesson_id) {
      this.$store
        .dispatch("commentManage/getCommentByLessonID", lesson_id)
        .then(() => {})
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    /**
     *   set component property with selected Lesson Item
     **/
    setLessonItem(lesson_id) {
      this.$store
        .dispatch("lessonManage/getLessonByID", lesson_id)
        .then(() => {
          this.lesson_title = this.selected_lesson.title;
          this.lesson_body = this.selected_lesson.body;
          this.lesson_status = this.selected_lesson.status;
          this.video_type = this.selected_lesson.video_type;
          this.video_url = this.selected_lesson.video_url;
          this.comments_option = this.selected_lesson.status_comments;
          for (let i = 0; i < this.category_list.length; i++) {
            this.category_names[i] = {
              value: this.category_list[i].id,
              text: this.category_list[i].name,
            };
            if (this.category_list[i].id == this.category_id) {
              this.selected_categoryID_title = this.category_list[i].name;
            }
          }
          this.cssthumbImageUrl = "url(" + this.selected_lesson.thumbnail + ")";
          this.selected_categoryID = this.category_id;
          this.getDownloadFiles(lesson_id);
          this.getCommentByLessonID(this.lesson_id);
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    saveCurrentLesson() {
      this.selected_lesson.title = this.lesson_title;
      this.selected_lesson.body = this.lesson_body;
      this.selected_lesson.video_url = this.video_url;
      this.selected_lesson.video_type = this.video_type;
      this.selected_lesson.status = this.lesson_status;
      this.selected_lesson.category_id = this.selected_categoryID;
      for (let i = 0; i < this.category_list.length; i++) {
        if (this.category_list[i].id == this.selected_categoryID)
          this.selected_categoryID_title = this.category_list[i].name;
      }
      if (this.selected_lesson.title === "") {
        this.$vs.notify({
          color: this.$custom_warning,
          icon: "warning",
          text: "Lesson name must be filled",
        });
      } else {
        this.$store
          .dispatch("lessonManage/updateLessonByID", this.selected_lesson)
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
      }

      if (this.changedThumbNail) {
        if (this.cssthumbImageUrl !== "") {
          this.saveThumbNail(this.thumbNail);
        } else {
          this.removeThumbNail();
        }
      }

      if (this.changedVideo) {
        if (this.video_url !== null) {
          this.saveVideo(this.video_file);
        } else {
          this.removeVideo();
        }
      }
    },

    /**
     *   delete current Lesson
     **/

    deleteCurrentLesson() {
      this.$store
        .dispatch("lessonManage/deleteLessonByID", [
          this.lesson_id,
          this.selected_categoryID,
        ])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          if (this.status_got) this.$router.push("/products");
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
      this.deleteLessonConfirm = false;
    },

    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur",
      });
    },

    /**
     * save thumbnail
     **/

    saveThumbNail(thumbFile) {
      this.$store
        .dispatch("lessonManage/saveThumbNail", [this.lesson_id, thumbFile])
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
        .dispatch("lessonManage/removeThumbNail", this.lesson_id)
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
      this.setLessonItem(this.selected_lesson);
    },

    /**
     * save video
     **/

    saveVideo(vidoeFile) {
      this.show_progress = true;
      this.$store
        .dispatch("lessonManage/saveVideo", [this.lesson_id, vidoeFile])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.show_progress = false;
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
    removeVideo() {
      this.$store
        .dispatch("lessonManage/removeVideo", this.lesson_id)
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
    },

    /**
     * create image
     **/
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.thumbImageUrl = e.target.result;
        this.cssthumbImageUrl = "url(" + this.thumbImageUrl + ")";
      };
      reader.readAsDataURL(file);
    },

    /**
     * remove Image
     **/
    onClickRemoveImage: function() {
      this.changedThumbNail = true;
      this.cssthumbImageUrl = "";
    },

    onSelectImage(e) {
      let image = e.target.files[0];
      if (image !== undefined) {
        this.changedThumbNail = true;
        this.createImage(image);
        this.thumbNail = image;
      }
    },

    /**
     * remove Image
     **/
    onSelectDownload(e) {
      let file = e.target.files[0];
      this.addDownload(file);
    },

    /**
     * add download
     **/

    addDownload(download_file) {
      this.$store
        .dispatch("lessonManage/saveDownloadFile", [
          this.lesson_id,
          download_file,
        ])
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          if (this.status_got) {
            this.updateDownloadFileList();
          }
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.updateDownloadFileList();
        });
    },

    removeDownload(deletefile) {
      this.$store
        .dispatch("lessonManage/removeDownloadFile", deletefile.id)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          if (this.status_got) {
            this.updateDownloadFileList();
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
     * add download
     **/

    getDownloadFiles(lesson_id) {
      this.$store
        .dispatch("lessonManage/getDownloadFileList", lesson_id)
        .then(() => {
          this.updateDownloadFileList();
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    updateDownloadFileList() {
      this.downloadfile_list = this.$store.state.lessonManage.downloadfile_list;
    },

    /**
     * add download
     **/

    postComment() {
      // let comment = { lesson_id: this.lesson_id, comment: this.comment_text}
      // this.$store.dispatch('commentManage/addComment', comment).then(()=>{
      //     this.$vs.notify({
      //           color: this.notification_color,
      //           text: this.notification_text,
      //           icon: this.notification_icon
      //         })
      //     })
      //  .catch(() => {
      //       this.$vs.notify({
      //         color: this.notification_color,
      //         text: this.notification_text,
      //         icon: this.notification_icon
      //       })
      //     }
      //   )
    },
  },
};
</script>
<style lang="scss">
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
.ql-toolbar.ql-snow {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.ql-container.ql-snow {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.download-add .con-img-upload .img-upload {
  width: 100px;
  height: 100px;
}
.download-add .con-img-upload .img-upload .btn-upload-file.ready-progress i {
  transform: translate(-50%, -50%) scale(0.5);
}
.con-input-upload {
  margin: 5px;
}
.download-add .con-input-upload {
  width: 100px;
  height: 100px;
}
.download-add .con-input-upload .text-input {
  font-size: 12px;
}
.con-img-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.view-upload {
  z-index: 15001;
}
.pick-image .con-img-upload {
  column-gap: 0px;
  padding-right: 0px;
}
/* .pick-image .con-img-upload div:nth-child(2) {
  visibility: hidden;
} */

.download-add .con-img-upload .img-upload .text-archive span {
  font-size: 12px;
}
.vs-icon {
  font-size: 16px;
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
  // border-bottom-left-radius: 0.3rem;
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
.routing-product:hover {
  cursor: pointer;
}
</style>
