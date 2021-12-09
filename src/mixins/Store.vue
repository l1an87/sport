<script>
export default {
  computed: {
    account$() {
      return this.$store.state.app.account;
    },
    setting$() {
      return this.$store.state.setting;
    },
  },
};
</script>
