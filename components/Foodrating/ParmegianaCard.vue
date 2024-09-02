<template>
  <v-row>
    <v-col cols="12">
      <v-card rounded="xl" color="primary" variant="tonal">
            <v-card-title class="text-h4">
              {{ parmegiana.title }}
            </v-card-title>
            <v-card-subtitle> Data: {{ parmegiana.date }} </v-card-subtitle>
            <v-card-text>
              <RadarChart />

              <BarChart />
              <div class="my-4 text-subtitle-1">Uva: {{ parmegiana.acompanhamentos }}</div>
              <div class="my-4 text-subtitle-1">Pais: {{ parmegiana.price }}</div>
              <div class="my-4 text-subtitle-1">Produtor: {{ parmegiana.porcao }}</div>
              <div class="my-4 text-subtitle-1">
                R$ {{ parmegiana.price }} consumido no restaurante:
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
