<script setup>

const config = useRuntimeConfig()

const valid = ref(false);
const restaurante = ref("");
const description = ref("");
const date = ref("");
const acompanhamentos = ref([]);
const rating_carne = ref(3);
const rating_molho = ref(1);
const rating_acompanhamentos = ref(1);
const rating_restaurante = ref(1);
const rating_maisvalia = ref(1);
const rating_apresentacao = ref(1);
const price = ref(1);
const porcao = ref(1);

const tickLabels = {
  1: "Ruim",
  2: "Abaixo",
  3: "Acima",
  4: "Recomend",
  5: "Top",
};

const snackbar = ref(false);
const snackbarText = ref("");
const loading = ref(false);

// create markdown

async function handleSubmit() {

loading.value = true

  let frontmatter = `---
title: ${restaurante.value}
preco: ${price.value}
serve: ${porcao.value}
cover: /assets/images/cover2.jpg
# This is the icon of the page
icon: food
# Set writing time
date: 2023-12-28
# A page can have multiple categories
category:
- Parmegianologo
# A page can have multiple tags
# this page is sticky in article list
sticky: false
# this page will appear in starred articles
star: false
---
    `;
  let blob = new Blob([frontmatter], { type: "text/markdown" });
  let url = URL.createObjectURL(blob);
  let link = document.createElement("a");
  link.href = url;
  link.download = `${restaurante.value}.md`;
  URL.revokeObjectURL(url);

//   let filename = `${restaurante.value}.md`



//github upload shenanigans

// Replace with your own GitHub settings
const GITHUB_TOKEN =  config.public.GITHUB_TOKEN
const GITHUB_USERNAME = 'bolokoz'
const GITHUB_REPO = 'furushow5'
const GITHUB_BRANCH = 'main'
const PATH = 'content/articles/foodrating/parmegianologo'

  // Convert content to Base64 (required by GitHub API)
  const contentBase64 = btoa(unescape(encodeURIComponent(frontmatter)))

  // Upload the file to GitHub
  const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PATH}/${link.download}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${config.public.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Added ${link.download} from api`,
      content: contentBase64,
      branch: GITHUB_BRANCH,
    }),
  })

  if (response.ok) {
    console.log('File uploaded successfully!')
  } else {
    const error = await response.json()
    console.error('File upload failed:', error)
  }

  loading.value = false
}

// cloudinary shenanigans

const files = ref([]);
const uploadedFiles = ref([]);

const cloudName = "boloko";
const uploadPreset = "furushow_parme";

const imageUrl = ref(null);

function onFilesSelected(event) {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
}

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
      snackbarText.value = url;
      snackbar.value = true;
      loading.value = false;
    })
    .catch((error) => {
      console.error("Error uploading the file:", error);
      //   snackbarText.value = error;
      //   snackbar.value = true;
      loading.value = false;
    });
}
</script>

<template>
  <v-card title="Novo" class="mx-1 mt-5" elevation="5">
    <v-container>
      <v-form v-model="valid">
        <v-text-field
          v-model="restaurante"
          label="restaurante"
          required
        ></v-text-field>
        <input type="date" v-model="date" />
        <v-text-field
          v-model="price"
          label="price"
          type="number"
          prefix="R$"
        ></v-text-field>
        <v-text-field
          v-model="porcao"
          label="porcao"
          type="number"
          prefix="serve"
          suffix="pessoas"
        ></v-text-field>

        <v-combobox
          label="Acompanhamentos"
          v-model="acompanhamentos"
          multiple
          chips
          :items="['Arroz', 'Batata Frita']"
        ></v-combobox>

        <v-textarea label="Observacoes" v-model="description"></v-textarea>

        <v-divider></v-divider>

        <v-file-input
          label="images"
          multiple
          v-model="files"
          @change="onFilesSelected"
        ></v-file-input>

        <v-btn text="upload" @click="handleFiles" :loading="loading"></v-btn>

        <v-snackbar v-model="snackbar">
          {{ snackbarText }}

          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <div v-for="img in uploadedFiles">
          <v-img width="200" :src="img.url"></v-img>
        </div>

        <div class="text-caption">Carne - {{ rating_carne }}</div>
        <v-slider
          v-model="rating_carne"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">rating_molho - {{ rating_molho }}</div>
        <v-slider
          v-model="rating_molho"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">
          rating_acompanhamentos - {{ rating_acompanhamentos }}
        </div>
        <v-slider
          v-model="rating_acompanhamentos"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">
          rating_restaurante - {{ rating_restaurante }}
        </div>
        <v-slider
          v-model="rating_restaurante"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">
          rating_maisvalia - {{ rating_maisvalia }}
        </div>
        <v-slider
          v-model="rating_maisvalia"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">
          rating_apresentacao - {{ rating_apresentacao }}
        </div>
        <v-slider
          v-model="rating_apresentacao"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
      </v-form>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="handleSubmit">
        Cadastrar

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
