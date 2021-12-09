<script>
export default {
  props: {
    items: Array,
    txtNoEntity: {
      type: String,
      default: 'Данные отсутствуют',
    },
    txtLoading: {
      type: String,
      default: 'Загрузка...',
    },
    txtNext: {
      type: String,
      default: 'Показать ешё',
    },
    size: {
      type: [Number, String],
      default: 50,
    },
    start: {
      type: [Number, String],
    },
    loading: Boolean,
    keyName: {
      default: 'id',
    },
  },
  data: () => ({
    pr_size: 50,
  }),
  computed: {
    pr_items() {
      return this.items.slice(0, this.pr_size);
    },
    showNext() {
      return this.pr_size < this.items.length;
    },
  },
  methods: {
    handlerNext() {
      this.pr_size += (+this.size);
      this.$forceUpdate();
    },
  },
  mounted() {
    this.pr_size = +this.start || this.size;
  },
};
</script>
<template>
  <div>
    <v-list>
      <div
        v-for="(item, idx) in pr_items"
        :key="item[keyName]"
      >
        <slot
          name="item"
          :item="item"
          :idx="idx"
        />
        <v-divider v-if="pr_items.length !== (idx + 1)"/>
      </div>
      <v-list-item v-if="!items.length">
        <v-list-item-content>
          <v-list-item-subtitle>
            {{ loading ? txtLoading : txtNoEntity }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions v-if="showNext">
      <v-btn
        @click="handlerNext"
        color="primary"
        block
        v-text="txtNext"
      />
    </v-card-actions>
  </div>
</template>
<style lang="scss">

</style>
