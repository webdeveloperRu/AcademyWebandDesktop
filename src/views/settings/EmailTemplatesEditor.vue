<template>
  <vs-row vs-justify="center">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="8" vs-xs="12" vs-sm="12">
      <span
        class="ml-2 mb-2 mt-2 primary-font"
        @click="backToEmailTemplates"
        style="cursor: pointer;"
        ><i class="ti-angle-left" style="font-size: 14px;"></i> Email
        Templates</span
      >
      <div class="mb-4 mt-3">
        <div class="d-flex">
          <h2>{{ selected_template.name }}</h2>
        </div>
        <div
          class="d-flex"
          style="justify-content: flex-start; align-items: center;"
        >
          <!-- <span class="routing-product mr-3" @click="editTemplate"><h5 class="ml-2 mb-2 mt-2 primary-font"><i class="mdi mdi-pencil" style="font-size: 14px;"></i> Edit Template</h5></span> -->
          <span
            class="routing-product mr-3"
            @click="previewTemplate"
            style="cursor: pointer"
            ><h5 class="primary-font">
              <i class="mdi mdi-eye" style="font-size: 14px;"></i> Preview
              Template
            </h5></span
          >

          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            style="margin:0px; padding: 0px;"
          >
            <span class="routing-product mr-3" style="cursor: pointer"
              ><h5 class="primary-font">
                <i class="mdi mdi-email" style="font-size: 14px;"></i> Send Test
                Email
              </h5></span
            >
            <vs-dropdown-menu class="loginx">
              <div class="p-3">
                <vs-input
                  success-text="Correo Valido"
                  class="w-100 mb-2"
                  danger-text="The email does not meet the requirements"
                  type="email"
                  label-placeholder="Email"
                  v-model="test_email"
                />
                <vs-button
                  width="100%"
                  color="primary"
                  type="gradient"
                  class="w-100"
                  @click="sendTestEmail"
                  >Send Test Email</vs-button
                >
              </div>
            </vs-dropdown-menu>
          </vs-dropdown>
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
      <vs-card class="email-template-code">
        <vs-input
          label="Subject"
          placeholder="Subject Here..."
          v-model="tempalte_subject"
          class="w-100"
        />

        <label class="mt-4"><b>Content</b></label>
        <!-- <VueEditor v-model="tempalte_body" :editorToolbar="customToolbar"></VueEditor> -->
        <vs-textarea v-model="tempalte_body"></vs-textarea>
        <label class="mt-4">{{ selected_template.help_guide }} </label>
      </vs-card>
      <div class="btn-alignment text-right">
        <vs-button
          class="mr-3"
          color="danger"
          type="flat"
          @click="resetTemplate"
          v-if="visibleReset"
          >Reset Template</vs-button
        >
        <vs-button color="primary" type="filled" @click="saveTemplate"
          >Save</vs-button
        >
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "EmailTemplatesEditor",

  components: {},

  data: () => ({
    tempalte_body: "",
    tempalte_subject: "",
    customToolbar: [[]],
    visibleReset: true,
    test_email: "",
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

    template_index: {
      get() {
        var index = this.$route.params.template_index;
        index = index.slice(0, index.length);
        return index;
      },
    },

    selected_template: {
      get() {
        return this.template_list[this.template_index];
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.initTemplate();
  },

  methods: {
    initTemplate() {
      this.tempalte_body = this.selected_template.body;
      this.tempalte_subject = this.selected_template.subject;
    },

    backToEmailTemplates() {
      this.$router.push("/settings/email-templates");
    },

    /**
     *   save template
     **/
    saveTemplate() {
      this.selected_template.body = this.tempalte_body;
      this.selected_template.subject = this.tempalte_subject;
      this.$store
        .dispatch("templateManage/updateTemplate", [
          this.selected_template,
          this.template_index,
        ])
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
     *   send template
     **/
    sendTestEmail() {
      this.$store
        .dispatch("templateManage/sendTestEmail", [
          this.selected_template,
          this.test_email,
        ])
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
     *   preview template
     **/
    previewTemplate() {},

    /**
     *   reset template
     **/

    resetTemplate() {
      this.$store
        .dispatch("templateManage/resetTemplate", this.selected_template)
        .then(() => {
          this.$store.dispatch("templateManage/getTemplateList").then(() => {
            this.initTemplate();
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style>
.email-template-code .ql-toolbar.ql-snow {
  height: 0;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  border-bottom: 0;
}
.email-template-code .vs-textarea {
  height: 300px;
}
/* .email-template-code .ql-editor {
  border-radius: 4px; 
} */
</style>
