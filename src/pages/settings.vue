<template>
  <v-container
    fluid
    class="mt-1 flex-column fill-height align-stretch pt-0"
  >

    <v-breadcrumbs
      class="pa-0 text-body-2 mb-0"
      :items="breadcrumbsItems"
      density="compact"
    >
    </v-breadcrumbs>

    <h1
      class="pt-4"
    >
      Settaggi
    </h1>

    <v-card
      flat
      no-gutters
      tile
    >

      <SettingsForm
        :modal=false
        @save="saveSettings"
      >
      </SettingsForm>
    </v-card>

  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  import SettingsForm from "../components/settingsForm.vue"

  const breadcrumbsItems = ref([
    {
      title: 'Home',
      disabled: false,
      href: '/',
    },
    {
      title: "Settaggi",
      disabled: true,
      href: ''
    }
  ]);

  async function saveSettings(data: FormData, projectId: number | null) {
    console.log(projectId);
    for (const [key, value] of data) {
      // console.log(value);
      console.log(`${key}: ${value}`);
    }
  }
</script>