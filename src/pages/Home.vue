
<template>
  <v-data-iterator
    :items="games"
    :items-per-page="12"
    :search="search"
    class="pt-6"
  >
    <!-- <template v-slot:header>
      <v-toolbar class="px-2">
        <v-text-field
          v-model="search"
          density="comfortable"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          style="max-width: 300px;"
          variant="solo"
          clearable
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template> -->

    <template v-slot:header>
      <v-container fluid>

        <v-row
          align="center"
        >
          <v-col>
            <h1>
              {{ $t('projects') }}
            </h1>
          </v-col>
          <v-spacer></v-spacer>
          <v-col
            cols="12"
            xl="4"
            lg="6"
          >
            <div class="ds-button-with-icon d-flex">
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
                <!-- <template v-slot:append-inner>
                  <v-btn
                    class="mr-n2"
                    color="secondary"
                  >
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template> -->
              </v-text-field>
              <v-btn
                size="small"
                color="secondary"
                rounded="ts-0 bs-0 te-pill be-pill"
                elevation="4"
                icon
              >
                <v-icon size="x-large" icon="mdi-menu-down"></v-icon>

                <v-menu
                  activator="parent"
                  location="bottom end"
                  transition="fade-transition"
                  width="400"
                  :close-on-content-click="false"
                >
                  <v-card>
                    <v-card-title>
                      Ricerca avanzata
                    </v-card-title>
                    <v-card-item>
                      <v-text-field
                        v-model="search"
                        label="Inserisci nome del file o del progetto"
                        hide-details
                        single-line
                        rounded="lg"
                      >
                      </v-text-field>
                      <v-divider class="mt-4"></v-divider>
                      <v-label
                        class="mt-4"
                      >
                        Cerca per data di caricamento:
                      </v-label>

                      <div class="d-flex justify-center">
                        <v-date-input
                          v-model="modelDateUpload"
                          placeholder=""
                          hide-details
                          prepend-icon=""
                          max-width="100%"
                          multiple="range"
                          rounded="lg"
                        ></v-date-input>
                      </div>

                      <v-divider class="mt-4"></v-divider>
                      <v-label
                        class="mt-4"
                      >
                        Cerca per data ultimo aggiornamento:
                      </v-label>

                      <div class="d-flex justify-center">
                        <v-date-input
                          v-model="modelDateUpdate"
                          placeholder=""
                          hide-details
                          prepend-icon=""
                          max-width="100%"
                          multiple="range"
                          rounded="lg"
                        ></v-date-input>
                      </div>

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
              </v-btn>
            </div>

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
              v-if="!item.raw.icon"
              border
              flat
              @click="openProjectPreview(item)"
              height="250"

            >

              <!-- <v-toolbar
                density="compact"
                dark=true
              >
                <v-toolbar-title>{{ item.raw.title }}</v-toolbar-title>
                <v-spacer></v-spacer>

                <v-menu
                  location="bottom end"
                  elevation="2"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      @click.native.stop.prevent
                      icon="mdi-dots-vertical"
                      variant="text"
                      v-bind="props"
                    >
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-subheader>Opzioni</v-list-subheader>
                    <v-divider></v-divider>

                    <v-dialog
                      max-width="400"
                    >
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-list-item
                          value="1"
                          title="Rinomina"
                          v-bind="activatorProps"
                          @click.native.stop.prevent
                        >
                          <template v-slot:prepend>
                            <v-icon
                              size="small"
                              icon="mdi-pencil-outline"
                            ></v-icon>
                          </template>
                        </v-list-item>
                      </template>

                      <template v-slot:default="{ isActive }">
                        <v-card>
                          <v-card-title class="d-flex justify-space-between align-center">
                            <div class="text-h5 text-medium-emphasis ps-2">
                              Rinomina progetto
                            </div>
                            <v-btn
                              icon="mdi-close"
                              variant="text"
                              @click="isActive.value = false"
                            ></v-btn>
                          </v-card-title>

                          <v-card-item>

                            <v-text-field
                              label="Nuovo nome del progetto"
                              hide-details
                              single-line
                            >
                            </v-text-field>

                          </v-card-item>

                          <v-card-actions
                            class="justify-start px-6 pb-4"
                          >
                          <v-btn-primary>
                              Rinomina
                          </v-btn-primary>
                          </v-card-actions>

                        </v-card>
                      </template>

                    </v-dialog>

                    <v-dialog
                      max-width="400"
                    >
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-list-item
                          value="2"
                          title="Rimuovi"
                          v-bind="activatorProps"
                          @click.native.stop.prevent
                        >
                          <template v-slot:prepend>
                            <v-icon
                              size="small"
                              icon="mdi-delete-outline"
                            ></v-icon>
                          </template>
                        </v-list-item>
                      </template>

                      <template v-slot:default="{ isActive }">
                        <v-card>
                          <v-card-title class="d-flex justify-space-between align-center">
                            <div class="text-h5 text-medium-emphasis ps-2">
                              Rimuovi progetto
                            </div>
                            <v-btn
                              icon="mdi-close"
                              variant="text"
                              @click="isActive.value = false"
                            ></v-btn>
                          </v-card-title>

                          <v-card-item>

                            <v-text-field
                              label="Nuovo nome del progetto"
                              hide-details
                              single-line
                            >
                            </v-text-field>

                          </v-card-item>

                          <v-card-actions
                            class="justify-start px-6 pb-4"
                          >
                          <v-btn-primary>
                              Rimuovi
                          </v-btn-primary>
                          </v-card-actions>

                        </v-card>
                      </template>

                    </v-dialog>

                  </v-list>
                </v-menu>
              </v-toolbar> -->

              <v-card-item>

                <v-card-title
                  class="d-flex align-center"
                >
                  {{ item.raw.title }}

                  <v-spacer></v-spacer>

                  <v-menu
                    contained
                    location="bottom end"
                    elevation="2"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        @click.native.stop.prevent
                        icon="mdi-dots-vertical" variant="text" v-bind="props">
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-subheader>Opzioni</v-list-subheader>
                      <v-divider></v-divider>

                      <v-list-item
                        value="1"
                        title="Rinomina"
                        @click.native.stop.prevent
                        @click="openEditModal(item.raw);"
                      >
                        <template v-slot:prepend>
                          <v-icon
                            size="small"
                            icon="mdi-pencil-outline"
                          ></v-icon>
                        </template>
                      </v-list-item>

                      <v-dialog
                        max-width="400"
                      >
                        <template v-slot:activator="{ props: activatorProps }">
                          <v-list-item
                            value="2"
                            title="Rimuovi"
                            v-bind="activatorProps"
                            @click.native.stop.prevent
                          >
                            <template v-slot:prepend>
                              <v-icon
                                size="small"
                                icon="mdi-delete-outline"
                              ></v-icon>
                            </template>
                          </v-list-item>
                        </template>

                        <template v-slot:default="{ isActive }">
                          <v-card>
                            <v-card-title class="d-flex justify-space-between align-center">
                              <div class="text-h5 text-medium-emphasis ps-2">
                                Rimuovi progetto
                              </div>
                              <v-btn
                                icon="mdi-close"
                                variant="text"
                                @click="isActive.value = false"
                              ></v-btn>
                            </v-card-title>

                            <v-card-item>

                              Sei sicuro di voler rimuovere questo progetto?

                            </v-card-item>

                            <v-card-actions
                              class="justify-start px-6 pb-4"
                            >
                            <v-btn-primary>
                                Rimuovi
                            </v-btn-primary>
                            </v-card-actions>

                          </v-card>
                        </template>

                      </v-dialog>

                    </v-list>
                  </v-menu>

                </v-card-title>
                <div class="overflow-hidden" style="max-height: 160px;">
                  <v-img :src="item.raw.img" style="max-width: 100%; min-height: 160px;"></v-img>
                </div>
              </v-card-item>

            </v-card>

            <v-card
              v-else
              @click="openNewProjectModal"
              id="ds-add-file"
              border
              flat
              class="ds-upload-project pb-4 position-relative"
              height="250"
            >
              <v-card-item
                align="center"
                style="height: 100%"
              >

                <v-icon
                  color="primary"
                  class="text-h2"
                  size="large"
                  icon="mdi-file-upload"
                  style="height: 100px"
                >
                </v-icon>

                <v-card-title
                  class="text-center text-primary"
                >
                  Carica un nuovo modello
                </v-card-title>
              </v-card-item>
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
          show-first-last-page
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

  <v-snackbar
    v-model="snackbarPrimary"
    timeout="3000"
    multi-line
    color="warning"
  >
    Notifica generale Notifica generale Notifica generale Notifica generale Notifica generale Notifica generale Notifica generale Notifica generale Notifica generale Notifica generale

    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="snackbarPrimary = false"
      >
      <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>


  <!-- <SettingsModal
    :isOpen="settingsModalIsOpen"
    @close="settingsModalIsOpen = false"
    :projectId="projectSettingsId"
  ></SettingsModal> -->

  <CreateProjectModal
    :isOpen="newProjectModalIsOpen"
    @close="newProjectModalIsOpen = false"
    @open-settings = "openSettingsModal"
  ></CreateProjectModal>

  <PreviewProjectModal
    :isOpen="previewProjectModalIsOpen"
    :projectData="previewProjectData"
    @close="previewProjectModalIsOpen = false"
    @open-settings = "openSettingsModal"
    @open-rename = "openEditModal"
  ></PreviewProjectModal>

  <v-dialog
    width="80%"
    max-width="800"
    scrollable
    max-height="none"
    v-model="settingsModalIsOpen"
  >
    <v-card>
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


      <SettingsForm
        :projectId="projectSettingsId"
        :modal=true
        @save="saveSettings"
      >
      </SettingsForm>
    </v-card>
  </v-dialog>

  <v-dialog
    max-width="400"
    v-model="editFileDescriptionIsOpen"
  >
    <v-form
      @submit.prevent="renameFile()"
    >
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            Rinomina file
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="editFileDescriptionIsOpen = false"
          ></v-btn>
        </v-card-title>

        <v-card-item class="pb-0">

          <v-text-field
            label="Nuova descrizione"
            single-line
            v-model="updateFileDescription"
            :rules="notEmpty"
            name="newDescription"
          >
          </v-text-field>

        </v-card-item>

        <v-card-actions
          class="justify-start px-6 pb-4"
        >
          <v-btn-primary
            :disabled="updateFileDescription ? false : true"
            type="submit"
          >
            Rinomina file
          </v-btn-primary>
        </v-card-actions>

      </v-card>
    </v-form>

  </v-dialog>

</template>

<script setup lang="ts">
  import { ref, shallowRef, onMounted, onUnmounted } from "vue";
  import CreateProjectModal from "../components/createProjectModal.vue"
  import PreviewProjectModal from "../components/previewProjectModal.vue"
  // import SettingsModal from "../components/settingsModal.vue"
  import SettingsForm from "../components/settingsForm.vue"

  const modelDateUpload = ref(null);
  const modelDateUpdate = ref(null);

  const snackbarPrimary = ref(false);

  const search = shallowRef('');

  const games = [
  {
      icon: 'mdi-file-upload',
      title: '',
    },
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

  // function toggleTheme() {
  //   theme.global.name.value = darkMode.value ? "desysThemeDark" : "desysThemeLight";
  // }

  const newProjectModalIsOpen = ref(false);
  const openNewProjectModal = async ()=>{
    newProjectModalIsOpen.value = true;
  }

  // const closeCreateModal = async ()=>{
  //   console.log("close");
  //   newProjectModalIsOpen.value = false;
  // }

  const openOnDrag = (event: any) => {
    if (!newProjectModalIsOpen.value) {
      newProjectModalIsOpen.value = true;
    }
  };

  onMounted(() => {
    document.getElementById("ds-add-file")?.addEventListener("dragenter", openOnDrag);
  });

  onUnmounted(() => {
    document.getElementById("ds-add-file")?.removeEventListener("dragenter", openOnDrag);
  });

  // const isPreviewModalVisible = ref(false);

  // const modelName = ref(null);

  // function showPreview(item: any) {
  //   isPreviewModalVisible.value = true;
  //   modelName.value = item.raw.title;
  // }

  // function closePreviewModal() {
  //   isPreviewModalVisible.value = false;
  // }

  const previewProjectModalIsOpen = ref(false);
  const previewProjectData = ref({});

  const openProjectPreview = (project: any) => {
    previewProjectModalIsOpen.value = true;
    previewProjectData.value = project;
  };

  // controllo campo non vuoto, da migliorare, magari da mettere in un file separato in modo da poter essere riusato
  const notEmpty = [
    (value: string) => {
      if (value) return true

      return 'Field is required.'
    }
  ];

  const editFileDescriptionIsOpen = ref(false);
  const updateFileDescription = ref("");
  const updateFileId = ref("");

  function openEditModal(item: any) {
    console.log(item);
    updateFileDescription.value = item.title || "";
    updateFileId.value = item.id;
    editFileDescriptionIsOpen.value = true;
  }

  async function renameFile() {
    console.log("rename");
  }

  const settingsModalIsOpen = ref(false);
  const projectSettingsId = ref<number | null>(null);

  async function openSettingsModal(data: any) {
    if(data && data.value) {
      projectSettingsId.value = data.value;

    } else {
      projectSettingsId.value = null;
    }
    settingsModalIsOpen.value = true;
  }

  async function saveSettings(data: FormData, projectId: number | null) {
    console.log(projectId);
    for (const [key, value] of data) {
      // console.log(value);
      console.log(`${key}: ${value}`);
    }
  }
</script>
