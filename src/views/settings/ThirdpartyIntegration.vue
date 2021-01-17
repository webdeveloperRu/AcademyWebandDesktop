<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-sm="12">
      <div class="mb-4">
        <span
          class="ml-2 mb-2 mt-2 primary-font"
          @click="backToSettings"
          style="cursor: pointer;"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Settings</span
        >
        <br />
        <div class="d-flex mt-3">
          <h2>Third Party Integration</h2>
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
      vs-lg="9"
      vs-sm="12"
      code-toggler
    >
      <vs-card>
        <h3>Email Integration</h3>
        <vs-divider />

        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="mailchimp_config.icon"
              width="50px"
              alt="mailchimp"
              @click="mailchimp_edit = !mailchimp_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div
              @click="mailchimp_edit = !mailchimp_edit"
              style="cursor:pointer;"
            >
              <h4>{{ mailchimp_config.name }}</h4>
              <div>
                {{ mailchimp_config.description }}
              </div>
            </div>
            <div v-if="mailchimp_edit">
              <vs-input
                label="API Key"
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxx-us7"
                v-model="mailchimp_apikey"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ mailchimp_config.help }}</label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="mailchimp_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="saveThirdPartyConfiguration(mailchimp_config.slug)"
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="mailchimp_status"
              @click="changeThirdPartyIntegraitonSatus(mailchimp_config.slug)"
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />
        <!--
        @@drip
        -->

        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="drip_config.icon"
              width="50px"
              alt="Drip"
              @click="drip_edit = !drip_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div @click="drip_edit = !drip_edit" style="cursor:pointer;">
              <h4>{{ drip_config.name }}</h4>
              <div>
                {{ drip_config.description }}
              </div>
            </div>
            <div v-if="drip_edit">
              <vs-input
                label="API Key"
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxx-us7"
                v-model="drip_apikey"
                class="w-100 mt-2"
              />
              <label class="mt-2"> {{ drip_config.help }}</label>
              <vs-input
                label="Account ID"
                placeholder="xxxxxx"
                v-model="drip_accountID"
                class="w-100 mt-2"
              />
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="drip_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="saveThirdPartyConfiguration(drip_config.slug)"
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="drip_status"
              @click="changeThirdPartyIntegraitonSatus(drip_config.slug)"
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />

        <!-- 
          convert_kit
        -->
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="convert_kit_config.icon"
              width="50px"
              alt="ConvertKit"
              @click="convert_kit_edit = !convert_kit_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div
              @click="convert_kit_edit = !convert_kit_edit"
              style="cursor:pointer;"
            >
              <h4>{{ convert_kit_config.name }}</h4>
              <div>
                {{ convert_kit_config.description }}
              </div>
            </div>
            <div v-if="convert_kit_edit">
              <vs-input
                label="API Key"
                placeholder=""
                v-model="convert_kit_apikey"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ convert_kit_config.help }}</label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="convert_kit_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="saveThirdPartyConfiguration(convert_kit_config.slug)"
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="convert_kit_status"
              @click="changeThirdPartyIntegraitonSatus(convert_kit_config.slug)"
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />

        <!-- 
        active campaign
         -->
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="active_campaign_config.icon"
              width="50px"
              alt="ActiveCampaign"
              @click="active_campaign_edit = !active_campaign_edit"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div
              @click="active_campaign_edit = !active_campaign_edit"
              style="cursor:pointer;"
            >
              <h4>{{ active_campaign_config.name }}</h4>
              <div>
                {{ active_campaign_config.description }}
              </div>
            </div>
            <div v-if="active_campaign_edit">
              <vs-input
                label="API Url"
                placeholder="https://your-site.api-us5.com"
                v-model="active_campaign_apiurl"
                class="w-100 mt-2"
              />
              <vs-input
                label="API Key"
                placeholder="435k3l456jl3k2j436fsdkfj080ds080sd8f0"
                v-model="active_campaign_apikey"
                class="w-100 mt-2"
              />
              <label class="mt-2"> {{ active_campaign_config.help }}</label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="active_campaign_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="
                    saveThirdPartyConfiguration(active_campaign_config.slug)
                  "
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="active_campaign_status"
              @click="
                changeThirdPartyIntegraitonSatus(active_campaign_config.slug)
              "
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>

        <!-- 
          segment
           -->
        <vs-divider />
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="segment_config.icon"
              width="50px"
              alt="Segment"
              @click="segment_edit = !segment_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div @click="segment_edit = !segment_edit" style="cursor:pointer;">
              <h4>{{ segment_config.name }}</h4>
              <div>
                {{ segment_config.description }}
              </div>
            </div>
            <div v-if="segment_edit">
              <vs-input
                label="API Key"
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                v-model="segment_apikey"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ segment_config.help }} </label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="segment_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="saveThirdPartyConfiguration(segment_config.slug)"
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="segment_status"
              @click="changeThirdPartyIntegraitonSatus(segment_config.slug)"
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />

        <!-- 
        @Analytics
         -->
        <h3>Analytics</h3>
        <vs-divider />
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="google_analytics_config.icon"
              width="50px"
              alt="Google Analytics"
              @click="google_analytics_edit = !google_analytics_edit"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div
              @click="google_analytics_edit = !google_analytics_edit"
              style="cursor:pointer;"
            >
              <h4>{{ google_analytics_config.name }}</h4>
              <div>
                {{ google_analytics_config.description }}
              </div>
            </div>
            <div v-if="google_analytics_edit">
              <vs-input
                label="Google Analytics ID"
                placeholder="UA-xxxxxxxx-x"
                v-model="google_analytics_ID"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ google_analytics_config.help }}</label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="google_analytics_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="
                    saveThirdPartyConfiguration(google_analytics_config.slug)
                  "
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="google_analytics_status"
              @click="
                changeThirdPartyIntegraitonSatus(google_analytics_config.slug)
              "
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />

        <!-- 
        @facebook
         -->
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="facebook_pixel_config.icon"
              width="50px"
              alt="Facebook Pixel"
              @click="facebook_pixel_edit = !facebook_pixel_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div
              @click="facebook_pixel_edit = !facebook_pixel_edit"
              style="cursor:pointer;"
            >
              <h4>{{ facebook_pixel_config.name }}</h4>
              <div>
                {{ facebook_pixel_config.description }}
              </div>
            </div>
            <div v-if="facebook_pixel_edit">
              <vs-input
                label="Pixel ID"
                placeholder="xxxxxxxxxxxxx"
                v-model="pixel_ID"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ facebook_pixel_config.help }} </label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="facebook_pixel_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="
                    saveThirdPartyConfiguration(facebook_pixel_config.slug)
                  "
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="facebook_pixel_status"
              @click="
                changeThirdPartyIntegraitonSatus(facebook_pixel_config.slug)
              "
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />

        <!-- 
        @Storage
         -->
        <h3>Storage</h3>
        <vs-divider />
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="amazon_config.icon"
              width="50px"
              alt="AWS icon"
              @click="amazon_edit = !amazon_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div @click="amazon_edit = !amazon_edit" style="cursor:pointer;">
              <h4>{{ amazon_config.name }}</h4>
              <div>
                {{ amazon_config.description }}
              </div>
            </div>
            <div v-if="amazon_edit">
              <vs-input
                label="AWS access Key"
                placeholder=""
                v-model="aws_access_keyID"
                class="w-100 mt-2"
              />
              <vs-input
                label="AWS secret access Key"
                placeholder=""
                v-model="aws_secret_access_key"
                class="w-100 mt-2"
              />
              <vs-input
                label="AWS region"
                placeholder=""
                v-model="aws_region"
                class="w-100 mt-2"
              />
              <vs-input
                label="AWS bucket name"
                placeholder=""
                v-model="aws_bucket_name"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ amazon_config.help }} </label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="amazon_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="saveThirdPartyConfiguration(amazon_config.slug)"
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="amazon_status"
              @click="changeThirdPartyIntegraitonSatus(amazon_config.slug)"
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />

        <!-- 
        @Payment Integration
         -->
        <h3>Payment Integration</h3>
        <vs-divider />
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="paypal_config.icon"
              width="50px"
              alt="PayPal"
              @click="paypal_edit = !paypal_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div @click="paypal_edit = !paypal_edit" style="cursor:pointer;">
              <h4>{{ paypal_config.name }}</h4>
              <div>
                {{ paypal_config.description }}
              </div>
            </div>
            <div v-if="paypal_edit">
              <vs-input
                label="Email"
                placeholder="UA-xxxxxxxx-x"
                v-model="paypal_email"
                class="w-100 mt-2"
              />
              <vs-input
                label="Token"
                placeholder="UA-xxxxxxxx-x"
                v-model="paypal_token"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ paypal_config.help }}</label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="paypal_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="saveThirdPartyConfiguration(paypal_config.slug)"
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="paypal_status"
              @click="changeThirdPartyIntegraitonSatus(paypal_config.slug)"
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>

        <!-- 
          @ stripe
         -->
        <vs-divider />
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="stripe_config.icon"
              width="50px"
              alt="Stripe"
              @click="stripe_edit = !stripe_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div @click="stripe_edit = !stripe_edit" style="cursor:pointer;">
              <h4>{{ stripe_config.name }}</h4>
              <div>
                {{ stripe_config.description }}
              </div>
            </div>
            <div v-if="stripe_edit">
              <vs-input
                label="Stripe publishable key"
                placeholder=""
                v-model="stripe_publish_key"
                class="w-100 mt-2"
              />
              <vs-input
                label="Stripe secret key"
                placeholder=""
                v-model="stripe_secret_key"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ stripe_config.help }}</label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="stripe_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="saveThirdPartyConfiguration(stripe_config.slug)"
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="stripe_status"
              @click="changeThirdPartyIntegraitonSatus(stripe_config.slug)"
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />
        <!-- 
          btcpay 
          -->
        <vs-row class="ml-2">
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <img
              :src="btcpay_config.icon"
              width="50px"
              alt="Btcpay"
              click="btcpay_edit = !btcpay_edit"
              style="cursor:pointer;"
            />
          </vs-col>
          <vs-col vs-lg="10" vs-xs="6" vs-sm="8">
            <div @click="btcpay_edit = !btcpay_edit" style="cursor:pointer;">
              <h4>{{ btcpay_config.name }}</h4>
              <div>
                {{ btcpay_config.description }}
              </div>
            </div>
            <div v-if="btcpay_edit">
              <vs-input
                label="Server Url"
                placeholder="UA-xxxxxxxx-x"
                v-model="btcpay_server_url"
                class="w-100 mt-2"
              />
              <vs-input
                label="Pair code"
                placeholder="UA-xxxxxxxx-x"
                v-model="btcpay_pair_code"
                class="w-100 mt-2"
              />
              <label class="mt-2">{{ btcpay_config.help }}</label>
              <div
                style="display: flex;justify-content: flex-end;"
                v-if="btcpay_changed"
              >
                <vs-button
                  class="mt-4"
                  color="primary"
                  @click.native="saveThirdPartyConfiguration(btcpay_config.slug)"
                >
                  save
                </vs-button>
              </div>
            </div>
          </vs-col>
          <vs-col vs-lg="1" vs-xs="3" vs-sm="2">
            <vs-switch
              color="green"
              v-model="btcpay_status"
              @click.native="changeThirdPartyIntegraitonSatus(btcpay_config.slug)"
            >
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-col>
        </vs-row>
        <vs-divider />
      </vs-card>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "ContactTags",
  data: () => ({
    // status checkbox
    mailchimp_status: false,
    active_campaign_status: false,
    drip_status: false,
    convert_kit_status: false,
    facebook_pixel_status: false,
    google_analytics_status: false,
    segment_status: false,
    amazon_status: false,
    stripe_status: false,
    btcpay_status: false,
    paypal_status: false,

    // edit content flag
    mailchimp_edit: false,
    active_campaign_edit: false,
    drip_edit: false,
    convert_kit_edit: false,
    facebook_pixel_edit: false,
    google_analytics_edit: false,
    segment_edit: false,
    amazon_edit: false,
    stripe_edit: false,
    btcpay_edit: false,
    paypal_edit: false,

    // data changed
    mailchimp_changed: false,
    active_campaign_changed: false,
    drip_changed: false,
    convert_kit_changed: false,
    facebook_pixel_changed: false,
    google_analytics_changed: false,
    segment_changed: false,
    stripe_changed: false,
    btcpay_changed: false,
    paypal_changed: false,
    amazon_changed: false,
    mailchimp_apikey: "",
    drip_accountID: "",
    drip_apikey: "",
    convert_kit_apikey: "",
    google_analytics_ID: "",
    segment_apikey: "",
    pixel_ID: "",
    active_campaign_apiurl: "",
    active_campaign_apikey: "",
    aws_region: "",
    aws_bucket_name: "",
    aws_access_keyID: "",
    aws_secret_access_key: "",
    paypal_email: "",
    paypal_token: "",
    stripe_publish_key: "",
    stripe_secret_key: "",
    btcpay_server_url: "",
    btcpay_pair_code: "",
  }),

  created() {
    this.$store.dispatch("changeSideBar", 'default');
    this.getAllIntegrations();
  },
  watch: {
    // /**
    //  * set thirdparty integrtion status
    //  */
    // mailchimp_status: function(newValue) {
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus('mailchimp')
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('mailchimp')
    //   }
    // },
    // drip_status: function(newValue) {
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus('drip')
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('drip')
    //   }
    // },

    // convert_kit_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus('convert_kit')
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('convert_kit')
    //   }
    // },

    // segment_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus('segment')
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('segment')
    //   }
    // },

    // active_campaign_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus('active_campaign')
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('active_campaign')
    //   }
    // },

    // google_analytics_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus('google_analytics')
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('google_analytics')
    //   }
    // },

    // facebook_pixel_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus('facebook_pixel')
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('facebook_pixel')
    //   }
    // },

    // amazon_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus("amazon_s3")
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('amazon_s3')
    //   }
    // },

    // paypal_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus("paypal")
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('paypal')
    //   }
    // },

    // stripe_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus("stripe")
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('stripe')
    //   }
    // },

    // btcpay_status: function(newValue){
    //   if(newValue){
    //     this.enableThirdPartyIntegrationStatus("btcpay")
    //   } else{
    //     this.disableThirdPartyIntegrationStatus('btcpay')
    //   }

    // },

    /**
     * show thirdparty integrtion edit
     */
    mailchimp_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("mailchimp");
      } else {
        this.deleteThirdPartyIntegrationConfig("mailchimp");
      }
    },
    drip_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("drip");
      } else {
        this.deleteThirdPartyIntegrationConfig("drip");
      }
    },

    convert_kit_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("convert_kit");
      } else {
        this.deleteThirdPartyIntegrationConfig("convert_kit");
      }
    },

    segment_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("segment");
      } else {
        this.deleteThirdPartyIntegrationConfig("segment");
      }
    },

    active_campaign_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("active_campaign");
      } else {
        this.deleteThirdPartyIntegrationConfig("active_campaign");
      }
    },

    google_analytics_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("google_analytics");
      } else {
        this.deleteThirdPartyIntegrationConfig("google_analytics");
      }
    },

    facebook_pixel_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("facebook_pixel");
      } else {
        this.deleteThirdPartyIntegrationConfig("facebook_pixel");
      }
    },

    amazon_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("amazon_s3");
      } else {
        this.deleteThirdPartyIntegrationConfig("amazon_s3");
      }
    },

    paypal_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("paypal");
      } else {
        this.deleteThirdPartyIntegrationConfig("paypal");
      }
    },

    stripe_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("stripe");
      } else {
        this.deleteThirdPartyIntegrationConfig("stripe");
      }
    },

    btcpay_edit: function(newValue) {
      if (newValue) {
        this.getThirdPartyIntegrationConfig("btcpay");
      } else {
        this.deleteThirdPartyIntegrationConfig("btcpay");
      }
    },

    mailchimp_apikey: function(newValue) {
      if (this.mailchimp_data.data == undefined) {
        if (newValue !== "") this.mailchimp_changed = true;
        else this.mailchimp_changed = false;
      } else {
        if (newValue !== this.mailchimp_data.data.api_key) {
          this.mailchimp_changed = true;
        } else {
          this.mailchimp_changed = false;
        }
      }
    },
    drip_accountID: function(newValue) {
      if (this.drip_data.data == undefined) {
        if (newValue !== "" && this.drip_apikey !== "")
          this.drip_changed = true;
        else this.drip_changed = false;
      } else {
        if (newValue !== this.drip_data.data.account_id) {
          this.drip_changed = true;
        } else {
          this.drip_changed = false;
        }
      }
    },

    drip_apikey: function(newValue) {
      if (this.drip_data.data == undefined) {
        if (newValue !== "" && this.drip_accountID !== "")
          this.drip_changed = true;
        else this.drip_changed = false;
      } else {
        if (newValue !== this.drip_data.data.api_key) {
          this.drip_changed = true;
        } else {
          this.drip_changed = false;
        }
      }
    },
    convert_kit_apikey: function(newValue) {
      if (this.convert_kit_data.data == undefined) {
        if (newValue !== "") this.convert_kit_changed = true;
        else this.convert_kit_changed = false;
      } else {
        if (newValue !== this.convert_kit_data.data.api_key) {
          this.convert_kit_changed = true;
        } else {
          this.convert_kit_changed = false;
        }
      }
    },
    google_analytics_ID: function(newValue) {
      if (this.google_analytics_data.data == undefined) {
        if (newValue !== "") this.google_analytics_changed = true;
        else this.google_analytics_changed = false;
      } else {
        if (newValue !== this.google_analytics_data.data.google_analytics_id) {
          this.google_analytics_changed = true;
        } else {
          this.google_analytics_changed = false;
        }
      }
    },
    segment_apikey: function(newValue) {
      if (this.segment_data.data == undefined) {
        if (newValue !== "") this.segment_changed = true;
        else this.segment_changed = false;
      } else {
        if (newValue !== this.segment_data.data.api_key) {
          this.segment_changed = true;
        } else {
          this.segment_changed = false;
        }
      }
    },
    pixel_ID: function(newValue) {
      if (this.facebook_pixel_data.data == undefined) {
        if (newValue !== "") this.facebook_pixel_changed = true;
        else this.facebook_pixel_changed = false;
      } else {
        if (newValue !== this.facebook_pixel_data.data.pixel_id) {
          this.facebook_pixel_changed = true;
        } else {
          this.facebook_pixel_changed = false;
        }
      }
    },
    active_campaign_apiurl: function(newValue) {
      if (this.active_campaign_data.data == undefined) {
        if (newValue !== "" && this.active_campaign_apikey !== "")
          this.active_campaign_changed = true;
        else this.active_campaign_changed = false;
      } else {
        if (newValue !== this.active_campaign_data.data.api_url) {
          this.active_campaign_changed = true;
        } else {
          this.active_campaign_changed = false;
        }
      }
    },
    active_campaign_apikey: function(newValue) {
      if (this.active_campaign_data.data == undefined) {
        if (newValue !== "" && this.active_campaign_apiurl !== "")
          this.active_campaign_changed = true;
        else this.active_campaign_changed = false;
      } else {
        if (newValue !== this.active_campaign_data.data.api_key) {
          this.active_campaign_changed = true;
        } else {
          this.active_campaign_changed = false;
        }
      }
    },
    aws_region: function(newValue) {
      if (this.amazon_data.data == undefined) {
        if (
          newValue !== "" &&
          this.aws_bucket_name !== "" &&
          this.aws_secret_access_key !== "" &&
          this.aws_access_key_id !== ""
        )
          this.amazon_changed = true;
        else this.amazon_changed = false;
      } else {
        if (newValue !== this.amazon_data.data.region) {
          this.amazon_changed = true;
        } else {
          this.amazon_changed = false;
        }
      }
    },
    aws_bucket_name: function(newValue) {
      if (this.amazon_data.data == undefined) {
        if (
          newValue !== "" &&
          this.aws_region !== "" &&
          this.aws_secret_access_key !== "" &&
          this.aws_access_key_id !== ""
        )
          this.amazon_changed = true;
        else this.amazon_changed = false;
      } else {
        if (newValue !== this.amazon_data.data.bucket_name) {
          this.amazon_changed = true;
        } else {
          this.amazon_changed = false;
        }
      }
    },
    aws_access_keyID: function(newValue) {
      if (this.amazon_data.data == undefined) {
        if (
          newValue !== "" &&
          this.aws_region !== "" &&
          this.aws_secret_access_key !== "" &&
          this.aws_bucket_name !== ""
        )
          this.amazon_changed = true;
        else this.amazon_changed = false;
      } else {
        if (newValue !== this.amazon_data.data.aws_access_key_id) {
          this.amazon_changed = true;
        } else {
          this.amazon_changed = false;
        }
      }
    },
    aws_secret_access_key: function(newValue) {
      if (this.amazon_data.data == undefined) {
        if (
          newValue !== "" &&
          this.aws_region !== "" &&
          this.aws_secret_access_key !== "" &&
          this.aws_access_keyID !== ""
        )
          this.amazon_changed = true;
        else this.amazon_changed = false;
      } else {
        if (newValue !== this.amazon_data.data.aws_secret_access_key) {
          this.amazon_changed = true;
        } else {
          this.amazon_changed = false;
        }
      }
    },
    paypal_email: function(newValue) {
      if (this.paypal_data.data == undefined) {
        if (newValue !== "" && this.paypal_token !== "")
          this.paypal_changed = true;
        else this.paypal_changed = false;
      } else {
        if (newValue !== this.paypal_data.data.email) {
          this.paypal_changed = true;
        } else {
          this.paypal_changed = false;
        }
      }
    },
    paypal_token: function(newValue) {
      if (this.paypal_data.data == undefined) {
        if (newValue !== "" && this.paypal_email !== "")
          this.paypal_changed = true;
        else this.paypal_changed = false;
      } else {
        if (newValue !== this.paypal_data.data.token) {
          this.paypal_changed = true;
        } else {
          this.paypal_changed = false;
        }
      }
    },
    stripe_publish_key: function(newValue) {
      if (this.stripe_data.data == undefined) {
        if (newValue !== "" && this.stripe_secret_key)
          this.stripe_changed = true;
        else this.stripe_changed = false;
      } else {
        if (newValue !== this.stripe_data.data.STRIPE_PUBLISHABLE_KEY) {
          this.stripe_changed = true;
        } else {
          this.stripe_changed = false;
        }
      }
    },
    stripe_secret_key: function(newValue) {
      if (this.stripe_data.data == undefined) {
        if (newValue !== "" && this.stripe_publish_key !== "")
          this.stripe_changed = true;
        else this.stripe_changed = false;
      } else {
        if (newValue !== this.stripe_data.data.STRIPE_SECRET_KEY) {
          this.stripe_changed = true;
        } else {
          this.stripe_changed = false;
        }
      }
    },
    btcpay_server_url: function(newValue) {
      if (this.btcpay_data.data == undefined) {
        if (newValue !== "" && this.btcpay_pair_code !== "")
          this.btcpay_changed = true;
        else this.btcpay_changed = false;
      } else {
        if (newValue !== this.btcpay_data.data.server_url) {
          this.btcpay_changed = true;
        } else {
          this.btcpay_changed = false;
        }
      }
    },
    btcpay_pair_code: function(newValue) {
      if (this.btcpay_data.data == undefined) {
        if (newValue !== "" && this.btcpay_server_url !== "")
          this.btcpay_changed = true;
        else this.btcpay_changed = false;
      } else {
        if (newValue !== this.btcpay_data.data.pair_code) {
          this.btcpay_changed = true;
        } else {
          this.btcpay_changed = false;
        }
      }
    },
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
    mailchimp_config: {
      get() {
        return this.$store.getters["integrationManage/mailchimp"];
      },
    },

    drip_config: {
      get() {
        return this.$store.getters["integrationManage/drip"];
      },
    },

    convert_kit_config: {
      get() {
        return this.$store.getters["integrationManage/convert_kit"];
      },
    },

    active_campaign_config: {
      get() {
        return this.$store.getters["integrationManage/active_campaign"];
      },
    },

    segment_config: {
      get() {
        return this.$store.getters["integrationManage/segment"];
      },
    },

    google_analytics_config: {
      get() {
        return this.$store.getters["integrationManage/google_analytics"];
      },
    },

    facebook_pixel_config: {
      get() {
        return this.$store.getters["integrationManage/facebook_pixel"];
      },
    },

    amazon_config: {
      get() {
        return this.$store.getters["integrationManage/amazon"];
      },
    },

    stripe_config: {
      get() {
        return this.$store.getters["integrationManage/stripe"];
      },
    },

    paypal_config: {
      get() {
        return this.$store.getters["integrationManage/paypal"];
      },
    },

    btcpay_config: {
      get() {
        return this.$store.getters["integrationManage/btcpay"];
      },
    },

    /**
     *  get slug data
     **/
    mailchimp_data: {
      get() {
        return this.$store.getters["integrationManage/mailchimp_data"];
      },
    },

    drip_data: {
      get() {
        return this.$store.getters["integrationManage/drip_data"];
      },
    },

    convert_kit_data: {
      get() {
        return this.$store.getters["integrationManage/convert_kit_data"];
      },
    },

    active_campaign_data: {
      get() {
        return this.$store.getters["integrationManage/active_campaign_data"];
      },
    },

    segment_data: {
      get() {
        return this.$store.getters["integrationManage/segment_data"];
      },
    },

    google_analytics_data: {
      get() {
        return this.$store.getters["integrationManage/google_analytics_data"];
      },
    },

    facebook_pixel_data: {
      get() {
        return this.$store.getters["integrationManage/facebook_pixel_data"];
      },
    },

    amazon_data: {
      get() {
        return this.$store.getters["integrationManage/amazon_data"];
      },
    },

    stripe_data: {
      get() {
        return this.$store.getters["integrationManage/stripe_data"];
      },
    },

    paypal_data: {
      get() {
        return this.$store.getters["integrationManage/paypal_data"];
      },
    },

    btcpay_data: {
      get() {
        return this.$store.getters["integrationManage/btcpay_data"];
      },
    },

    integrations: {
      get() {
        return this.$store.getters["integrationManage/integrations"];
      },
    },
  },

  methods: {
    updateIntegrationState() {
      this.mailchimp_status = this.mailchimp_config.status;
    },

    getAllIntegrations() {
      this.$store
        .dispatch("integrationManage/getIntegrationList")
        .then(() => {
          this.updateIntegrationState();
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    backToSettings() {
      this.$router.push("/settings");
    },

    saveThirdPartyConfiguration(slug) {
      // mailchimp update config

      if (slug == this.mailchimp_config.slug) {
        let mailchimp = {
          data: { api_key: this.mailchimp_apikey },
          slug: this.mailchimp_config.slug,
        };
        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", mailchimp)
          .then(() => {
            this.$vs.notify({
              title: "MailChimp setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.mailchimp_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "MailChimp setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // drip config update

      if (slug == this.drip_config.slug) {
        let drip = {
          data: { api_key: this.drip_apikey, account_id: this.drip_accountID },
          slug: this.drip_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", drip)
          .then(() => {
            this.$vs.notify({
              title: "Drip setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.drip_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "Drip setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // convert kit config update

      if (slug == this.convert_kit_config.slug) {
        let convert_kit = {
          data: { api_key: this.convert_kit_apikey },
          slug: this.convert_kit_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", convert_kit)
          .then(() => {
            this.$vs.notify({
              title: "Convert_kit setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.convert_kit_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "Convert_kit setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // active campaign config update

      if (slug == this.active_campaign_config.slug) {
        let active_campaign = {
          data: {
            api_key: this.active_campaign_apikey,
            api_url: this.active_campaign_apiurl,
          },
          slug: this.active_campaign_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", active_campaign)
          .then(() => {
            this.$vs.notify({
              title: "ActiveCampaign setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.active_campaign_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "ActiveCampaign setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // segment config update

      if (slug == this.segment_config.slug) {
        let segment = {
          data: { api_key: this.segment_apikey },
          slug: this.segment_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", segment)
          .then(() => {
            this.$vs.notify({
              title: "Segment setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.segment_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "Segment setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // google_analytics config update

      if (slug == this.google_analytics_config.slug) {
        let google_analytics = {
          data: { google_analytics_id: this.google_analytics_ID },
          slug: this.google_analytics_config.slug,
        };

        this.$store
          .dispatch(
            "integrationManage/setupIntegrationConfig",
            google_analytics
          )
          .then(() => {
            this.$vs.notify({
              title: "GoogleAnalytics setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.google_analytics_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "GoogleAnalytics setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // facebook pixel config update

      if (slug == this.facebook_pixel_config.slug) {
        let facebook_pixel = {
          data: { pixel_id: this.pixel_ID },
          slug: this.facebook_pixel_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", facebook_pixel)
          .then(() => {
            this.$vs.notify({
              title: "FacebookPixel setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.facebook_pixel_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "FacebookPixel setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // amazon  config update

      if (slug == this.amazon_config.slug) {
        let amazon = {
          data: {
            aws_access_key_id: this.aws_access_keyID,
            aws_secret_access_key: this.aws_secret_access_key,
            region: this.aws_region,
            bucket_name: this.aws_bucket_name,
          },
          slug: this.amazon_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", amazon)
          .then(() => {
            this.$vs.notify({
              title: "Amazone setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.amazon_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "Amazone setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // paypal  config update

      if (slug == this.paypal_config.slug) {
        let paypal = {
          data: { email: this.paypal_email, token: this.paypal_token },
          slug: this.paypal_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", paypal)
          .then(() => {
            this.$vs.notify({
              title: "Paypal setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.paypal_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "Paypal setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // stripe  config update

      if (slug == this.stripe_config.slug) {
        let paypal = {
          data: {
            STRIPE_PUBLISHABLE_KEY: this.stripe_publish_key,
            STRIPE_SECRET_KEY: this.stripe_secret_key,
          },
          slug: this.stripe_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", paypal)
          .then(() => {
            this.$vs.notify({
              title: "Stripe setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.stripe_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "Stripe setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }

      // btcpay  config update

      if (slug == this.btcpay_config.slug) {
        let btcpay = {
          data: {
            server_url: this.btcpay_server_url,
            pair_code: this.btcpay_pair_code,
          },
          slug: this.btcpay_config.slug,
        };

        this.$store
          .dispatch("integrationManage/setupIntegrationConfig", btcpay)
          .then(() => {
            this.$vs.notify({
              title: "Bitcoin payment setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
            this.btcpay_changed = false;
          })
          .catch(() => {
            this.$vs.notify({
              title: "Bitcoin payment setting",
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }
    },

    getThirdPartyIntegrationConfig(slug) {
      this.$store
        .dispatch("integrationManage/getIntegrationConfig", slug)
        .then(() => {
          switch (slug) {
            case "mailchimp":
              this.mailchimp_apikey = this.mailchimp_data.data.api_key;
              break;

            case "drip":
              this.drip_apikey = this.drip_data.data.api_key;
              this.drip_accountID = this.drip_data.data.account_id;
              break;

            case "convert_kit":
              this.convert_kit_apikey = this.convert_kit_data.data.api_key;
              break;

            case "active_campaign":
              this.active_campaign_apikey = this.active_campaign_data.data.api_key;
              this.active_campaign_apiurl = this.active_campaign_data.data.api_url;
              break;

            case "segment":
              this.segment_apikey = this.segment_data.data.api_key;
              break;

            case "google_analytics":
              this.google_analytics_ID = this.google_analytics_data.data.google_analytics_id;
              break;

            case "facebook_pixel":
              this.pixel_ID = this.facebook_pixel_data.data.pixel_id;
              break;

            case "amazon_s3":
              this.aws_secret_access_key = this.amazon_data.data.aws_secret_access_key;
              this.aws_access_keyID = this.amazon_data.data.aws_access_key_id;
              this.aws_region = this.amazon_data.data.region;
              this.aws_bucket_name = this.amazon_data.data.bucket_name;
              break;

            case "paypal":
              this.paypal_email = this.paypal_data.data.email;
              this.paypal_token = this.paypal_data.data.token;
              break;

            case "stripe":
              this.stripe_secret_key = this.stripe_data.data.STRIPE_SECRET_KEY;
              this.stripe_publish_key = this.stripe_data.data.STRIPE_PUBLISHABLE_KEY;
              break;

            case "btcpay":
              this.btcpay_server_url = this.btcpay_data.data.server_url;
              this.btcpay_pair_code = this.btcpay_data.data.pair_code;
              break;
          }
        })
        .catch(() => {
          this.$vs.notify({
            title: slug + " setting",
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });
    },

    deleteThirdPartyIntegrationConfig(slug) {},

    enableThirdPartyIntegrationStatus(slug) {},

    disableThirdPartyIntegrationStatus(slug) {},

    changeThirdPartyIntegraitonSatus(slug) {
      switch (slug) {
        case "mailchimp":
          if (this.mailchimp_status == false) this.mailchimp_edit = true;
          else this.mailchimp_edit = false;
          break;

        case "drip":
          if (this.drip_status == false) this.drip_edit = true;
          else this.drip_edit = false;
          break;

        case "convert_kit":
          if (this.convert_kit_status == false) this.convert_kit_edit = true;
          else this.convert_kit_edit = false;
          break;

        case "active_campaign":
          if (this.active_campaign_status == false)
            this.active_campaign_edit = true;
          else this.active_campaign_edit = false;
          break;

        case "segment":
          if (this.segment_status == false) this.segment_edit = true;
          else this.segment_edit = false;
          break;

        case "google_analytics":
          if (this.google_analytics_status == false)
            this.google_analytics_edit = true;
          else this.google_analytics_edit = false;
          break;

        case "facebook_pixel":
          if (this.facebook_pixel_status == false)
            this.facebook_pixel_edit = true;
          else this.facebook_pixel_edit = false;
          break;

        case "amazon_s3":
          if (this.amazon_status == false) this.amazon_edit = true;
          else this.amazon_edit = false;
          break;

        case "paypal":
          if (this.paypal_status == false) this.paypal_edit = true;
          else this.paypal_edit = false;
          break;

        case "stripe":
          if (this.stripe_status == false) this.stripe_edit = true;
          else this.stripe_edit = false;
          break;

        case "btcpay":
          if (this.btcpay_status == false) this.btcpay_edit = true;
          else this.btcpay_edit = false;
          break;
      }
    },
  },
};
</script>
