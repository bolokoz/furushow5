<template>
  <v-row>
    <v-col cols="12">
      <v-card rounded="xl" color="primary" variant="tonal">
            <v-card-title class="text-h4">
              {{ parmegiana.title }}
            </v-card-title>
            <v-card-subtitle> Data: {{ parmegiana.date }} </v-card-subtitle>
            <v-card-image>
              <v-carousel v-if="(Array.isArray(parmegiana.images) && parmegiana.images.length > 0)">
  <v-carousel-item v-for="image in parmegiana.images"
    :src="image"
    cover
  ></v-carousel-item>
</v-carousel>
            </v-card-image>
            <v-card-text>
              <RadarChart :parmegiana="parmegiana"/>
              <div class="my-4 text-subtitle-1">Acompanhamentos: {{ parmegiana.acompanhamentos }}</div>
              <div class="my-4 text-subtitle-1">Preço: R$ {{ parmegiana.price }}</div>
              <div class="my-4 text-subtitle-1">Serve quantos: {{ parmegiana.portion }}</div>
              <div class="my-4 text-subtitle-1">
                <!-- R$ {{ parmegiana.price }} consumido no restaurante: -->
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="secondary"
                variant="outlined"
                to="/articles/foodrating/parmegianologo"
                >Voltar para lista</v-btn
              >
            </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <!-- <food-rating-radar-chart /> -->
  </v-row>
  <v-row>
    <v-col cols="12">

    </v-col>
  </v-row>
</template>

<script setup>
// import { RadarChart } from '#components'

defineProps(["parmegiana"]);

function goBack() {
  route("/articles");
}
</script>
