<template>
  <v-dialog
    width="60%"
    max-width="80%"
    max-height="700"
    min-width="400"
    v-model="previewProjectModalIsOpen"
    @after-leave="$emit('close')"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          {{ projectData.raw.title }}
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="previewProjectModalIsOpen = false"
        ></v-btn>
      </v-card-title>

      <v-card-item>
        <v-row>
          <v-col
            cols="12"
            lg="6"
          >
            <img src="../assets/asap2.svg" style="max-width: 100%; width: 400px">
          </v-col>
          <v-divider vertical></v-divider>
          <v-col
            cols="12"
            lg="6"
          >
            <div class="px-4">
              <div class="mb-3">
                Ultimo aggiornamento: <b>18/12/2024, 09:34:57</b>
              </div>
              <div class="mb-3">
                Data di creazione: <b>18/12/2024, 09:34:46</b>
              </div>

              <div class="text-center mt-10">
                <div class="mb-4">
                  <v-btn-primary
                    class="w-50"
                    size="large"
                  >
                    Apri
                  </v-btn-primary>
                </div>

                <div class="mb-4">
                  <v-btn-secondary
                    class="w-50"
                    size="large"
                  >
                    Conversione
                  </v-btn-secondary>
                </div>

              </div>

              <v-row
                class="align-center"
              >

                <v-col
                  cols="12"
                  lg="6"
                  class="text-center"
                >
                  <v-btn
                    class="w-100"
                    variant="outlined"
                    prepend-icon="mdi-cog-outline"
                    color="primary"
                    @click="$emit('openSettings', projectData)"
                  >
                    Impostazioni
                  </v-btn>
                </v-col>

                <v-col
                  cols="12"
                  lg="6"
                  class="text-center"
                >
                  <v-checkbox
                    :model-value="true"
                    label="Applica regole"
                    hide-details
                  ></v-checkbox>
                </v-col>

              </v-row>

              <v-row>

                <v-col
                  cols="12"
                  lg="6"
                  class="text-center"
                >

                  <v-btn
                    class="w-100"
                    variant="outlined"
                    prepend-icon="mdi-pencil-outline"
                    color="primary"
                    @click="$emit('openRename', projectData.raw)"
                  >
                    Rinomina
                  </v-btn>
                </v-col>

                <v-col
                  cols="12"
                  lg="6"
                  class="text-center"
                >
                  <v-btn
                    class="w-100"
                    variant="outlined"
                    prepend-icon="mdi-trash-can-outline"
                    color="primary"
                    @click="$emit('openSettings', projectData)"
                  >
                    Rimuovi
                  </v-btn>

                </v-col>

              </v-row>

            </div>

          </v-col>
        </v-row>


      </v-card-item>

    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from "vue";

  const props = defineProps({
    isOpen: { type: Boolean, default: false },
    projectData: {
      type: Object,
      required: true,
    },
  });

  const { isOpen, projectData } = toRefs(props);
  const previewProjectModalIsOpen = ref(false);

  watch(isOpen, (newVal, oldVal) => {
    if (newVal) {
      previewProjectModalIsOpen.value = true;
    } else {
      previewProjectModalIsOpen.value = false;
    }
  });

  function checAAA() {
    console.log("asdf");
  }

  const emit = defineEmits(["close", "openSettings", "openRename"]);
</script>
