<template>
<div>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="6" vs-sm="9" vs-xs="12" type="flex" vs-justify="center" vs-align="center">
      <span class="mb-2 mt-2 primary-font" @click="backToPeople" style="cursor: pointer;"><i class="ti-angle-left" style="font-size: 14px;"></i> Peolenamehere</span>
      <div class="mb-4 mt-3">
        <div class="d-flex">
          <h2>Edit Details</h2>
        </div>
      </div>
    </vs-col>
  </vs-row>
  <vs-row vs-justify="center" class="primary-font">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="6" vs-sm="9" vs-xs="12" code-toggler>
      <vs-card>
        <vs-input label="Name" v-model="people_name" class="w-100" />
        <vs-input label="Email" v-model="people_email" class="w-100 mt-3" />
      </vs-card>
      <vs-card>
        <vs-input label="External user id" v-model="external_userID" class="w-100 mb-2" />
        <span>ID should match your 3rd party system's unique identifier for this member.</span>
      </vs-card>
      <vs-card>
        <vs-input label="Phone Number" v-model="people_phonenumber" class="w-100" />
        <vs-input label="Address" v-model="people_address" class="w-100 mt-3" />
        <vs-input label="Address Line 2" v-model="people_address2" class="w-100 mt-3" />
        <vs-input label="City" v-model="people_city" class="w-100 mt-3" />
        <div class="select-country">
          <label for="" class="vs-input--label mt-3">Country</label>
          <country-select v-model="people_country" :country="people_country" topCountry="US" class="w-100" />
        </div>
        <vs-row vs-justify="center" class="primary-font">
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="7" vs-sm="7" vs-xs="12" code-toggler>
            <vs-input label="State" v-model="people_state" class="w-100 mt-3" />
          </vs-col>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="5" vs-xs="12" code-toggler>
            <vs-input label="Zip Code" v-model="people_zipcode" class="w-100 mt-3" />
          </vs-col>
        </vs-row>
      </vs-card>
      <div style="float: right">
        <vs-button class="mt-3" @click.native="savePeopleInfo"> Save </vs-button>
      </div>
    </vs-col>
  </vs-row>
</div>
</template>

<script>
export default {
  name: "PeopleInfoEdit",
  data: () => ({
    people_name: "",
    people_email: "",
    external_userID: "",
    people_phonenumber: "",
    people_address: "",
    people_address2: "",
    people_city: "",
    people_state: "",
    people_zipcode: "",
    people_country: "US"
  }),

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

    template_list: {
      get() {
        return this.$store.getters["templateManage/template_list"];
      },
    },
  },

  created() {

  },

  methods: {
    backToPeople() {

    },
    savePeopleInfo() {

    }
  },
};
</script>

<style lang="scss">
.select-country select {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  padding: .4rem;
}

.select-country select:focus {
  border: 1px solid rgba(var(--vs-primary), 1) !important;
  -webkit-box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .15);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .15);
}
</style>
