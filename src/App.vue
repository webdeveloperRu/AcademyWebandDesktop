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
    checkToken: function() {
      this.$store
      this.$store.dispatch('settingManage/getAccountDetails')
      .then(() => {
        if(this.status_got)
          this.$router.push("/products").catch(()=>{});
        if(!this.status_got) 
          this.$router.push("/login");
      })
      .catch(() => {
        this.$router.push("/login");
      });
    },
    
  },
  created() {
    if(this.logged_user != null)
      this.checkToken();
    else
      this.$router.push("/login")
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