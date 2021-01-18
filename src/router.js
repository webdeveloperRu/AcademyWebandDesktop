import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // ======================
    // Blank Layout
    // ======================
    {
      path: "",
      component: () => import("./layout/blank/Blank.vue"),
      // ======================
      // Theme routes / pages
      // ======================
      children: [
        {
          path: "/login",
          name: "Login",
          index: 1.1,
          component: () => import("./views/authentication/Login.vue"),
        },
        {
          path: "/error404",
          name: "Error 404",
          index: 1.2,
          component: () => import("./views/authentication/Error404.vue"),
        },
        {
          path: "/register",
          name: "Register",
          index: 1.3,
          component: () => import("./views/authentication/Register.vue"),
        },
        {
          path: "/resetpassword",
          name: "ResetPassword",
          index: 1.4,
          component: () => import("./views/authentication/ResetPassword.vue"),
        },
        {
          path: "/changepassword",
          name: "ChangePassword",
          index: 1.5,
          component: () => import("./views/authentication/ChangePassword.vue"),
        },
        {
          path: "/forgotpassword",
          name: "ForgotPassword",
          index: 1.6,
          component: () => import("./views/authentication/ForgotPassword.vue"),
        },
        {
          path: "/twofactorauth",
          name: "Two Factor Auth",
          index: 1.7,
          i18n: "Two Factor Auth",
          component: () => import("./views/authentication/TwoFactorAuth.vue"),
        },
        {
          path: "/twofactorauthsetup",
          name: "Two Factor Auth Setup",
          index: 1.8,
          i18n: "Two Factor Auth Setup",
          component: () =>
            import("./views/authentication/TwoFactorAuthSetup.vue"),
        },
      ],
    },
    {
      // ======================
      // Full Layout
      // ======================
      path: "",
      component: () => import("./layout/full/MainContainer.vue"),
      // ======================
      // Theme routes / pages
      // ======================
      children: [
        {
          path: "/",
          redirect: "/products",
        },
        {
          path: "/products",
          name: "Products",
          index: 2.1,
          i18n: "Products",
          component: () => import("./views/products/Products.vue"),
        },
        {
          path: "/products/edit-product/:id",
          name: "Edit Product",
          index: 2.2,
          i18n: "Edit Product",
          component: () => import("./views/products/ProductEditCategory.vue"),
        },
        {
          path: "/products/edit-post/:category_id/:lesson_id",
          name: "Edit Post",
          index: 2.3,
          i18n: "Edit Post",
          component: () => import("./views/products/ProductEditPostDetail.vue"),
        },
        {
          path: "/products/product-details/:product_id",
          name: "Edit Product Details",
          index: 2.4,
          i18n: "Edit Product Details",
          component: () => import("./views/products/ProductEditDetails.vue"),
        },
        {
          path: "/products/comments/:product_id",
          name: "Comments",
          index: 2.5,
          i18n: "Comments",
          component: () => import("./views/products/ManageComments.vue"),
        },
        {
          path: "/products/edit-category-detail/:category_id",
          name: "Edit Category Detail",
          index: 2.6,
          i18n: "Edit Category Detail",
          component: () => import("./views/products/CategoryEditDetails.vue"),
        },
        {
          path: "/products/:product_id/customize",
          name: "Product Course Customize",
          index: 2.7,
          i18n: "Product Course Customize",
          component: () => import("./views/products/CustomizeProductPage.vue"),
        },
      ],
    },
    // offer page
    {
      // ======================
      // Full Layout
      // ======================
      path: "",
      component: () => import("./layout/full/MainContainer.vue"),
      // ======================
      // Theme routes / pages
      // ======================
      children: [
        {
          path: "/offers",
          name: "Offers",
          index: 3.1,
          i18n: "Offers",
          component: () => import("./views/offers/Offers.vue"),
        },
        {
          path: "offers/edit-offer/:offer_id",
          name: "Edit Offer",
          index: 3.2,
          i18n: "Edit Offer",
          component: () => import("./views/offers/EditOffer.vue"),
        },
        {
          path: "offers/coupon",
          name: "coupon",
          index: 3.3,
          i18n: "coupon",
          component: () => import("./views/offers/MainCoupon.vue"),
        },
        {
          path: "offers/new-coupon",
          name: "new-coupon",
          index: 3.4,
          i18n: "new-coupon",
          component: () => import("./views/offers/NewCoupon.vue"),
        },
        {
          path: "offers/edit-coupon/coupon_id",
          name: "edit-coupon",
          index: 3.5,
          i18n: "edit-coupon",
          component: () => import("./views/offers/EditCoupon.vue"),
        },
        {
          path: "offers/edit-checkout/:offer_id",
          name: "edit-checkout",
          index: 3.6,
          i18n: "edit-checkout",
          component: () => import("./views/offers/OfferCheckout.vue"),
        },
        {
          path: "offers/offer-stats/:offer_id",
          name: "offer-stats",
          index: 3.8,
          i18n: "offer-stats",
          component: () => import("./views/offers/OfferStats.vue"),
        },
        {
          path: "offers/payments",
          name: "payment",
          index: 3.9,
          i18n: "payment",
          component: () => import("./views/offers/Payments.vue"),
        },
        {
          path: "offers/new-testimonial/:offer_id",
          name: "NewTestmonial",
          index: 3.11,
          i18n: "NewTestmonial",
          component: () => import("./views/offers/NewTestmonial.vue"),
        },
      ],
    },
    // people
    {
      // ======================
      // Full Layout
      // ======================
      path: "",
      component: () => import("./layout/full/MainContainer.vue"),
      // ======================
      // Theme routes / pages
      // ======================
      children: [
        {
          path: "/people",
          name: "People",
          index: 4.1,
          i18n: "People",
          component: () => import("./views/people/People.vue"),
        },
        {
          path: "/people/:people_id",
          name: "EditPeople",
          index: 4.2,
          i18n: "EditPeople",
          component: () => import("./views/people/EditPeople.vue"),
        },
        {
          path: "/people/:people_id/edit",
          name: "EditPeopleInfo",
          index: 4.3,
          i18n: "EditPeopleInfo",
          component: () => import("./views/people/EditPeopleInfo.vue"),
        },
        {
          path: "/people/contacts/tags",
          name: "ContactTags",
          index: 4.4,
          i18n: "ContactTags",
          component: () => import("./views/people/ContactTags.vue"),
        },
      ],
    },
    // settings

    {
      // ======================
      // Full Layout
      // ======================
      path: "",
      component: () => import("./layout/full/MainContainer.vue"),
      // ======================
      // Theme routes / pages
      // ======================
      children: [
        {
          path: "/settings",
          name: "Settings",
          index: 5.1,
          i18n: "Settings",
          component: () => import("./views/settings/Settings.vue"),
        },
        {
          path: "/settings/third-party-integration",
          name: "ThirdPartyIntegration",
          index: 5.2,
          i18n: "ThirdPartyIntegration",
          component: () => import("./views/settings/ThirdpartyIntegration.vue"),
        },
        {
          path: "/settings/notification-privacy",
          name: "NotificationPrivacy",
          index: 5.3,
          i18n: "NotificationPrivacy",
          component: () => import("./views/settings/NotificationPrivacy.vue"),
        },
        {
          path: "/settings/account-details",
          name: "AccountDetails",
          index: 5.4,
          i18n: "AccountDetails",
          component: () => import("./views/settings/AccountDetails.vue"),
        },
        {
          path: "/settings/sub-users",
          name: "AccountUsers",
          index: 5.5,
          i18n: "AccountUsers",
          component: () => import("./views/settings/AccountUsers.vue"),
        },
        {
          path: "/settings/new-sub-user",
          name: "NewAccountUser",
          index: 5.6,
          i18n: "NewAccountUser",
          component: () => import("./views/settings/NewAccountUser.vue"),
        },
        {
          path: "/settings/edit-sub-user/:subuser_id",
          name: "EditAccountUser",
          index: 5.7,
          i18n: "EditAccountUser",
          component: () => import("./views/settings/EditAccountUser.vue"),
        },
        {
          path: "/settings/market-setting",
          name: "MarketSetting",
          index: 5.8,
          i18n: "MarketSetting",
          component: () => import("./views/settings/MarketingSettings.vue"),
        },
        {
          path: "/settings/site-details",
          name: "SiteDetails",
          index: 5.9,
          i18n: "SiteDetails",
          component: () => import("./views/settings/SiteDetails.vue"),
        },
        {
          path: "/settings/email-templates",
          name: "EmailTemplates",
          index: 5.11,
          i18n: "EmailTemplates",
          component: () => import("./views/settings/EmailTemplates.vue"),
        },
        {
          path: "/settings/email-templates-editor/:template_index",
          name: "EmailTemplatesEditor",
          index: 5.12,
          i18n: "EmailTemplatesEditor",
          component: () => import("./views/settings/EmailTemplatesEditor.vue"),
        },
        {
          path: "/settings/custom-domain",
          name: "CustomDomain",
          index: 5.13,
          i18n: "CustomDomain",
          component: () => import("./views/settings/CustomDomain.vue"),
        },
        {
          path: "/settings/billing-address",
          name: "BillingAddress",
          index: 5.14,
          i18n: "BillingAddress",
          component: () => import("./views/settings/BillingAddress.vue"),
        },
      ],
    },

    // product progress & Member Progress
    {
      // ======================
      // Full Layout
      // ======================
      path: "",
      component: () => import("./layout/full/MainContainer.vue"),
      // ======================
      // Theme routes / pages
      // ======================
      children: [
        {
          path: "/analytics/product-progress/:product_id",
          name: "Product Progress",
          index: 6.1,
          i18n: "Product Progress",
          component: () => import("./views/analytics/ProductProgress.vue"),
        },
        {
          path: "/analytics/member-progress/:product_id/:student_id",
          name: "Member Progress",
          index: 6.2,
          i18n: "Member Progress",
          component: () => import("./views/analytics/MemberProgress.vue"),
        },
      ],
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/Error404",
    },

    // public checkout
    {
      path: "/offers/:offer_id/checkout",
      name: "checkout",
      index: 7.1,
      i18n: "preview-checkoutnew",
      component: () => import("./views/offers/PreviewOfferCheckout.vue"),
    },

    {
      path: "/offers/:offer_id/checkout/processing",
      name: "checkout processing",
      index: 8.1,
      i18n: "checkout processing",
      component: () => import("./views/offers/CheckoutProcessing.vue"),
    },
    {
      path: "/settings/member-setup",
      name: "member-setup",
      index: 9.1,
      i18n: "member-setup",
      component: () => import("./views/offers/MemberSetup.vue"),
    },
    {
      // ======================
      // Full Layout
      // ======================
      path: "",
      component: () => import("./views/preview/layout/MainContainer.vue"),
      children: [
        {
          path: "/products/preview",
          name: "Product Preview",
          index: 10.1,
          il8n: "Product Preview",
          component: () => import("./views/preview/MyProducts.vue"),
        },
        {
          path: "/products/preview/:product_id",
          name: "Product Preview ID  ",
          index: 10.2,
          il8n: "Product Preview ID",
          component: () => import("./views/preview/Product.vue"),
        },
        {
          path: "/products/preview/view-category/:category_id",
          name: "View Category",
          index: 10.3,
          il8n: "View Category",
          component: () => import("./views/preview/ViewCategory.vue"),
        },
        {
          path: "/products/preview/view-category/:category_id/view-lesson/:lesson_id",
          name: "View Lesson",
          index: 10.4,
          il8n: "View Lesson",
          component: () => import("./views/preview/ViewLesson.vue"),
        },

      ],
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
