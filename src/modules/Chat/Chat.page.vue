<script>
import {
  chatGetMessages,
  chatInit,
  chatOnMessage,
  chatSendMessage,
} from './Chat.api';

export default {
  data: () => ({
    message: '',
    items: [],
    loading: false,
  }),
  computed: {
    items$() {
      const items = [
        ...this.items,
      ];
      items.sort((a, b) => a.id - b.id);
      return items;
    },
  },
  methods: {
    getMessages() {
      if (this.loading) {
        return Promise.resolve();
      }
      this.loading = true;
      return chatGetMessages(this.items$[0]?.createdAt || new Date().toISOString())
        .then(({ messages }) => {
          this.items = [
            ...this.items,
            ...messages,
          ];
          this.loading = false;
          return this;
        });
    },
    submit() {
      if (!this.message) {
        return;
      }
      chatSendMessage({
        message: this.message,
      });
      this.message = '';
    },
    scrollEnd() {
      setTimeout(() => {
        if (this.$refs.scrollEl) {
          this.$refs.scrollEl.scroll(0, 999999);
        }
      }, 100);
    },
    scrollAddMessage() {
      if (this.$refs.elBou.getBoundingClientRect().top > -100) {
        this.getMessages();
      }
    },
  },
  async mounted() {
    this.$store.dispatch('setTitle', 'Чат');
    await chatInit();
    chatOnMessage((data) => {
      this.items = [
        ...this.items,
        data,
      ];
      this.scrollEnd();
    });
    this.getMessages()
      .then(() => {
        this.scrollEnd();
      });
  },
};
</script>
<template>
  <v-card class="chat">
    <div class="chat__wrap" ref="scrollEl" @scroll="scrollAddMessage">
      <div style="height: 1px;" ref="elBou"></div>
      <template v-for="item in items$">
        <div
          :key="item.id"
          class="chat-message"
          :class="{'chat-message--my': item.senderUserId === $store.state.app.account.id}"
        >
          <div class="chat-message__body lighten-3"
               :class="(item.senderUserId === $store.state.app.account.id)?'primary':'grey'">
            <div class="chat-message__label primary--text" v-if="item.senderUserId !== $store.state.app.account.id">
              {{ item.senderUserFirstName || '' }}
              {{ item.senderUserLastName || '' }}
              {{ item.senderUserMiddleName || '' }}
            </div>
            {{ item.message }}
            <div class="chat-message__time">{{item.createdAt | dateTime}}</div>
          </div>
        </div>
      </template>
    </div>
    <v-card-actions class="chat__action">
      <v-text-field placeholder="Введите сообщение" v-model="message" @keypress.enter="submit"></v-text-field>
      <v-btn color="primary" :disabled="!message" @click="submit">Отправить</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style lang="scss">
  .chat {
    height: calc(100vh - 124px);
    display: flex;
    flex-direction: column;

    &__wrap {
      flex: 1;
      overflow-y: scroll;
      padding: 12px;
      position: relative;
    }

    &__action {
      flex-shrink: 0;
      background: #eeeeee;

      .v-input {
        margin: 0 12px 0 0;
        padding: 0;
        height: 32px;
      }

      .v-input__slot {
        margin: 0;
        padding: 0 12px;
      }
    }
  }

  .chat-day {
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1;
    margin-bottom: 12px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      padding: 0 9px;
      height: 24px;
      border-radius: 9px;
      font-size: 14px;
      font-weight: 300;
    }
  }

  .chat-message {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;

    &--my {
      align-items: flex-end;
    }

    &__body {
      padding: 12px 12px 12px 12px;
      border-radius: 6px;
      max-width: 80%;
      position: relative;
      font-size: 14px;
      min-width: 160px;
    }

    &__time {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 6px;
      font-size: 10px;
      line-height: 1;
    }

    &__label {
      margin-top: -6px;
      font-size: 16px;
    }
  }
</style>
