<template>
  <v-container
    fluid
    class="mt-2 flex-column fill-height align-stretch"
  >
    <v-row
      class="flex-grow-0 border"
      dense
    >
      <v-col
        cols="12"
        class="pa-0"

      >
        <v-card
          elevation="0"
          color="primary"
          variant="tonal"
          class="pa-2"
          rounded="0"

        >
          <div
            class="d-flex ga-1"
          >
            <v-btn
              color="error"
            >
              Chiudi
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="outlined"
              prepend-icon="mdi-import"
              @click="openImportColumnModal"
            >
              Importa colonna
            </v-btn>
            <v-btn
              color="primary"
              :disabled="columnSelected == -1"
              variant="outlined"
              prepend-icon="mdi-swap-horizontal"
            >
              Sostituisci colonna
            </v-btn>
            <v-btn
              color="primary"
              variant="outlined"
              :disabled="columnSelected == -1"
              prepend-icon="mdi-close"
              @click = removeColumn()
            >
              Rimuovi colonna
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="border"
      dense
    >
      <v-col
        cols="2"
      >
        <h3 class="text-center">
          Storia
        </h3>
        <v-list
          title="Storia"
          lines="two"
        >

          <template v-for="i in 5">
            <v-divider inset></v-divider>
            <v-list-item
            >
              <template v-slot:prepend>
                <v-avatar color="grey-lighten-1">
                  <v-icon color="white">mdi-file-table-outline</v-icon>
                </v-avatar>
              </template>
              <!-- <template v-slot:prepend>
                <v-icon
                  size="x-large"
                >
                  mdi-file-table-outline
                </v-icon>
              </template> -->
              <template v-slot:subtitle>
                <div class="d-flex ga-2 align-center">
                  <span>File mio</span>
                  <v-icon icon="mdi-set-merge"></v-icon>
                  <span>File {{i*10}}</span>
                </div>
              </template>
              <template v-slot:title>
                <span class="text-body-2">
                  Operazione asdf {{ i }}
                </span>
              </template>

            </v-list-item>
          </template>
        </v-list>

      </v-col>
      <v-col
        cols="10"
      >
      <v-data-table-virtual
        item-key="name"
        height ="calc(100vh - 200px)"
        :headers="headerData"
        :items="tableData"
        fixed-header
        hover
        dblclick
        density="compact"
        >
        <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
          <tr>
            <template v-for="(column, index) in columns" :key="column.key">
              <td :class="columnSelected == index ? 'selected' : undefined">
                <div class="d-flex">

                  <div
                    class="mr-2 cursor-pointer flex-fill"
                    @click="() => selectColumn(column.key, index)"
                  >
                    {{ column.title }}
                  </div>
                  <!-- <v-icon v-if="column.removable" icon="$close" @click="() => remove(column.key)"></v-icon> -->
                  <template v-if="isSorted(column)">
                    <v-icon @click="() => toggleSort(column)" :icon="getSortIcon(column)"></v-icon>
                  </template>
                  <template v-else>
                    <v-icon @click="() => toggleSort(column)" icon="mdi-arrow-up-down"></v-icon>
                  </template>
                  <!-- <v-icon icon="$close" @click="() => remove(column.key)"></v-icon> -->
                </div>
              </td>
            </template>
          </tr>
        </template>
        <template v-slot:item="{ item, index }">
          <tr>
            <template
              v-for="(v, key, column) in item"
              :data-value=v
            >
              <td
                @dblclick="() => selectCell(key, v, index, column)"
                v-if="key != 'id'"
                :data-pos="`${index}-${column}`"
              >
                <div v-if="cellFocused!=`${index}-${column}`">
                  {{ v }}
                </div>
                <div v-else>
                  <input
                    :id="`input-${index}-${column}`"
                    class="border"
                    type="text"
                    :name="`${index}-${column}`"
                    :value=v
                    @blur="() => blurInput()"
                    @keydown.esc="() => blurInput()"
                    @keydown.enter="(e: any) => saveCellData(e.target.value, item.id, index, column, key)"
                  >
                </div>
              </td>
            </template>
          </tr>
        </template>
      </v-data-table-virtual>
      </v-col>
    </v-row>
  </v-container>


  <v-dialog
    v-model="importColumnModal"
    width="auto"
    min-width="550"
    scrollable
    max-height="none"
  >

    <v-card
      max-height="none"
    >
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          Importa colonna
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="importColumnModal = false"
        ></v-btn>
      </v-card-title>

      <v-card-item
        class="overflow-y-auto"
        style="max-height: calc(100vh - 200px)"
      >

        <h3>
          Scegli un file
        </h3>
        <v-slide-group
          show-arrows
          @update:model-value="checkFielSelected"
        >
          <v-slide-group-item
            v-for="n in 40"
            :key="n"
            v-slot="{ isSelected, toggle }"
          >
            <v-card
              :color="isSelected ? 'primary' : 'grey-lighten-3'"
              elevation="0"
              :variant="isSelected ? 'tonal' : undefined"
              class="text-center ma-2 px-3 py-2"
              @click="toggle"
            >
              <v-icon
                icon="mdi-file-table-outline"
              >
              </v-icon>
              <div
                class="mt-2"
              >
                File {{ n }}
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>

        <div
          v-if="fileSelected"
          class="mt-6"
        >
          <h3>
            Colonne
          </h3>
          <v-row>

            <v-col
              cols="6"
            >
              <div>
                <div>
                  <v-checkbox
                    label="Importa tutte le colonne"
                    :model-value="true"
                    hide-details
                  >
                  </v-checkbox>
                </div>
                <div>
                  <v-select
                    item-title="description"
                    label="Della colonna di questo file"
                    item-value="value"
                    :items="columnsOriginalFile"
                    hide-details
                  >
                  </v-select>
                </div>
              </div>
            </v-col>

            <v-col
              cols="6"
            >
              <v-select
                item-title="description"
                item-value="value"
                :items="columnsSample"
                label="Seleziona una o più colonne da importare"
                multiple
                chips
                v-model="selectFormat"
                @update:model-value="checkColumnsSelected"
              ></v-select>
            </v-col>


          </v-row>
        </div>

        <div v-if="fileSelected && columnsSelected">
          <h3>
            Se nella riga
          </h3>
          <v-row
            class="mt-1"
            v-for="i in elementsCondition"
          >
            <v-col
              cols="3"
            >
              <v-select
                item-title="description"
                label="Della colonna di questo file"
                item-value="value"
                :items="columnsOriginalFile"
                hide-details
              >
              </v-select>
            </v-col>

            <v-col
              cols="3"
            >
              <v-select
                label="Corrisponde la condizione"
                item-title="description"
                item-value="value"
                :items="importIfConditions"
                hide-details
              >
              </v-select>
            </v-col>

            <v-col
              cols="3"
            >
              <v-select
                label="Della colonna del secondo file"
                item-title="description"
                item-value="value"
                :items="columnsSample"
                hide-details
              ></v-select>
            </v-col>
            <v-col
              cols="3"
            >
              <v-btn-primary
                text="Aggiungi Condizione"
                @click = "addCondition"
              >
              </v-btn-primary>
            </v-col>
          </v-row>
        </div>

        <!-- <v-form>

          <v-row
            class="align-center"
          >
            <v-col
              cols="12"
              md="4"
            >
              <v-label>
                Larghezza preview
              </v-label>
            </v-col>
            <v-col
              cols="12"
              md="8"
            >
              <v-text-field
                hide-details
                required
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row
            class="align-center"
          >
            <v-col
              cols="12"
              md="4"
            >
              <v-label>
                Altezza preview
              </v-label>
            </v-col>
            <v-col
              cols="12"
              md="8"
            >
              <v-text-field
                hide-details
                required
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row
            class="align-center"
          >
            <v-col
              cols="12"
              md="4"
            >
              <v-label>
                Formato della preview
              </v-label>
            </v-col>
            <v-col
              cols="12"
              md="8"
            >
              <v-select
                v-model="selectFormat"
                hide-details
                required
                :items="imageFormats"
                name="compression"
              >
              </v-select>
            </v-col>
          </v-row>

          <v-row
            class="align-center"
            v-if="selectFormat == 'png' "
          >
            <v-col
              cols="12"
              md="4"
            >
              <v-label>
                Compressione PNG
              </v-label>
            </v-col>
            <v-col
              cols="12"
              md="8"
            >
              <v-slider
                model-value="50"
                name="pngCompression"
                hide-details
              >
              </v-slider>
            </v-col>
          </v-row>

          <v-row
            class="align-center"
            v-if="selectFormat == 'jpg' "
          >
            <v-col
              cols="12"
              md="4"
            >
              <v-label>
                Compressione JPG
              </v-label>
            </v-col>
            <v-col
              cols="12"
              md="8"
            >
              <v-slider
                model-value="30"
                name="jpgCompression"
                hide-details
              >
              </v-slider>
            </v-col>
          </v-row>

          <v-row
            class="align-center"
            v-if="selectFormat == 'png' "
          >
            <v-col
              cols="12"
              md="4"
            >
              <v-label>
                Sfondo trasparente
              </v-label>
            </v-col>
            <v-col
              cols="12"
              md="8"
            >
              <v-checkbox
                name="pngAlpha"
                hide-details
              >
            </v-checkbox>
            </v-col>
          </v-row>

        </v-form> -->

      </v-card-item>

      <v-card-actions
        class="justify-start px-6 pb-4"
      >

        <v-btn-primary
          size="large"
          disabled
        >
          Salva
        </v-btn-primary>
      </v-card-actions>

    </v-card>

  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, reactive, useTemplateRef } from "vue";

  const columnSelected = ref(-1);

  const menu = ref(false);

  const cellFocused = ref("");

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

  function selectColumn(key: String | null, index: number) {
    menu.value = false;
    columnSelected.value = ( columnSelected.value == index ) ? -1 : index;
  }

  function removeColumn() {
    console.log(columnSelected.value);
    console.log(headerData[columnSelected.value].key);
  }

  function selectCell(key: String, value: String, r: number, c: number) {
    console.log(key, value, r, c);
    if (!cellFocused.value) {
      cellFocused.value = r+"-"+c;
      setTimeout(function() {
        document.getElementById("input-"+r+"-"+c)?.focus();
      }, 1);
    }
  }

  function blurInput() {
    cellFocused.value = "";
  }

  function saveCellData(v: string, id: number, r: number, c: number, key: string) {
    for(let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id == id) {
        item[key] = v;
        cellFocused.value = "";
        return;
      }
    }
  }

  const importColumnModal = ref(false);
  const openImportColumnModal = async ()=>{
    importColumnModal.value = true;
  }

  const columnsSample = ref([]);
  function genColumnsSample() {
    columnsSample.value = [
      {
        value: 0,
        description: "Colonna 0"
      },
      {
        value: 1,
        description: "Colonna 1"
      },
      {
        value: 2,
        description: "Colonna 2"
      },
      {
        value: 3,
        description: "Colonna 3"
      },
      {
        value: 4,
        description: "Colonna 4"
      },
      {
        value: 5,
        description: "Colonna 5"
      }
    ];

  }

  const columnsOriginalFile = ref([
    {
      value: 0,
      description: "File colonna 0"
    },
    {
      value: 1,
      description: "File colonna 1"
    },
    {
      value: 2,
      description: "File colonna 2"
    },
    {
      value: 3,
      description: "File colonna 3"
    },
    {
      value: 4,
      description: "File colonna 4"
    },
    {
      value: 5,
      description: "File colonna 5"
    }
  ]);

  const importIfConditions = ref([
    {
      value: 0,
      description: "Uguale a",
    },
    {
      value: 1,
      description: "E' contenuto in",
    },
    {
      value: 2,
      description: "E' la parte iniziale di",
    },
    {
      value: 3,
      description: "E' la parte finale di",
    },
  ]);

  const selectFormat = ref(0);

  const fileSelected = ref(false);
  function checkFielSelected(v: number | undefined) {
    selectFormat.value=undefined;
    fileSelected.value = false;
    elementsCondition.value = 1;
    columnsSample.value = [];
    genColumnsSample();
    fileSelected.value = (v !== undefined) ? true : false;
    columnsSelected.value = false;
  }


  const columnsSelected = ref(false);
  function checkColumnsSelected(values: Array<number>) {
    columnsSelected.value = (values.length > 0 );
  }

  const elementsCondition = ref(1);
  function addCondition() {
    elementsCondition.value ++;
  }

</script>

<style scoped>
  td {
    position: relative;
  }

  td>div {
    position: relative;
    z-index: 1;
  }
  td.selected:before {
    position: absolute;
    content: " ";
    background: rgba(223,225,189,0.2);
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 0;
  }
</style>
