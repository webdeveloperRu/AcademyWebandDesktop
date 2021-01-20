<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col>
      <div class="ml-5 mb-4">
        <span
          @click="backToProducts"
          style="cursor: pointer"
          class="ml-2 mb-5 mt-2 primary-font"
          ><i class="ti-angle-left" style="font-size: 14px"></i> Products</span
        >
        <div class="d-flex mt-3">
          <h2>Manage Comments</h2>
          <i
            class="mdi mdi-help-circle-outline ml-1"
            style="color: #3b66ff; font-size: 22px"
          ></i>
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
      vs-lg="11"
      vs-sm="12"
      code-toggler
    >
      <vs-card class="cardx">
        <div slot="header">
          <div class="d-flex" style="position: relative">
            <vs-tabs v-model="currentTab">
              <vs-tab label="Unread">
                <div class="con-tab-ejemplo">
                  <vs-table
                    multiple
                    v-model="selected_unread_comments"
                    pagination
                    max-items="5"
                    :data="unread_comment_list"
                  >
                    <template slot="thead">
                      <div
                        style="
                          position: absolute;
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          left: 60px;
                          right: 0;
                          z-index: 111;
                        "
                      >
                        <div>
                          <span
                            >Displaying
                            <strong>{{ unread_comment_list.length }}</strong>
                          </span>
                          <vs-button
                            size="small"
                            type="border"
                            class="ml-1"
                            color="dark"
                            @click.native="markAsRead"
                            >Mark As Read</vs-button
                          >
                          <vs-button
                            size="small"
                            type="border"
                            class="ml-1"
                            color="dark"
                            @click.native="deleteComment"
                            >Delete</vs-button
                          >
                        </div>
                        <!-- <div>
                          <vs-select v-model="sortby" icon="arrow_downward">
                            <vs-select-item
                              :key="index"
                              :value="item.value"
                              :text="item.text"
                              v-for="(item, index) in comment_sortby"
                            />
                          </vs-select>
                        </div> -->
                      </div>
                      <vs-th></vs-th>
                      <!-- <vs-th></vs-th> -->
                    </template>
                    <template slot-scope="{ data }">
                      <vs-tr
                        :data="tr"
                        :key="indextr"
                        v-for="(tr, indextr) in data"
                        class="tr-comment"
                      >
                        <vs-td> <vs-avatar></vs-avatar> </vs-td>
                        <vs-td :data="data[indextr].author_name">
                          <strong>{{ data[indextr].author_name }}  </strong>
                          on
                          <strong v-if="lesson_list_comment[data[indextr].lesson_id]!==undefined">{{lesson_list_comment[data[indextr].lesson_id].title}}</strong>
                          <!-- <strong>{{ data[indextr].name }}</strong> -->
                          <br />
                          {{ data[indextr].comment }}
                          <br />
                          {{ data[indextr].created_on }}
                          <vs-button size="15" type="flat"
                            >Show context</vs-button
                          >
                          <vs-button size="15" type="flat">Reply</vs-button>
                        </vs-td>
                        <!-- <vs-td>
                          
                        </vs-td> -->
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </vs-tab>
              <vs-tab label="Read">
                <div class="con-tab-ejemplo">
                  <vs-table
                    multiple
                    v-model="selected_read_comments"
                    pagination
                    max-items="5"
                    :data="read_comment_list"
                  >
                    <template slot="thead">
                      <div
                        style="
                          position: absolute;
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          left: 60px;
                          right: 0;
                          z-index: 111;
                        "
                      >
                        <div>
                          <span
                            >Displaying
                            <strong>{{ read_comment_list.length }}</strong>
                          </span>
                          <vs-button
                            size="small"
                            type="border"
                            class="ml-1"
                            color="dark"
                            @click.native="markAsUnread"
                            >Mark As Unread</vs-button
                          >
                          <vs-button
                            size="small"
                            type="border"
                            class="ml-1"
                            color="dark"
                            @click.native="deleteComment"
                            >Delete</vs-button
                          >
                        </div>
                        <!-- <div>
                          <vs-select v-model="sortby" icon="arrow_downward">
                            <vs-select-item
                              :key="index"
                              :value="item.value"
                              :text="item.text"
                              v-for="(item, index) in comment_sortby"
                            />
                          </vs-select>
                        </div> -->
                      </div>
                      <vs-th></vs-th>
                      <!-- <vs-th></vs-th> -->
                    </template>
                    <template slot-scope="{ data }">
                      <vs-tr
                        :data="tr"
                        :key="indextr"
                        v-for="(tr, indextr) in data"
                        class="tr-comment"
                      >
                        <vs-td> <vs-avatar></vs-avatar> </vs-td>
                        <vs-td :data="data[indextr].author_name">
                          <strong>{{ data[indextr].author_name }}</strong>
                          on
                          <strong v-if="lesson_list_comment[data[indextr].lesson_id]!==undefined">{{lesson_list_comment[data[indextr].lesson_id].title}}</strong>
                          <!-- <strong>{{ data[indextr].name }}</strong> -->
                          <br />
                          {{ data[indextr].comment }}
                          <br/>
                          {{ data[indextr].created_on }}
                          <vs-button  type="flat"
                            >Show context</vs-button
                          >
                          <vs-button type="flat">Reply</vs-button>
                        </vs-td>
                        <!-- <vs-td>
                          {{ data[indextr].created_on }}
                          <vs-button  type="flat"
                            >Show context</vs-button
                          >
                          <vs-button type="flat">Reply</vs-button>
                        </vs-td> -->
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </vs-tab>
              <vs-tab label="Delete">
                <div class="con-tab-ejemplo">
                  <vs-table
                    multiple
                    v-model="selected_delete_comments"
                    pagination
                    max-items="5"
                    :data="delete_comment_list"
                  >
                    <template slot="thead">
                      <div
                        style="
                          position: absolute;
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          left: 60px;
                          right: 0;
                          z-index: 111;
                        "
                      >
                        <div>
                          <span
                            >Displaying
                            <strong>{{ delete_comment_list.length }}</strong>
                          </span>
                          <vs-button
                            size="small"
                            type="border"
                            class="ml-1"
                            color="dark"
                            @click.native="restoreComment"
                            >Restore</vs-button
                          >
                        </div>
                        <!-- <div>
                          <vs-select v-model="sortby" icon="arrow_downward">
                            <vs-select-item
                              :key="index"
                              :value="item.value"
                              :text="item.text"
                              v-for="(item, index) in comment_sortby"
                            />
                          </vs-select>
                        </div> -->
                      </div>
                      <vs-th></vs-th>
                      <!-- <vs-th></vs-th> -->
                    </template>
                    <template slot-scope="{ data }">
                      <vs-tr
                        :data="tr"
                        :key="indextr"
                        v-for="(tr, indextr) in data"
                        class="tr-comment"
                      >
                        <vs-td> <vs-avatar></vs-avatar> </vs-td>
                        <vs-td :data="data[indextr].author_name">
                          <strong>{{ data[indextr].author_name }}</strong>
                          <!-- <strong>{{ data[indextr].name }}</strong> -->
                          <br />
                          {{ data[indextr].comment }}
                          <br/>
                          {{ data[indextr].created_on }}
                          <vs-button size="small" type="flat"
                            >Show context</vs-button
                          >
                          <vs-button size="small" type="flat">Reply</vs-button>
                        </vs-td>
                        <!-- <vs-td>
                          {{ data[indextr].created_on }}
                          <vs-button size="small" type="flat"
                            >Show context</vs-button
                          >
                          <vs-button size="small" type="flat">Reply</vs-button>
                        </vs-td> -->
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </vs-tab>
            </vs-tabs>
            <div style="position: absolute; top: 0; right: 10px">
              <vs-select v-model="selected_product_filter" icon="expand_more">
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in comment_product"
                />
              </vs-select>
            </div>
          </div>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "ManageCommentPage",
  data: () => ({
    selected_delete_comments: [],
    selected_read_comments: [],
    selected_unread_comments: [],
    sortby: 1,
    selected_product_filter: 1,
    currentTab: 0,
    searchcommentItem: "",
    activeAddcomment: false,
    commentName: "",
    commentEmail: "",
    grantofferStatus: true,
    addTags: false,
    subscribeMarketingEmail: false,
    grantOfferSelection: "",
    grantofferlist: [
      { text: "Grant Offer 1", Value: 0 },
      { text: "Grant Offer 2", Value: 1 },
      { text: "Grant Offer 3", Value: 2 },
      { text: "Grant Offer 4", Value: 3 },
      { text: "Grant Offer 5", Value: 4 },
      { text: "Grant Offer 6", Value: 5 },
    ],

    paginationtable: false,
    comment_filter: 1,
    search_comment_item: "",
    read_comment_list: [],
    unread_comment_list: [],
    delete_comment_list: [],
    lesson_list_comment: {},
  }),

  watch: {
    selected_product_filter: function () {
      this.filterCommentByProduct();
    },

    // selected_delete_comments: function(newValue) {
    // },

    // selected_read_comments: function(newValue) {
    // },

    // selected_unread_comments: function(newValue) {
    // }
  },

  /**
   *   computed part
   **/
  computed: {
    comment_product: {
      get() {
        let product = [{ text: "All Products", value: 1 }];
        for (let i = 0; i < this.product_list.length; i++) {
          product[i + 1] = {
            text: this.product_list[i].title,
            value: this.product_list[i].id,
          };
        }
        return product;
      },
    },
    product_filter: {
      get() {
        var id = this.$route.params.product_id;
        return id.slice(0, id.length);
      },
    },
    comment_list: {
      get() {
        return this.$store.getters["commentManage/comment_list"];
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

    // lesson_list: {
    //   get() {
    //     let list = this.$store.getters["lessonManage/lesson_list"];
    //     return list[this.category_id];
    //   },
    // },

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },

    current_lesson: {
      get() {
        return this.$store.getters["lessonManage/current_lesson"]
      }
    }
  },

  /**
   *   computed part
   **/
  created() {
    this.$store.dispatch("changeSideBar", "default");
    this.getAllComments();
  },

  /**
   *   method part
   **/
  methods: {
    /**
     *   comment filter part
     **/
    filterCommentByProduct() {
      this.filterComments();
    },
    getLessonsForComment() {
      for (let i = 0; i < this.comment_list.length; i++) {
        this.$store
          .dispatch(
            "lessonManage/getLessonByID",
            this.comment_list[i].lesson_id
          )
          .then(() => {
            this.lesson_list_comment[this.comment_list[i].lesson_id] =  this.current_lesson
          });
      }
      console.log(this.lesson_list_comment)
    },

    /**
     *   get all comments function
     **/
    getAllComments() {
      this.$store
        .dispatch("commentManage/getCommentList")
        .then(() => {
          this.filterComments();
          this.getLessonsForComment();
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
      this.selected_product_filter = this.product_filter;
    },

    /**
     *   mark commnets as read
     **/
    markAsRead() {
      var unreadComment = {};
      for (let i = 0; i < this.selected_unread_comments.length; i++) {
        unreadComment = this.selected_unread_comments[i];
        this.updateCommentStatus(unreadComment, "READ");
      }
    },

    /**
     *   delete comments
     **/
    deleteComment() {
      // if (this.currentTab == 0){
      //   var unreadComment={};
      //   for(let i = 0; i < this.selected_unread_comments.length; i++) {
      //     unreadComment = this.selected_unread_comments[i];
      //     this.updateCommentStatus(unreadComment, 'DELETE');
      //   }
      // } else {
      //   var readComment={};
      //   for(let i = 0; i < this.selected_read_comments.length; i++) {
      //     readComment = this.selected_read_comments[i];
      //     this.updateCommentStatus(readComment, 'DELETE');
      //   }
      // }
    },

    /**
     *   mark commnets as unread
     **/
    markAsUnread() {
      var readComment = {};
      for (let i = 0; i < this.selected_read_comments.length; i++) {
        readComment = this.selected_read_comments[i];
        this.updateCommentStatus(readComment, "UNREAD");
      }
    },

    /**
     *   restore comment
     **/

    restoreComment() {},
    /**
     *  update comment
     **/

    updateCommentStatus(comment, flag) {
      let tempcomment = Object.assign({}, comment);
      tempcomment.status = flag;
      this.$store
        .dispatch("commentManage/changeCommentStatus", tempcomment)
        .then(() => {
          this.filterComments();
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.selected_unread_comments = [];
          this.selected_delete_comments = [];
          this.selected_read_comments = [];
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
     *  filter comments;
     **/
    filterComments() {
      this.read_comment_list = [];
      this.unread_comment_list = [];
      this.delete_comment_list = [];
      for (let i = 0; i < this.comment_list.length; i++) {
        if (this.comment_list[i].status == "READ") {
          if (this.selected_product_filter == 1) {
            this.read_comment_list.push(this.comment_list[i]);
          } else if (
            this.selected_product_filter == this.comment_list[i].product_id
          ) {
            this.read_comment_list.push(this.comment_list[i]);
          }
        }

        if (this.comment_list[i].status == "UNREAD") {
          if (this.selected_product_filter == 1) {
            this.unread_comment_list.push(this.comment_list[i]);
          } else if (
            this.selected_product_filter == this.comment_list[i].product_id
          ) {
            this.unread_comment_list.push(this.comment_list[i]);
          }
        }

        if (this.comment_list[i].status == "DELETE") {
          if (this.selected_product_filter == 1) {
            this.delete_comment_list.push(this.comment_list[i]);
          } else if (
            this.selected_product_filter == this.comment_list[i].product_id
          ) {
            this.delete_comment_list.push(this.comment_list[i]);
          }
        }
      }
    },

    backToProducts() {
      this.$router.push("/products");
    },
  },
};
</script>
<style lang="scss">
vs-th {
  justify-content: center;
}

.comment-category {
  color: #6c757d;
  border-bottom: 3px solid #fff;
  &:hover {
    cursor: pointer;
  }
  &.filter-selected {
    color: rgb(18, 19, 22);
    border-bottom: 3px solid #3b68f1;
    transition: 1s;
  }
}
.vs-table--pagination {
  width: 99%;
}
.tr-comment td:nth-child(2) .vs-table-text {
  width: 70px;
}
.vs-con-table tr td.td-check {
  width: 20px;
  padding-top: 23px !important;
}
// .tr-comment td:last-child {
//   width: 350px;
// }

.tr-comment td:nth-child(2)  {
  width: 50px;
  padding-top: 10px ;
}

.tr-comment {
  vertical-align: top;
}

// @media only screen and (max-width: 767px) {
//   .tr-comment td:last-child {
//     width: 200px;
//   }
// }
</style>
