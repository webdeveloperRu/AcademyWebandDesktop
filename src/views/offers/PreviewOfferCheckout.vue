<template>
  <div v-if="updated_desgin">
    <PreviewOfferCheckoutNew
      v-if="current_public_offer.new_design"
    ></PreviewOfferCheckoutNew>
    <PreviewOfferCheckoutOld
      v-if="!current_public_offer.new_design"
    ></PreviewOfferCheckoutOld>
  </div>
</template>

<script>
import PreviewOfferCheckoutNew from "./PreviewOfferCheckoutNew";
import PreviewOfferCheckoutOld from "./PreviewOfferCheckoutOld";
export default {
  name: "OfferCheckoutOld",
  data: () => ({
    updated_desgin: false,
  }),
  components: {
    PreviewOfferCheckoutNew,
    PreviewOfferCheckoutOld,
  },

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
    custom_agree_text: {
      get() {
        return this.service_agreement.custom_agreement_text;
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

    offer_id: function() {
      var id = this.$route.params.offer_id;
      return id.slice(0, id.length);
    },

    current_public_offer: function() {
      let offer = [];
      offer = this.$store.state.offerManage.current_public_offer;
      if (offer == undefined) return [];
      else return offer;
    },
  },

  created() {
    this.initCheckoutPage();
  },

  methods: {
    initPaymentType() {
      this.payment_type = "";
    },

    initCheckoutPage() {
      this.$store
        .dispatch("offerManage/getPublicOfferByID", this.offer_id)
        .then(() => {
          this.updated_desgin = true;
        });
    },
  },
};
</script>
<style lang="scss"></style>
