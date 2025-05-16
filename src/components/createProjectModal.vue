<template>
  <v-dialog
    v-model="newProjectModalIsOpen"
    @after-leave="$emit('close')"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">
          Crea un progetto
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="newProjectModalIsOpen = false"
        ></v-btn>
      </v-card-title>
      <v-list
        class="pa-4"
      >
        <v-file-input
          style="height: 100px"
          v-model="files"
          show-size
          prepend-icon=""
          accept=".glb, .fbx"
          label="Scegli un file o trascinalo qui (.glb, .fbx)"
          placeholder="Select your files"
        >

        </v-file-input>

        <v-text-field
          hint="example of helper text only on focus"
          label="Nome progetto"
        ></v-text-field>

      </v-list>

      <v-card-actions class="justify-end align-center px-4">

        <v-btn
          variant="outlined"
          color="primary"
          @click="$emit('openSettings')"
        >
          Impostazioni
        </v-btn>


        <v-checkbox
          :model-value="true"
          label="Applica regole"
          hide-details
        >
        </v-checkbox>

        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          variant="flat"
        >
          Carica
        </v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, toRefs, watch, Ref, reactive } from "vue";

  const props = defineProps({
    isOpen: { type: Boolean, default: false },
  });

  const { isOpen } = toRefs(props);
  const newProjectModalIsOpen = ref(isOpen.value);

  watch(isOpen, (newVal, oldVal) => {
    if (newVal) {
      newProjectModalIsOpen.value = true;
    } else {
      newProjectModalIsOpen.value = false;
    }
  });

  const files = ref([]);

  const emit = defineEmits(["close", "openSettings"]);
</script>