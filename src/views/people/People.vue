<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="10"
      vs-xs="12"
      vs-sm="12"
      code-toggler
    >
      <vs-row>
        <div class="ml-3 mb-4">
          <div class="d-flex mb-2">
            <h2>Students</h2>
            <i
              class="mdi mdi-help-circle-outline ml-1"
              style="color: #3b66ff; font-size: 22px"
            ></i>
          </div>
          <span
            class="ml-2 mt-1"
            style="cursor: pointer"
            @click="linkToContactTags"
            ><i class="mdi mdi-tag"></i> Manage Tags</span
          >
        </div>
        <vs-button
          style="margin-left: auto; height: 45px"
          class="mt-3 mr-3"
          @click="activeAddPeople = true"
          ><i class="mdi mdi-plus mr-2"></i>Add Student</vs-button
        >
      </vs-row>
    </vs-col>
    <!-- 
      ***@ --------main part---------------
     -->
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="10"
      vs-sm="12"
      vs-xs="12"
      code-toggler
    >
      <vs-card class="cardx">
        <!-- <div slot="header" class="d-flex">
          <h4
            class="ml-4 people-category"
            v-bind:class="[
              currentSelectedFilter == 0 ? 'filter-selected' : '',
            ]"
            v-on:click="setFilterItem(0)"
          >
            All
          </h4>
          <h4
            class="ml-4 people-category"
            v-bind:class="[
              currentSelectedFilter == 1 ? 'filter-selected' : '',
            ]"
            v-on:click="setFilterItem(1)"
          >
            Members
          </h4>
          <h4
            class="ml-4 people-category"
            v-bind:class="[
              currentSelectedFilter == 2 ? 'filter-selected' : '',
            ]"
            v-on:click="setFilterItem(2)"
          >
            Subscribed
          </h4>
          <h4
            class="ml-4 people-category"
            v-bind:class="[
              currentSelectedFilter == 3 ? 'filter-selected' : '',
            ]"
            v-on:click="setFilterItem(3)"
          >
            Inactive
          </h4>
          <h4
            class="ml-4 people-category"
            v-bind:class="[
              currentSelectedFilter == 4 ? 'filter-selected' : '',
            ]"
            v-on:click="setFilterItem(4)"
          >
            Hard Bounced
          </h4>
        </div> -->
        <!-- 
          ***@ --------search and filter---------------
        -->

        <div class="ml-3">
          <p class="people-records">
            Displaying<span style="font-weight: 500">
              {{ people_records }}</span
            >
            students
          </p>
        </div>

        <!-- 
          ***@ --------people data show part start---------------
        -->

        <vs-table
          id="contact-table"
          ref="table"
          multiple
          hoverFlat
          v-model="selected_peoples"
          pagination
          max-items="5"
          search
          :data="people_list"
          class="people-data-table"
        >
          <div slot="header"></div>
          <template slot="thead">
            <vs-th sort-key="name"
              ><span class="primary-font">NAME</span></vs-th
            >
            <vs-th sort-key="email"
              ><span class="primary-font">EMAIL</span></vs-th
            >
            <vs-th sort-key="email_marketing"
              ><span class="primary-font">EMAIL MARKETING</span></vs-th
            >
            <vs-th sort-key="join_date"
              ><span class="primary-font">JOIN DATE</span></vs-th
            >
            <vs-th sort-key="last_activity"
              ><span class="primary-font">LAST ACTIVITY</span></vs-th
            >
            <vs-th></vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].name">
                <div
                  class="d-flex no-block align-items-center"
                  @click="linkToPeopleDetails(data[indextr].id)"
                >
                  <div class="mr-2">
                    <vs-avatar></vs-avatar>
                  </div>
                  <div class="people-name">
                    <span class="primary-font">{{ data[indextr].name }}</span>
                  </div>
                </div>
                <template slot="edit"> </template>
              </vs-td>

              <vs-td :data="data[indextr].email">
                <div class="d-flex align-items-center">
                  <span class="primary-font">{{ data[indextr].email }}</span>
                </div>
              </vs-td>

              <vs-td :data="data[indextr].email_marketing">
                <span class="primary-font">{{
                  data[indextr].email_marketing
                }}</span>
              </vs-td>

              <vs-td :data="data[indextr].created_on">
                <div class="d-flex align-items-center">
                  <span class="primary-font">{{
                    data[indextr].created_on
                  }}</span>
                </div>
              </vs-td>

              <vs-td :data="data[indextr].last_activity">
                <span class="primary-font">{{
                  data[indextr].last_activity
                }}</span>
              </vs-td>

              <vs-td>
                <!-- <vs-button class="action-button">sdfsdf</vs-button> -->
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <!-- 
          ***@ --------peoples data show part end---------------
        -->

        <!-- 
          ***@ --------people items records---------------
        -->
      </vs-card>
    </vs-col>
    <!-- 
      ***@  --------add People ---------------
     -->
    <vs-popup
      color="success"
      :active.sync="activeAddPeople"
      title="Add a student"
    >
      <vs-row class="px-5">
        <vs-col>
          <vs-input
            v-model="peopleName"
            class="w-100 mt-2"
            label="Name"
          ></vs-input>
          <vs-input
            label="Email"
            v-model="peopleEmail"
            class="w-100 mt-2"
            type="email"
          ></vs-input>
          <!-- 
          @@ show grant offer part
           -->
          <div class="mt-3 mb-3">
            <vs-checkbox
              class="justify-content-start"
              v-model="grantofferStatus"
              >Grant offer</vs-checkbox
            >
          </div>
          <div v-if="grantofferStatus">
            <Multiselect
              v-model="grantOfferSelection"
              placeholder="Search or select offer"
              label="name"
              track-by="code"
              :options="grantofferlist"
              :multiple="true"
              :taggable="true"
            ></Multiselect>
            <span>
              <i
                >People granted access to an offer will receive a
                <a href="">Member Welcome Email</a> containing their username
                and password.</i
              ></span
            ><br />
            <span><a href="#">Edit your offers</a></span>
          </div>
          <!-- 
            @@show add tag part
           -->
          <div class="mt-3">
            <vs-checkbox class="justify-content-start" v-model="addTags"
              >Add tags</vs-checkbox
            >
          </div>
          <div class="mt-3" v-if="addTags">
            <multiselect
              v-model="selected_tag"
              tag-placeholder="Add Tag"
              placeholder="Type to add a new tag..."
              label="name"
              taggable
              hideSelected
              @tag="addTag"
              track-by="code"
              :options="peopleTags"
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
          </div>
          <!-- 
            @@show marketing email part
           -->

          <div class="mt-3">
            <vs-checkbox
              class="justify-content-start"
              v-model="subscribeMarketingEmail"
              >Subscribe to marketing emails</vs-checkbox
            >
          </div>
          <div class="d-flex mt-3">
            <vs-button
              color="dark"
              type="border"
              class="save-cancel-button"
              style="margin-left: auto"
              @click="cancelAddPeople"
              >Cancel</vs-button
            >
            <vs-button class="ml-3 mr-3 save-cancel-button" @click="addPeople"
              >Save</vs-button
            >
          </div>
        </vs-col>
      </vs-row>
    </vs-popup>
  </vs-row>
</template>

<script>
import People from "../../models/people";
import Multiselect from "vue-multiselect";
export default {
  name: "PeoplePage",
  components: {
    Multiselect,
  },
  data: () => ({
    searchpeopleItem: "",
    activeAddPeople: false,

    // people data
    people: new People("", ""),
    peopleName: "",
    peopleEmail: "",
    peopleTags: [],
    peopleAddress: [],
    peopleActive: false,
    peopleGrantedAccess: [],
    peopleNota: null,

    grantofferStatus: false,
    addTags: false,
    subscribeMarketingEmail: false,
    grantOfferSelection: [],
    grantOfferIDs: [],
    updatedTable: 0,

    options4: [
      { text: "Filters", value: 1 },
      { text: "item1", value: 2 },
      { text: "itme2", value: 3 },
      { text: "item3", value: 4 },
    ],
    paginationtable: false,
    currentSelectedFilter: 0,
    people_filter: 1,
    search_people_item: "",
    selected_peoples: [],
    selected_tag: [],
  }),

  computed: {
    added_tagChips: {
      get() {
        let value = [];
        for (let i = 0; i < this.peopleTags.length; i++) {
          value.push(this.peopleTags[i].name);
        }
        return value;
      },
    },
    people_records: function() {
      return this.people_list.length;
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
    offer_list: {
      get() {
        return this.$store.getters["offerManage/offer_list"];
      },
    },
    grantofferlist: {
      get() {
        let list = [];
        for (let i = 0; i < this.offer_list.length; i++) {
          list[i] = {
            code: this.offer_list[i].id,
            name: this.offer_list[i].name,
          };
        }
        return list;
      },
    },

    people_list: {
      get() {
        return this.$store.getters["peopleManage/people_list"];
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", false);
    this.getPeopleList();
  },
  methods: {
    addTag(newTag) {
      this.added_tagChips.push(newTag);
      let tag = { code: this.peopleTags.length, name: newTag };
      this.peopleTags.push(tag);
    },

    /*
     ** View Edit item hover processing
     */
    getPeopleList() {
      this.$store
        .dispatch("peopleManage/getPeopleList")
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
     * @@ linkToContactTags
     */
    linkToContactTags() {
      this.$router.push("/people/" + this.people_id + "/contact-tag");
    },

    /*
     ** link to people details
     */
    linkToPeopleDetails(people_id) {
      this.$router.push("/people/edit-people/" + people_id);
    },

    /*
     ** View Chart item click processing
     */
    onDeletePeople(people_id) {
      this.$store
        .dispatch("peopleManage/deletePeopleByID", people_id)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.updatedTable++;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },
    /*
     ** selecte people
     */
    setFilterItem(index) {
      this.currentSelectedFilter = index;
    },

    cancelAddPeople() {
      this.grantofferStatus = false;
      this.addTags = false;
      this.subscribeMarketingEmail = false;
      this.activeAddPeople = false;
    },

    /**
     * remove tags
     */
    remove(item) {
      this.added_tagChips.splice(this.added_tagChips.indexOf(item), 1);
      for (let i = 0; i < this.peopleTags.length; i++) {
        if (this.peopleTags[i].name == item) {
          this.peopleTags.splice(i, 1);
        }
      }
    },

    /*
     ** Add people
     */
    addPeople() {
      if (this.peopleName == "" || this.peopleEmail == "") {
        this.$vs.notify({
          color: this.$custom_warning,
          icon: "warning",
          text: "people name and email input must be filled",
        });
      } else {
        for (let i = 0; i < this.grantOfferSelection.length; i++) {
          this.grantOfferIDs[i] = this.grantOfferSelection[i].code;
        }
        let tags = [];
        for (let i = 0; i < this.peopleTags.length; i++) {
          tags.push({ title: this.peopleTags[i].name });
        }
        this.people.name = this.peopleName;
        this.people.email = this.peopleEmail;
        this.people.granted_access = this.grantOfferIDs;
        this.people.is_active = this.peopleActive;
        this.people.tags = tags;
        this.people.nota = this.peopleNota;
        this.people.is_subscribe = this.subscribeMarketingEmail;
        this.people.address = this.peopleAddress;
        this.$store
          .dispatch("peopleManage/addPeople", this.people)
          .then(() => {
            // this.$vs.notify({
            //     color: this.notification_color,
            //     text: this.notification_text,
            //     icon: this.notification_icon
            //   })
            this.updatedTable++;
            this.grantofferStatus = false;
            this.addTags = false;
            this.subscribeMarketingEmail = false;
            this.linkToPeopleDetails(
              this.people_list[this.people_list.length - 1].id
            );
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
        this.grantofferStatus = false;
        this.addTags = false;
        this.subscribeMarketingEmail = false;
        this.activeAddPeople = false;
      }
    },
  },
};
</script>
<style lang="scss">
.ps {
  height: 100px;
}

vs-th {
  justify-content: center;
}
vs-row td {
  text-align: center;
}
.people-records {
  color: #6c757d;
  font-size: 16px;
}
.people-view-icon {
  font-size: 25px;
}
.people-category {
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
.people-action-icon {
  visibility: hidden;
}
.tr-values:hover .people-action-icon {
  visibility: visible;
}
.contactmail:hover {
  color: red;
}
.people-action-icon .product-processing-icon:hover {
  color: #08800c;
}
.action-button {
  position: relative;
  z-index: 1000;
}

.people-data-table .vs-table--search {
  max-width: 100%;
  width: 100%;
}
.people-data-table .vs-table--search-input {
  width: 100%;
}

.people-name:hover {
  text-decoration: underline;
}

@media only screen and (max-width: 1000px) {
  .people-data-table th:nth-last-child(3) {
    display: none;
  }
  .people-data-table td:nth-last-child(3) {
    display: none;
  }
  .people-data-table th:nth-last-child(2) {
    display: none;
  }
  .people-data-table td:nth-last-child(2) {
    display: none;
  }
}
</style>
