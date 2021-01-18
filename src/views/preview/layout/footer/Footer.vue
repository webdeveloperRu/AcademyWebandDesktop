<template lang="html">
 <footer class="footer footer--dark footer--left" kjb-settings-id="sections_footer_settings_background_color" >
    <div class="container">
      <div class="footer__text-container">
          <span kjb-settings-id="sections_footer_settings_copyright" class="footer__copyright">© 2020 Student App</span>
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
      if (id == undefined) return "";
      else return id.slice(0, id.length);
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
  }
};
</script>

<style>
.footer {
  background: #272d34;
  padding: 15px 0;
  position:absolute;
  width: 100%;
  margin-left: -20px;
  margin-bottom: 100px;
}
.footer--dark {
  color: #fff;
}
.footer__text-container {
  overflow: hidden;
  text-align: center
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