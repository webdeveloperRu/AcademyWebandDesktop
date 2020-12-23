<template>
  <vs-row vs-justify="center" class="primary-font">
    <!-- 
      ***@  --------heder part---------------
     -->
    <vs-col vs-lg="9" vs-xs="12">
      <div class="mb-4">
        <span
          class="ml-2 mb-2 mt-2 primary-font"
          @click="backToSettings"
          style="cursor: pointer;"
          ><i class="ti-angle-left" style="font-size: 14px;"></i> Settings</span
        >
        <div class="d-flex mt-3">
          <h2>Marketing Settings</h2>
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
      vs-xs="12"
      code-toggler
    >
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Marketing Contact Address</h3>
          <div class="mt-2">
            We will show your contact address in broadcast footers to comply
            with international spam laws.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-input
              label="Name or Company"
              placeholder="Name or Company here..."
              v-model="name_company"
              class="w-100 mt-4"
            />
            <vs-input
              label="Address line 1"
              placeholder="Address here..."
              v-model="marketing_address"
              class="w-100 mt-4"
            />
            <vs-input
              label="Apt, Suite, Etc"
              placeholder=""
              v-model="apt_suite"
              class="w-100 mt-4"
            />
            <vs-input
              label="City"
              v-model="marketing_city"
              class="w-100 mt-4"
            />
            <vs-input
              label="State/Province/Region"
              v-model="state_postal_code"
              class="w-100 mt-4"
            />
            <vs-input
              label="Zip/Postal Code"
              v-model="zip_postal_code"
              class="w-100 mt-4"
            />
            <vs-select class="w-100 mt-3" label="Country" v-model="country">
              <vs-select-item
                :key="index"
                :value="item.code"
                :text="item.name"
                v-for="(item, index) in countries"
              />
            </vs-select>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Company Logo</h3>
          <div class="mt-2">
            This image will be placed at the top of your marketing emails. We
            recommend uploading a small transparent PNG logo representing your
            overall brand.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <div>
              Recommended dimentions
              <strong>600<i class="mdi mdi-close"></i>300</strong>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Email Settings</h3>
          <div class="mt-2">
            Configure the frome name and reply to address to use for your
            marketing emails. <a href="">Click here</a> to learn to how to
            customize your email settings.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-input
              label="From name"
              v-model="from_name"
              class="w-100 mt-2"
              placeholder="From Name here..."
            />
            <label class="mt-2">
              If you leave this blank, your site title will be used.
            </label>
            <vs-input
              label="From email address"
              type="email"
              v-model="from_email"
              class="w-100 mt-4"
              placeholder="From Email Address here..."
            />
            <label class="mt-2">
              We suggest leaving this section blank to use the default email
              address that has been personalized for your account. Please don't
              use an address that belongs to an email service provider, such as
              Gmail or Outlook. Your recipients' providers are more likely to
              reject messages from an address that doesn't match your sending
              domain.
            </label>
            <vs-input
              label="Reply-to email address"
              type="email"
              v-model="reply_email"
              class="w-100 mt-4"
              placeholder="Reply-to email address here..."
            />
            <label class="mt-2">
              If left blank, this will default to your configured from email
              address. If none is configured, your site support email will be
              used.
            </label>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Custom Email Domain</h3>
          <div class="mt-2">
            If you meet a few qualifications, you can send marketing emails from
            your own domain by setting up a custom email domain.<br />
            <strong>Why It Matters</strong><br />
            A custom email domain is a great way to add credibility to your
            brand. Having a custom email domain streamlines and cleans up the
            inbox experience for your recipients
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <h4>Your custom email domain has been verified. You're all set.</h4>
            <label class="mt-2"
              >Your marketing emails are being sent from your custom email
              domain.</label
            >
            <vs-row>
              <vs-col vs-lg="2">TYPE</vs-col>
              <vs-col vs-lg="4">HOST</vs-col>
              <vs-col vs-lg="4">VALUE</vs-col>
              <vs-col vs-lg="1">TTL</vs-col>
              <vs-col vs-lg="1">PTY</vs-col>
            </vs-row>
            <vs-row class="mt-2">
              <vs-col vs-lg="2" class="px-1">
                <vs-input v-model="custom_email_type" disabled class="w-100" />
              </vs-col>
              <vs-col vs-lg="4" class="px-1" vs-align="center">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: center"
                >
                  <vs-input v-model="custom_email_host" disabled />
                  <button style="outline: none; border: none; padding: 7px">
                    Copy
                  </button>
                </div>
              </vs-col>
              <vs-col vs-lg="4" class="px-1">
                <div
                  class="d-flex"
                  style="align-items: center; justify-content: center"
                >
                  <vs-input v-model="custom_email_value" disabled />
                  <button style="outline: none; border: none; padding: 7px">
                    Copy
                  </button>
                </div>
              </vs-col>
              <vs-col vs-lg="1" class="px-1">
                <vs-input v-model="custom_email_ttl" disabled class="w-100" />
              </vs-col>
              <vs-col vs-lg="1" class="px-1">
                <vs-input v-model="custom_email_pty" disabled class="w-100" />
              </vs-col>
            </vs-row>

            <div
              class="d-flex mt-3"
              style="justify-content: space-between; align-items: center"
            >
              <div>
                <i class="mdi mdi-check-circle" style="color: green"></i> Custom
                email domain verified.
              </div>
              <div>
                <vs-button type="border">Remove Custom Email Domain</vs-button>
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <vs-divider class="mb-4" />
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Email Sequence Defaults</h3>
          <div class="mt-2">
            Configure the default settings your would like to use when creating
            new email sequences.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <div>Default time to send emails</div>
            <vs-row>
              <vs-col vs-lg="4">
                <vs-select class="w-100 mt-3" v-model="time">
                  <vs-select-item
                    :key="index"
                    :value="item.offset"
                    :text="item.name"
                    v-for="(item, index) in time_list"
                  />
                </vs-select>
              </vs-col>
              <vs-col vs-lg="8">
                <vs-select class="w-100 mt-3" v-model="timezone">
                  <vs-select-item
                    :key="index"
                    :value="item.offset"
                    :text="item.name"
                    v-for="(item, index) in timezone_list"
                  />
                </vs-select>
              </vs-col>
            </vs-row>
          </vs-card>
        </vs-col>
      </vs-row>
      <div style="float: right">
        <vs-button class="mt-3">Save</vs-button>
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "MarketingSettings",

  data: () => ({
    name_company: "",
    marketing_address: "",
    apt_suite: "",
    marketing_city: "",
    state_postal_code: "",
    zip_postal_code: "",
    country: "",
    from_name: "",
    reply_email: "",
    from_email: "",
    timezone: "",
    time: 1,
    custom_email_type: "TXT",
    custom_email_host: "asdf.asdfsdf.com",
    custom_email_value: "mxa.mailgun.org",
    custom_email_ttl: "Auto",
    custom_email_pty: "20",
    time_list: [
      { name: "11:00AM", value: 1 },
      { name: "11:00AM", value: 2 },
      { name: "11:00AM", value: 3 },
      { name: "11:00AM", value: 4 },
    ],
    countries: [
      { name: "Albania", code: "AL" },
      { name: "Åland Islands", code: "AX" },
      { name: "Algeria", code: "DZ" },
      { name: "American Samoa", code: "AS" },
      { name: "Andorra", code: "AD" },
      { name: "Angola", code: "AO" },
      { name: "Anguilla", code: "AI" },
      { name: "Antarctica", code: "AQ" },
      { name: "Antigua and Barbuda", code: "AG" },
      { name: "Argentina", code: "AR" },
      { name: "Armenia", code: "AM" },
      { name: "Aruba", code: "AW" },
      { name: "Australia", code: "AU" },
      { name: "Austria", code: "AT" },
      { name: "Azerbaijan", code: "AZ" },
      { name: "Bahamas (the)", code: "BS" },
      { name: "Bahrain", code: "BH" },
      { name: "Bangladesh", code: "BD" },
      { name: "Barbados", code: "BB" },
      { name: "Belarus", code: "BY" },
      { name: "Belgium", code: "BE" },
      { name: "Belize", code: "BZ" },
      { name: "Benin", code: "BJ" },
      { name: "Bermuda", code: "BM" },
      { name: "Bhutan", code: "BT" },
      { name: "Bolivia (Plurinational State of)", code: "BO" },
      { name: "Bonaire, Sint Eustatius and Saba", code: "BQ" },
      { name: "Bosnia and Herzegovina", code: "BA" },
      { name: "Botswana", code: "BW" },
      { name: "Bouvet Island", code: "BV" },
      { name: "Brazil", code: "BR" },
      { name: "British Indian Ocean Territory (the)", code: "IO" },
      { name: "Brunei Darussalam", code: "BN" },
      { name: "Bulgaria", code: "BG" },
      { name: "Burkina Faso", code: "BF" },
      { name: "Burundi", code: "BI" },
      { name: "Cabo Verde", code: "CV" },
      { name: "Cambodia", code: "KH" },
      { name: "Cameroon", code: "CM" },
      { name: "Canada", code: "CA" },
      { name: "Cayman Islands (the)", code: "KY" },
      { name: "Central African Republic (the)", code: "CF" },
      { name: "Chad", code: "TD" },
      { name: "Chile", code: "CL" },
      { name: "China", code: "CN" },
      { name: "Christmas Island", code: "CX" },
      { name: "Cocos (Keeling) Islands (the)", code: "CC" },
      { name: "Colombia", code: "CO" },
      { name: "Comoros (the)", code: "KM" },
      { name: "Congo (the Democratic Republic of the)", code: "CD" },
      { name: "Congo (the)", code: "CG" },
      { name: "Cook Islands (the)", code: "CK" },
      { name: "Costa Rica", code: "CR" },
      { name: "Croatia", code: "HR" },
      { name: "Cuba", code: "CU" },
      { name: "Curaçao", code: "CW" },
      { name: "Cyprus", code: "CY" },
      { name: "Czechia", code: "CZ" },
      { name: "Côte d'Ivoire", code: "CI" },
      { name: "Denmark", code: "DK" },
      { name: "Djibouti", code: "DJ" },
      { name: "Dominica", code: "DM" },
      { name: "Dominican Republic (the)", code: "DO" },
      { name: "Ecuador", code: "EC" },
      { name: "Egypt", code: "EG" },
      { name: "El Salvador", code: "SV" },
      { name: "Equatorial Guinea", code: "GQ" },
      { name: "Eritrea", code: "ER" },
      { name: "Estonia", code: "EE" },
      { name: "Eswatini", code: "SZ" },
      { name: "Ethiopia", code: "ET" },
      { name: "Falkland Islands (the) [Malvinas]", code: "FK" },
      { name: "Faroe Islands (the)", code: "FO" },
      { name: "Fiji", code: "FJ" },
      { name: "Finland", code: "FI" },
      { name: "France", code: "FR" },
      { name: "French Guiana", code: "GF" },
      { name: "French Polynesia", code: "PF" },
      { name: "French Southern Territories (the)", code: "TF" },
      { name: "Gabon", code: "GA" },
      { name: "Gambia (the)", code: "GM" },
      { name: "Georgia", code: "GE" },
      { name: "Germany", code: "DE" },
      { name: "Ghana", code: "GH" },
      { name: "Gibraltar", code: "GI" },
      { name: "Greece", code: "GR" },
      { name: "Greenland", code: "GL" },
      { name: "Grenada", code: "GD" },
      { name: "Guadeloupe", code: "GP" },
      { name: "Guam", code: "GU" },
      { name: "Guatemala", code: "GT" },
      { name: "Guernsey", code: "GG" },
      { name: "Guinea", code: "GN" },
      { name: "Guinea-Bissau", code: "GW" },
      { name: "Guyana", code: "GY" },
      { name: "Haiti", code: "HT" },
      { name: "Heard Island and McDonald Islands", code: "HM" },
      { name: "Holy See (the)", code: "VA" },
      { name: "Honduras", code: "HN" },
      { name: "Hong Kong", code: "HK" },
      { name: "Hungary", code: "HU" },
      { name: "Iceland", code: "IS" },
      { name: "India", code: "IN" },
      { name: "Indonesia", code: "ID" },
      { name: "Iran (Islamic Republic of)", code: "IR" },
      { name: "Iraq", code: "IQ" },
      { name: "Ireland", code: "IE" },
      { name: "Isle of Man", code: "IM" },
      { name: "Israel", code: "IL" },
      { name: "Italy", code: "IT" },
      { name: "Jamaica", code: "JM" },
      { name: "Japan", code: "JP" },
      { name: "Jersey", code: "JE" },
      { name: "Jordan", code: "JO" },
      { name: "Kazakhstan", code: "KZ" },
      { name: "Kenya", code: "KE" },
      { name: "Kiribati", code: "KI" },
      { name: "Korea (the Democratic People's Republic of)", code: "KP" },
      { name: "Korea (the Republic of)", code: "KR" },
      { name: "Kuwait", code: "KW" },
      { name: "Kyrgyzstan", code: "KG" },
      { name: "Lao People's Democratic Republic (the)", code: "LA" },
      { name: "Latvia", code: "LV" },
      { name: "Lebanon", code: "LB" },
      { name: "Lesotho", code: "LS" },
      { name: "Liberia", code: "LR" },
      { name: "Libya", code: "LY" },
      { name: "Liechtenstein", code: "LI" },
      { name: "Lithuania", code: "LT" },
      { name: "Luxembourg", code: "LU" },
      { name: "Macao", code: "MO" },
      { name: "Madagascar", code: "MG" },
      { name: "Malawi", code: "MW" },
      { name: "Malaysia", code: "MY" },
      { name: "Maldives", code: "MV" },
      { name: "Mali", code: "ML" },
      { name: "Malta", code: "MT" },
      { name: "Marshall Islands (the)", code: "MH" },
      { name: "Martinique", code: "MQ" },
      { name: "Mauritania", code: "MR" },
      { name: "Mauritius", code: "MU" },
      { name: "Mayotte", code: "YT" },
      { name: "Mexico", code: "MX" },
      { name: "Micronesia (Federated States of)", code: "FM" },
      { name: "Moldova (the Republic of)", code: "MD" },
      { name: "Monaco", code: "MC" },
      { name: "Mongolia", code: "MN" },
      { name: "Montenegro", code: "ME" },
      { name: "Montserrat", code: "MS" },
      { name: "Morocco", code: "MA" },
      { name: "Mozambique", code: "MZ" },
      { name: "Myanmar", code: "MM" },
      { name: "Namibia", code: "NA" },
      { name: "Nauru", code: "NR" },
      { name: "Nepal", code: "NP" },
      { name: "Netherlands (the)", code: "NL" },
      { name: "New Caledonia", code: "NC" },
      { name: "New Zealand", code: "NZ" },
      { name: "Nicaragua", code: "NI" },
      { name: "Niger (the)", code: "NE" },
      { name: "Nigeria", code: "NG" },
      { name: "Niue", code: "NU" },
      { name: "Norfolk Island", code: "NF" },
      { name: "Northern Mariana Islands (the)", code: "MP" },
      { name: "Norway", code: "NO" },
      { name: "Oman", code: "OM" },
      { name: "Pakistan", code: "PK" },
      { name: "Palau", code: "PW" },
      { name: "Palestine, State of", code: "PS" },
      { name: "Panama", code: "PA" },
      { name: "Papua New Guinea", code: "PG" },
      { name: "Paraguay", code: "PY" },
      { name: "Peru", code: "PE" },
      { name: "Philippines (the)", code: "PH" },
      { name: "Pitcairn", code: "PN" },
      { name: "Poland", code: "PL" },
      { name: "Portugal", code: "PT" },
      { name: "Puerto Rico", code: "PR" },
      { name: "Qatar", code: "QA" },
      { name: "Republic of North Macedonia", code: "MK" },
      { name: "Romania", code: "RO" },
      { name: "Russian Federation (the)", code: "RU" },
      { name: "Rwanda", code: "RW" },
      { name: "Réunion", code: "RE" },
      { name: "Saint Barthélemy", code: "BL" },
      { name: "Saint Helena, Ascension and Tristan da Cunha", code: "SH" },
      { name: "Saint Kitts and Nevis", code: "KN" },
      { name: "Saint Lucia", code: "LC" },
      { name: "Saint Martin (French part)", code: "MF" },
      { name: "Saint Pierre and Miquelon", code: "PM" },
      { name: "Saint Vincent and the Grenadines", code: "VC" },
      { name: "Samoa", code: "WS" },
      { name: "San Marino", code: "SM" },
      { name: "Sao Tome and Principe", code: "ST" },
      { name: "Saudi Arabia", code: "SA" },
      { name: "Senegal", code: "SN" },
      { name: "Serbia", code: "RS" },
      { name: "Seychelles", code: "SC" },
      { name: "Sierra Leone", code: "SL" },
      { name: "Singapore", code: "SG" },
      { name: "Sint Maarten (Dutch part)", code: "SX" },
      { name: "Slovakia", code: "SK" },
      { name: "Slovenia", code: "SI" },
      { name: "Solomon Islands", code: "SB" },
      { name: "Somalia", code: "SO" },
      { name: "South Africa", code: "ZA" },
      { name: "South Georgia and the South Sandwich Islands", code: "GS" },
      { name: "South Sudan", code: "SS" },
      { name: "Spain", code: "ES" },
      { name: "Sri Lanka", code: "LK" },
      { name: "Sudan (the)", code: "SD" },
      { name: "Suriname", code: "SR" },
      { name: "Svalbard and Jan Mayen", code: "SJ" },
      { name: "Sweden", code: "SE" },
      { name: "Switzerland", code: "CH" },
      { name: "Syrian Arab Republic", code: "SY" },
      { name: "Taiwan (Province of China)", code: "TW" },
      { name: "Tajikistan", code: "TJ" },
      { name: "Tanzania, United Republic of", code: "TZ" },
      { name: "Thailand", code: "TH" },
      { name: "Timor-Leste", code: "TL" },
      { name: "Togo", code: "TG" },
      { name: "Tokelau", code: "TK" },
      { name: "Tonga", code: "TO" },
      { name: "Trinidad and Tobago", code: "TT" },
      { name: "Tunisia", code: "TN" },
      { name: "Turkey", code: "TR" },
      { name: "Turkmenistan", code: "TM" },
      { name: "Turks and Caicos Islands (the)", code: "TC" },
      { name: "Tuvalu", code: "TV" },
      { name: "Uganda", code: "UG" },
      { name: "Ukraine", code: "UA" },
      { name: "United Arab Emirates (the)", code: "AE" },
      {
        name: "United Kingdom of Great Britain and Northern Ireland (the)",
        code: "GB",
      },
      { name: "United States Minor Outlying Islands (the)", code: "UM" },
      { name: "United States of America (the)", code: "US" },
      { name: "Uruguay", code: "UY" },
      { name: "Uzbekistan", code: "UZ" },
      { name: "Vanuatu", code: "VU" },
      { name: "Venezuela (Bolivarian Republic of)", code: "VE" },
      { name: "Viet Nam", code: "VN" },
      { name: "Virgin Islands (British)", code: "VG" },
      { name: "Virgin Islands (U.S.)", code: "VI" },
      { name: "Wallis and Futuna", code: "WF" },
      { name: "Western Sahara", code: "EH" },
      { name: "Yemen", code: "YE" },
      { name: "Zambia", code: "ZM" },
      { name: "Zimbabwe", code: "ZW" },
    ],
    timezone_list: [
      {
        offset: "GMT-12:00",
        name: "Etc/GMT-12",
      },
      {
        offset: "GMT-11:00",
        name: "Etc/GMT-11",
      },
      {
        offset: "GMT-11:00",
        name: "Pacific/Midway",
      },
      {
        offset: "GMT-10:00",
        name: "America/Adak",
      },
      {
        offset: "GMT-09:00",
        name: "America/Anchorage",
      },
      {
        offset: "GMT-09:00",
        name: "Pacific/Gambier",
      },
      {
        offset: "GMT-08:00",
        name: "America/Dawson_Creek",
      },
      {
        offset: "GMT-08:00",
        name: "America/Ensenada",
      },
      {
        offset: "GMT-08:00",
        name: "America/Los_Angeles",
      },
      {
        offset: "GMT-07:00",
        name: "America/Chihuahua",
      },
      {
        offset: "GMT-07:00",
        name: "America/Denver",
      },
      {
        offset: "GMT-06:00",
        name: "America/Belize",
      },
      {
        offset: "GMT-06:00",
        name: "America/Cancun",
      },
      {
        offset: "GMT-06:00",
        name: "America/Chicago",
      },
      {
        offset: "GMT-06:00",
        name: "Chile/EasterIsland",
      },
      {
        offset: "GMT-05:00",
        name: "America/Bogota",
      },
      {
        offset: "GMT-05:00",
        name: "America/Havana",
      },
      {
        offset: "GMT-05:00",
        name: "America/New_York",
      },
      {
        offset: "GMT-04:30",
        name: "America/Caracas",
      },
      {
        offset: "GMT-04:00",
        name: "America/Campo_Grande",
      },
      {
        offset: "GMT-04:00",
        name: "America/Glace_Bay",
      },
      {
        offset: "GMT-04:00",
        name: "America/Goose_Bay",
      },
      {
        offset: "GMT-04:00",
        name: "America/Santiago",
      },
      {
        offset: "GMT-04:00",
        name: "America/La_Paz",
      },
      {
        offset: "GMT-03:00",
        name: "America/Argentina/Buenos_Aires",
      },
      {
        offset: "GMT-03:00",
        name: "America/Montevideo",
      },
      {
        offset: "GMT-03:00",
        name: "America/Araguaina",
      },
      {
        offset: "GMT-03:00",
        name: "America/Godthab",
      },
      {
        offset: "GMT-03:00",
        name: "America/Miquelon",
      },
      {
        offset: "GMT-03:00",
        name: "America/Sao_Paulo",
      },
      {
        offset: "GMT-03:30",
        name: "America/St_Johns",
      },
      {
        offset: "GMT-02:00",
        name: "America/Noronha",
      },
      {
        offset: "GMT-01:00",
        name: "Atlantic/Cape_Verde",
      },
      {
        offset: "GMT",
        name: "Europe/Belfast",
      },
      {
        offset: "GMT",
        name: "Africa/Abidjan",
      },
      {
        offset: "GMT",
        name: "Europe/Dublin",
      },
      {
        offset: "GMT",
        name: "Europe/Lisbon",
      },
      {
        offset: "GMT",
        name: "Europe/London",
      },
      {
        offset: "UTC",
        name: "UTC",
      },
      {
        offset: "GMT+01:00",
        name: "Africa/Algiers",
      },
      {
        offset: "GMT+01:00",
        name: "Africa/Windhoek",
      },
      {
        offset: "GMT+01:00",
        name: "Atlantic/Azores",
      },
      {
        offset: "GMT+01:00",
        name: "Atlantic/Stanley",
      },
      {
        offset: "GMT+01:00",
        name: "Europe/Amsterdam",
      },
      {
        offset: "GMT+01:00",
        name: "Europe/Belgrade",
      },
      {
        offset: "GMT+01:00",
        name: "Europe/Brussels",
      },
      {
        offset: "GMT+02:00",
        name: "Africa/Cairo",
      },
      {
        offset: "GMT+02:00",
        name: "Africa/Blantyre",
      },
      {
        offset: "GMT+02:00",
        name: "Asia/Beirut",
      },
      {
        offset: "GMT+02:00",
        name: "Asia/Damascus",
      },
      {
        offset: "GMT+02:00",
        name: "Asia/Gaza",
      },
      {
        offset: "GMT+02:00",
        name: "Asia/Jerusalem",
      },
      {
        offset: "GMT+03:00",
        name: "Africa/Addis_Ababa",
      },
      {
        offset: "GMT+03:00",
        name: "Asia/Riyadh89",
      },
      {
        offset: "GMT+03:00",
        name: "Europe/Minsk",
      },
      {
        offset: "GMT+03:30",
        name: "Asia/Tehran",
      },
      {
        offset: "GMT+04:00",
        name: "Asia/Dubai",
      },
      {
        offset: "GMT+04:00",
        name: "Asia/Yerevan",
      },
      {
        offset: "GMT+04:00",
        name: "Europe/Moscow",
      },
      {
        offset: "GMT+04:30",
        name: "Asia/Kabul",
      },
      {
        offset: "GMT+05:00",
        name: "Asia/Tashkent",
      },
      {
        offset: "GMT+05:30",
        name: "Asia/Kolkata",
      },
      {
        offset: "GMT+05:45",
        name: "Asia/Katmandu",
      },
      {
        offset: "GMT+06:00",
        name: "Asia/Dhaka",
      },
      {
        offset: "GMT+06:00",
        name: "Asia/Yekaterinburg",
      },
      {
        offset: "GMT+06:30",
        name: "Asia/Rangoon",
      },
      {
        offset: "GMT+07:00",
        name: "Asia/Bangkok",
      },
      {
        offset: "GMT+07:00",
        name: "Asia/Novosibirsk",
      },
      {
        offset: "GMT+08:00",
        name: "Etc/GMT+8",
      },
      {
        offset: "GMT+08:00",
        name: "Asia/Hong_Kong",
      },
      {
        offset: "GMT+08:00",
        name: "Asia/Krasnoyarsk",
      },
      {
        offset: "GMT+08:00",
        name: "Australia/Perth",
      },
      {
        offset: "GMT+08:45",
        name: "Australia/Eucla",
      },
      {
        offset: "GMT+09:00",
        name: "Asia/Irkutsk",
      },
      {
        offset: "GMT+09:00",
        name: "Asia/Seoul",
      },
      {
        offset: "GMT+09:00",
        name: "Asia/Tokyo",
      },
      {
        offset: "GMT+09:30",
        name: "Australia/Adelaide",
      },
      {
        offset: "GMT+09:30",
        name: "Australia/Darwin",
      },
      {
        offset: "GMT+09:30",
        name: "Pacific/Marquesas",
      },
      {
        offset: "GMT+10:00",
        name: "Etc/GMT+10",
      },
      {
        offset: "GMT+10:00",
        name: "Australia/Brisbane",
      },
      {
        offset: "GMT+10:00",
        name: "Australia/Hobart",
      },
      {
        offset: "GMT+10:00",
        name: "Asia/Yakutsk",
      },
      {
        offset: "GMT+10:30",
        name: "Australia/Lord_Howe",
      },
      {
        offset: "GMT+11:00",
        name: "Asia/Vladivostok",
      },
      {
        offset: "GMT+11:30",
        name: "Pacific/Norfolk",
      },
      {
        offset: "GMT+12:00",
        name: "Etc/GMT+12",
      },
      {
        offset: "GMT+12:00",
        name: "Asia/Anadyr",
      },
      {
        offset: "GMT+12:00",
        name: "Asia/Magadan",
      },
      {
        offset: "GMT+12:00",
        name: "Pacific/Auckland",
      },
      {
        offset: "GMT+12:45",
        name: "Pacific/Chatham",
      },
      {
        offset: "GMT+13:00",
        name: "Pacific/Tongatapu",
      },
      {
        offset: "GMT+14:00",
        name: "Pacific/Kiritimati",
      },
    ],
  }),

  /**
   * --------------computed part-------------
   */
  computed: {},

  /**
   * --------------created part-------------
   */
  created() {
    this.$store.dispatch("changeSideBar", false);
  },

  /**
   * --------------method part-------------
   */
  methods: {
    backToSettings() {
      this.$router.push("/settings");
    },
  },
};
</script>
