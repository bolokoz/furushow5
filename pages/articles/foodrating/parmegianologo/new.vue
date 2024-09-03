<script setup>
//criterio v1 parmegianologo
const valid = ref(false);
const form = reactive({});
const today = new Date();
form.date = today;

const snackbar = ref(false);
const snackbarText = ref("");

const tickLabels = {
  0: "Ruim",
  1: "Abaixo",
  2: "Acima",
  3: "Top",
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
      snackbarText.value = "Uploaded to Cloudinary";
      snackbar.value = true;
    })
    .catch((error) => {
      snackbarText.value = error;
      snackbar.value = true;
      console.error("Error uploading the file:", error);
      loading.value = false;
    });
}

// Upload Markdown to Github settings
const markdown = ref("");
// const imagesUrl = images
function createMarkdown() {
  let imagesURL = uploadedFiles.value.map((e) => e.url);
  let score =
    form.rating_carne * 2 +
    form.rating_molho * 2 +
    form.rating_acompanhamentos +
    form.rating_maisvalia +
    form.rating_restaurant;
  let calculatedRating = (score / 7).toFixed(1);

  let markdown = `---
title: ${form?.title}
date: ${form?.date}
price: ${form?.price}
portion: ${form?.portion}
rating: ${calculatedRating}
acompanhamentos: [${form.acompanhamentos}]
rating_carne: ${form?.rating_carne}
rating_molho: ${form?.rating_molho}
rating_acompanhamentos: ${form.rating_acompanhamentos}
rating_maisvalia: ${form.rating_maisvalia}
rating_restaurant: ${form.rating_restaurant}
description: ${form.description}
images: [${imagesURL}]
---`;

  return markdown;
}

const config = useRuntimeConfig();
const GITHUB_USERNAME = "bolokoz";
const GITHUB_REPO = "furushow5";
const GITHUB_BRANCH = "main";
const PATH = "content/articles/foodrating/parmegianologo";

async function handleSubmit() {
  let contentBase64 = btoa(createMarkdown());
  const date = new Date(form.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-based month
  const yyyymm = `${year}${month}`;
  let filename = form.title.trim().replace(/ /g, "_") + "_" + yyyymm;
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
    snackbarText.value = "Uploaded to Github";
    snackbar.value = true;
    navigateTo("/articles");
  });
}
</script>

<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card title="Parmegianologo v1" class="mx-1 mt-5" elevation="5">
      <v-container>
        <v-text-field
          v-model="form.title"
          label="Nome do restaurante"
          required
        ></v-text-field>
        <v-date-picker v-model="form.date"></v-date-picker>
        <v-text-field
          v-model.number="form.price"
          label="Price"
          type="number"
          prefix="R$"
        ></v-text-field>
        <v-text-field
          v-model.number="form.portion"
          label="Serve quantos"
          type="number"
        ></v-text-field>
        <v-combobox
          label="Acompanhamentos"
          v-model="form.acompanhamentos"
          multiple
          chips
          :items="['Arroz', 'Batata Frita']"
        ></v-combobox>
        <!-- <v-text-field v-model="form." label="Adega"></v-text-field> -->
        <!-- <v-text-field v-model="form.rating_maisvalia" label="Pais"></v-text-field> -->
        <!-- <v-text-field
        v-model.number="form.year"
        label="Ano"
        type="number"
      ></v-text-field> -->
        <!-- <v-text-field v-model="form.restaurant" label="Restaurant"></v-text-field> -->
        <div class="text-caption">rating_carne - {{ form.rating_carne }}</div>
        <v-slider
          v-model="form.rating_carne"
          show-ticks="always"
          :min="0"
          :max="3"
          step="1"
          tick-size="3"
        ></v-slider>
        <div class="text-caption">rating_molho - {{ form.rating_molho }}</div>
        <v-slider
          v-model="form.rating_molho"
          show-ticks="always"
          :min="0"
          :max="3"
          step="1"
          tick-size="3"
        ></v-slider>
        <div class="text-caption">
          rating_acompanhamentos - {{ form.rating_acompanhamentos }}
        </div>
        <v-slider
          v-model="form.rating_acompanhamentos"
          show-ticks="always"
          :min="0"
          :max="3"
          step="1"
          tick-size="3"
        ></v-slider>
        <div class="text-caption">
          rating_maisvalia - {{ form.rating_maisvalia }}
        </div>
        <v-slider
          v-model="form.rating_maisvalia"
          show-ticks="always"
          :min="0"
          :max="3"
          step="1"
          tick-size="3"
        ></v-slider>
        <div class="text-caption">
          rating_restaurant - {{ form.rating_restaurant }}
        </div>
        <v-slider
          v-model="form.rating_restaurant"
          show-ticks="always"
          :min="0"
          :max="3"
          step="1"
          tick-size="3"
        ></v-slider>
        <v-textarea label="Observacoes" v-model="form.description"></v-textarea>

        <v-divider inset class="my-3"></v-divider>

        <!-- Cloudinary -->
        <!-- <FoodratingCloudinaryUpload @uploadedCloudinary="handleImages" /> -->
        <v-file-input label="images" multiple v-model="files"></v-file-input>

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
  </div>
</template>
