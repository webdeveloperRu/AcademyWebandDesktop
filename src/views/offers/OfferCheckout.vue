<template>
 <div v-if="checkout_new_design">
    <OfferCheckoutNew></OfferCheckoutNew>
  </div>
  <div v-else>
    <OfferCheckoutOld></OfferCheckoutOld>
  </div>
</template>

<script>
import OfferCheckoutNew from "./OfferCheckoutNew";
import OfferCheckoutOld from "./OfferCheckoutOld";
export default {
  name : 'OfferCheckout',
  data: ()=>({
  

  }), 
  components: {
    OfferCheckoutNew,
    OfferCheckoutOld
  },
  computed: {
    user_logged: {
      get() {
        return this.$store.getters["auth/user_logged"]
      }
    },
    checkout_new_design: {
      get() {
        return this.$store.state.offerManage.checkout_new_design;
      }
    },

    notification_text:{
      get() {
        return this.$store.getters["notification_text"]
      }
    },
    custom_agree_text: {
      get() {
       return this.service_agreement.custom_agreement_text;
      }
    },

    notification_icon: {
      get() {
        return this.$store.getters["notification_icon"]
      }
    },

    notification_color: {
      get() {
        return this.$store.getters["notification_color"]
      }
    },

    status_got: {
      get () {
        return this.$store.getters["status_got"]
      }
    },

    offer_id: function() {
      var id = this.$route.params.offer_id
      return id.slice(0, id.length);
    },

    selected_offer: function() {
      let offer = [];
      offer = this.$store.state.offerManage.current_offer;
       if(offer == undefined)
        return []
      else
        return offer;
    },
  },

  created() {
    this.$store.dispatch('changeSideBar', true)
    this.initCheckoutPage();
  },

  methods: {
   
    initCheckoutPage() {
      this.$store.dispatch('offerManage/getOfferByID', this.offer_id).then(()=>{
        this.$store.dispatch('offerManage/setNewDesign', this.selected_offer.new_design)
      })            
    }    
  }
}
</script>
<style lang='scss'>

</style>
