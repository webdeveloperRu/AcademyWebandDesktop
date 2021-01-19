<template>
<div>
  <vs-row vs-justify="center" class="primary-font">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="10" vs-xs="12" class="mb-3">
      <span class="ml-2 mt-2 primary-font" @click="backToPeoples" style="cursor: pointer;"><i class="ti-angle-left" style="font-size: 14px;"></i> Students</span>
      <h2 class="mt-3">{{ selected_people.name }}</h2>
    </vs-col>
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="7" vs-xs="12" code-toggler>
      <vs-card>
        <div class="d-flex" style="align-items: center">
          <div>
            <vs-avatar size="70px"></vs-avatar>
          </div>
          <div class="ml-3">
            <div>{{ selected_people.name }}</div>
            <div>{{ selected_people.email }}</div>
            <div>
              Added on: <strong>{{ selected_people.last_activity }}</strong>
            </div>
            <div>
              Member since: <strong>{{ selected_people.created_on }}</strong>
            </div>
          </div>
        </div>
      </vs-card>
      <vs-card>
        <vs-tabs>
          <vs-tab label="Lifecylce">
            <div class="con-tab-ejemplo">
              <div class="contact-lifecycle">
                <div class="contact-lifecycle-stats">
                  <div class="contact-lifecycle-stat">
                    <h2>13 days</h2>
                    <p>Lifespan</p>
                  </div>
                  <div class="contact-lifecycle-stat">
                    <h2>2</h2>
                    <p>Purchases</p>
                  </div>
                  <div class="contact-lifecycle-stat">
                    <h2>$0.00 USD</h2>
                    <p>Net Revenue</p>
                  </div>
                </div>
                <div class="contact-lifecycle-item">
                  <div class="media">
                    <div class="media-left">
                      <div class="contact-lifecycle-icon">
                        <i class="ti-credit-card" style="font-size: 20px;"></i>
                      </div>
                    </div>
                    <div class="media-body">
                      <p>Purchased <strong>offer1</strong> for <strong>free</strong></p>
                      <p>Jan 9, 2021 5:56AM</p>
                      <a href="#">View Offer</a>
                    </div>
                  </div>
                </div>

                <div class="contact-lifecycle-item">
                  <div class="media">
                    <div class="media-left">
                      <div class="contact-lifecycle-icon">
                        <i class="ti-credit-card" style="font-size: 20px;"></i>
                      </div>
                    </div>
                    <div class="media-body">
                      <p>Purchased <strong>offer2</strong> for <strong>free</strong></p>
                      <p>Jan 6, 2021 11:39AM</p>
                      <a href="#">View Offer</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </vs-tab>
          <vs-tab label="Info">
            <div class="con-tab-ejemplo">
              <div class="well">
                <div class="row">
                  <div class="col-md-6 px-3">
                    <dl class="dl-spaced">
                      <dt>Added on</dt>
                      <dd>January 06, 2021 11:39AM</dd>

                      <dt>Net Revenue</dt>
                      <dd>$0.00 USD</dd>

                      <dt>Email Marketing</dt>
                      <dd class="contact-subscribed">
                        Never Subscribed

                      </dd>
                    </dl>
                  </div>
                  <div class="col-md-6 px-3">
                    <dl class="dl-spaced">

                      <dt>Became a member on</dt>
                      <dd>January 06, 2021 11:39AM</dd>

                      <dt>Sign in count</dt>
                      <dd>5</dd>
                      <dt>Last activity at</dt>
                      <dd>January 17, 2021 03:05PM</dd>

                    </dl>
                  </div>
                </div>

              </div>
            </div>
          </vs-tab>
          <vs-tab label="Purchases">
            <div class="con-tab-ejemplo">
              <div class="list-group">
                <div class="list-group-item">
                  <div class="media">
                    <div class="media-body media-middle">
                      Purchased
                      <strong><a class="title" href="/admin/purchases/22739397">offer1</a></strong>
                      for
                      <strong>free</strong>
                      on
                      <i>Jan 9, 2021</i>
                    </div>
                    <div class="media-right media-middle">
                      <a class="btn btn-sm btn-link" href="/admin/purchases/22739397">View</a>
                    </div>
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="media">
                    <div class="media-body media-middle">
                      Purchased
                      <strong><a class="title" href="#">offer2</a></strong>
                      for
                      <strong>free</strong>
                      on
                      <i>Jan 6, 2021</i>
                    </div>
                    <div class="media-right media-middle">
                      <a class="btn btn-sm btn-link" href="#">View</a>
                    </div>
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="media">
                    <div class="media-body media-middle">
                      Purchased
                      <strong><a class="title" href="#">offer2</a></strong>
                      for
                      <strong>free</strong>
                      on
                      <i>Jan 6, 2021</i>
                    </div>
                    <div class="media-right media-middle">
                      <a class="btn btn-sm btn-link" href="#">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Products">
            <div class="con-tab-ejemplo">
              <div class="list-group">
                <div class="list-group-item">
                  <div class="media">
                    <div class="media-left media-middle">
                      <img height="45" class="image" src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/site/163062/products/GoUjV5oROC4DuS9GivmQ_img-8.jpg" alt="Goujv5oroc4dus9givmq img 8">
                    </div>
                    <div class="media-body media-middle">
                      <strong>Vue.js Tutorial</strong>
                      on <i>January 09, 2021</i>
                    </div>
                    <div class="media-right media-middle">
                      <a class="btn btn-sm btn-link" title="Progress" data-toggle="tooltip" href="#">
                        Progress
                      </a> </div>
                  </div>
                </div>
              </div>
            </div>
          </vs-tab>
          <vs-tab label="Notes">
            <div class="con-tab-ejemplo">
              <vs-textarea v-model="student_note" placeholder="Write your note here"></vs-textarea>
              <vs-button class="mt-2 mb-3 text-left"> Add Note </vs-button>
              <div class="well blank-slate">
                <strong>This student has no notes.</strong>
              </div>
              <div class="well">
                <p><strong>January 19, 2021 03:50PM</strong></p>
                <p>sdfsdfsdfsdfsdf</p>
                <vs-button color="danger">Delete</vs-button>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </vs-card>
    </vs-col>
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-xs="12" code-toggler>
      <vs-card>
        <div class="d-flex" style="align-items: center; justify-content: space-between">
          <h4>Tags</h4>
          <vs-button color="primary" type="flat" @click.native="linkToContactTag">View All Tags</vs-button>
        </div>
        <multiselect v-model="selected_tag" tag-placeholder="Add Tag" placeholder="Type to add a new tag..." label="name" taggable hideSelected @tag="addTag" track-by="code" :options="tags" :multiple="true"></multiselect>
        <div class="d-flex mt-3" style="flex-wrap: wrap">
          <vs-chip @click="remove(chip)" :key="chip" v-for="chip in added_tagChips" closable>{{ chip }}</vs-chip>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "AddTags",
  components: {
    Multiselect
  },

  data: () => ({
    selected_tag: [],
    student_note: "",
  }),

  watch: {
    // selected_tag: function(newValue) {
    // }
  },

  computed: {
    added_tagChips: {
      get() {
        let value = [];
        for (let i = 0; i < this.tags.length; i++) {
          value.push(this.tags[i].name);
        }
        return value;
      },
    },

    tags: {
      get() {
        let tags = [];
        for (let i = 0; i < this.selected_people.tags.length; i++) {
          tags[i] = {
            code: i,
            name: this.selected_people.tags[i].title
          };
        }
        return tags;
      },
    },

    people_id: {
      get() {
        var id = this.$route.params.people_id;
        return id.slice(0, id.length);
      },
    },

    people_list: {
      get() {
        return this.$store.getters["peopleManage/people_list"];
      },
    },

    selected_people: {
      get() {
        return this.$store.getters["peopleManage/current_people"];
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
  },

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.getCurrentPeople();
  },

  methods: {
    addTag(newTag) {
      this.added_tagChips.push(newTag);
      let tag = {
        title: newTag
      };
      this.selected_people.tags.push(tag);
      this.updatePeople(true);
    },
    getCurrentPeople() {
      this.$store
        .dispatch("peopleManage/getPeopleByID", this.people_id)
        .then(() => {});
    },

    updatePeople(flag) {
      let text = "";
      if (flag) text = "Successfully added tag";
      else text = "Successfully removed tag";
      this.$store
        .dispatch("peopleManage/updatePeopleByID", [
          this.selected_people,
          this.people_id,
        ])
        .then(() => {
          if (this.status_got) {
            this.$vs.notify({
              color: this.notification_color,
              text: text,
              icon: this.notification_icon,
            });
            this.getCurrentPeople();
          } else {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.getCurrentPeople();
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

    remove(item) {
      this.added_tagChips.splice(this.added_tagChips.indexOf(item), 1);
      for (let i = 0; i < this.selected_people.tags.length; i++) {
        if (this.selected_people.tags[i].title == item) {
          this.selected_people.tags.splice(i, 1);
          this.updatePeople(false);
        }
      }
    },

    linkToContactTag() {
      this.$router.push("/people/contacts/tags");
    },
    backToPeoples() {
      this.$router.push("/people");
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style>
.contact-lifecycle .contact-lifecycle-stats {
  margin-bottom: 30px;
  border: 1px solid #e5e9ed;
  font-size: 0;
  display: table;
  width: 100%;
}

.contact-lifecycle .contact-lifecycle-stat {
  display: table-cell;
  font-size: 16px;
  padding: 30px;
  text-align: center;
  border-right: 1px solid #e5e9ed;
}

.contact-lifecycle .contact-lifecycle-item {
  position: relative;
  padding: 20px;
  border: 1px solid #e5e9ed;
  margin-bottom: 45px;
}
.contact-lifecycle-stat p {
  margin:0;
}
.media:first-child {
  margin-top: 0;
}

.media,
.media-body {
  overflow: hidden;
  zoom: 1;
  align-items: center;
}

.media-left,
.media>.pull-left {
  padding-right: 10px;
}

.media-left,
.media-right,
.media-body {
  display: table-cell;
  vertical-align: top;
}

.media-middle {
  vertical-align: middle;
}

.contact-lifecycle-icon {
  width: 65px;
  text-align: center;
  padding: 20px;
  background: #f1f3f5;
  color: #748493;
  border: 1px solid #e5e9ed;
  margin-right: 10px;
  font-size: 20px;
  line-height: 1.2;
}

.contact-lifecycle-item p {
  margin-bottom: 0;
  font-size: 14px;
  color: #748493;
}

.well {
  padding: 20px;
  border: 1px solid #e5e9ed;
  background-color: #fdfdfd;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}

.dl-spaced dd {
  margin-bottom: 15px;
}

.list-group {
  margin-bottom: 0;
  border-radius: 3px;
  border-left: 1px solid #e5e9ed;
  border-right: 1px solid #e5e9ed;
}

.list-group-item:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

.list-group-item:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.list-group-item {
  padding: 20px 30px;
  width: 100%;
  border-color: #e5e9ed;
  border-left: none;
  border-right: none;
  display: table;
  font-size: 15px;
}

.list-group .media-body {
  line-height: 1.3;
}

@media (max-width: 991px) {
  .contact-lifecycle .contact-lifecycle-stat {
    display: block;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e9ed;
  }
}
</style>
