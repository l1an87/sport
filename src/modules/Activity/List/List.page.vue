<script>
import Page from '@/mixins/Page.vue';
import ListComponent from './List.component.vue';
import AddDialog from '@/modules/Activity/Add/Add.dialog.vue';

export default {
  mixins: [Page],
  components: {
    ListComponent,
    AddDialog,
  },
  data: () => ({
    add: false,
  }),
  methods: {
    handlerAdd() {
      this.$refs.items.init();
    },
  },
};
</script>
<template>
  <div>
    <ListComponent
      ref="items"
      :user-id="account$.id"
    />
    <AddDialog
      @submit="handlerAdd()"
      v-model="add"
    />
    <v-fab-transition>
      <v-btn
        key="activeFab.icon"
        color="primary"
        dark
        fixed
        bottom
        right
        fab
        @click="add=true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>
<style lang="scss">

</style>
