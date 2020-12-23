<template>
  <div>
    <vs-row vs-justify="center" class="progressbar">
      <vs-col vs-sm="12" vs-lg="11">
        <span
          style="cursor: pointer;"
          class="ml-2 mb-5 mt-2 primary-font"
          @click="linkToProducts"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> products</span
        >
        <h2 class="mt-3" style="color: #333; font-weight: 600">
          Product Progress: {{ current_product_title }}
        </h2>
        <br />
        <div style="font-size: 16px; cursor: pointer" class="mb-3 d-flex">
          <span class="primary-font" @click="printProgressData">
            <i class="mdi mdi-printer mr-2 primary-font"></i> Print
          </span>
          <JsonCSV :data="progressData" class="primary-font">
            <i class="mdi mdi-download ml-3 mr-2 primary-font"></i> Export
          </JsonCSV>
        </div>
      </vs-col>
    </vs-row>

    <vs-row vs-justify="center" class="responsive_progress">
      <vs-col vs-lg="8" vs-xs="12" vs-sm="8" id="printbody">
        <vs-card>
          <vs-table
            :data="progressData"
            class="text-nowrap"
            :key="updatedProducts"
            pagination
            maxItems="20"
          >
            <template slot="thead">
              <vs-th>Memeber Name</vs-th>
              <vs-th>Product Progress</vs-th>
              <vs-th>Logins</vs-th>
              <vs-th>Start Date</vs-th>
              <vs-th>Last Login</vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr
                class="border-top"
                :data="tr"
                :key="indextr"
                v-for="(tr, indextr) in data"
              >
                <vs-td>
                  <div
                    @click="linkToMemberProgress(product_id)"
                    class="member-name"
                  >
                    {{ data[indextr].memberName }}
                  </div>
                </vs-td>
                <vs-td>
                  <vs-progress
                    :percent="data[indextr].progressValue"
                    color="primary"
                    >primary</vs-progress
                  >
                </vs-td>
                <vs-td>{{ data[indextr].loginCount }}</vs-td>
                <vs-td>{{ data[indextr].startDate }}</vs-td>
                <vs-td>{{ data[indextr].lastLogin }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-card>
      </vs-col>
      <vs-col vs-lg="3" vs-xs="12" vs-sm="4" class="filter-sticky">
        <vs-card class="">
          <h4 class="text-left mb-3">Filter</h4>
          <vs-select
            class="w-100 mt-3"
            label="Product"
            v-model="product"
            :key="updatedProducts"
          >
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item, index) in products"
            />
          </vs-select>
          <vs-select class="w-100 mt-3" label="Segments" v-model="segment">
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item, index) in segments"
            />
          </vs-select>
          <vs-input
            label="Memeber Name"
            v-model="member_name"
            class="w-100 mt-3"
          ></vs-input>
          <vs-input
            label="Memeber Email"
            v-model="member_email"
            class="w-100 mt-3"
          ></vs-input>
          <div class="btn-alignment text-right mt-3">
            <vs-button
              color="primary"
              type="flat"
              @click="searchProductProgress"
              >Apply</vs-button
            >
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import JsonCSV from "vue-json-csv";

export default {
  name: "ProductProgress",
  components: {
    JsonCSV,
  },
  data: () => ({
    member_name: "",
    member_email: "",
    segment: "",
    updatedProducts: 0,
    product: "",
    products: [],
    segments: [],
    progressData: [],
    current_product_title: "",
  }),

  computed: {
    product_id: function() {
      var id = this.$route.params.product_id;
      return id.slice(0, id.length);
    },
    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },
    product_progress: {
      get() {
        return this.$store.state.productManage.product_progress;
      },
    },
  },

  watch: {
    progressData: function() {
      this.updatedProducts++;
    },
  },

  created() {
    this.getProudctProgress();
  },

  methods: {
    /**
     * link to member progress
     */
    linkToMemberProgress(student_id) {
      this.$router.push(
        "/analytics/member-progress/" + this.product_id + "/" + student_id
      );
    },

    /**
     * link to print progress
     */

    printProgressData() {
      this.$htmlToPaper("printbody");
    },

    /**
     * get product progress
     */

    getProudctProgress() {
      this.$store.dispatch("productManage/getProductList").then(async () => {
        this.$vs.loading({ type: "material" });
        for (let i = 0; i < this.product_list.length; i++) {
          this.products[i] = {
            text: this.product_list[i].title,
            value: this.product_list[i].id,
          };
          // await this.$store.dispatch('productManage/getProductProgressID', this.product_list[i].id)
        }
        await this.$store.dispatch(
          "productManage/getProductProgressID",
          this.product_id
        );
        this.$vs.loading.close();
        this.product = this.product_id;
        let progress_data = this.product_progress[this.product_list[0].id].data;
        for (let j = 0; j < progress_data.length; j++) {
          this.progressData[j] = {
            memberName: progress_data[j].full_name,
            loginCount: progress_data[j].log_in_count,
            lastLogin: progress_data[j].last_login,
            startDate: progress_data[j].start_date,
            progressValue:
              (progress_data[j].progress.done * 100) /
              progress_data[j].progress.total,
          };
        }
        this.updatedProducts++;
        this.getCurrentProductTitle();
      });
    },

    getCurrentProductTitle() {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].value == this.product) {
          this.current_product_title = this.products[i].text;
        }
      }
    },

    async searchProductProgress() {
      if (this.product_progress[this.product] == undefined) {
        this.$vs.loading({ type: "material" });
        await this.$store.dispatch(
          "productManage/getProductProgressID",
          this.product
        );
        this.$vs.loading.close();
      }
      let progress_data = this.product_progress[this.product].data;
      this.progressData = [];
      let count = 0;
      for (let j = 0; j < progress_data.length; j++) {
        if (this.member_name == "") {
          if (this.member_email == "") {
            this.progressData[count] = {
              memberName: progress_data[j].full_name,
              loginCount: progress_data[j].log_in_count,
              lastLogin: progress_data[j].last_login,
              startDate: progress_data[j].start_date,
              progressValue:
                (progress_data[j].progress.done * 100) /
                progress_data[j].progress.total,
            };
            count++;
          } else if (this.member_email == progress_data[j].email) {
            this.progressData[count] = {
              memberName: progress_data[j].full_name,
              loginCount: progress_data[j].log_in_count,
              lastLogin: progress_data[j].last_login,
              startDate: progress_data[j].start_date,
              progressValue:
                (progress_data[j].progress.done * 100) /
                progress_data[j].progress.total,
            };
            count++;
          }
        } else if (
          progress_data[j].full_name
            .toUpperCase()
            .includes(this.member_name.toUpperCase())
        ) {
          if (this.member_email == "") {
            this.progressData[count] = {
              memberName: progress_data[j].full_name,
              loginCount: progress_data[j].log_in_count,
              lastLogin: progress_data[j].last_login,
              startDate: progress_data[j].start_date,
              progressValue:
                (progress_data[j].progress.done * 100) /
                progress_data[j].progress.total,
            };
            count++;
          } else if (this.member_email == progress_data[j].email) {
            this.progressData[count] = {
              memberName: progress_data[j].full_name,
              loginCount: progress_data[j].log_in_count,
              lastLogin: progress_data[j].last_login,
              startDate: progress_data[j].start_date,
              progressValue:
                (progress_data[j].progress.done * 100) /
                progress_data[j].progress.total,
            };
            count++;
          }
        }
      }
      this.getCurrentProductTitle();
    },

    linkToProducts() {
      this.$router.push("/products");
    },
  },
};
</script>
<style>
table tr td {
  text-align: center;
}
th .sort-th,
th .vs-table-text {
  justify-content: center;
}
.filter-sticky .con-vs-card {
  position: sticky;
  top: 100px;
  position: -webkit-sticky;
}
.responsive_progress .member-name:hover {
  text-decoration: underline;
}

@media only screen and (max-width: 900px) {
  table tr td:nth-child(5) {
    display: none;
  }
  table tr th:nth-child(5) {
    display: none;
  }
  table tr td:nth-child(4) {
    display: none;
  }
  table tr th:nth-child(4) {
    display: none;
  }
}

@media only screen and (max-width: 600px) {
  table tr td:nth-child(4) {
    display: none;
  }
  table tr td:nth-child(5) {
    display: none;
  }
  table tr th:nth-child(4) {
    display: none;
  }
  table tr th:nth-child(5) {
    display: none;
  }
  table tr td:nth-child(3) {
    display: none;
  }
  table tr th:nth-child(3) {
    display: none;
  }
  .responsive_progress {
    flex-direction: column-reverse;
  }
}
</style>
