<template>
  <div>
    <div class="outline-edit">
      <div class="checkout-banner"></div>
      <vs-button class="edit-button" size="small">Edit</vs-button>
    </div>
    <vs-row vs-justify="center" class="mt-5">
      <!-- <vs-col vs-lg="2"></vs-col> -->
      <vs-col vs-lg="5" class="px-5" vs-sm="7" vs-xs="12">
        <!-- 
          banner section 
          -->
        <div class="outline-edit">
          <div class="checkout-image-div shadow"></div>
          <vs-button class="edit-button" size="small">Edit</vs-button>
        </div>

        <!-- 
          offer title 
          -->
        <div class="outline-edit mt-5">
          <h2 class="">Offer Title</h2>
          <vs-button class="edit-button" size="small">Edit</vs-button>
        </div>

        <!-- 
          insert a call to action 
          -->
        <div class="outline-edit">
          <div v-html="htmlBody" class="mt-3 mb-3"></div>
          <vs-button class="edit-button" size="small">Edit</vs-button>
        </div>
        <!-- 
          testmonial section 
          -->
        <br />
        <div class="outline-edit">
          <h4 class="mt-3 mb-3">Testimonial Title</h4>
          <vs-button class="edit-button" size="small">Edit</vs-button>
        </div>

        <div class="outline-edit">
          <div class="testimonial-description  mx-1 my-1">
            This is a good one in the world. This is a good one in the world.
            This is a good one in the world. This is a good one in the world.
            This is a good one in the world. This is a good one in the world.
            This is a good one in the world.
          </div>
          <div class="d-flex mt-3 mx-1 mb-1" style="align-items:center">
            <vs-avatar size="large"></vs-avatar>
            <h4>User Name</h4>
          </div>
          <vs-button class="edit-button" size="small">Edit</vs-button>
        </div>
      </vs-col>
      <vs-col vs-lg="3" vs-sm="5" vs-xs="12">
        <vs-card>
          <h2><strong>$299.00</strong> <small> USD</small></h2>
          <vs-divider></vs-divider>
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Full Name"
            v-model="fullname"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Email Address"
            v-model="email"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Create Password"
            v-model="createPW"
            type="password"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Confirm Password"
            v-model="confirmPW"
            type="password"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Address Line 1"
            v-model="address1"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Apt, Suite, Etc"
            v-model="apt"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="City"
            v-model="city"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Country Name"
            v-model="country"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="State/Province/Region"
            v-model="region"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Zip/Postal Code"
            v-model="zipcode"
          />
          <vs-input
            class="inputx w-100 mt-3"
            placeholder="Phone Number"
            v-model="phone_number"
          />
          <div class="mt-3">
            <vs-checkbox
              class="justify-content-start"
              size="small"
              v-model="subscribeEmailList"
              >Subscribe to our email list.</vs-checkbox
            >
          </div>
          <div class="outline-edit mt-3">
            <div class="">
              <vs-checkbox
                class="justify-content-start"
                size="small"
                v-model="required_agreement"
                >I have read and agree to the terms and condition of this
                page.</vs-checkbox
              >
            </div>
            <vs-button class="edit-button" size="small">Edit</vs-button>
          </div>
          <div class="outline-edit mt-3">
            <vs-checkbox
              class="justify-content-start"
              size="small"
              v-model="custom_agreement"
              >Custom requirement</vs-checkbox
            >
            <vs-button class="edit-button" size="small">Edit</vs-button>
          </div>
          <vs-button class="w-100 mt-3" disabled
            >Complete my purchase</vs-button
          >
        </vs-card>
      </vs-col>
      <!-- <vs-col vs-lg="2"></vs-col> -->
    </vs-row>
  </div>
</template>

<script>
export default {
  name: "OfferCheckout1",
  data: () => ({
    email: "",
    address1: "",
    phone_number: "",
    apt: "",
    city: "",
    fullname: "",
    confirmPW: "",
    createPW: "",
    country: "",
    region: "",
    zipcode: "",
    subscribeEmailList: false,
    required_agreement: false,
    custom_agreement: false,
    htmlBody: "<h4>Insert Html bind here...</h4>",
  }),

  created() {
    this.$store.dispatch("changeSideBar", true);
  },
};
</script>
<style>
.checkout-banner {
  height: 100px;
  width: 100%;
  /* margin-left: -20px; */
  /* margin-right: -20px; */
  background-color: dodgerblue;
}

.checkout-image-div {
  /* border: 1px rgba(0, 0, 0, 0.2) solid; */
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.testimonial-description {
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 5px;
  padding: 20px;
}
.con-vs-checkbox {
  display: -webkit-box;
}
.outline-edit {
  position: relative;
  border: 2px transparent dashed;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
  user-select: none;
}
.outline-edit:hover {
  border: 2px dodgerblue dashed;
  background-color: rgba(98, 120, 243, 0.2);
}
.outline-edit:hover .edit-button {
  display: block;
}
.edit-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
</style>
