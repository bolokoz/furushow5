<template>
  <v-card
    color="primary"
    variant="tonal"
    rounded="lg"
    elevation="2"
    :to="vinho?.raw._path"
    link
  >
    <v-img height="600px" :src="setImage(vinho.raw.images)" cover></v-img>

    <v-card-title class="text-h5">
      {{ vinho?.raw.title }}
    </v-card-title>

    <v-card-subtitle>{{ formatDate(vinho?.raw.date) }}</v-card-subtitle>

    <v-card-text>
      {{ vinho.raw.description }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        class="ms-2"
        size="small"
        :text="vinho.raw.year"
        variant="outlined"
      ></v-btn>
      <v-btn
        class="ms-2"
        size="small"
        :text="vinho.raw.country"
        variant="outlined"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps(["vinho"]);

function setImage(obj) {
  if (Array.isArray(obj)) {
    if (obj.indexOf(0) !== "-1") {
      return obj[0];
    }
  } else return "http://lorempixel.com.br/500/500";
}

function formatDate(date) {
  return useDateFormat(useNow(date), "DD/MM/YYYY");
}
</script>
