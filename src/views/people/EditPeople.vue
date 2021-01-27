<template>
  <div>
    <vs-row vs-justify="center" class="primary-font">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="10"
        vs-xs="12"
        class="mb-3"
      >
        <span
          class="ml-2 mt-2 primary-font"
          @click="backToPeoples"
          style="cursor: pointer"
          ><i class="ti-angle-left" style="font-size: 14px"></i> Students</span
        >
        <h2 class="mt-3">{{ selected_people.name }}</h2>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="7"
        vs-xs="12"
        code-toggler
      >
        <vs-card>
          <div class="d-flex" style="align-items: center">
            <div>
              <vs-avatar size="70px"></vs-avatar>
            </div>
            <div class="ml-3">
              <div>{{ selected_people.name }}</div>
              <div>{{ selected_people.email }}</div>
              <div>
                Added on: <strong>{{ selected_people.created_on }}</strong>
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
                      <h2>
                        {{
                          timeDifference(Date.now(), selected_people.created_on)
                        }}
                      </h2>
                      <p>Lifespan</p>
                    </div>
                    <div class="contact-lifecycle-stat">
                      <h2 v-if="selected_people.granted_access">{{ selected_people.granted_access.length }}</h2>
                      <p>Purchases</p>
                    </div>
                    <div class="contact-lifecycle-stat">
                      <h2>$0.00 USD</h2>
                      <h5 class="mb-1 mt-1" style="color: red">
                        (student property doesn't contatin this info)
                      </h5>
                      <p>Net Revenue</p>
                    </div>
                  </div>
                  <div
                    class="contact-lifecycle-item"
                    v-for="offer in selected_people.granted_access"
                    v-bind:key="offer.offer_id"
                  >
                    <div class="media">
                      <div class="media-left">
                        <div class="contact-lifecycle-icon">
                          <i class="ti-credit-card" style="font-size: 20px"></i>
                        </div>
                      </div>
                      <div class="media-body">
                        <p>
                          Purchased <strong>{{ offer.title }}</strong> for
                          <strong>{{ getPrice(offer.price) }}</strong>
                        </p>
                        <p style="color: red">
                          can not get purchased date (no data)
                        </p>
                        <div
                          class="view-offer"
                          @click="viewOffer(offer.offer_id)"
                        >
                          View Offer
                        </div>
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
                        <dd>{{ selected_people.created_on }}</dd>

                        <dt>Net Revenue</dt>
                        <dd style="color: red">$0.00 USD (no data)</dd>

                        <dt>Email Marketing</dt>
                        <dd
                          class="contact-subscribed"
                          v-if="selected_people.is_subscribe == false"
                        >
                          Never Subscribed
                        </dd>
                        <dd class="contact-subscribed" v-else>Subscribed</dd>
                      </dl>
                    </div>
                    <div class="col-md-6 px-3">
                      <dl class="dl-spaced">
                        <dt>Became a member on</dt>
                        <dd>{{ selected_people.created_on }}</dd>

                        <dt>Sign in count</dt>
                        <dd style="color: red">no data in student</dd>
                        <dt>Last activity at</dt>
                        <dd>{{ selected_people.last_activity }}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </vs-tab>
            <vs-tab label="Purchases">
              <div class="con-tab-ejemplo">
                <div class="list-group">
                  <div
                    class="list-group-item"
                    v-for="offer in selected_people.granted_access"
                    v-bind:key="offer.offer_id"
                  >
                    <div class="media">
                      <div class="media-body media-middle">
                        Purchased
                        <strong
                          ><a class="title" href="/admin/purchases/22739397">{{
                            offer.title
                          }}</a></strong
                        >
                        for
                        <strong>{{ getPrice(offer.price) }}</strong>
                        on
                        <i>can't know date of purchased</i>
                      </div>
                      <div class="media-right media-middle">
                        <div
                          class="view-offer"
                          @click="viewOffer(offer.offer_id)"
                        >
                          View
                        </div>
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
                    <div
                      class="media mb-3"
                      v-for="product in purchased_products"
                      v-bind:key="product.id"
                    >
                      <div class="media-left media-middle mr-3">
                        <img
                          height="45"
                          class="image"
                          :src="product.thumbnail"
                          alt="Goujv5oroc4dus9givmq img 8"
                        />
                      </div>
                      <div class="media-body media-middle">
                        <div style="font-size: 16px" class="mb-2">
                          <strong>{{ product.title }}</strong>
                        </div>
                        <div style="font-size: 14px">
                          <i>{{ product.created_on }}</i>
                        </div>
                      </div>
                      <div class="media-right media-middle">
                        <a
                          class="btn btn-sm btn-link"
                          title="Progress"
                          data-toggle="tooltip"
                          href="#"
                        >
                          Progress
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vs-tab>
            <!-- <vs-tab label="Notes">
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
          </vs-tab> -->
          </vs-tabs>
        </vs-card>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="3"
        vs-xs="12"
        code-toggler
      >
        <vs-card>
          <div
            class="d-flex"
            style="align-items: center; justify-content: space-between"
          >
            <h4>Tags</h4>
            <vs-button
              color="primary"
              type="flat"
              @click.native="linkToContactTag"
              >View All Tags</vs-button
            >
          </div>
          <multiselect
            v-model="selected_tag"
            tag-placeholder="Add Tag"
            placeholder="Type to add a new tag..."
            label="name"
            taggable
            hideSelected
            @tag="addTag"
            track-by="code"
            :options="tags"
            :multiple="true"
          ></multiselect>
          <div class="d-flex mt-3" style="flex-wrap: wrap">
            <vs-chip
              @click="remove(chip)"
              :key="chip"
              v-for="chip in added_tagChips"
              closable
              >{{ chip }}</vs-chip
            >
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "EditPeople",
  components: {
    Multiselect,
  },

  data: () => ({
    selected_tag: [],
    student_note: "",
    purchased_products: [],
  }),

  watch: {
    // selected_tag: function(newValue) {
    // }
  },

  computed: {
    added_tagChips: {
      get() {
        let value = [];
        if (this.tags != undefined) {
          for (let i = 0; i < this.tags.length; i++) {
            value.push(this.tags[i].name);
          }
        }
        return value;
      },
    },

    tags: {
      get() {
        let tags = [];
        if (this.selected_people.tags != undefined) {
          for (let i = 0; i < this.selected_people.tags.length; i++) {
            tags[i] = {
              code: i,
              name: this.selected_people.tags[i].title,
            };
          }
        }
        return tags;
      },
    },

    people_id: {
      get() {
        var id = this.$route.params.people_id;
        if (id != undefined) return id.slice(0, id.length);
        else return "";
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

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },

    offer_list: {
      get() {
        return this.$store.getters["offerManage/offer_list"];
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", "default");
    this.getCurrentPeople();
  },

  methods: {
    addTag(newTag) {
      this.added_tagChips.push(newTag);
      let tag = {
        title: newTag,
      };
      this.selected_people.tags.push(tag);
      this.updatePeople(true);
    },
    getCurrentPeople() {
      this.$store
        .dispatch("peopleManage/getPeopleByID", this.people_id)
        .then(() => {
          if (this.status_got) {
            this.getPurchasedProducts();
          }
        });
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
      if (this.selected_people.tags != undefined) {
        for (let i = 0; i < this.selected_people.tags.length; i++) {
          if (this.selected_people.tags[i].title == item) {
            this.selected_people.tags.splice(i, 1);
            this.updatePeople(false);
          }
        }
      }
    },

    linkToContactTag() {
      this.$router.push("/people/contacts/tags");
    },
    backToPeoples() {
      this.$router.push("/people");
    },

    timeDifference(current, previous) {
      previous = new Date(previous);

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " seconds ago";
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago";
      } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + " days ago";
      } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + " months ago";
      } else {
        return Math.round(elapsed / msPerYear) + " years ago";
      }
    },

    getPrice(price) {
      if (price == 0) return "free";
      else return "$" + price + USD;
    },

    viewOffer(offer_id) {
      this.$router.push("/offers/edit-offer/" + offer_id);
    },

    getPurchasedProducts() {
      let offer_data = null;
      let product_data = [];
      let purchased_products = [];
      let count = 0;
      let already_exist = false;
      if (this.selected_people.granted_access == undefined) return;
      for (let i = 0; i < this.selected_people.granted_access.length; i++) {
        offer_data = null;
        for (let j = 0; j < this.offer_list.length; j++) {
          if (
            this.offer_list[j].id ==
            this.selected_people.granted_access[i].offer_id
          ) {
            offer_data = this.offer_list[j];
          }
        }
        if (offer_data != null) {
          for (let j = 0; j < offer_data.products_count; j++) {
            for (let k = 0; k < this.product_list.length; k++) {
              if (offer_data.products[j] == this.product_list[k].id) {
                already_exist = false;
                for (let m = 0; m < purchased_products.length; m++) {
                  if (purchased_products[m].id == this.product_list[k].id) {
                    already_exist = true;
                  }
                }
                if (already_exist == false) {
                  purchased_products[count] = this.product_list[k];
                  count++;
                }
              }
            }
          }
        }
      }
      this.purchased_products = purchased_products;
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
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
  margin: 0;
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
.media > .pull-left {
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

.view-offer {
  color: #1551c0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
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
