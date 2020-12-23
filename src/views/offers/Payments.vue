<template>
  <div>
    <vs-row vs-justify="center" class="progressbar">
      <vs-col vs-sm="12" vs-lg="10">
        <span
          @click="backToOffer"
          style="cursor: pointer;"
          class="ml-2 mb-5 mt-2 primary-font"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Offers</span
        >
        <h2 class="mt-3" style="color: #333; font-weight: 600">Payments</h2>
        <br />
      </vs-col>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-col vs-sm="12" vs-lg="10">
        <vs-card>
          <vs-table
            search
            :data="all_payments"
            class="text-nowrap"
            max-items="10"
            pagination
          >
            <div slot="header">
              <!-- <vs-select class="w-100 mt-3" v-model="product">
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in products"
                />
              </vs-select> -->
              Displaying all 10 payment transactions
            </div>
            <template slot="thead">
              <vs-th>ID</vs-th>
              <vs-th>AMOUNT</vs-th>
              <vs-th>TYPE</vs-th>
              <vs-th>MEMBER NAME</vs-th>
              <vs-th>MEMBER EMAIL</vs-th>
              <vs-th>OFFER TITLE</vs-th>
              <vs-th>PROVIDER</vs-th>
              <vs-th>CREATED AT</vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr
                class="border-top"
                :data="tr"
                :key="indextr"
                v-for="(tr, indextr) in data"
              >
                <vs-td>{{ data[indextr].id }}</vs-td>
                <vs-td>${{ data[indextr].amount }} USD</vs-td>
                <vs-td>{{ data[indextr].type }}</vs-td>
                <vs-td>{{ data[indextr].member_name }}</vs-td>
                <vs-td>{{ data[indextr].member_email }}</vs-td>
                <vs-td>{{ data[indextr].offer_title }}</vs-td>
                <vs-td>{{ data[indextr].provider }}</vs-td>
                <vs-td>{{ data[indextr].created_at }}</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name: "allPayments",
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

    offer_list: {
      get() {
        return this.$store.getters["offerManage/offer_list"];
      },
    },

    payment_list: {
      get() {
        return this.$store.getters["paymentManage/payment_list"];
      },
    },

    all_payments: {
      get() {
        let payments = [];
        for (let i = 0; i < this.payment_list.length; i++) {
          for (let j = 0; j < this.offer_list.length; j++) {
            if (this.payment_list[i].offer_id == this.offer_list[j].id) {
              payments[i] = {
                id: this.payment_list[i].id,
                provider: this.payment_list[i].payment_type,
                created_at: this.payment_list[i].created_on,
                amount:
                  this.offer_list[j].price +
                  this.offer_list[j].currency.toUpperCase(),
                member_name: this.payment_list[i].full_name,
                member_email: this.payment_list[i].email,
                offer_title: this.offer_list[j].name,
                type: this.payment_list[i].status,
              };
            }
          }
        }
        return payments;
      },
    },
  },

  created() {
    this.getPaymentList();
  },

  methods: {
    getPaymentList() {
      this.$store
        .dispatch("paymentManage/getPaymentList")
        .then(() => {})
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
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
