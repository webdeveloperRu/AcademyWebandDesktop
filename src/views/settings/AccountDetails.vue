<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-sm="12" vs-xs="12">
      <div class="mb-4">
        <span
          class="ml-2 mb-2 mt-2 primary-font"
          @click="backToSettings"
          style="cursor: pointer;"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Settings</span
        >
        <div class="d-flex mt-3">
          <h2>Account Details</h2>
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
          <div class="mt-2">Edit your account information, here.</div>
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
              v-model="account_name"
              class="w-100"
            />
            <vs-input
              label="Email"
              v-model="account_email"
              class="w-100 mt-3"
            />
            <vs-input
              label="Phone Number"
              v-model="phone_number"
              class="w-100 mt-3"
            />
            <vs-select
              class="w-100 mt-3"
              label="Time zone"
              v-model="account_time_zone"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in time_zones"
              />
            </vs-select>
            <vs-input
              label="Account ID"
              disabled
              v-model="account_ID"
              class="w-100 mt-3"
            />
            <label class="ml-2 mt-3"><b>Avatar</b></label>
            <div
              class="d-flex"
              style="align-items: center; justify-content: flex-start"
            >
              <vs-avatar size="100px" :src="avatar_url"></vs-avatar>
              <div class="ml-3">
                <div class="mb-3">
                  Recommended dimentions of
                  <strong>100<i class="mdi mdi-close"></i>100</strong>
                </div>
                <div
                  class="d-flex"
                  style="justify-content: flex-start; align-items: center;"
                >
                  <label class="avatar-select-button">
                    <input
                      type="file"
                      @change="onSelectAvatar"
                      style="overflow: hidden"
                      class="custom-file-input"
                      accept="image/png, image/jpeg"
                    />
                    Select Image
                  </label>
                  <vs-button
                    @click.native="onClickRemoveAvatar"
                    color="danger"
                    type="flat"
                    class="ml-3"
                    >Remove Image</vs-button
                  >
                </div>
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>

      <!-- 
        @@socail profile 
      -->
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Social Profile</h3>
          <div class="mt-2">
            Edit information displayed publicly in communities.
          </div>
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
            <label>Bio</label>
            <vs-textarea placeholder="" v-model="account_bio" class="w-100" />
            <vs-input
              label="Location"
              v-model="account_location"
              class="w-100 mt-3"
            />
          </vs-card>
        </vs-col>
      </vs-row>
      <div style="float: right">
        <vs-button class="mt-3" @click.native="saveAccountDetails">Save</vs-button>
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
import time_zone from "../../models/time_zone";
export default {
  name: "AccountDetails",

  data: () => ({
    account_name: "",
    account_ID: "",
    account_email: "",
    account_paypal_email: "",
    phone_number: "",
    account_time_zone: 0,
    time_zones: time_zone.time_zones,
    account_bio: "",
    account_location: "",
    avatar_url: "",
    avatar_file: null,
    updated_avatar: false,
  }),

  /**
   * --------------computed part-------------
   */
  computed: {
    user_logged: {
      get() {
        return this.$store.getters["auth/user_logged"];
      },
    },

    logged_user: {
      get() {
        return this.$store.getters["auth/logged_user"];
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

    account_details: {
      get() {
        return this.$store.getters["settingManage/account_details"];
      },
    },
  },

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.initAccountDetails();
  },

  /**
   * --------------method part-------------
   */
  methods: {
    initAccountDetails() {
      this.$store
        .dispatch("settingManage/getAccountDetails")
        .then(() => {
          this.account_name = this.account_details.name;
          this.account_ID = this.account_details.id;
          this.account_email = this.account_details.email;
          this.avatar_url = this.account_details.avatar;
          this.phone_number = this.account_details.phone;
          this.account_bio = this.account_details.social_bio;
          this.account_location = this.account_details.location;
          this.account_time_zone = this.account_details.time_zone;
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    onSelectAvatar(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.avatar_file = file;
        this.avatar_url = URL.createObjectURL(file);
        this.updated_avatar = true;
      }
    },

    onClickRemoveAvatar() {
      this.avatar_url = "";
      this.updated_avatar = true;
      this.avatar_file = null;
    },
    updateAvatar() {
      if (this.updated_avatar) {
        if (this.avatar_file == null) {
          this.$store
            .dispatch("settingManage/deleteAccountAvatar")
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
          this.updated_avatar = false;
        } else {
          this.$store
            .dispatch("settingManage/setAccountAvatar", this.avatar_file)
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
          this.updated_avatar = false;
        }
      }
    },

    saveAccountDetails() {
      let account_details = {
        name: this.account_name,
        email: this.account_email,
        phone: this.phone_number,
        time_zone: this.account_time_zone,
        social_bio: this.account_bio,
        location: this.account_location,
        avatar: this.avatar_file,
      };

      this.$store
        .dispatch("settingManage/setAccountDetails", account_details)
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
      this.updateAvatar();
    },

    backToSettings() {
      this.$router.push("/settings");
    },
  },
};
</script>
<style>
.avatar-select-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  margin: 0;
  padding: 0 10px;
  color: #0043d3;
  background-color: white;
  border: 1px solid #0043d3;
  border-radius: 0.3rem;
}
.avatar-select-button .custom-file-input {
  width: 300px;
}
input[type="file"] {
  display: none;
}
</style>
