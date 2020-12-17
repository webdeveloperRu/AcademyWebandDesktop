<template>
  <vs-row vs-justify="center">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-sm="12" vs-xs="12">
      <div class="mb-4">
        <div class="d-flex">
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
            <vs-select class="w-100 mt-3" label="Time zone" v-model="time_zone">
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in time_zones"
              />
            </vs-select>
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
          <h3>Role</h3>
          <div class="mt-2">Role controls how much access the user has.</div>
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
                v-model="user_role"
                vs-name="user_role"
                vs-value="Administrator"
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
                v-model="user_role"
                vs-name="user_role"
                vs-value="Assistant"
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
                v-model="user_role"
                vs-name="user_role"
                vs-value="Moderator"
                class="m-0"
              >
                <h5 class="ml-3">Moderator</h5>
                <div class="ml-3">
                  Moderator can moderate site comments only.
                </div>
              </vs-radio>
            </div>
          </vs-card>
          <div style="float: right">
            <vs-button class="mt-3">Save</vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "NewUser",

  data: () => ({
    user_name: "",
    user_email: "",
    phone_number: "",
    user_pw: "",
    user_pw_confirm: "",
    time_zone: 0,
    time_zones: [
      { text: "US & Canada ", value: 0 },
      { text: "Multi-month", value: 1 },
      { text: "Forever", value: 2 },
    ],
    user_role: "Administrator",
  }),
  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch('changeSideBar', false)
  },
  /**
   * --------------method part-------------
   */
  methods: {},
  /**
   * --------------computed part-------------
   */
  computed: {},
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