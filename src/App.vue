<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  components: {
  },
  data: () => ({}),
  methods: {
    
    checkToken: async function() {
     this.$vs.loading({ type: "material" });
     await this.$store.dispatch('settingManage/getAccountDetails')
      .then(() => {
        if(this.status_got){
          if (this.$router.currentRoute.fullPath=='/' || this.$router.currentRoute.fullPath=='/Error404'){
            this.$router.replace('/products').catch(()=>{})

          } else{
            this.$router.replace(this.$router.currentRoute).catch(()=>{});
          }           
        }
        if(!this.status_got)  {
          this.$router.replace("/login").catch(()=>{});

        }
      })
      .catch(() => {
        this.$router.replace("/login").catch(()=>{});
      });
      this.$vs.loading.close();
    },
    
  },
  created() {
    var currentUrl = window.location.pathname;
    if (currentUrl.substring(currentUrl.length-9,currentUrl.length ) == '/checkout') 
      return;
    if(this.logged_user != null){
      this.checkToken();
    }
    else {
      this.$router.replace("/login").catch(()=>{});
    }    
  },
  computed: {
    logged_user: {
      get(){
        return this.$store.getters["auth/logged_user"]
      }
    },
    status_got: {
    get() {
      return this.$store.getters["status_got"];
    },
  },
  }
};
</script>
<style lang="scss">
@import "./assets/scss/_font.scss";
</style>