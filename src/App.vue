<template>
  <main class="main">
    <section class="container">
      <header class="header">
        <h1>Favigo - Test and preview your favicon</h1>
        <p>
          Add your favicon in PNG or ICO format and see how it looks before
          using it—simple, fast, and hassle-free!
        </p>
      </header>

      <FileUpload v-model="selectedFile" @clear="clearFile" />

      <p class="instructions">Only ICO and PNG file formats are acceptable.</p>

      <div class="guide guide-horizontal guide-top"></div>
      <div class="guide guide-horizontal guide-bottom"></div>
      <div class="guide guide-vertical guide-left"></div>
      <div class="guide guide-vertical guide-right"></div>
    </section>
  </main>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import FileUpload from "./components/FileUpload.vue";

const selectedFile = ref(null);
let currentObjectURL = null;

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

watch(selectedFile, (newFile) => {
  if (newFile) {
    const existingFaviconLinks = document.querySelectorAll(
      'link[rel="icon"], link[rel="apple-touch-icon"], link[rel="shortcut icon"]'
    );
    existingFaviconLinks.forEach((link) => link.remove());

    if (currentObjectURL) {
      URL.revokeObjectURL(currentObjectURL);
    }

    currentObjectURL = URL.createObjectURL(newFile);

    // Create new favicon link
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = currentObjectURL;
    document.head.appendChild(link);
  }
});

const clearFile = () => {
  if (selectedFile.value && currentObjectURL) {
    URL.revokeObjectURL(currentObjectURL);
    currentObjectURL = null;

    const uploadedFaviconLink = document.querySelector('link[rel="icon"]');
    if (uploadedFaviconLink) {
      uploadedFaviconLink.remove();
    }

    const originalFavicons = [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-96x96.png",
        sizes: "96x96",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ];

    originalFavicons.forEach((faviconData) => {
      const link = document.createElement("link");
      Object.entries(faviconData).forEach(([attr, value]) => {
        link.setAttribute(attr, value);
      });
      document.head.appendChild(link);
    });
  }
  selectedFile.value = null;
};

onUnmounted(() => {
  if (currentObjectURL) {
    URL.revokeObjectURL(currentObjectURL);
  }
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
}

.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
}

.header h1 {
  margin-bottom: 0.5rem;
}

.instructions {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 0.8rem;
  color: var(--neutral-6);
}

.guide {
  position: absolute;
  background: var(--neutral-2);
  pointer-events: none;
}

.guide-horizontal {
  height: 1px;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
}

.guide-top {
  top: 0;
}

.guide-bottom {
  bottom: 0;
}

.guide-vertical {
  width: 1px;
  height: 100vh;
  top: 50%;
  transform: translateY(-50%);
}

.guide-left {
  left: 0;
}

.guide-right {
  right: 0;
}
</style>
