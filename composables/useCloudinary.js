const cloudName = "boloko";
const uploadPreset = "furushow_parme";

let returnedImages = []

export function uploadToCloudinary(files) {
    for (let i = 0; i < files.value.length; i++) {
        uploadFile(files.value[i]); // call the function to upload the file
      }
    return returnedImages
}

function uploadFile(file){
    let fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", uploadPreset);
  $fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: fd,
  })
    .then((response) => {
      console.log("Cloudinary: response ", response);
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
      returnedImages.push(img);
    })
    .catch((error) => {
      console.error("Cloudinary: Error uploading the file: ", error);
      //   snackbarText.value = error;
      //   snackbar.value = true;
    //   loading.value = false;
    });
}