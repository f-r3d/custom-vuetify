<template>

  <!-- <v-toolbar
    v-if="header"
    :title=headerTitle
    density="compact"
    :rounded="`${props.borderRadius ? 't-lg' : undefined}`"
    :color=props.headerColor
  >
    <v-btn
      v-if = minimize
      size="small"
      :icon="`${isMinimize ? 'mdi-window-maximize' : 'mdi-window-minimize'}`"
      @click="isMinimize = !isMinimize"
    >
    </v-btn>
    <v-btn
      v-if = closable
      size="small"
      icon="mdi-close"
      @click="emit('closed')"
    >
    </v-btn>
  </v-toolbar> -->

  <div
    class="ds-chat-container"
    :class="`${isFullpage ? 'ds-chat-container-full': ''}
      ${isMinimize ? 'ds-chat-container-minimize': ''}`"
  >
    <slot name="header">
      <div
        id="ds-chat-header"
        :class="`${props.borderRadius ? 'rounded-header' : undefined}`"
        :style="`background-color: ${props.headerColor}`"
        >
        <slot name="header-title">
          <div>{{ headerTitle }}</div>
        </slot>
        <div id="ds-chat-header-icon">
          <button
            v-if = minimize
            @click="isMinimize = !isMinimize; isFullpage = false"
            >
            ­­­­­­<svg v-if="!isMinimize" width="14" height="20" viewBox="0 0 20 20"><rect width="18" height="1" x="1" y="9"></rect></svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"></polyline></svg>
          </button>
          <button
            v-if="fullpage"
            @click="isFullpage = !isFullpage; isMinimize = false"
          >
            <svg v-if="!isFullpage" width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="M2.48,17.52l6.52-6.52"></path><polyline fill="none" stroke="#000" points="6.97 17.52 2.48 17.52 2.48 13.03"></polyline><path fill="none" stroke="#000" stroke-width="1.1" d="M17.52,2.48l-6.52,6.52"></path><polyline fill="none" stroke="#000" points="13.03 2.48 17.52 2.48 17.52 6.97"></polyline></svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18l6-6"></path><polyline fill="none" stroke="#000" points="4 11.5 8.49 11.5 8.49 15.99"></polyline><path fill="none" stroke="#000" stroke-width="1.1" d="M18,2l-6,6"></path><polyline fill="none" stroke="#000" points="15.99 8.49 11.5 8.49 11.5 4"></polyline></svg>
          </button>
          <button
            v-if = closable
            @click="emit('closed')"
          >
            <svg width="20" height="20" viewBox="0 0 20 20"><path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4"></path><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16"></path></svg>
          </button>
        </div>

      </div>

    </slot>
    <slot name="sub-header"></slot>
    <deep-chat
      v-show="!isMinimize"
      :connect=connectionData
      :demo=demo
      :style="`
        width: 100%;
        border: 1px solid ${scrollColor};
        font-family: 'Open Sans', sans-serif
      `"
      :auxiliaryStyle = auxiliaryStyle
      :history=messages
      :introMessage='{"text": props.introMessage}'
      :textInput=textInputStyle
      :messageStyles=messageStyleOptions
      :submitButtonStyles='{
        "submit": {
          "container": {
            "default": {
              "transform": "scale(1.21)",
              "marginBottom": "-3px",
              "marginRight": "0.4em"
            }
          }
        }
      }'
      :requestInterceptor=requestInterceptor
      :responseInterceptor=responseInterceptor
      @onMessage="checkMessage"
      >
    </deep-chat>
    <slot name="footer"></slot>
  </div>

</template>
<script setup lang="ts">
  import { ref, Ref, toRefs, watch, onMounted, useTemplateRef, onUnmounted } from "vue";

  const props = defineProps({
    minimize: { type: Boolean, default: false},
    fullpage: { type: Boolean, default: false},
    closable: { type: Boolean, default: false},
    header: { type: Boolean, default: false},
    borderRadius: { type: Boolean, default: true},
    headerColor: {type: String, default: "#eeeeee", required: false},
    chatColor: {type: String, default: "#121212", required: false},
    backgroundColor: {type: String, default: "#eeeeee", required: false},
    scrollColor: {type: String, default: "#2b2b2b", required: false},
    textColor: {type: String, default: "#333", required: false},
    connection: {type: Object, default: {}, required: false},
    demo: { type: Boolean, default: false},
    open: { type: Boolean, default: false},
    headerTitle: {type: String, default: "", required: false},
    introMessage: {type: String, default: "", required: false},
    placeholderMessage: {type: String, default: "Puppa", required: false},
    requestInterceptor: {type: Function, required: false}

  });

  const isMinimize = ref(!props.open);
  const isFullpage = ref(false);

  // const connetionOptions = ref({});
  // if(!props.demo && props.connec)

  // const additionalStyle = ;

  const auxiliaryStyle = ref(`
    #container {
      width: 100%;
      overflow: hidden;
      height: 100%;
      background-color: ${props.backgroundColor}
    }
   ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    #messages {
      scrollbar-color: ${props.headerColor} ${props.scrollColor};
    }
    ${props.borderRadius ? `
      .deep-chat-top-message .message-bubble {
          border-top-left-radius: 8px !important;
          border-top-right-radius: 8px !important;
      }
    ` : ''}
    .deep-chat-middle-message .message-bubble {
        margin-top: 0px;
    }
    .deep-chat-bottom-message .message-bubble {
        margin-top: 0px;
        ${props.borderRadius ? `
          border-bottom-left-radius: 8px !important;
          border-bottom-right-radius: 8px !important;
        `: ''}
    }
    .deep-chat-top-message.deep-chat-bottom-message .message-bubble {
      margin-top: 10px;
    }
  `);

  const messages: Ref<Array<Object>> = ref([]);

  const connectionData = ref(props.demo ? undefined : props.connection);
  onMounted(() => {
    if(props.demo) {
      messages.value = [
        {"text": "Hey, how are you?", "role": "user"},
        {"text": "I am doing great, how about you?", "role": "ai"},
        {"text": "Test user message", "role": "user"},
        {"text": "What is the meaning of life?", "role": "user"},
        {"text": "Hi', I'm Fred!", "role": "fred"},
        {
          "text": "This ultimately depends on the person, but it could be the pursuit of happiness or fulfillment.",
          "role": "ai"
        },
        {"html": "I just feel like sleeping all day...", "role": "user"},
        {"text": "As long as it makes you happy!", "role": "ai"}
      ];
    }
  });

  const textInputOptions =  {
    "styles": {
      "container": {
        "width": "100%",
        "margin": "0",
        "border": "unset",
        "borderTop": "1px solid "+props.scrollColor,
        "borderRadius": "0px",
        "boxShadow": "unset",
        "backgroundColor": props.backgroundColor,
        "color": props.textColor
      },
      "text": {
        "fontSize": "1.05em",
        "paddingTop": "11px",
        "paddingBottom": "13px",
        "paddingLeft": "12px",
        "paddingRight": "2.4em"
      }
    },
    "placeholder": {"text": props.placeholderMessage, "style": {"color": "#bcbcbc"}}
  };
  const textInputStyle = ref(textInputOptions);

  const messageStyleOptions =  {
    "default": {
      "shared": {
        "bubble": {
          "borderRadius": "0px",
          "width": "75%"
        }
      },
      "user": {
        "bubble": {
          "backgroundColor": props.chatColor,
        }
      }
    }
  };

  const emit = defineEmits(["closed"]);

  function checkMessage() {
    console.log(arguments);
  }

  function responseInterceptor(response) {
    response.text = "asafsdf sdgsdfgfd";
    console.log(response); // printed above
    return response;
  }

</script>

<style lang="scss" scoped>
  #ds-chat-header {
    display: flex;
    padding: 12px 20px;
    align-items: center;
    color: #fff;
    justify-content: space-between;
    &.rounded-header {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    >div:first-child {
      font-size: 18px;
      flex: 1 1;
    }
    >div:last-child {
      margin-left: auto;
      >button {
        &:hover {
          color: #eee;
        }

        &:not(:first-child) {
          margin-left: 10px;
        }
        svg {
          color: inherit;
          fill: currentcolor;
          * {
            stroke: currentcolor;
          }
        }
      }
    }
  }
  .ds-chat-container {
    width: 350px;
    height: 400px;
    max-width: calc(98% - 16px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &.ds-chat-container-minimize {
      height: auto;
    }
    >deep-chat {
      height: unset !important;
      flex-grow: 1;

    }
    &:not(.ds-chat-container-full) {
      >deep-chat {
        border-bottom: 0;
      }
    }
    &.ds-chat-container-full {
      position: fixed;
      top: 1vh;
      left: 1vw;
      height: 98vh;
      max-height: 98vh;
      width: 98vw;
      z-index: 2000;
    }
  }
</style>