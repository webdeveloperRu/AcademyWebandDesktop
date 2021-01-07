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
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Students</span
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
        <!-- <div class="border"> -->
        <vs-table
          search
          max-items="5"
          pagination
          :data="users"
          hoverFlat
          class="contact-data-table"
        >
          <template slot="thead">
            <vs-th class="contact-tag-th">Name</vs-th>
            <vs-th class="contact-tag-th">People</vs-th>
            <vs-th class="contact-tag-th"></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr
              class="contact-tag-row"
              :key="indextr"
              v-for="(tr, indextr) in data"
            >
              <vs-td :data="data[indextr].name" class="contact-tag-th">{{
                data[indextr].name
              }}</vs-td>
              <vs-td class="contact-tag-th" :data="data[indextr].id">{{
                data[indextr].peoples
              }}</vs-td>
              <vs-td class="contact-tag-th">
                <vs-icon
                  icon="edit"
                  style="cursor: pointer; font-size:16px"
                  @click="confirmEditTag(data[indextr], indextr)"
                ></vs-icon>
                <vs-icon
                  icon="delete"
                  class="ml-5"
                  style="cursor: pointer; font-size: 16px"
                  @click="confirmDeleteTag(data[indextr], indextr)"
                ></vs-icon>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <!-- </div> -->
        <div class="mt-3">Displaying all {{ users.length }} contact tags</div>
      </vs-card>
    </vs-col>

    <!-- 
      @@ edit tag popup
     -->

    <vs-popup
      class="holamundo"
      title="Edit Contact Tag"
      :active.sync="editTagConfirm"
    >
      <div class="mt-3">
        <vs-input
          v-model="edit_tag_name"
          class="mt-5 mb-5"
          style="width:100%"
        ></vs-input>
        <div class="btn-alignment text-right">
          <vs-button color="primary" type="flat" @click="editTagConfirm = false"
            >Cancel</vs-button
          >
          <vs-button color="primary" type="filled" @click="saveEditTag"
            >Save</vs-button
          >
        </div>
      </div>
    </vs-popup>

    <!-- 
      @@ delete tag popup
     -->

    <vs-popup
      class="holamundo"
      title="Edit Contact Tag"
      :active.sync="deleteTagConfirm"
    >
      <div class="mt-5 mb-5">
        <p>
          Are you sure you want to delete the tag
          <strong>{{ selected_delete_tag.name }}</strong
          >? This action cannot be undone.
        </p>
        <p>
          Deleting this tag will remove it from <strong>{{selected_delete_tag.peoples}} </strong>people
        </p>       
      </div>
       <div class="btn-alignment text-right">
          <vs-button
            color="primary"
            type="flat"
            @click="deleteTagConfirm = false"
            >Cancel</vs-button
          >
          <vs-button color="danger" type="filled" @click="deleteSelectedTag"
            >Save</vs-button
          >
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
    editTagConfirm: false,
    users: [
      {
        id: 1,
        name: "Leanne Graham",
        peoples: 5,
      },
      {
        id: 2,
        name: "Ervin Howell",
        peoples: 3,
      },
    ],
    confirm_delete: "",
    selected_delete_tag: "",
    edit_tag_name: "",
    selected_tag_index: -1,
  }),
  created() {
    this.$vs.notify({
      color: "#ff0000",
      text: "Hello, API need to shows tag list!",
    });
  },
  computed: {
    // people_id: {
    //   get() {
    //     var id = this.$route.params.people_id;
    //     return id.slice(0, id.length);
    //   },
    // },
    // selected_people: {
    //   get() {
    //     return this.$store.getters["peopleManage/current_people"];
    //   },
    // },
  },
  methods: {
    /**
     * delete contact tag confirm
     */
    confirmDeleteTag(selected_tag, index) {
      this.deleteTagConfirm = true;
      this.selected_delete_tag = selected_tag;
      this.selected_tag_index = index;
    },
    backToPeoples() {
      this.$router.push("/people");
    },

    confirmEditTag(selected_tag, index) {
      this.edit_tag_name = selected_tag.name;
      this.selected_delete_tag = selected_tag;
      this.editTagConfirm = true;
      this.selected_tag_index = index;
    },

    saveEditTag() {
      this.users[this.selected_tag_index].name = this.edit_tag_name;
      this.editTagConfirm = false;
    },

    deleteSelectedTag() {},
  },
};
</script>
<style lang="scss">
.vs-table--pagination {
  width: 99%;
}
.contact-data-table {
  color: #6c757d;
  .vs-table--search {
    width: 100%;
    max-width: 100%;
  }
  .vs-table--search-input {
    width: 100%;
    border-radius: 5px;
    border-color: #cccccc;
    &:focus {
      border-color: #5d5d5d;
    }
  }
}
vs-th {
  justify-content: center;
}
vs-row td {
  text-align: center;
}
.contact-tag-th .vs-table-text {
  justify-content: center;
}
.contact-tag-row td {
  font-weight: 600;
  text-align: center;
}
</style>
