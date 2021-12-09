<script>
export default {
  props: {
    item: Object,
  },
};
</script>
<template>
  <v-list-item
    :to="`/news/${item.id}`"
  >
    <v-list-item-content>
      <v-list-item-title class="mb-3">
        <v-chip color="primary" dark class="mr-3">
          {{ item.publicationDate | dateMin }}
        </v-chip>
        {{ item.title }}
      </v-list-item-title>
      <v-list-item-subtitle style="white-space: normal;">
        {{ item.previewText }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<style lang="scss">

</style>
