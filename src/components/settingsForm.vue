<template>
  <v-card-item
    :class=" modal ? 'overflow-y-auto' : 'px-0'"
    :style="modal ? 'max-height: calc(100vh - 200px)' : undefined"
  >
    <v-form
      ref="formSettings"
    >
      <h2
        v-if="!modal"
      >
        Conversione
      </h2>
      <v-row
        dense
        align="center"
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
          <v-number-input
            name="previewWidth"
            :min="40"
            :step="10"
            hide-details
            required
            :model-value="projectSettings.previewWidth || 400"
          ></v-number-input>
        </v-col>
      </v-row>

      <v-row
        dense
        align="center"
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
          <v-number-input
            name="previewHeight"
            :min="40"
            :step="10"
            hide-details
            required
            :model-value="projectSettings.previewHeight || 300"
          ></v-number-input>
        </v-col>
      </v-row>

      <v-row
        dense
        align="center"
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
            v-model="selectImageFormat"
            hide-details
            required
            :items="imageFormats"
            name="previewFormat"
          >
          </v-select>
        </v-col>
      </v-row>

      <v-row
        dense
        align="center"
        v-if="selectImageFormat == 'jpg' "
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Qualità JPG
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-slider
            name="jpgQuality"
            hide-details
            thumb-label="always"
            :model-value="projectSettings.jpgQuality || 100"
          >
          </v-slider>
        </v-col>
      </v-row>

      <v-row
        dense
        align="center"
        v-if="selectImageFormat == 'png' "
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
            name="pngCompression"
            hide-details
            thumb-label="always"
            :model-value="projectSettings.pngCompression || 15"
          >
          </v-slider>
        </v-col>
      </v-row>

      <v-row
        dense
        align="center"
        v-if="selectImageFormat == 'png' "
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
            density="compact"
            hide-details
            :model-value="projectSettings.alphaBackground || 15"
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row
        dense
        align="center"
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Colore sfondo preview
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <input
            name="previewBackgroundColor"
            class="border"
            type="color"
            :value="projectSettings.previewBackgroundColor || ''"
          />
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Sfondo hdr
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <div class="ds-button-with-icon d-flex">
            <input
              class="border"
              type="file"
              accept=".hdr"
              name="hdrFile"
            />

            <v-btn
              size="xsmall"
              color="secondary"
              rounded="ts-0 bs-0 te-pill be-pill"
              elevation="4"
              icon
              v-if="projectSettings.hdrFileReady"
              @click="clearHdrFile"
            >
              <v-icon size="small" icon="mdi-delete-outline px-5"></v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            File delle regole
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
        <div class="ds-button-with-icon d-flex">
            <input
              class="border"
              type="file"
              accept=".json"
              name="jsonFile"
            />

            <v-btn
              size="xsmall"
              color="secondary"
              rounded="ts-0 bs-0 te-pill be-pill"
              elevation="4"
              icon
              v-if="projectSettings.jsonRulesFileReady"
              @click="clearJSONRulesFile"
            >
              <v-icon size="small" icon="mdi-delete-outline px-5"></v-icon>
            </v-btn>
          </div>

        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Angolo di vista della preview
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-select
            id="ds-angle-preview"
            v-model="selectAngleFormat"
            hide-details
            required
            :items="angleFormats"
            name="previewAngle"
            @update:model-value="changeAngle"
          >
          </v-select>
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Angolo della preview
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <div>
            <v-number-input
              name="angleFormatX"
              :min="0"
              :step="1"
              :model-value="selectObjectAngleFormat.coords[0]"
              hide-details
            >
              <template v-slot:append>
                X
              </template>
            </v-number-input>
          </div>

          <div class="mt-2">
            <v-number-input
              name="angleFormatY"
              :min="0"
              :step="1"
              :model-value="selectObjectAngleFormat.coords[1]"
              hide-details
            >
              <template v-slot:append>
                Y
              </template>
            </v-number-input>
          </div>

          <div class="mt-2">
            <v-number-input
              :min="0"
              :step="1"
              name="angleFormatZ"
              :model-value="selectObjectAngleFormat.coords[2]"
              hide-details
            >
              <template v-slot:append>
                Z
              </template>
            </v-number-input>
          </div>

        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Preview in alta qualità
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            name="highQualityPreview"
            density="compact"
            hide-details
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Mantieni dimensioni originali
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            name="originalSize"
            density="compact"
            hide-details
            v-model="originalSize"
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row
        v-if="!originalSize"
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Dimensione massima import
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            name="maxImportSize"
            model-value="2"
            hide-details
          >
            <template v-slot:append>
              m
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Includi oggetti nascosti
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            name="includeHiddenObjects"
            density="compact"
            hide-details
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Esegui lo split di tutto il modello
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            name="splitAllLevels"
            density="compact"
            hide-details
            v-model="splitAllLevels"
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row
        v-if="!splitAllLevels"
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Livello massimo di split
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            name="maxLevelSplit"
            model-value="4"
            hide-details
          >
            <template v-slot:append>
              m
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Applica divisore spigoli
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            name="divisorApply"
            density="compact"
            hide-details
          >
          </v-checkbox>
        </v-col>
      </v-row>


      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Usa compressione Draco
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            v-model="useDracoCompression"
            name="dracoCompression"
            density="compact"
            hide-details
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row
        dense
        align="center"
        v-if="useDracoCompression "
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Livello di compressione Draco
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-slider
            name="dracoCompressionLevel"
            hide-details
            :max=10
            thumb-label="always"
            :model-value="projectSettings.dracoCompressionLevel || 6"
          >
          </v-slider>
        </v-col>
      </v-row>

      <v-divider
        class="mt-4 mb-8"
        v-if="!modal"
      ></v-divider>
      <h2
        v-if="!modal"
      >
        Visualizzatore
      </h2>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Abilita collisioni camera
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            name="enableCameraCollision"
            density="compact"
            hide-details
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Apri albero all'avvio
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            name="startTreeOpen"
            density="compact"
            hide-details
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row
        align="center"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Evidenzia metadati
          </v-label>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-row
            align="center"
            dense
            v-for="i in 3"
            :key="i"
          >
            <v-col
              cols="4"
            >
              <v-text-field
                :name="`highlightMetadata-name-${i}`"
                hide-details
              >
              </v-text-field>
            </v-col>


            <v-col
              cols="4"
            >
              <v-text-field
                :name="`highlightMetadata-value-${i}`"
                density="compact"
                hide-details
              >
              </v-text-field>
            </v-col>

            <v-col
              cols="2"
            >
              <input
                :name="`highlightMetadata-color-${i}`"
                class="border w-100"
                type="color"
              />
            </v-col>

            <v-col
              cols="2"
            >
              <v-btn
                v-if="i < 3"
                color="error"
                icon="mdi-trash-can-outline"
                size="small"
              >
              </v-btn>

              <v-btn
                v-else
                color="secondary"
                icon="mdi-plus"
                size="small"
              >
              </v-btn>

            </v-col>

          </v-row>
        </v-col>

      </v-row>

      <v-row
        align="center"
        v-if="modal"
        dense
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-label>
            Importa metadati
          </v-label>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-checkbox
            name="importMetadata"
            density="compact"
            hide-details
            v-model=projectSettings.importMetadata
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <div
        v-if="projectSettings.importMetadata || !modal"
      >

        <v-divider
          class="mt-4 mb-8"
          v-if="!modal"
        ></v-divider>
        <h2
          v-if="!modal"
        >
          Metadati
        </h2>

        <h3
          class="mb-3 mt-5"
        >
          Whitelist
          <v-tooltip
            activator="previous"
            location="top"
            text="Lista dei metadati da esportare"
          >
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                color="grey-lighten-1"
                size="xsmall"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
          </v-tooltip>
        </h3>

        <v-row
          align="center"
          dense
          v-for="i in 2"
        >
          <v-col
            cols="12"
          >
            <div class="ds-button-with-icon d-flex">
              <v-text-field
                :name="`whitelist-${i}`"
                hide-details
                rounded="te-0 be-0"
                placeholder="bal ablab ss"
              >
              </v-text-field>
              <v-btn
                size="small"
                :color="i < 2 ? 'error' : 'secondary'"
                rounded="ts-0 bs-0 te-pill be-pill"
                icon
              >
                <v-icon
                  :icon="i < 2 ? 'mdi-trash-can-outline' : 'mdi-plus'"
                ></v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <h3
          class="mb-3 mt-5"
        >
          Backlist
          <v-tooltip
            activator="previous"
            location="top"
            text="Lista dei metadati da non esportare"
          >
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                color="grey-lighten-1"
                size="xsmall"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
          </v-tooltip>
        </h3>

        <v-row
          align="center"
          dense
          v-for="i in 1"
        >
          <v-col
            cols="12"
          >
            <div class="ds-button-with-icon d-flex">
              <v-text-field
                :name="`blacklist-${i}`"
                hide-details
                rounded="te-0 be-0"
                placeholder="bal ablab ss"
              >
              </v-text-field>
              <v-btn
                size="small"
                :color="i < 1 ? 'error' : 'secondary'"
                rounded="ts-0 bs-0 te-pill be-pill"
                icon
              >
                <v-icon
                  :icon="i < 1 ? 'mdi-trash-can-outline' : 'mdi-plus'"
                ></v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <h3
          class="mb-3 mt-5"
        >
          Necessari
          <v-tooltip
            activator="previous"
            location="top"
            text="Lista dei metadati necessari"
          >
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                color="grey-lighten-1"
                size="xsmall"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
          </v-tooltip>
        </h3>

        <v-row
          align="center"
          dense
          v-for="i in 1"
        >
          <v-col
            cols="12"
          >
            <div class="ds-button-with-icon d-flex">
              <v-text-field
                :name="`necessari-${i}`"
                hide-details
                rounded="te-0 be-0"
                placeholder="bal ablab ss"
              >
              </v-text-field>
              <v-btn
                size="small"
                :color="i < 1 ? 'error' : 'secondary'"
                rounded="ts-0 bs-0 te-pill be-pill"
                icon
              >
                <v-icon
                  :icon="i < 1 ? 'mdi-trash-can-outline' : 'mdi-plus'"
                ></v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>


        <h3
          class="mb-3 mt-5"
        >
          Richiesti
          <v-tooltip
            activator="previous"
            location="top"
            text="Lista dei metadati necessari"
          >
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                color="grey-lighten-1"
                size="xsmall"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
          </v-tooltip>
        </h3>

        <v-row
          align="center"
          dense
          v-for="i in 1"
        >
          <v-col
            cols="12"
          >
            <div class="ds-button-with-icon d-flex">
              <v-text-field
                :name="`required-${i}`"
                hide-details
                rounded="te-0 be-0"
                placeholder="bal ablab ss"
              >
              </v-text-field>
              <v-btn
                size="small"
                :color="i < 1 ? 'error' : 'secondary'"
                rounded="ts-0 bs-0 te-pill be-pill"
                icon
              >
                <v-icon
                  :icon="i < 1 ? 'mdi-trash-can-outline' : 'mdi-plus'"
                ></v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>



        <h3
          class="mb-3 mt-5"
        >
          Metadati chiave
          <v-tooltip
            activator="previous"
            location="top"
            text="Lista dei metadati necessari"
          >
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                color="grey-lighten-1"
                size="xsmall"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
          </v-tooltip>
        </h3>

        <v-row
          align="center"
          dense
          v-for="i in 1"
        >
          <v-col
            cols="12"
          >
            <div class="ds-button-with-icon d-flex">
              <v-text-field
                :name="`keyMetadata-${i}`"
                hide-details
                rounded="te-0 be-0"
                placeholder="bal ablab ss"
              >
              </v-text-field>
              <v-btn
                size="small"
                :color="i < 1 ? 'error' : 'secondary'"
                rounded="ts-0 bs-0 te-pill be-pill"
                icon
              >
                <v-icon
                  :icon="i < 1 ? 'mdi-trash-can-outline' : 'mdi-plus'"
                ></v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>

      </div>

    </v-form>
  </v-card-item>

  <v-card-actions
    class="justify-start pb-4"
    :class=" modal ? 'px-6' : 'px-0'"
  >

    <v-btn-primary
      size="large"
      @click="saveSettings"
    >
      Salva
    </v-btn-primary>
  </v-card-actions>

</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from "vue";

  const props = defineProps({
    projectId: { type: [Number, null], default: null, required: false},
    modal: { type: Boolean, default: false}
  });

  const { projectId } = toRefs(props);

  const projectSettings = ref({
    previewWidth: 400,
    previewHeight: 300,
    previewFormat: "jpg",
    pngCompression: 50,
    jpgQuality: 100,
    alphaBackground: true,
    previewBackgroundColor: "#ff0000",
    hdrFileReady: true,
    jsonRulesFileReady: false,
    angleFormat: "iso",
    splitAllLevels: false,
    useDracoCompression: true,
    dracoCompressionLevel: 6,
    importMetadata: true
  });

  const originalSize = ref(true);
  const selectAngleFormat = ref("iso");

  const selectImageFormat = ref("jpg");
  const imageFormats = [
    {
      value: "png",
      title: "Png"
    },
    {
      value: "jpg",
      title: "Jpg"
    },
  ];

  const angleFormats = [
    {
      value: "iso",
      title: "Iso",
      coords: [60,0,45]
    },
    {
      value: "front",
      title: "Back",
      coords: [90,0,180]
    },
  ];


  const splitAllLevels = ref(true);
  const useDracoCompression = ref(true);

  watch(projectId, async (id, oldId) => {
    console.log(id);
    if (id) {

      projectSettings.value = {
        previewWidth: 400,
        previewHeight: 200,
        previewFormat: "png",
        pngCompression: 50,
        jpgQuality: 100,
        alphaBackground: true,
        previewBackgroundColor: "#ff0000",
        hdrFileReady: true,
        jsonRulesFileReady: false,
        angleFormat: "back",
        splitAllLevels: false,
        useDracoCompression: true,
        dracoCompressionLevel: 5,
        importMetadata: true
      };

      selectImageFormat.value = projectSettings.value.previewFormat || "jpg";
      selectAngleFormat.value = projectSettings.value.previewFormat || "iso";
      splitAllLevels.value = projectSettings.value.splitAllLevels || false;
      useDracoCompression.value = projectSettings.value.useDracoCompression || true;
    }
  });


  const selectObjectAngleFormat = ref(angleFormats[0]);

  function changeAngle(v: string) {
    for ( let i = 0; i < angleFormats.length; i++) {
      if (angleFormats[i].value == v) selectObjectAngleFormat.value = angleFormats[i];
    }
  }


  function clearHdrFile() {
    console.log("clear");
  }

  function clearJSONRulesFile() {
    console.log("asdf");
  }

  const formSettings: any = ref(null);
  async function saveSettings() {
    // console.log(formSettings.value.$el);
    let formData = new FormData(formSettings.value.$el);
    // for (const [key, value] of formData) {
    //   // console.log(value);
    //   // console.log(`${key}: ${value}`);
    // }
    // if (formSettings.value) {
    //   for( let i = 0; i < formSettings.value.length; i++) {
    //     const element = formSettings.value[i];
    //     if (element.name) {
    //       // console.log(element.name+" - "+element.value);
    //     }
    //   }

    //   // for( let key in formSettings.value.items) {
    //   //   console.log(formSettings.value.items[key]);
    //   // }
    //   // console.log(Object.keys(formSettings.value));
    // }

    emit('save', formData, projectId.value);

  }

  const emit = defineEmits(["save"]);
</script>
