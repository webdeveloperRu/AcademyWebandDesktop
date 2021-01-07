<template>
  <div>
    <vs-row vs-justify="center" class="primary-font">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="10"
        vs-xs="12"
        class="mb-3"
      >
        <span
          class="ml-2 mt-2 primary-font"
          @click="backToPeoples"
          style="cursor: pointer;"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Students</span
        >
        <h2 class="mt-3">{{ selected_people.name }}</h2>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="7"
        vs-xs="12"
        code-toggler
      >
        <vs-card>
          <div class="d-flex" style="align-items: center">
            <div>
              <vs-avatar size="70px"></vs-avatar>
            </div>
            <div class="ml-3">
              <div>{{ selected_people.name }}</div>
              <div>{{ selected_people.email }}</div>
              <div>
                Added on: <strong>{{ selected_people.last_activity }}</strong>
              </div>
              <div>
                Member since: <strong>{{ selected_people.created_on }}</strong>
              </div>
            </div>
          </div>
        </vs-card>
        <vs-card>
          <vs-tabs>
            <vs-tab label="Lifecylce">
              <div class="con-tab-ejemplo">Lifecylce</div>
            </vs-tab>
            <vs-tab label="Info">
              <div class="con-tab-ejemplo">Info</div>
            </vs-tab>
            <vs-tab label="Purchases">
              <div class="con-tab-ejemplo">Purchases</div>
            </vs-tab>
            <vs-tab label="Products">
              <div class="con-tab-ejemplo">Products</div>
            </vs-tab>
            <vs-tab label="Notes">
              <div class="con-tab-ejemplo">Notes</div>
            </vs-tab>
          </vs-tabs>
        </vs-card>
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="3"
        vs-xs="12"
        code-toggler
      >
        <vs-card>
          <div
            class="d-flex"
            style="align-items: center; justify-content: space-between"
          >
            <h4>Tags</h4>
            <vs-button color="primary" type="flat" @click="linkToContactTag"
              >View All Tags</vs-button
            >
          </div>
          <multiselect
            v-model="selected_tag"
            tag-placeholder="Add Tag"
            placeholder="Type to add a new tag..."
            label="name"
            taggable
            hideSelected
            @tag="addTag"
            track-by="code"
            :options="tags"
            :multiple="true"
          ></multiselect>
          <div class="d-flex mt-3" style="flex-wrap: wrap">
            <vs-chip
              @click="remove(chip)"
              :key="chip"
              v-for="chip in added_tagChips"
              closable
              >{{ chip }}</vs-chip
            >
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "AddTags",
  components: { Multiselect },

  data: () => ({
    selected_tag: [],
  }),

  watch: {
    // selected_tag: function(newValue) {
    // }
  },

  computed: {
    added_tagChips: {
      get() {
        let value = [];
        for (let i = 0; i < this.tags.length; i++) {
          value.push(this.tags[i].name);
        }
        return value;
      },
    },

    tags: {
      get() {
        let tags = [];
        for (let i = 0; i < this.selected_people.tags.length; i++) {
          tags[i] = { code: i, name: this.selected_people.tags[i].title };
        }
        return tags;
      },
    },

    people_id: {
      get() {
        var id = this.$route.params.people_id;
        return id.slice(0, id.length);
      },
    },

    people_list: {
      get() {
        return this.$store.getters["peopleManage/people_list"];
      },
    },

    selected_people: {
      get() {
        return this.$store.getters["peopleManage/current_people"];
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

  created() {
    this.$store.dispatch("changeSideBar", false);
    this.getCurrentPeople();
  },

  methods: {
    addTag(newTag) {
      this.added_tagChips.push(newTag);
      let tag = { title: newTag };
      this.selected_people.tags.push(tag);
      this.updatePeople(true);
    },
    getCurrentPeople() {
      this.$store
        .dispatch("peopleManage/getPeopleByID", this.people_id)
        .then(() => {});
    },

    updatePeople(flag) {
      let text = "";
      if (flag) text = "Successfully added tag";
      else text = "Successfully removed tag";
      this.$store
        .dispatch("peopleManage/updatePeopleByID", [
          this.selected_people,
          this.people_id,
        ])
        .then(() => {
          if (this.status_got) {
            this.$vs.notify({
              color: this.notification_color,
              text: text,
              icon: this.notification_icon,
            });
            this.getCurrentPeople();
          } else {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.getCurrentPeople();
          }
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    remove(item) {
      this.added_tagChips.splice(this.added_tagChips.indexOf(item), 1);
      for (let i = 0; i < this.selected_people.tags.length; i++) {
        if (this.selected_people.tags[i].title == item) {
          this.selected_people.tags.splice(i, 1);
          this.updatePeople(false);
        }
      }
    },

    linkToContactTag() {
      this.$router.push("/people/contacts/tags");
    },
    backToPeoples() {
      this.$router.push("/people");
    },
  },
};
</script>
<style></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
