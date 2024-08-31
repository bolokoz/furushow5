<template>
    <v-card
      :disabled="loading"
      :loading="loading"
      class="my-12"
      max-width="374"
    >
  
      <v-img
        height="250"
        :src="vinho.images[0]"
        cover
      ></v-img>
  
      <v-card-item>
        <v-card-title>Cafe Badilico</v-card-title>
  
        <v-card-subtitle>
          <span class="me-1">Local Favorite</span>
  
          <v-icon
            color="error"
            icon="mdi-fire-circle"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :model-value="4.5"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
          ></v-rating>
  
          <div class="text-grey ms-4">
            4.5 (413)
          </div>
        </v-row>
  
        <div class="my-4 text-subtitle-1">
          $ • Italian, Cafe
        </div>
  
        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
      </v-card-text>
  
      <v-divider class="mx-4 mb-1"></v-divider>
  
      <v-card-title>Tonight's availability</v-card-title>
  
      <div class="px-4 mb-2">
        <v-chip-group v-model="selection" selected-class="bg-deep-purple-lighten-2">
          <v-chip>5:30PM</v-chip>
  
          <v-chip>7:30PM</v-chip>
  
          <v-chip>8:00PM</v-chip>
  
          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </div>
  
      <v-card-actions>
        <v-btn
          color="deep-purple-lighten-2"
          text="Reserve"
          block
          border
          @click="goBack"
        ></v-btn>
      </v-card-actions>
    </v-card>

    <v-col cols="12">
              <v-card rounded="xl" color="primary" variant="tonal">
                <div class="d-flex flex-no-wrap">
                    <div>
                        <v-avatar
                    class="ma-3"
                    rounded="lg"
                    size="400"
                  >
                    <v-img :src="vinho.images[0]"></v-img>
                  </v-avatar>
                    </div>
                  <div>
                    <v-card-title class="text-h3">
                      {{ vinho.title }}
                    </v-card-title>

                    <v-card-subtitle>
                        Data: {{ vinho.date }}
                    </v-card-subtitle>

                    <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :model-value="vinho.rating"
            color="amber"
            length="2"
            density="compact"
            size="small"
            half-increments
            readonly
          ></v-rating>
  
          <div class="text-grey ms-4">
            {{ vinho.rating }} / 2 (sendo 0:ruim, 1: ok e 2: bom)
          </div>
        </v-row>
  

        <div class="my-4 text-subtitle-1">
            Uva: {{ vinho.uva }}
        </div>
        <div class="my-4 text-subtitle-1">
          Pais: {{ vinho.country }}
        </div>
        <div class="my-4 text-subtitle-1">
          Produtor: {{ vinho.adega }}
        </div>

        <div class="my-4 text-subtitle-1">
          R$ {{ vinho.price }} consumido no restaurante: {{ vinho.restaurant }}
        </div>

      </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                      <v-btn
                        color="secondary"
                        variant="outlined"
                        to="/articles/foodrating/vinhos"
                      >Voltar para lista</v-btn>
                    </v-card-actions>
                  </div>


                </div>
              </v-card>
            </v-col>
  </template>

  <script setup>
    defineProps(["vinho"]);
    function goBack(){
        route('/articles')
    }
</script>