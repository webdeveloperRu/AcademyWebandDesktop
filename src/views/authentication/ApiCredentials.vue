<template>
  <vs-card class="mb-0">
    <form>
      <div class="api_key_label mb-3">{{ api_key }}</div>
      <vs-button
        class="w-100 vs-input-large mb-4"
        v-on:click="createCredential"
      >
        Create Credential</vs-button
      >
      <vs-button
        class="w-100 vs-input-large mb-4"
        v-on:click="deleteCredential"
      >
        Delete</vs-button
      >
    </form>
  </vs-card>
</template>

<script>
export default {
  name: "change-password-box",

  data: () => ({
    api_key: "",
  }),

  props: {
    getApiKey: Boolean,
  },

  watch: {
    getApiKey: function(newValue) {
      if (newValue) {
        this.$store.dispatch("apiManage/getApiKey").then(() => {
          if (this.$store.state.apiManage.errorText == "") {
            this.api_key = this.$store.state.apiManage.api_key;
          }
        });
      }
    },
  },

  created() {},

  methods: {
    createCredential: function() {
      this.$store.dispatch("apiManage/createApiKey").then(
        () => {
          if (this.$store.state.apiManage.errorText == "") {
            this.$vs.notify({
              color: "success",
              title: "Create ApiKey",
              text: "You created ApiKey",
            });
            this.api_key = this.$store.state.apiManage.api_key;
          } else {
            this.$vs.notify({
              color: this.$custom_warning,
              title: "Create ApiKey",
              text: this.$store.state.apiManage.errorText,
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
            title: "Create ApiKey",
            text: "Failed to create ApiKey: " + this.message,
          });
        }
      );
    },
    deleteCredential: function() {
      this.$store.dispatch("apiManage/deleteApiKey").then(
        () => {
          if (this.$store.state.apiManage.errorText == "") {
            this.$vs.notify({
              color: "success",
              title: "Delete ApiKey",
              text: "You Deleted ApiKey",
            });
            this.api_key = this.$store.state.apiManage.api_key;
          } else {
            this.$vs.notify({
              color: this.$custom_warning,
              title: "Delete ApiKey",
              text: this.$store.state.apiManage.errorText,
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
            title: "Delete ApiKey",
            text: "Failed to create ApiKey: " + this.message,
          });
        }
      );
    },
  },
  computed: {},
};
</script>
<style>
.api_key_label {
  text-align: center;
  height: 45px;
  border: solid 1px;
  font-size: 20px;
  padding: 9px;
}
</style>
