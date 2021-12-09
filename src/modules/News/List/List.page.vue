<script>
import Page from '@/mixins/Page.vue';
import ListComponent from './List.component.vue';

export default {
  mixins: [Page],
  components: {
    ListComponent,
  },
};
</script>
<template>
  <div>
    <ListComponent/>
  </div>
</template>
<style lang="scss">

</style>
