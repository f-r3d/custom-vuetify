<template>

  <v-container fluid
    class="pt-"
  >

    <v-breadcrumbs
      class="pa-0 text-body-2 mb-0"
      :items="breadcrumbsItems"
    >
    </v-breadcrumbs>

    <v-row
      class="pt-6"
    >
      <v-col cols="2">
        <v-expansion-panels
          v-if="panels.length > 0"
          v-model="openPanels"
          variant="accordion"
          multiple
        >
          <template
            v-for="panel in panels"
          >
            <v-expansion-panel
              v-if="panel.children"
              :title=panel.title
              static
            >
              <v-expansion-panel-text>
                <v-list
                  density="compact"
                >
                  <v-list-item
                    v-for="item in panel.children"
                    :to="`/components/${item.to}`"
                  >
                    {{ item.title }}
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </template>
        </v-expansion-panels>

      </v-col>

      <v-col>
        <router-view />
      </v-col>
    </v-row>

  </v-container>

</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useRoute } from 'vue-router'

  const route = useRoute();
  const breadcrumbsItems = ref([]);

  watch(
    route,
    async newRoute => {
      breadcrumbsItems.value = [];

      const breadcrumbs = newRoute.fullPath.split("/");
      for (let i = 0; i < breadcrumbs.length; i++) {
        const el = breadcrumbs[i];
        console.log(route.meta.title);
        let title: any = el ? el : 'Home';
        if ( i == breadcrumbs.length -1 ) title = route.meta.title;
        const bcItem = {
          title: title,
          disabled: i == breadcrumbs.length-1,
          href: '/'+el
        }
        breadcrumbsItems.value.push(bcItem);
      }


    },
    { immediate: true }
  );

  const openPanels = ref([0,1,2]);

  const panels = ref([
    {
      title: "Stili",
      children: [
        {
          title: "Testi",
          to: "text"
        },
        {
          title: "Colori",
          to: "colors"
        }
      ]
    },
    {
      title: "Contenitori",
      children: [
        {
          title: "Bottoni",
          to: "button"
        },
        {
          title: "Card",
          to: "card"
        }
      ]
    },
    {
      title: "Esempi card",
      children: [
        {
          title: "Lista card 1",
          to: "card-list-1"
        },
        {
          title: "Lista card 2",
          to: "card-list-2"
        }
      ]
    },
    {
      title: "Esempi tabelle",
      children: [
        {
          title: "Tabella 1",
          to: "table-1"
        },
      ]
    },
    {
      title: "Componenti speciali",
      children: [
        {
          title: "Chat",
          to: "chat"
        }
      ]
    },
  ]);



</script>
