<template>
  <vs-row vs-justify="center">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="9"
      vs-sm="12"
      vs-xs="12"
      code-toggler
    >
      <vs-row vs-justify="center" class="mt-3">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>New Testimonial</h3>
          <div class="mt-2">Create a new testimonial for your offer.</div>
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
              label="Author"
              placeholder="Author Name here..."
              v-model="author_name"
              class="w-100"
            />
            <vs-textarea label="Quote" v-model="quote" class="w-100 mt-3" />
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
                  <label class="avatar-select-button" style="user-select:none;">
                    <input
                      type="file"
                      ref="avatarSelector"
                      @change="selectTestimonialAvatar"
                      @click="resetTestimonialAvatar"
                      style="overflow: hidden"
                      class="custom-file-input"
                      accept="image/png, image/jpeg"
                    />
                    Change Avatar
                  </label>
                </div>
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider></vs-divider>
      <div style="float: right">
        <vs-button class="mt-3" @click="addTestimonial">Save</vs-button>
      </div>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "StarterPage",
  data: () => ({
    author_name: "",
    quote: "",
    avatar_url: "",
    avatar_file: null,
    updated_avatar: false,
    changedAvatar: false,
  }),

  computed: {
    offer_id: function() {
      var id = this.$route.params.offer_id;
      return id.slice(0, id.length);
    },
    testimonial_title: {
      get() {
        return this.$store.getters["offerManage/testimonial_title"];
      },
    },
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

  methods: {
    addTestimonial() {
      let testimonial = {
        title: this.testimonial_title,
        author_name: this.author_name,
        quote_text: this.quote,
        avatar_img: this.avatar_file,
      };
      this.$store
        .dispatch("offerManage/addTestimonial", [testimonial, this.offer_id])
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    resetTestimonialAvatar() {
      this.$refs.avatarSelector.value = "";
    },
    /**
     *  select avatar
     */
    selectTestimonialAvatar(e) {
      let avatar = e.target.files[0];
      if (avatar !== undefined) {
        this.avatar_url = URL.createObjectURL(avatar);
        this.avatar_file = avatar;
        this.changedAvatar = true;
      }
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
