<template>
  <v-dialog
    v-model="settingsModalIsOpen"
    width="80%"
    max-width="800"
    scrollable
    max-height="none"
    @after-leave="$emit('close')"
  >

    <v-card
      max-height="none"
    >
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          Impostazioni
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="settingsModalIsOpen = false"
        ></v-btn>
      </v-card-title>

      <v-card-item
        class="overflow-y-auto"
        style="max-height: calc(100vh - 200px)"
      >
        <v-form
          ref="formSettings"
        >
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

        </v-form>

      </v-card-item>

      <v-card-actions
        class="justify-start px-6 pb-4"
      >

        <v-btn-primary
          size="large"
          @click="saveSettings"
        >
          Salva
        </v-btn-primary>
      </v-card-actions>

    </v-card>

  </v-dialog>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from "vue";

  const props = defineProps({
    isOpen: { type: Boolean, default: false, required: true },
    projectId: { type: Number || null, default: null, required: false}
  });

  const { isOpen, projectId } = toRefs(props);
  const settingsModalIsOpen = ref(isOpen.value);

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
    dracoCompressionLevel: 6
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

  watch(isOpen, (newVal, oldVal) => {
    if (newVal) {
      settingsModalIsOpen.value = true;
    } else {
      settingsModalIsOpen.value = false;
    }
  });

  watch(projectId, async (id, oldId) => {
    if (id) {
      console.log(id);

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
        dracoCompressionLevel: 5
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

  const formSettings = ref(null);
  async function saveSettings() {
    console.log(formSettings.value.items);
    const form: any = formSettings.value;
    for( let i = 0; i < formSettings.value.length; i++) {
      console.log(formSettings.value[i].name+" - "+formSettings.value[i].value);
    }

    // for( let key in formSettings.value.items) {
    //   console.log(formSettings.value.items[key]);
    // }
    // console.log(Object.keys(formSettings.value));

  }

  const emit = defineEmits(["close"]);
</script>
