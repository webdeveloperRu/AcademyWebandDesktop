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
            <!-- 
              *** normal table headers
             -->
            <vs-th v-if="!all_Selected" sort-key="name"
              ><span class="primary-font">NAME</span></vs-th
            >
            <vs-th v-if="!all_Selected" sort-key="email"
              ><span class="primary-font">EMAIL</span></vs-th
            >
            <vs-th v-if="!all_Selected" sort-key="email_marketing"
              ><span class="primary-font">EMAIL MARKETING</span></vs-th
            >
            <vs-th v-if="!all_Selected" sort-key="join_date"
              ><span class="primary-font">JOIN DATE</span></vs-th
            >
            <vs-th v-if="!all_Selected" sort-key="last_activity"
              ><span class="primary-font">LAST ACTIVITY</span></vs-th
            >
            <vs-th v-if="!all_Selected"> </vs-th>
            <!-- 
              ** all selected headers.
             -->
            <vs-th v-if="all_Selected">
              <span class="primary-font" style="margin-right: 10px"
                >{{ selected_peoples.length }} Students selected</span
              >            
            </vs-th>
            <vs-th v-if="all_Selected">
                <dropdown :close-on-click="true">
                <template slot="btn">
                  <div style="width: 80px; height 30px;">Actions</div>
                </template>
                <template slot="body">
                  <dropdown
                    :trigger="'hover'"
                    :role="'sublist'"
                    :align="'right'"
                  >
                    <template slot="btn">
                      <div class="action-menu">Offers</div>
                    </template>
                    <template slot="body" class="action-menu">
                      <div
                        class="action-menu"
                        @click="activeBulkActionGrantOffer = true"
                      >
                        Grant Offer
                      </div>
                      <div class="action-menu">Revoke Offer</div>
                    </template>
                  </dropdown>
                  <!-- <dropdown
                    :trigger="'hover'"
                    :role="'sublist'"
                    :align="'right'"
                  >
                    <template slot="btn">
                      <div class="action-menu">
                        Sequences
                      </div>
                    </template>
                    <template slot="body" class="action-menu">
                      <div class="action-menu"> Subscribe to email sequence</div>
                      <div class="action-menu"> Unsubscribe to email sequence</div>
                    </template>
                  </dropdown>
                  <dropdown
                    :trigger="'hover'"
                    :role="'sublist'"
                    :align="'right'"
                  >
                    <template slot="btn">
                      <div class="action-menu">
                        Events
                      </div>
                    </template>
                    <template slot="body" class="action-menu">
                      <div class="action-menu"> Register to event</div>
                      <div class="action-menu"> Deregister from event</div>
                    </template>
                  </dropdown> -->

                  <dropdown
                    :trigger="'hover'"
                    :role="'sublist'"
                    :align="'right'"
                  >
                    <template slot="btn">
                      <div class="action-menu">Tags</div>
                    </template>
                    <template slot="body" class="action-menu">
                      <div
                        class="action-menu"
                        @click="activeBulkActionAddTags = true"
                      >
                        Add Tag
                      </div>
                      <div class="action-menu">Remove Tag</div>
                    </template>
                  </dropdown>
                  <div class="action-menu">Export</div>
                  <hr />
                  <div
                    class="action-menu"
                    @click="unsubscribePeopleConfirm = true"
                  >
                    Unsubscribe
                  </div>
                  <div
                    class="action-menu"
                    style="color: #bb0000"
                    @click="deletePeopleConfirm = true"
                  >
                    Delete
                  </div>
                </template>
              </dropdown>
            </vs-th>
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
                <i
                  class="mdi mdi-pencil mr-4 product-processing-icon"
                  style="font-size: 16px"
                  @click="linkToPeopleInfo(data[indextr].id)"
                ></i>
                <i
                  class="mdi mdi-delete mr-4 product-processing-icon"
                  style="font-size: 16px"
                  @click="confirmDeletePeopleByID(data[indextr].id)"
                ></i>
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
      ***@  --------bulk action grant offer ---------------
     -->
    <vs-popup
      class="bulk-grant-offer-dialog"
      color="success"
      :active.sync="activeBulkActionGrantOffer"
      title="Grant an Offer"
    >
      <div style="height: 150px; margin-top: 30px">
        <Multiselect
          v-model="bulkGrantOfferSelection"
          placeholder="Search or select offer"
          label="name"
          track-by="code"
          :options="grantofferlist"
          :multiple="true"
          :taggable="true"
        ></Multiselect>
      </div>
      <div
        style="display: flex; justify-content: flex-end; margin-bottom: 10px"
      >
        <vs-button
          class="ml-3 mr-3 save-cancel-button"
          @click="bulkActionGrantOffer"
          >Submit</vs-button
        >
      </div>
    </vs-popup>
    <!-- 
      ***@  --------bulk action add tags ---------------
     -->
    <vs-popup
      class="bulk-grant-offer-dialog"
      color="success"
      :active.sync="activeBulkActionAddTags"
      title="Add tags"
    >
      <div style="height: 150px; margin-top: 30px">
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
      <div
        style="display: flex; justify-content: flex-end; margin-bottom: 10px"
      >
        <vs-button
          class="ml-3 mr-3 save-cancel-button"
          @click="bulkActionAddTags"
          >Submit</vs-button
        >
      </div>
    </vs-popup>

    <!-- 
      @@ delete student popup
     -->
    <vs-popup title="Delete Students?" :active.sync="deletePeopleConfirm">
      <br /><br /><br />
      <h5 class="primary-font mb-2">
        Are you sure you want to bulk delete the selected stduents and all
        associated data?
      </h5>
      <h5 class="primary-font">This action cannot be undone.</h5>

      <br /><br /><br />
      <div class="btn-alignment text-right">
        <vs-button
          color="primary"
          type="flat"
          @click="deletePeopleConfirm = false"
          >Cancel</vs-button
        >
        <vs-button
          color="danger"
          type="filled"
          @click="bulkActionDeleteStudents"
          >Delete Students</vs-button
        >
      </div>
    </vs-popup>

    <!-- 
      @@ delete student by id popup
     -->
    <vs-popup title="Delete Students?" :active.sync="deletePeopleByIDConfirm">
      <br /><br /><br />
      <h5 class="primary-font mb-2">
        Are you sure you want to bulk delete this student and all associated
        data?
      </h5>
      <h5 class="primary-font">This action cannot be undone.</h5>

      <br /><br /><br />
      <div class="btn-alignment text-right">
        <vs-button
          color="primary"
          type="flat"
          @click="deletePeopleByIDConfirm = false"
          >Cancel</vs-button
        >
        <vs-button color="danger" type="filled" @click="deletePeopleByID"
          >Delete Student</vs-button
        >
      </div>
    </vs-popup>

    <!-- 
      @@ unsubscribe popup
     -->
    <vs-popup
      title="Unsubscribe Students?"
      :active.sync="unsubscribePeopleConfirm"
    >
      <br /><br /><br />
      <h5 class="primary-font mb-2">
        Are you sure you want to bulk unsubscribe the selected contacts?
      </h5>
      <h5 class="primary-font">This action cannot be undone.</h5>
      <br /><br /><br />
      <div class="btn-alignment text-right">
        <vs-button
          color="primary"
          type="flat"
          @click="unsubscribePeopleConfirm = false"
          >Cancel</vs-button
        >
        <vs-button color="danger" type="filled" @click="bulkActionUnsubscribe"
          >Unsubscribe</vs-button
        >
      </div>
    </vs-popup>
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
import VueCascaderSelect from "vue-cascader-select";
import Dropdown from "bp-vuejs-dropdown";
export default {
  name: "PeoplePage",
  components: {
    Multiselect,
    VueCascaderSelect,
    Dropdown,
  },
  data: () => ({
    searchpeopleItem: "",
    activeAddPeople: false,
    activeBulkActionGrantOffer: false,
    activeBulkActionAddTags: false,
    deletePeopleConfirm: false,
    unsubscribePeopleConfirm: false,
    deletePeopleByIDConfirm: false,

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
    all_Selected: false,

    bulkGrantOfferSelection: [],
    bulkActionSelectedTags: [],
    delete_people_id: "",
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
  watch: {
    // whenever question changes, this function will run
    selected_peoples: function(newPeoples, oldPeoples) {
      if (newPeoples.length != 0) {
        this.all_Selected = true;
      } else {
        this.all_Selected = false;
      }
    },

    activeBulkActionAddTags: function(newBulkAction, oldBulkAction) {
      if (newBulkAction) {
        this.peopleTags = [];
        this.selected_tag = [];
      }
    },
  },
  created() {
    this.$store.dispatch("changeSideBar", false);
    this.getPeopleList();
    this.getOfferList();
  },
  methods: {
    addTag(newTag) {
      this.added_tagChips.push(newTag);
      let tag = { code: this.peopleTags.length, name: newTag };
      this.peopleTags.push(tag);
    },
    getOfferList() {
      this.$store
        .dispatch("offerManage/getOfferList")
        .then(() => {
          // this.getPurchaseAndNetrevenue();
         
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    getPurchaseAndNetrevenue() {
      for (let i = 0; i < this.offer_list.length; i++) {
        this.$store
          .dispatch("offerManage/getOfferStats", [this.offer_list[i].id, 30])
          .then(() => {
            this.net_revenue30 += this.offer_stats[
              this.offer_list[i].id
            ].netRevenueCustom;
            this.net_revenueall += this.offer_stats[
              this.offer_list[i].id
            ].netRevenueAllTime;
            this.offer_purchases += this.offer_stats[
              this.offer_list[i].id
            ].total_purchases;
          });

        //  .catch(() => {
        //    this.$vs.notify({
        //       color: this.notification_color,
        //       text: this.notification_text,
        //       icon: this.notification_icon
        //     })
        //   });
      }
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
      this.$router.push("/people/contacts/tags");
    },

    /*
     ** link to people details
     */
    linkToPeopleDetails(people_id) {
      this.$router.push("/people/" + people_id);
    },

    linkToPeopleInfo(people_id) {
      this.$router.push("/people/" + people_id + "/edit");
    },
    deletePeopleByID(people_id) {
      alert("delte this people");
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
    /**
     * bulk action for grant offer
     */

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
    /**
     * bulkActionGrantOffer
     */

    async bulkActionGrantOffer() {
      this.grantOfferIDs = [];
      for (let i = 0; i < this.bulkGrantOfferSelection.length; i++) {
        this.grantOfferIDs[i] = this.bulkGrantOfferSelection[i].code;
      }
      let grantOfferData = [];
      this.$vs.loading({ type: "material" });
      for (let i = 0; i < this.selected_peoples.length; i++) {
        grantOfferData = [];
        for (
          let j = 0;
          j < this.selected_peoples[i].granted_access.length;
          j++
        ) {
          grantOfferData.push(
            this.selected_peoples[i].granted_access[j].offer_id
          );
        }
        for (let j = 0; j < this.grantOfferIDs.length; j++) {
          grantOfferData.push(this.grantOfferIDs[j]);
        }
        this.selected_peoples[i].granted_access = grantOfferData;
        await this.$store
          .dispatch("peopleManage/updatePeopleByID", [
            this.selected_peoples[i],
            this.selected_peoples[i].id,
          ])
          .then(() => {})
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }
      this.$vs.loading.close();
      this.activeBulkActionGrantOffer = false;
    },

    async bulkActionUnsubscribe() {
      this.$vs.loading({ type: "material" });
      for (let i = 0; i < this.selected_peoples.length; i++) {
        this.selected_peoples[i].is_subscribe = false;
        await this.$store
          .dispatch("peopleManage/updatePeopleByID", [
            this.selected_peoples[i],
            this.selected_peoples[i].id,
          ])
          .then(() => {})
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }
      this.$vs.loading.close();
      this.unsubscribePeopleConfirm = false;
    },

    async bulkActionAddTags() {
      this.$vs.loading({ type: "material" });
      let tags = [];
      for (let i = 0; i < this.selected_peoples.length; i++) {
        tags = [];
        for (let j = 0; j < this.selected_peoples[i].tags.length; j++) {
          tags.push({ title: this.selected_peoples[i].tags[j].title });
        }
        for (let j = 0; j < this.peopleTags.length; j++) {
          tags.push({ title: this.peopleTags[j].name });
        }
        this.selected_peoples[i].tags = tags;
        await this.$store
          .dispatch("peopleManage/updatePeopleByID", [
            this.selected_peoples[i],
            this.selected_peoples[i].id,
          ])
          .then(() => {})
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }
      this.$vs.loading.close();
      this.selected_tag = [];
      this.peopleTags = [];
      this.activeBulkActionAddTags = false;
    },
    /**
     * delete selected students
     */
    async bulkActionDeleteStudents() {
      this.deletePeopleConfirm = false;
      this.$vs.loading({ type: "material" });
      for (let i = 0; i < this.selected_peoples.length; i++) {
        await this.$store
          .dispatch(
            "peopleManage/deletePeopleByID",
            this.selected_peoples[i].id
          )
          .then(() => {})
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }
      this.$vs.loading.close();
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

    /**
     * confirmDeletePeopleByID
     */
    confirmDeletePeopleByID(people_id) {
      this.delete_people_id = people_id;
      this.deletePeopleByIDConfirm = true;
    },
    /**
     * delete people by id
     */
    async deletePeopleByID() {
      this.$vs.loading({ type: "material" });
      await this.$store
        .dispatch("peopleManage/deletePeopleByID", this.delete_people_id)
        .then(() => {
          this.deletePeopleByIDConfirm = false;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.deletePeopleByIDConfirm = false;
        });
      this.deletePeopleByIDConfirm = false;
      this.$vs.loading.close();


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
.action-menu {
  height: 30px;
  align-items: center;
  padding: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
  min-width: 180px;
}
.action-menu:hover {
  background: #eeeeee;
}
.bp-dropdown__btn {
  background: #eeeeee;
  border-radius: 3px;
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
