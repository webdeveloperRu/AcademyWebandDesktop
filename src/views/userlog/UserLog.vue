<template>
  <vs-card class="mb-0">
    <vs-table
      v-if="loaded_notifications"
      id="takedown-notices-table"
      ref="table"
      stripe
      max-items="5"
      pagination
      search
      :data="notificationList"
    >
      <div slot="header" style="flex-direction: row"></div>
      <template slot="thead">
        <vs-th>
          id
        </vs-th>
        <vs-th>
          user_id
        </vs-th>
        <vs-th>
          message
        </vs-th>
        <vs-th>
          notification_type
        </vs-th>
        <vs-th>
          action
        </vs-th>
      </template>
      <template slot-scope="{ data }">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id" style="text-align: center">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].user_id" style="text-align: center">
            {{ data[indextr].user_id }}
          </vs-td>

          <vs-td :data="data[indextr].message" style="text-align: center">
            {{ data[indextr].message }}
          </vs-td>

          <vs-td
            :data="data[indextr].notification_type"
            style="text-align: center"
          >
            <p class="shortenurl">
              {{ data[indextr].notification_type }}
            </p>
          </vs-td>
          <vs-td :data="data[indextr].action_type" style="text-align: center">
            <p class="shortenurl">
              sjdflfds
              <!-- {{data[indextr].notification_type}} -->
            </p>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vs-card>
</template>

<script>
export default {
  name: "notification-popup",
  data: () => ({
    notificationList: [],
    loaded_notifications: false,
  }),
  props: {
    getUserLog: Boolean,
  },
  created() {
    this.$store.dispatch("changeSideBar", false);
  },
  watch: {
    getUserLog: function(newValue) {
      if (newValue) {
        this.$store.dispatch("auth/userLog").then(
          () => {
            if (this.error_text !== "") {
              this.$vs.notify({
                color: this.$custom_warning,
                title: "Failed to get User Log",
                text: this.error_text,
              });
            }
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.$vs.notify({
              color: this.$custom_warning,
              title: "error",
              text: this.error_text,
            });
          }
        );
      }
    },
  },

  methods: {},

  computed: {
    error_text: {
      get() {
        return this.$store.state.auth.error_text;
      },
    },
  },
};
</script>
<style></style>
