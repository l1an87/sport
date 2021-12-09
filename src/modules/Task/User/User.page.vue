<script>
import Page from '@/mixins/Page.vue';
import ListComponent from '@/modules/Activity/List/List.component.vue';

export default {
  mixins: [Page],
  props: {
    taskId: [Number, String],
    userId: [Number, String],
  },
  components: {
    ListComponent,
  },
};
</script>
<template>
  <div>
    <ListComponent
      :user-id="+userId"
      :task-id="+taskId"
    />
  </div>
</template>
<style lang="scss">

</style>
