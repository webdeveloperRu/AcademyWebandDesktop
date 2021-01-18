<template lang="html">
  <footer
    class="footer footer--dark footer--left"
    v-bind:style="{
      background: current_product.customize_footer.background_color,
    }"
  >
    <div class="container">
      <div class="footer__text-container">
        <span
          v-if="current_product.customize_footer.show_copyright"
          class="footer__copyright"
          v-bind:style="{
            color: current_product.customize_footer.text_color,
          }"
          >{{ current_product.customize_footer.copyright_text }}</span
        >
      </div>
      <div
            class="footer-icon-layout d-flex"
            v-if="current_product.customize_footer.show_social_icons"
            v-bind:style="{
              'justify-content': social_icon_alignment,
            }"
          >
            <div
              v-if="current_product.customize_footer.sil_facebook != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-facebook"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_twitter != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="mdi mdi-twitter"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_instagram != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-instagram"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_youtube != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-youtube"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_vimeo != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-vimeo"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_github != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-github"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_itunes != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="mdi mdi-itunes"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_linkedin != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-linkedin"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_soundcloud != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="mdi mdi-soundcloud"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_tumblr != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-tumblr"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_flickr != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-flickr"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_slack != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="mdi mdi-slack"></i>
            </div>
            <div
              v-if="current_product.customize_footer.sil_dribbble != ''"
              class="footer-icon"
              v-bind:style="{
                color: current_product.customize_footer.social_icon_color,
                background: social_icon_background_color,
                'border-radius': social_icon_border_radius,
              }"
            >
              <i class="ti-dribbble"></i>
            </div>
          </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({}),
  computed: {
    product_id: function () {
      var id = this.$route.params.product_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
    category_id: function () {
      var id = this.$route.params.category_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
    lesson_id: function () {
      var id = this.$route.params.lesson_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
    show_product_footer: {
      get() {
        if (
          this.product_id !== "" ||
          this.category_id !== "" ||
          this.lesson_id !== ""
        ) {
          return true;
        } else return false;
      },
    },

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },

    current_product: {
      get() {
        let product = [];
        for (let i = 0; i < this.product_list.length; i++) {
          if (this.product_list[i].id == this.product_id) {
            product = this.product_list[i];
          }
        }
        return product;
      },
    },
    social_icon_border_radius: {
      get() {
        if (this.current_product.customize_footer.social_icon_style != "Round")
          return "0px";
        else return "18px";
      },
    },
    social_icon_background_color: {
      get() {
        if (this.current_product.customize_footer.social_icon_style != "None")
          return this.current_product.customize_footer
            .social_icon_background_color;
        else return "none";
      },
    },

    social_icon_alignment: {
      get() {
        let value = "";
        switch (this.current_product.customize_footer.social_icon_alignment) {
          case "Left":
            value = "flex-start";
            break;
          case "Center":
            value = "center";
            break;

          case "Right":
            value = "flex-end";
            break;
        }
        return value;
      },
    },
  },
};
</script>

<style lang="scss">
.footer {
  background: #272d34;
  padding: 15px 0;
  position: absolute;
  width: 100%;
  margin-left: -20px;
  margin-bottom: 120px;
  min-height: 120px;
}
.footer--dark {
  color: #fff;
}
.footer__text-container {
  overflow: hidden;
  text-align: center;
}
.footer__copyright {
  line-height: 40px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
}
.footer__menu,
.footer__powered-by {
  display: inline-block;
  float: right;
}
.footer--dark a {
  color: #fff;
}
.footer__menu-item,
.footer__powered-by a {
  line-height: 40px;
  display: inline-block;
  margin-left: 20px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.social-icons--left {
  text-align: left;
}
.social-icons {
  font-size: 0;
  display: block;
  margin-bottom: 30px;
  text-align: left;
}
.social-icons__row {
  margin: -10px;
}
.footer .social-icons__icon,
.footer .social-icons__icon:hover {
  color: #ffffff;
}
.social-icons__icon {
  font-family: "FontAwesome" !important;
  font-size: 24px;
  line-height: 40px;
  display: inline-block;
  margin: 10px;
  text-decoration: none;
}
.footer-icon {
  font-size: 22px;
  margin: 0px 5px 0px 5px;
  align-items: center;
  justify-content: center;
  width: 36px;
  display: flex;
  height: 36px;
}

@media (max-width: 767px) {
  .footer {
    text-align: center;
  }
  .footer__copyright {
    line-height: 30px;
    display: block;
    float: none;
  }
  .footer__menu,
  .footer__powered-by {
    display: block;
    float: none;
  }
  .footer__menu-item,
  .footer__powered-by a {
    line-height: 30px;
    display: block;
    margin-right: 0;
    margin-left: 0;
  }
  .footer__menu,
  .footer__powered-by {
    display: block;
    float: none;
  }
  .social-icons--left,
  .social-icons--right {
    text-align: center;
  }
}
</style>
