<template>
  <vs-row vs-justify="center">
    <vs-col vs-sm="12" vs-lg="11">
      <span
        @click="backToOffer"
        style="cursor: pointer;"
        class="ml-2 mb-5 mt-2 primary-font"
      >
        <i class="ti-angle-left" style="font-size: 14px;"></i>
        {{ selected_offer.name }}
        <h2 class="mt-3" style="color: #333;">Offer Stats</h2>
      </span>
      <vs-card class="cardx mt-3">
        <vs-row vs-justify="center" vs-align="center">
          <vs-col vs-w="4" style="text-align: center">
            <div>
              <h2 class="mb-2">{{ offer_purchase }}</h2>
              <h5 class="mb-1">Purchases</h5>
              <span class="description-font">Last 30 days</span>
            </div>
          </vs-col>
          <vs-col vs-w="4" style="text-align: center">
            <div>
              <h2 class="mb-2">${{ net_revenue30 }}</h2>
              <h5 class="mb-1">Net Revenue</h5>
              <span class="description-font">Last 30 days</span>
            </div>
          </vs-col>
          <vs-col vs-w="4" style="text-align: center">
            <div>
              <h2 class="mb-2">${{ net_revenueall }}</h2>
              <h5 class="mb-1">Net Revenue</h5>
              <span class="description-font">All time</span>
            </div>
          </vs-col>
        </vs-row>
      </vs-card>
      <!-- 
        @@ Total Sales
       -->
      <vs-card class="cardx mt-3">
        <vs-row vs-justify="center" vs-align="center">
          <vs-col vs-w="12">
            <div class="d-flex" style="justify-content: space-between">
              <h4 style="font-weight: 600">Total Sales</h4>
              <vs-select v-model="selected_period">
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in sales_peroids"
                />
              </vs-select>
            </div>
            <div>
              <vue-apex-charts
                type="line"
                height="350"
                :options="salesChart.chartOptions"
                :series="salesChart.series"
              ></vue-apex-charts>
            </div>
          </vs-col>
        </vs-row>
      </vs-card>
      <!-- 
        @@ Total Purchases
       -->
      <vs-card class="cardx mt-3">
        <vs-row vs-justify="center" vs-align="center">
          <vs-col vs-w="12">
            <div class="d-flex" style="justify-content: space-between">
              <h4 style="font-weight: 600">Total Purchases</h4>
              <vs-select v-model="selected_period">
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in sales_peroids"
                />
              </vs-select>
            </div>
            <div>
              <vue-apex-charts
                type="line"
                height="350"
                :options="purchaseChart.chartOptions"
                :series="purchaseChart.series"
              ></vue-apex-charts>
            </div>
          </vs-col>
        </vs-row>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "StarterPage",
  components: {
    VueApexCharts,
  },

  data: () => ({
    sales_peroids: [{ text: "last 30days", value: 0 }],
    selected_period: 0,
    offer_purchase: 0,
    net_revenueall: 0,
    net_revenue30: 0,
    purchaseChart: {
      series: [
        {
          name: "purchases",
          data: [],
          type: "area",
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        colors: ["#2962FF", "#4fc3f7", "#f62d51", "#ffbc34", "#212529"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          position: "top",
        },
        markers: {
          size: 5,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Number of Purchases",
          align: "center",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    },
    salesChart: {
      series: [
        {
          name: "sales",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        colors: ["#299934", "#4fc3f7", "#f62d51", "#ffbc34", "#212529"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: true,
          position: "top",
        },
        markers: {
          size: 5,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "USD",
          align: "center",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    },
  }),

  computed: {
    offer_id: function() {
      var id = this.$route.params.offer_id;
      return id.slice(0, id.length);
    },

    selected_offer: function() {
      let offer = [];
      offer = this.$store.state.offerManage.current_offer;
      if (offer == undefined) return [];
      else return offer;
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
    current_offer_stats: {
      get() {
        return this.$store.state.offerManage.offer_stats[this.offer_id];
      },
    },
  },

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.setOfferItem(this.offer_id);
  },

  methods: {
    setOfferItem(offer_id) {
      this.$store
        .dispatch("offerManage/getOfferByID", offer_id)
        .then(() => {})
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
      this.net_revenueall = this.current_offer_stats.netRevenueAllTime;
      this.net_revenue30 = this.current_offer_stats.netRevenueCustom;
      this.offer_purchase = this.current_offer_stats.total_purchases;
      // for(let i = 0; i < this.current_offer_stats.graphPoints.length; i++) {
      let stat_keys = Object.keys(this.current_offer_stats.graphPoints);
      let x_categories = [];
      let purchase_values = [];
      let sale_values = [];
      for (let i = 0; i < stat_keys.length; i++) {
        x_categories[i] = stat_keys[i].substring(0, 10);
        purchase_values[i] = this.current_offer_stats.graphPoints[
          stat_keys[i]
        ].purchases;
        sale_values[i] = this.current_offer_stats.graphPoints[
          stat_keys[i]
        ].revenue;
      }
      this.purchaseChart.chartOptions.xaxis.categories = x_categories;
      this.salesChart.chartOptions.xaxis.categories = x_categories;
      this.purchaseChart.series[0].data = purchase_values;
      this.salesChart.series[0].data = sale_values;
    },

    backToOffer() {
      this.$router.push("/offers");
    },
  },
};
</script>
<style>
.ps {
  height: 100px;
}
</style>
