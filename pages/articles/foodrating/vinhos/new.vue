<script setup>
//criterio v1 vinhos
const valid = ref(false)
const form = reactive({});
const today = new Date()
form.date = today

const snackbar = ref(false)
const snackbarText = ref('')

const tickLabels = {
  1: "Ruim",
  2: "Abaixo",
  3: "Acima",
  4: "Recomend",
  5: "Top",
};

// cloudinary shenanigans
const files = ref([]);
const uploadedFiles = ref([]);
const loading = ref(false);
const cloudName = "boloko";
const uploadPreset = "furushow_parme";

function handleFiles() {
  console.log("handle files", files.value.length);
  for (let i = 0; i < files.value.length; i++) {
    uploadFile(files.value[i]); // call the function to upload the file
  }
}
function uploadFile(file) {
  console.log("uploadFIle");
  loading.value = true;
  let fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", uploadPreset);
  $fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: fd,
  })
    .then((response) => {
      console.log("response", response);
      uploadedFiles.value.push(response);
    })
    .then((data) => {
      // File uploaded successfully
      let url = data.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      let tokens = url.split("/");
      tokens.splice(-3, 0, "w_150,c_scale");
      let img = new Image();
      img.src = tokens.join("/");
      img.alt = data.public_id;
      uploadedFiles.value.push(img);

      loading.value = false;
      snackbarText.value = 'Uploaded to Cloudinary'
      snackbar.value = true
    })
    .catch((error) => {
      snackbarText.value = error
      snackbar.value = true
      console.error("Error uploading the file:", error);
      loading.value = false;
    });
}

// Upload Markdown to Github settings
const markdown = ref("");
// const imagesUrl = images
function createMarkdown() {
  let imagesURL = uploadedFiles.value.map((e) => e.url);

  let markdown = `---
title: ${form?.title}
date: ${form?.date}
price: ${form?.price}
restaurant: ${form?.restaurant}
year: ${form.year}
country: ${form.country}
rating_personal: ${form.rating_personal}
description: ${form.description}
images: [${imagesURL}]
---`;

  return markdown;
}

const config = useRuntimeConfig();
const GITHUB_USERNAME = "bolokoz";
const GITHUB_REPO = "furushow5";
const GITHUB_BRANCH = "main";
const PATH = "content/articles/foodrating/vinhos";

async function handleSubmit() {
  let contentBase64 = btoa(createMarkdown());
  let filename = form.title.trim().replace(/ /g, "-");
  await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PATH}/${filename}.md`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${config.public.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Added ${filename}.md from api`,
        content: contentBase64,
        branch: GITHUB_BRANCH,
      }),
    }
  ).then((res) => {

    snackbarText.value = 'Uploaded to Github'
    snackbar.value = true
    navigateTo('/articles')
  })
}
</script>

<template>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  <v-card title="Vinho v1" class="mx-1 mt-5" elevation="5">
    <v-container>
      <v-text-field
        v-model="form.title"
        label="Nome do vinho"
        required
      ></v-text-field>
      <v-date-picker v-model="form.date"></v-date-picker>
      <v-text-field
        v-model.number="form.price"
        label="Price"
        type="number"
        prefix="R$"
      ></v-text-field>
      <v-text-field v-model="form.restaurant" label="Restaurant"></v-text-field>
      <v-text-field
        v-model.number="form.year"
        label="Ano"
        type="number"
      ></v-text-field>
      <v-text-field v-model="form.country" label="Pais"></v-text-field>
      <v-text-field v-model="form.grape" label="Uva tipo"></v-text-field>
      <div class="text-caption">
        rating_restaurante - {{ form.rating_restaurante }}
      </div>
      <v-slider
        v-model="form.rating_restaurante"
        show-ticks="always"
        :min="1"
        :max="5"
        step="1"
        tick-size="4"
        :ticks="tickLabels"
      ></v-slider>
      <v-textarea label="Observacoes" v-model="form.description"></v-textarea>

      <v-divider inset class="my-3"></v-divider>

      <!-- Cloudinary -->
      <!-- <FoodratingCloudinaryUpload @uploadedCloudinary="handleImages" /> -->
      <v-file-input
        label="images"
        multiple
        v-model="files"
        @change="onFilesSelected"
      ></v-file-input>

      <v-btn text="upload" @click="handleFiles" :loading="loading"></v-btn>

      <div v-for="img in uploadedFiles">
        <v-img width="200" :src="img.url"></v-img>
      </div>

      <span>{{ markdown }}</span>
    </v-container>
    <v-card-actions>

      <v-btn color="success" @click="handleSubmit">
        Cadastrar

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
