<script>
import AddComponent from './Add.component.vue';

export default {
  components: {
    AddComponent,
  },
  props: {
    value: {
      type: Boolean,
    },
  },
  data: () => ({
  }),
};
</script>
<template>

  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    transition="dialog-bottom-transition"
    scrollable
    max-width="400"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <AddComponent
      @submit="$emit('submit')"
      @close="$emit('input', false)"
    >
      <v-card-title slot="header">Игровая тренировка</v-card-title>
      <v-divider slot="header"/>
    </AddComponent>
  </v-dialog>
</template>
<style lang="scss">

</style>
