<script setup>

// cloudinary shenanigans

const files = ref([]);
const uploadedFiles = ref([]);
const loading = ref(false)



defineProps({
    folder: String
})

const form = defineModel({
    type: Object
})


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
      form.img = []
      form.img.push(img?.url)
    //   snackbarText.value = url;
    //   snackbar.value = true;
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

<v-file-input
          label="images"
          multiple
          v-model="files"
          @change="onFilesSelected"
        ></v-file-input>

        <v-btn text="upload" @click="handleFiles" :loading="loading"></v-btn>


        <div v-for="img in uploadedFiles">
          <v-img width="200" :src="img.url"></v-img>
          <span>{{ img.url }}</span>
        </div>

</template>