<template>
  <div id="ds-mouse-move-area" v-if = "resizing"
    class="position-fixed"
    @mousemove="resizeMove"
    @mouseup="resizeUp"
  >
  </div>

  <div id="ds-page-container">
    <div
      id="ds-page"
      class="d-flex overflow-hidden"
    >
      <div
        id="ds-viewer">
      </div>

      <div id="ds-bom-column"
        class="position-relative overflow-hidden"
        :style="{ width: actualResize + 'px' }"
        >
        <div id="ds-resize-handler"
          class="bg-grey-lighten-5 position-fixed d-flex align-center justify-center"
        >
          <v-icon
          size="x-small"
          >
            mdi-arrow-expand-left
          </v-icon>
        </div>

        <div
          id="ds-col-tree-in"
          class="d-flex"
        >
          <div id="ds-tree-container"
            class="d-flex overflow-hidden"
          >
            <div id="ds-search-box">
              <v-sheet
                id="ds-search-in"
                class="ds-button-with-icon pt-5 pb-3 px-3 d-flex align-center gap-small position-relative"
              >
                <div class="w-75">
                  <div
                    class="d-flex justify-center"
                  >
                    <v-text-field
                      v-model="search"
                      clear-icon="mdi-close-circle-outline"
                      label="Filter..."
                      clearable
                      variant="solo"
                      hide-details
                      single-line
                      rounded="ts-xl bs-xl"
                    ></v-text-field>

                    <v-btn
                      size="small"
                      color="secondary"
                      rounded="ts-0 bs-0 te-pill be-pill"
                      elevation="4"
                      icon
                      id="ds-advanced-search"
                    >
                      <v-icon size="x-large" icon="mdi-menu-down"></v-icon>
                    </v-btn>

                    <v-menu
                      activator="#ds-advanced-search"
                      attach="#ds-search-in"
                      location="bottom"
                      transition="fade-transition"
                      :close-on-content-click="false"
                      width="calc(100% - 15px)"
                      :offset="[5,95]"
                    >
                      <v-card>
                        <v-card-title>
                          Ricerca avanzata
                        </v-card-title>
                        <v-card-item>
                          gne gne
                        </v-card-item>

                        <v-card-actions>
                          <v-btn-primary
                            prepend-icon="mdi-magnify"
                          >
                            Cerca
                          </v-btn-primary>

                          <v-spacer></v-spacer>

                          <v-btn
                            variant="outlined"
                          >
                            Resetta filtri
                          </v-btn>
                        </v-card-actions>
                      </v-card>

                    </v-menu>
                  </div>
                </div>

                <div class="pl-1">
                  sfsf
                </div>

              </v-sheet>
            </div>

            <div id="ds-tree-box"
              class="overflow-hidden pssition-relative"
              >
              <div id="ds-tree-in"
                class="overflow-auto"
                :class="search ? 'ds-active-search' : undefined"
                >
                <!-- <ul class="ds-nav ds-tree position-relative" id="ds-tree">
                </ul> -->
                <v-treeview
                  activatable
                  :activated=activatedElements
                  active-strategy="independent"
                  :open-all=false
                  :opened=openedElements
                  :open-on-click=false
                  selectable
                  v-model:selected=selectedElements
                  select-strategy="classic"
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  :items="treeData"
                  :search="search"
                  :custom-filter="filterFn"
                  @click:open="toggleClick"
                  @update:activated="updateActivated"
                  @update:selected="updateSelected"
                  @update:modelValue="updateModelValue"
                >
                  <template v-slot:title = "data">
                    <div
                      style="color: green"
                      @click="titleClick"
                    >
                      {{ data.title }}
                    </div>
                  </template>
                </v-treeview>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onBeforeMount } from "vue";

  const treeData: any = ref([]);

  async function getTreeData() {

    const response = await fetch('../../public/bom.json');
    const json = await response.json();
    treeData.value = [
      ...json, ...json, ...json
    ];
  }

  onBeforeMount(() => {
    getTreeData();
  });

  function titleClick() {
    console.log(arguments);
  }

  function updateModelValue(data) {
    console.log(data);
  }

  function updateSelected(data) {
    console.log(arguments[0]);
    selectedElements.value = data;
  }

  function updateActivated(data) {
    console.log(arguments);
    activatedElements.value = data;
  }

  function toggleClick(data: Object) {
    console.log(data);
  }

  function selectClick(data) {
    console.log("select click");
    console.log(data);
  }

  const search = ref(undefined)
  const filterFn = function (value, search, item) {
    console.log(value);
    console.log(search);
    console.log(item);
    // return value.toLowerCase().indexOf(search.toLowerCase()) > -1
    return value.toLowerCase().indexOf(search.toLowerCase());
  }

  const selectedElements = ref(['5']);
  const activatedElements = ref(['5','6']);

  const openedElements = ref(['5']);
  setTimeout(function() {
    openedElements.value.push('6');
  }, 5000);

  const resizing = ref(true);

  const actualResize = ref(400);

  function resizeMove() {

  }

  function resizeUp() {

  }
</script>

<style>
  /* .v-treeview-item.v-treeview-item--filtered {
    display: grid;
  }

  .ds-active-search .v-treeview-item:not(.v-treeview-item--filtered) {
    background-color: #eee;
  } */

  /* body, html, #app, #app>.v-layout, #ds-page {
    height: 100%;
    max-height: 100%;
  } */

  /* #app>.v-layout {
    display: block;
  } */
  /* #app>.v-layout>header {
    position: static !important;
  } */

  /* .v-main {
    height: 100%;
    display: flex;
    flex-direction: column;
  } */

  #ds-page-container {
    height: 100%;
    /* flex: 1 1 0;
    overflow: hidden; */
  }


  #ds-page {
    height: 100%;
    max-height: 100%;
  }

  #ds-viewer {
    background: pink;
    flex-grow: 1;
  }

  @media(min-width: 641px) {
    #ds-viewer {
      height: 100%;
    }
  }
  #ds-bom-column {
    transition: all .3s;
    width: 0;
  }

  #ds-bom-column {
    @media(max-width: 640px) {
      width: 100%;
      min-width: 100%;
    }
    @media(min-width: 641px) {
      width: 440px;
    }
  }

  @media(max-width: 640px) {

    #ds-page {
      flex-flow: column nowrap;
    }

    #ds-bom-column {
      height: 50%;
      max-width: 100%;
    }

  }

  #ds-resize-handler {
    height: 100%;
    max-height: 100%;
    width: 15px;
    z-index: 2;
    cursor: pointer;
    margin-left: -15px;
    user-select: none;
  }

  #ds-mouse-move-area {
    user-select: none;
    z-index: 1000;
  }


  #ds-col-tree-in {
    flex-flow: column nowrap;
    flex: 1 1 auto;
    height: 100%;
    max-height: 100%;
  }

  #ds-tree-container {
    flex-flow: column nowrap;
    flex: 1 1 auto;
    width: 100%;
    max-width: 100%;
  }

  .v-list-group {
    position: relative;
  }
  .v-list-group.v-list-group--open:before {
    border-left: 1px dashed #dddfdf;
    border-left: 1px dashed grey;
    bottom: 0;
    content: " ";
    display: block;
    height: calc(100% - 62px);
    margin-left: calc(var(--indent-padding) + var(--prepend-width) + 9px);
    position: absolute;
    top: 40px;
    width: 0;
  }

  #ds-tree-in>div>.v-list-group.v-list-group--open:before {
    margin-left: calc(var(--indent-padding) + var(--prepend-width) + 13px);
  }

  .v-list-group .v-list-group .v-list-item:before {
    border-top: 1px dashed grey;
    content: "";
    display: block;
    height: 0;
    margin-left: calc(var(--indent-padding) - 5px);
    margin-top: 3px;
    position: absolute;
    top: 22px;
    width: calc( var(--list-indent-size) );
  }

  #ds-tree-in>div>.v-list-group.v-list-group--open>div>div>div:before {
    margin-left: calc(var(--indent-padding) - 2px);
  }

</style>

<style scoped>
  #ds-search-box {
    /* padding: 7px 10px; */
    border-bottom: 1px solid var(--ds-grey-color);
  }

  #ds-tree-box {
    flex: 1 1 auto;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  }

  #ds-tree {
    min-width: 100%;
    width: max-content !important;
  }

  #ds-tree-in {
    height: 100%;
    max-height: 100%;
  }
</style>
