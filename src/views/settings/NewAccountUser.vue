<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-sm="12" vs-xs="12">
      <div class="mb-4">
        <span
          class="ml-2 mb-2 mt-2 primary-font"
          @click="backToSubUsers"
          style="cursor: pointer;"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Sub
          Users</span
        >
        <div class="d-flex mt-3">
          <h2>New User</h2>
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
            <label class="mb-3 mt-3 " style="font-weight: 600;"
              >Time Zone</label
            >
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
          <div class="mt-2">
            user type controls how much access the user has.
          </div>
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
            <vs-button class="mt-3" @click.native="createNewUser">Save</vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vs-col>
  </vs-row>
</template>
<script>
import { ModelSelect } from "vue-search-select";
import AccountUser from "../../models/account_user";
export default {
  name: "NewUser",

  components: {
    ModelSelect,
  },

  data: () => ({
    user_name: "",
    user_email: "",
    phone_number: "",
    user_pw: "",
    user_pw_confirm: "",
    selected_time_zone: "Etc/GMT+12",
    sub_user: new AccountUser("", ""),
    time_zones: [
      { text: "(GMT-12:00) International Date Line West", value: "Etc/GMT+12" },
      { text: "(GMT-11:00) Midway Island, Samoa", value: "Pacific/Midway" },
      { text: "(GMT-10:00) Hawaii", value: "Pacific/Honolulu" },
      { text: "(GMT-09:00) Alaska", value: "US/Alaska" },
      {
        text: "(GMT-08:00) Pacific Time (US & Canada)",
        value: "America/Los_Angeles",
      },
      {
        text: "(GMT-08:00) Tijuana, Baja California",
        value: "America/Tijuana",
      },
      { text: "(GMT-07:00) Arizona", value: "US/Arizona" },
      {
        text: "(GMT-07:00) Chihuahua, La Paz, Mazatlan",
        value: "America/Chihuahua",
      },
      { text: "(GMT-07:00) Mountain Time (US & Canada)", value: "US/Mountain" },
      { text: "(GMT-06:00) Central America", value: "America/Managua" },
      { text: "(GMT-06:00) Central Time (US & Canada)", value: "US/Central" },
      {
        text: "(GMT-06:00) Guadalajara, Mexico City, Monterrey",
        value: "America/Mexico_City",
      },
      { text: "(GMT-06:00) Saskatchewan", value: "Canada/Saskatchewan" },
      {
        text: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco",
        value: "America/Bogota",
      },
      { text: "(GMT-05:00) Eastern Time (US & Canada)", value: "US/Eastern" },
      { text: "(GMT-05:00) Indiana (East)", value: "US/East-Indiana" },
      { text: "(GMT-04:00) Atlantic Time (Canada)", value: "Canada/Atlantic" },
      { text: "(GMT-04:00) Caracas, La Paz", value: "America/Caracas" },
      { text: "(GMT-04:00) Manaus", value: "America/Manaus" },
      { text: "(GMT-04:00) Santiago", value: "America/Santiago" },
      { text: "(GMT-03:30) Newfoundland", value: "Canada/Newfoundland" },
      { text: "(GMT-03:00) Brasilia", value: "America/Sao_Paulo" },
      {
        text: "(GMT-03:00) Buenos Aires, Georgetown",
        value: "America/Argentina/Buenos_Aires",
      },
      { text: "(GMT-03:00) Greenland", value: "America/Godthab" },
      { text: "(GMT-03:00) Montevideo", value: "America/Montevideo" },
      { text: "(GMT-02:00) Mid-Atlantic", value: "America/Noronha" },
      { text: "(GMT-01:00) Cape Verde Is.", value: "Atlantic/Cape_Verde" },
      { text: "(GMT-01:00) Azores", value: "Atlantic/Azores" },
      {
        text: "(GMT+00:00) Casablanca, Monrovia, Reykjavik",
        value: "Africa/Casablanca",
      },
      {
        text:
          "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London",
        value: "Etc/Greenwich",
      },
      {
        text: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
        value: "Europe/Amsterdam",
      },
      {
        text: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
        value: "Europe/Belgrade",
      },
      {
        text: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris",
        value: "Europe/Brussels",
      },
      {
        text: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
        value: "Europe/Sarajevo",
      },
      { text: "(GMT+01:00) West Central Africa", value: "Africa/Lagos" },
      { text: "(GMT+02:00) Amman", value: "Asia/Amman" },
      {
        text: "(GMT+02:00) Athens, Bucharest, Istanbul",
        value: "Europe/Athens",
      },
      { text: "(GMT+02:00) Beirut", value: "Asia/Beirut" },
      { text: "(GMT+02:00) Cairo", value: "Africa/Cairo" },
      { text: "(GMT+02:00) Harare, Pretoria", value: "Africa/Harare" },
      {
        text: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
        value: "Europe/Helsinki",
      },
      { text: "(GMT+02:00) Jerusalem", value: "Asia/Jerusalem" },
      { text: "(GMT+02:00) Minsk", value: "Europe/Minsk" },
      { text: "(GMT+02:00) Windhoek", value: "Africa/Windhoek" },
      { text: "(GMT+03:00) Kuwait, Riyadh, Baghdad", value: "Asia/Kuwait" },
      {
        text: "(GMT+03:00) Moscow, St. Petersburg, Volgograd",
        value: "Europe/Moscow",
      },
      { text: "(GMT+03:00) Nairobi", value: "Africa/Nairobi" },
      { text: "(GMT+03:00) Tbilisi", value: "Asia/Tbilisi" },
      { text: "(GMT+03:30) Tehran", value: "Asia/Tehran" },
      { text: "(GMT+04:00) Abu Dhabi, Muscat", value: "Asia/Muscat" },
      { text: "(GMT+04:00) Baku", value: "Asia/Baku" },
      { text: "(GMT+04:00) Yerevan", value: "Asia/Yerevan" },
      { text: "(GMT+04:30) Kabul", value: "Asia/Kabul" },
      { text: "(GMT+05:00) Yekaterinburg", value: "Asia/Yekaterinburg" },
      {
        text: "(GMT+05:00) Islamabad, Karachi, Tashkent",
        value: "Asia/Karachi",
      },
      {
        text: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
        value: "Asia/Calcutta",
      },
      { text: "(GMT+05:30) Sri Jayawardenapura", value: "Asia/Calcutta" },
      { text: "(GMT+05:45) Kathmandu", value: "Asia/Katmandu" },
      { text: "(GMT+06:00) Almaty, Novosibirsk", value: "Asia/Almaty" },
      { text: "(GMT+06:00) Astana, Dhaka", value: "Asia/Dhaka" },
      { text: "(GMT+06:30) Yangon (Rangoon)", value: "Asia/Rangoon" },
      { text: "(GMT+07:00) Bangkok, Hanoi, Jakarta", value: "Asia/Bangkok" },
      { text: "(GMT+07:00) Krasnoyarsk", value: "Asia/Krasnoyarsk" },
      {
        text: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
        value: "Asia/Hong_Kong",
      },
      {
        text: "(GMT+08:00) Kuala Lumpur, Singapore",
        value: "Asia/Kuala_Lumpur",
      },
      { text: "(GMT+08:00) Irkutsk, Ulaan Bataar", value: "Asia/Irkutsk" },
      { text: "(GMT+08:00) Perth", value: "Australia/Perth" },
      { text: "(GMT+08:00) Taipei", value: "Asia/Taipei" },
      { text: "(GMT+09:00) Osaka, Sapporo, Tokyo", value: "Asia/Tokyo" },
      { text: "(GMT+09:00) Seoul", value: "Asia/Seoul" },
      { text: "(GMT+09:00) Yakutsk", value: "Asia/Yakutsk" },
      { text: "(GMT+09:30) Adelaide", value: "Australia/Adelaide" },
      { text: "(GMT+09:30) Darwin", value: "Australia/Darwin" },
      { text: "(GMT+10:00) Brisbane", value: "Australia/Brisbane" },
      {
        text: "(GMT+10:00) Canberra, Melbourne, Sydney",
        value: "Australia/Canberra",
      },
      { text: "(GMT+10:00) Hobart", value: "Australia/Hobart" },
      { text: "(GMT+10:00) Guam, Port Moresby", value: "Pacific/Guam" },
      { text: "(GMT+10:00) Vladivostok", value: "Asia/Vladivostok" },
      {
        text: "(GMT+11:00) Magadan, Solomon Is., New Caledonia",
        value: "Asia/Magadan",
      },
      { text: "(GMT+12:00) Auckland, Wellington", value: "Pacific/Auckland" },
      {
        text: "(GMT+12:00) Fiji, Kamchatka, Marshall Is.",
        value: "Pacific/Fiji",
      },
      { text: "(GMT+13:00) Nuku'alofa", value: "Pacific/Tongatapu" },
    ],
    user_type: "admin",
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

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", 'default');
  },

  /**
   * --------------method part-------------
   */
  methods: {
    /**
     * --------------back to account users-------------
     */
    backToSubUsers() {
      this.$router.push("/settings/sub-users");
    },

    /**
     * --------------back to account users-------------
     */
    createNewUser() {
      if (this.user_pw !== this.user_pw_confirm) {
        this.$vs.notify({
          color: "#ff3300",
          text: "confirm password doesn't match with password ",
          icon: "warning",
        });
        return;
      }
      this.sub_user.name = this.user_name;
      this.sub_user.email = this.user_email;
      this.sub_user.time_zone = this.selected_time_zone;
      this.sub_user.password = this.user_pw;
      this.sub_user.user_type = this.user_type;
      this.sub_user.phone = this.phone_number;

      this.$store
        .dispatch("subuserManage/addSubUser", this.sub_user)
        .then(() => {
          this.$router.push("/settings/sub-users");
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },
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
</style>
