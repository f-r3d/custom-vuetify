
<template>

  <div
    class="position-fixed bottom-0 right-0 mr-4 ds-chat-box"
    style="z-index: 2000"
    v-if="openChat"
  >
    <chat
      :minimize="true"
      :border-radius="true"
      :header-color=primaryColor
      :chat-color=chatColor
      :background-color=backgroundColor
      :text-color=textColor
      :scroll-color=scrollColor
      :header="true"
      :closable="true"
      :fullpage="true"
      :connection = connection
      :demo="true"
      :open="true"
      introMessage="Scrivi qualcosa e ti sarà dato"
      :header-title=toolbarTitle
      placeholderMessage="Scrivi un messaggio..."
      @closed="openChat = !openChat"
      :requestInterceptor=requestInterceptor
    >
      <!-- <template v-slot:header-title>
        <div>
          dfghdfghgf
        </div>
      </template> -->
      <!-- <template v-slot:footer>footer</template> -->

    </chat>

  </div>
  <v-fab
    v-else
    style="z-index: 2000"
    icon="mdi-plus"
    location="bottom right"
    position="sticky"
    class="mb-4"
    color="primary"
    app
    @click="openChat = !openChat"
    >
  </v-fab>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import "deep-chat";
  import { useTheme } from 'vuetify'
  import chat from "../../components/chat.vue"

  const theme = useTheme();
  const currentTheme = theme.current.value;
  // const currentTheme = theme.themes.value.desysThemeDark;
  console.log(currentTheme);
  const scrollColor = ref(currentTheme.variables['theme-code'].toString());
  const chatColor = ref(currentTheme.colors['secondary-lighten-1']);
  const primaryColor = ref(currentTheme.colors['primary']);
  const backgroundColor = ref(currentTheme.colors['background']);
  const textColor = ref(currentTheme.variables['on-background'].toString());

  const toolbarTitle = ref("Titolo chat");

  // const connection = {
  //   "url": "https://customapi.com/message",
  //   "method": "POST",
  //   "additionalBodyProps": {section: "documents"}
  // };

  const connection = {
    "url": "https://customapi.com/message",
    "method": "POST",
    "additionalBodyProps": {section: "documents"}
  };

  const requestInterceptor = (requestDetails) => {
    console.log(requestDetails); // printed above
    requestDetails.body.messages = {role: "user", text: "Pensavi eh?!"};
    return requestDetails;
  }

  const openChat = ref(true);
</script>
