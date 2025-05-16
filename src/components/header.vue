<template>
  <v-app-bar
    class="px-2"
  >

    <template v-slot:prepend>

      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="d-flex d-sm-none"
      >
      </v-app-bar-nav-icon>

      <div>
        <RouterLink to="/">
          <img src="../assets/asap2.svg" style="width: 150px">
        </RouterLink>
      </div>
    </template>

    <v-spacer></v-spacer>
    <div class="locale-changer">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          color="grey-darken-1"
          v-bind="props"
          >
          <v-icon>mdi-translate</v-icon>
          <v-tooltip
            activator="parent"
          >Cambia lingua</v-tooltip>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(lang, index) in SUPPORT_LOCALES"
          :key="index"
          :value="index"
          :disabled = "actualLocale == lang"
          @click = changeLanguage(lang)
        >
          <v-list-item-title>
            {{ $t(`language.${lang}`) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>
  </div>
    <!-- <v-btn icon stacked>
      <v-badge
        color="primary"
        content="6"
        location="bottom end"
      >
        <v-icon>mdi-cart-variant</v-icon>
      </v-badge>
    </v-btn> -->

    <div
      class="d-none d-sm-flex"
    >
      <v-btn
        icon
        to="/user"
        color="grey-darken-1"
        >
        <v-icon>mdi-account-outline</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >Dati personali</v-tooltip>
      </v-btn>

      <v-btn
        icon
        to="/metadata"
        color="grey-darken-1"
        >
        <v-icon>mdi-table</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >Metadata</v-tooltip>
      </v-btn>

      <v-btn
        to="/settings"
        icon
        color="grey-darken-1"
      >
        <v-icon>mdi-cog-outline</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >Settings</v-tooltip>
      </v-btn>

      <v-btn
        to="/bom"
        icon
        color="grey-darken-1"
      >
        <v-icon>mdi-file-tree-outline</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >BOM</v-tooltip>
      </v-btn>

      <v-btn
        to="/components"
        icon
        color="grey-darken-1"
      >
        <v-icon>mdi-information-slab-circle-outline</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >Componenti</v-tooltip>
      </v-btn>

      <v-btn icon color="grey-darken-1">
        <v-icon>mdi-logout</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >Logout</v-tooltip>
      </v-btn>
    </div>

    <div class="align-self-center">
      <v-switch
        inset
        color="primary"
        v-model="darkMode"
        hide-details
        @change="toggleTheme()"
      >
      </v-switch>
    </div>

  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    class="d-sm-none"
  >
    <v-list
      nav
      dense
    >
      <v-list-item
        to="/bom"
        prepend-icon="mdi-cog-outline"
        title="Bom"
      >
      </v-list-item>

      <v-list-item
        to="/components"
        prepend-icon="mdi-information-slab-circle-outline"
        title="Componenti"
      >
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from "vue";
  import { loadAndSetLocale, SUPPORT_LOCALES } from "../i18n";
  import { useI18n } from "vue-i18n";
  const i18n = useI18n();

  const actualLocale = ref(i18n.locale.value);


  import { useTheme } from 'vuetify'
  const theme = useTheme();
  const darkMode = ref(false);

  onBeforeMount(() => {
    darkMode.value = localStorage.getItem("darkMode") == "desysThemeDark";
    toggleTheme();
  });

  function toggleTheme() {
    theme.global.name.value = darkMode.value ? "desysThemeDark" : "desysThemeLight";
    localStorage['darkMode'] = theme.global.name.value;
  }

  const drawer = ref(false);

  const emit = defineEmits(["openSnackbar"]);

  async function changeLanguage(lang) {
    console.log(lang);
    await loadAndSetLocale(lang);
    actualLocale.value = lang;
  }
</script>