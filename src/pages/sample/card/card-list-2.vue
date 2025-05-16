
<template>
  <v-data-iterator
    :items="games"
    :items-per-page="12"
    :search="search"
  >

    <template v-slot:header>
      <v-container
        class="pt-0"
        fluid
      >

        <v-row
          align="center"
        >
          <v-col
            class="pt-0"
          >
            <h1>Progetti</h1>
          </v-col>
          <v-spacer></v-spacer>
          <v-col
            cols="12"
            xl="4"
            lg="6"
          >
            <v-text-field
              v-model="search"
              label="Inserisci nome del file o del progetto"
              clearable
              clear-icon="mdi-close-circle"
              variant="solo"
              hide-details
              single-line
              rounded="ts-xl bs-xl"
            >
            </v-text-field>

          </v-col>
        </v-row>
      </v-container>

    </template>

    <template v-slot:default="{ items }">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.raw.id"
            cols="12"
            xl="2"
            lg="3"
            md="4"
            sm="6"
          >
            <v-card
              elevation="4"
            >


              <v-card-title class="bg-primary-lighten-2">
                {{ item.raw.title }}

              </v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <b>Label 1:</b> Text 1<br>
                <b>Label 2:</b> Text 2<br>
              </v-card-text>

              <v-card-actions
                class="pb-0"
              >
                <v-btn
                  color="medium-emphasis"
                  icon="mdi-heart"
                  size="small"
                ></v-btn>

                <v-btn
                  color="medium-emphasis"
                  icon="mdi-bookmark"
                  size="small"
                ></v-btn>

                <v-btn
                  color="medium-emphasis"
                  icon="mdi-share-variant"
                  size="small"
                ></v-btn>
              </v-card-actions>

            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-slot:footer="{ page, pageCount, setPage, prevPage, nextPage }">
      <div class="d-flex align-center justify-center pa-4">
        <v-icon
          :disabled="page === 1"
          @click="setPage(1)"
        >
          mdi-page-first
        </v-icon>

        <v-icon
          :disabled="page === 1"
          @click="prevPage"
        >
          mdi-chevron-left
        </v-icon>

        <div class="ds-pagination-input">
          <div class="d-flex align-center">
            <v-text-field
              class="ga-0 pa-0 ma-0 mr-1"
              type="number"
              width="70px"
              hide-details
              :value=page
            >
            </v-text-field>
              /
            {{ pageCount }}
          </div>
        </div>

        <v-icon
          :disabled="page >= pageCount"
          @click="nextPage"
        >
          mdi-chevron-right
        </v-icon>

        <v-icon
          :disabled="page >= pageCount"
          @click="setPage(pageCount)"
        >
          mdi-page-last
        </v-icon>
      </div>
    </template>
  </v-data-iterator>

</template>

<script setup lang="ts">
  import { shallowRef } from "vue";


  const search = shallowRef('');

  const games = [
    {
      img: '/public/images/test-4.jpg',
      title: 'A0000000001',
      id: 1
    },
    {
      img: '/public/images/test-2.jpg',
      title: 'A0000000002',
      id: 2
    },
    {
      img: '/public/images/test-3.jpg',
      title: 'A0000000003',
      id: 3
    },
    {
      img: '/public/images/test-5.jpg',
      title: 'A0000000004',
      id: 4
    },
    {
      img: '/public/images/test-6.jpg',
      title: 'A0000000005',
      id: 5
    },
    {
      img: '/public/images/test-7.jpg',
      title: 'A0000000006',
      id: 6
    },
    {
      img: '/public/images/test-1.jpg',
      title: 'A0000000007',
      id: 7
    },
    {
      img: '/public/images/test-8.jpg',
      title: 'A0000000008',
      id: 8
    },
    {
      img: '/public/images/test-4.jpg',
      title: 'A0000000009',
      id: 9
    },
    {
      img: '/public/images/test-2.jpg',
      title: 'A0000000010',
      id: 10
    },
    {
      img: '/public/images/test-3.jpg',
      title: 'A0000000011',
      id: 11
    },
    {
      img: '/public/images/test-5.jpg',
      title: 'A0000000012',
      id: 12
    },
    {
      img: '/public/images/test-6.jpg',
      title: 'A0000000013',
      id: 13
    },
    {
      img: '/public/images/test-7.jpg',
      title: 'A0000000014',
      id: 14
    },
    {
      img: '/public/images/test-1.jpg',
      title: 'A0000000015',
      id: 15
    },
    {
      img: '/public/images/test-8.jpg',
      title: 'A0000000016',
      id: 16
    },
  ];
</script>
