<template>
  <vs-row vs-justify="center">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="10" vs-xs="12">
      <div class="mb-4">
        <span
          class="ml-2 mt-2 primary-font"
          @click="backToPeoples"
          style="cursor: pointer;"
          ><i class="ti-angle-left" style="font-size: 14px;"></i>
          {{ selected_people.name }}</span
        >
        <div class="d-flex mt-3">
          <h2>Contact Tags</h2>
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
      vs-lg="10"
      vs-xs="12"
      code-toggler
    >
      <vs-card>
        <div class="border">
          <vs-table search max-items="5" pagination :data="users">
            <template slot="thead">
              <vs-th>Name</vs-th>
              <vs-th>People</vs-th>
              <vs-th></vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].username">{{
                  data[indextr].username
                }}</vs-td>
                <vs-td :data="data[indextr].id">{{ data[indextr].id }}</vs-td>
                <vs-td>
                  <vs-icon icon="edit" style="cursor: pointer"></vs-icon>
                  <vs-dropdown>
                    <vs-icon
                      icon="more_horiz"
                      class="ml-5"
                      style="cursor: pointer"
                    ></vs-icon>
                    <vs-dropdown-menu
                      ><span class="mr-3 ml-1" @click="deleteTagConfirm = true"
                        >Delete</span
                      ></vs-dropdown-menu
                    >
                  </vs-dropdown>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
        <div class="mt-3">Displaying all 2 contact tags</div>
      </vs-card>
    </vs-col>

    <vs-popup
      class="holamundo"
      title="Delete this Tag?"
      :active.sync="deleteTagConfirm"
    >
      <p>
        Are you sure you want to delete the tag <strong>product</strong>? This
        action cannot be undone.
      </p>
      <p>Deleting this tag will remove it from <strong>1 person</strong>.</p>
      <p>Please type <strong>product</strong> exactly as shown to confirm</p>
      <vs-input v-model="confirm_delete"></vs-input>
      <div class="btn-alignment text-right">
        <vs-button color="primary" type="flat">Cancel</vs-button>
        <vs-button color="danger" type="filled">Delete Tag</vs-button>
      </div>
    </vs-popup>
  </vs-row>
</template>

<script>
export default {
  name: "ContactTags",
  data: () => ({
    title: "FilterTable",
    deleteTagConfirm: false,
    users: [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        website: "anastasia.net",
      },
    ],
    confirm_delete: "",
  }),
  computed: {
    people_id: {
      get() {
        var id = this.$route.params.people_id;
        return id.slice(0, id.length);
      },
    },
    selected_people: {
      get() {
        return this.$store.getters["peopleManage/current_people"];
      },
    },
  },
  methods: {
    backToPeoples() {
      this.$router.push("/people/edit-people/" + this.people_id);
    },
  },
};
</script>
<style>
.vs-table--pagination {
  width: 99%;
}
</style>
