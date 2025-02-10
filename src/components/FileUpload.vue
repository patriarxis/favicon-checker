<template>
  <div class="file-container">
    <div class="file-upload">
      <input
        class="file-upload-input"
        type="text"
        :value="selectedFileName"
        placeholder="Click to add your favicon"
        readonly
        @click="$refs.fileInput.click()"
      />

      <button
        class="button clear-button"
        @click="handleClear"
        v-if="modelValue"
      >
        <svg viewBox="0 0 24 24" width="512" height="512">
          <path
            d="M16,8a1,1,0,0,0-1.414,0L12,10.586,9.414,8A1,1,0,0,0,8,9.414L10.586,12,8,14.586A1,1,0,0,0,9.414,16L12,13.414,14.586,16A1,1,0,0,0,16,14.586L13.414,12,16,9.414A1,1,0,0,0,16,8Z"
          />
          <path
            d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"
          />
        </svg>
      </button>

      <button class="button upload-button" @click="$refs.fileInput.click()">
        Add Favicon
      </button>

      <input
        ref="fileInput"
        type="file"
        accept=".ico,.png"
        class="hidden-input"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const fileInput = ref(null);
const props = defineProps({
  modelValue: {
    type: File,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "clear"]);

const selectedFileName = computed(() =>
  props.modelValue ? props.modelValue.name : ""
);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    emit("update:modelValue", file);
    fileInput.value.value = "";
  }
};

const handleClear = () => {
  emit("clear");
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
</script>

<style scoped>
.file-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.file-upload {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 2rem;
  border: 1px solid var(--neutral-2);
}

.file-upload-input {
  height: 100%;
  padding-left: 2rem;
  font-size: 1rem;
  flex-grow: 1;
  cursor: pointer;
}

.file-upload-input:focus {
  outline: none;
}

.file-upload-input::placeholder {
  color: var(--neutral-5);
}

.hidden-input {
  display: none;
}

.button {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 0.2rem;
  padding: 0.5rem;
  margin: 0;
  transition: all 0.2s ease-in-out;
}

.button svg {
  width: 1rem;
  height: 1rem;
  transition: all 0.2s ease-in-out;
}

.button:hover {
  outline: none;
  box-shadow: 0 0 0 0.125rem rgba(255, 0, 0, 0.2);
}

.button:active {
  box-shadow: none;
}

.upload-button {
  background-color: var(--red-1);
  border: 1px solid transparent;
  color: var(--neutral-1);
  font-weight: 700;
  font-size: 0.825rem;
}

.upload-button:hover {
  background-color: var(--neutral-8);
  border-color: var(--red-1);
}

.clear-button {
  background-color: var(--neutral-1);
  border: 1px solid var(--neutral-2);
}

.clear-button:hover svg {
  fill: var(--red-1);
}

.clear-button:hover {
  border-color: var(--red-1);
}
</style>
