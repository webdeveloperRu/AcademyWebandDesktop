<template>
  <vs-row vs-justify="center">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="8" vs-xs="12" vs-sm="12">
      <div class="mb-4">
        <span
          class="ml-2 mb-2 mt-2 primary-font"
          @click="backToSettings"
          style="cursor: pointer;"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Settings</span
        >
        <div class="d-flex mt-3">
          <h2>Account User</h2>
          <vs-button
            style="margin-left: auto; height: 45px"
            @click="linkToNewUser"
            >+ New User</vs-button
          >
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
      vs-lg="8"
      vs-sm="12"
      vs-xs="12"
      code-toggler
    >
      <vs-card>
        <vs-table max-items="5" pagination :data="subuser_list">
          <template slot="thead">
            <vs-th></vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Email</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].id"><vs-avatar></vs-avatar></vs-td>
              <vs-td :data="data[indextr].name">{{ data[indextr].name }}</vs-td>
              <vs-td :data="data[indextr].email">{{
                data[indextr].email
              }}</vs-td>
              <vs-td :data="data[indextr].id"
                ><i
                  class="mdi mdi-pencil"
                  style="cursor: pointer"
                  @click="editSubUser(data[indextr].id)"
                ></i
              ></vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "AccountUserList",

  components: {},
  data: () => ({}),

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

    subuser_list: {
      get() {
        return this.$store.getters["subuserManage/subuser_list"];
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", false);
    this.getAllAccountUsers();
  },

  methods: {
    /**
     *  get all account users
     **/
    getAllAccountUsers() {
      this.$store
        .dispatch("subuserManage/getSubUserList")
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

    backToSettings() {
      this.$router.push("/settings");
    },

    linkToNewUser() {
      this.$router.push("/settings/new-sub-user");
    },

    editSubUser(subuser_id) {
      this.$router.push("/settings/edit-sub-user/" + subuser_id);
    },
  },
};
</script>
<style>
.vs-table--pagination {
  width: 99%;
}
</style>
