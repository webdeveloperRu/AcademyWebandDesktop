<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-sm="12" vs-xs="12">
      <div class="mb-4">
        <span class="ml-2 mb-2 mt-2 primary-font"  @click="backToSubUsers" style="cursor: pointer;"><i class="ti-angle-left" style="font-size: 14px;"></i> Sub Users</span>
        <div class="d-flex mt-3">
          <h2>{{selected_subuser.name}}</h2>
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
      vs-lg="9"
      vs-sm="12"
      vs-xs="12"
      code-toggler
    >
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Details</h3>
          <div class="mt-2">Users can help run your sites with you.</div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-input
              label="Name"
              placeholder="Name"
              v-model="user_name"
              class="w-100"
            />
            <vs-input label="Email" v-model="user_email" class="w-100 mt-3" />
            <vs-input
              type="tel"
              label="Phone Number"
              v-model="phone_number"
              class="w-100 mt-3"
            />
            <!-- <vs-select class="w-100 mt-3" label="Time zone" v-model="time_zone">
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in time_zones"
              />
            </vs-select> -->
            <label class="mb-3 mt-3 " style="font-weight: 600;">Time Zone</label>
              <ModelSelect
                class="modelselect"
                :options="time_zones"
                v-model="selected_time_zone"
              >
              </ModelSelect>
            <vs-input
              label="Password"
              type="password"
              v-model="user_pw"
              class="w-100 mt-3"
            />
            <label>Leave blank if you don&#39;t want to update the password.</label>
            <vs-input
              label="Password Confirmation"
              type="password"
              v-model="user_pw_confirm"
              class="w-100 mt-3"
            />
          </vs-card>
        </vs-col>
      </vs-row>
    </vs-col>
    <vs-divider class="mb-5 mt-4" />

    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="9"
      vs-sm="12"
      vs-xs="12"
      code-toggler
    >
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>User Type</h3>
          <div class="mt-2">user type controls how much access the user has.</div>
          <a href="#" class="mt-2">Learn More</a>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <div class="d-flex w-100 mb-3 user-role">
              <vs-radio
                v-model="user_type"
                vs-name="user_type"
                vs-value="admin"
                class="m-0"
              >
                <h5 class="ml-3">Administrator</h5>
                <div class="ml-3">
                  Administrator has the same permission as owners, with the
                  exception of Stripe Connections.
                </div>
              </vs-radio>
            </div>
            <div class="d-flex w-100 mb-3 user-role">
              <vs-radio
                v-model="user_type"
                vs-name="user_type"
                vs-value="assistant"
                class="m-0"
              >
                <h5 class="ml-3">Assistant</h5>
                <div class="ml-3">
                  Assistant are able to delete and modify site content, but
                  cannot see financial report data.
                </div>
              </vs-radio>
            </div>
            <div class="d-flex w-100 user-role">
              <vs-radio
                v-model="user_type"
                vs-name="user_type"
                vs-value="support_specialist"
                class="m-0"
              >
                <h5 class="ml-3">Support Specialist</h5>
                <div class="ml-3">
                  Support Specialist can moderate site comments only.
                </div>
              </vs-radio>
            </div>
          </vs-card>
          <div style="float: right">
            <vs-button class="mt-3 mr-3" @click="activeConfirmDeleteUser=true" type="flat" color="danger">Delete User</vs-button>
            <vs-button class="mt-3" @click="updateUser">Save</vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vs-col>
    <!-- 
      @@subuser delete confirm popup
     -->
    <vs-popup class="subuser-delete primary-font" title="Are you sure?" :active.sync="activeConfirmDeleteUser">
      <br>
      <br>
      <h3 class="ml-5">Are you sure to delete this user?</h3>
      <br>
      <br>
     
      <div style="float: right" class="m-3">
        
        <vs-button color="primary" type="flat" @click="activeConfirmDeleteUser=false">Cancel</vs-button>
        <vs-button color="danger" type="filled" class="ml-2" @click="deleteUser"
          >Delete User</vs-button
        >
      </div>
    </vs-popup>
  </vs-row>
</template>
<script>
import { ModelSelect } from "vue-search-select";
import time_zone from '../../models/time_zone';
export default {
  name: "NewUser",

  components: {
    ModelSelect,
  },

  data: () => ({
    activeConfirmDeleteUser: false,
    user_name: "",
    user_email: "",
    phone_number: "",
    user_pw: "",
    user_pw_confirm: "",
    time_zones: time_zone.time_zones,
    selected_time_zone: "Etc/GMT+12",    
    user_type: "admin",
  }),
   /**
   * --------------computed part-------------
   */
  computed: {
    user_logged: {
      get() {
        return this.$store.getters["auth/user_logged"]
      }
    },

    notification_text:{
      get() {
        return this.$store.getters["notification_text"]
      }
    },

    notification_icon: {
      get() {
        return this.$store.getters["notification_icon"]
      }
    },

    notification_color: {
      get() {
        return this.$store.getters["notification_color"]
      }
    },

    status_got: {
      get () {
        return this.$store.getters["status_got"]
      }
    },

    subuser_list: {
      get () {
        return this.$store.getters["subuserManage/subuser_list"]
      }
    },
    selected_subuserID:{
      get() {
        var id = this.$route.params.subuser_id
        return id.slice(0, id.length);
      }
    },

    selected_subuser: {
      get() {
        let list = [];
        for (let i = 0; i < this.subuser_list.length; i++) {
          if( this.subuser_list[i].id == this.selected_subuserID) {
            list = this.subuser_list[i];
          }
        }
        return list;
      }
    }


  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch('changeSideBar', false)
    this.initSubUser();
  },

  /**
   * --------------method part-------------
   */
  methods: {
    /**
     * --------------init sub user-------------
     */
    initSubUser() {
      this.user_name = this.selected_subuser.name;
      this.user_email = this.selected_subuser.email;
      this.user_type = this.selected_subuser.user_type;
      this.selected_time_zone = this.selected_subuser.time_zone;
      this.phone_number = this.selected_subuser.phone;
    },
    /**
     * --------------back to sub users-------------
     */
    backToSubUsers() {
      this.$router.push('/settings/sub-users')
    },
  
    /**
     * --------------update sub users-------------
     */
    updateUser() {
      if(this.user_pw !== this.user_pw_confirm) {
        this.$vs.notify({
            color: "#ff3300",
            text: 'confirm password doesn\'t match with password ',
            icon: "warning"
          })
        return;
      }
      this.selected_subuser.name = this.user_name;
      this.selected_subuser.email = this.user_email;
      this.selected_subuser.time_zone = this.selected_time_zone;
      this.selected_subuser.password = this.user_pw;
      this.selected_subuser.user_type = this.user_type;
      this.selected_subuser.phone = this.phone_number;
      this.$store.dispatch('subuserManage/updateSubUserByID', this.selected_subuser).then(
        () => {
          this.$vs.notify({
            text: this.notification_text,
            icon: this.notification_icon,
            color: this.notification_color,
          })
        })
       .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon
          })
        })
    },

    /**
     * --------------delete account user-------------
     */
    deleteUser() {
      this.$store.dispatch('subuserManage/deleteSubUserByID', this.selected_subuser.id).then(
        () => {
          this.$router.push('/settings/sub-users')
        })
       .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon
          })
        })
      this.activeConfirmDeleteUser = false;
    }
  },
 
};
</script>
<style>
.user-role {
  justify-content: flex-start;
  align-items: center;
  border: 2px solid #e7e7e7e7;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #f3f3f3;
  height: 80px;
}
.subuser-delete .vs-popup--content {
  padding: 0;
  padding-left: 0;
  margin: 0;
  width: 100%;
}
.subuser-delete .vs-popup--header {
  background-color: #f62d51;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.subuser-delete .vs-icon {
  color: white;
}
.subuser-delete .vs-popup--title h3{
  font-size: 24px;
  color: white;
}
</style>