<script setup>
const config = useRuntimeConfig();

const price = ref(1);
const porcao = ref(1);

const snackbar = ref(false);
const snackbarText = ref("");
const loading = ref(false);

useHead({
  script: [
    {
      src: "https://upload-widget.cloudinary.com/latest/global/all.js",
      type: "text/javascript",
    },
  ],
});

let widget
onMounted(() => {
  widget = window.cloudinary.createUploadWidget(
    {
      cloud_name: "boloko",
      upload_preset: "furushow_parme",
       sources:['local', 'camera'],
       cropping: true,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log(result.result);
      }
    }
  );
});

function openUploadWidget() {
  widget.open();
}

async function handleSubmit() {
  loading.value = true;

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
  const GITHUB_TOKEN = config.public.GITHUB_TOKEN;
  const GITHUB_USERNAME = "bolokoz";
  const GITHUB_REPO = "furushow5";
  const GITHUB_BRANCH = "main";
  const PATH = "content/articles/foodrating/parmegianologo";

  // Convert content to Base64 (required by GitHub API)
  const contentBase64 = btoa(unescape(encodeURIComponent(frontmatter)));

  // Upload the file to GitHub
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PATH}/${link.download}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${config.public.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Added ${link.download} from api`,
        content: contentBase64,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (response.ok) {
    console.log("File uploaded successfully!");
  } else {
    const error = await response.json();
    console.error("File upload failed:", error);
  }

  loading.value = false;
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
      <FoodratingStepper />
    </v-container>
    <v-card-actions>
      <v-btn @click="openUploadWidget()"> Cloudinary</v-btn>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="handleSubmit">
        Cadastrar

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
