
<template>
  <v-card
    flat
    color="primary-lighten-2"
    rounded="t-lg"

  >
    <div class="d-flex align-center ga-5 pa-2">
      <div class="text-h6 pa-0 ma-0">
        Titolo tabella
      </div>
      <div
        class="w-25"
      >
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
          density="compact"
        ></v-text-field>
      </div>
    </div>

  </v-card>

  <v-data-table
    item-key="name"
    height ="calc(100vh - 300px)"
    :headers="headerData"
    :items="tableData"
    fixed-header
    fixed-footer
    hover
    items-per-page="20"
    density="compact"
    show-current-page
    v-model:page="actualPage"
    :search="search"
    class="rounded-b-lg"
  >
    <template v-slot:bottom="{ page, pageCount }">
      <v-pagination
        v-model="actualPage"
        :length="pageCount"
        total-visible="7"
        show-first-last-page
      >

        <template v-slot:first>
          <v-icon
            :disabled="actualPage === 1"
            @click="actualPage = 1"
            size="large"

          >
            mdi-page-first
          </v-icon>
        </template>
        <template v-slot:prev>
          <v-icon
            :disabled="actualPage === 1"
            @click="actualPage--"
            size="large"
          >
            mdi-chevron-left
          </v-icon>
        </template>
        <template v-slot:item="{ page }">
          <div class="ds-pagination-input d-flex align-center justify-end"  v-if="page == 1">
            <v-text-field
              class="ga-0 pa-0 ma-0 mr-1"
              type="number"
              width="70px"
              hide-details
              v-model=actualPage
              density="compact"
              min="1"
              :max="pageCount"
            >
            </v-text-field>
              /
            {{ pageCount }}
          </div>
        </template>
        <template v-slot:next>
          <v-icon
            :disabled="actualPage === pageCount"
            @click="actualPage++"
            size="large"
          >
            mdi-chevron-right
          </v-icon>
        </template>
        <template v-slot:last>
          <v-icon
            :disabled="actualPage === pageCount"
            @click="actualPage = pageCount"
            size="large"
          >
            mdi-page-last
          </v-icon>
        </template>

      </v-pagination>
    </template>
  </v-data-table>

</template>

<script setup lang="ts">
  import { ref, reactive } from "vue";

  const actualPage = ref(1);
  const search = ref('');

  // Helper functions to generate random data
  function generateRandomString() {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  function getRandomNumber(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomFloat(min: any, max: any) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }
  // Helper functions to generate random data

  const headerData = reactive([
    { title: 'Pyramid', key: 'name' },
    { title: 'Location', key: 'location' },
    { title: 'Construction Date', key: 'constructionDate' },
    { title: 'Height (m)', key: 'height' },
    { title: 'Base (m)', key: 'base' },
    { title: 'Volume (m³)', key: 'volume' },
  ]);

  let items: any = [{
    name: "AAAAAAA",
    location: "CASA MIA",
    constructionDate: -3250,
    height: 40,
    base: 200,
    volume: 5555,
    id: 2000
  }];

  for (let i = 0; i < 1000; i++) {
    const item = {
      name: generateRandomString(),
      location: generateRandomString(),
      constructionDate: getRandomNumber(-300, -100),
      height: getRandomFloat(0, 20),
      base: getRandomFloat(0, 20),
      volume: getRandomNumber(0, 50),
      id: i
    };
    items.push(item);
  }

  const tableData = reactive(items);
</script>

<style>
  .v-pagination__item:empty {
    display: none;
  }
  .v-pagination__list>li {
    display: flex;
    align-items: center;
  }
</style>
