<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-xs="12" vs-sm="12">
      <span
        class="ml-2 mb-2 mt-2 primary-font"
        @click="backToSettings"
        style="cursor: pointer;"
        ><i class="ti-angle-left" style="font-size: 14px;"></i> Settings</span
      >
      <div class="mb-4 mt-3">
        <div class="d-flex">
          <h2>Email Templates</h2>
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
      <vs-card>
        <div
          class="d-flex"
          style="justify-content: space-between; align-items: center"
        >
          <div
            class="d-flex"
            style="justify-content: flex-start; align-items: center"
          >
            <div class="ml-3">
              <h5>TITLE</h5>
            </div>
          </div>
          <b class="mr-3">
            STATUS
            <i class="mdi mdi-pencil ml-5" style="visibility: hidden;"></i>
          </b>
        </div>
        <vs-divider />
        <div v-for="(template, index) in template_list" :key="index">
          <div
            class="d-flex"
            style="justify-content: space-between; align-items: center"
          >
            <div
              class="d-flex  template-title"
              style="justify-content: flex-start; align-items: center"
              @click="linkToEmailTemplateEditor(index)"
            >
              <div class="ml-3" style="cursor: pointer">
                <h4>{{ template.name }}</h4>
                <div>
                  {{ template.description }}
                </div>
              </div>
            </div>
            <div class="mr-3 d-flex">
              Default
              <i
                class="mdi mdi-pencil ml-5"
                style="cursor: pointer"
                @click="linkToEmailTemplateEditor(index)"
              ></i>
            </div>
          </div>
          <vs-divider />
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "EmailTemplates",
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

    template_list: {
      get() {
        return this.$store.getters["templateManage/template_list"];
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", false);
    this.getAllEmailtemplates();
  },

  methods: {
    backToSettings() {
      this.$router.push("/settings");
    },

    getAllEmailtemplates() {
      this.$store
        .dispatch("templateManage/getTemplateList")
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

    linkToEmailTemplateEditor(index) {
      this.$router.push("/settings/email-templates-editor/" + index);
    },
  },
};
</script>
<style lang="scss">
.routing-product {
  cursor: pointer;
}
.template-title:hover {
  text-decoration: underline;
}
</style>
