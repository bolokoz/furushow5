<script setup>

const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  title: {
    type: String
  }
});
</script>

<template>
    <v-card>
      <v-data-iterator
        :items="articles"
        :items-per-page="3"
      >
        <template v-slot:header>
          <v-toolbar class="px-2">
            {{ title }}
          </v-toolbar>
        </template>
  
        <template v-slot:default="{ items }">
          <v-container class="pa-2" fluid>
            <v-row dense>
              <v-col
                v-for="item in items"
                :key="item.title"
                cols="auto"
                md="4"
              >
                <v-card class="pb-3" border flat>
                  <v-img :src="item.raw.thumbnail"></v-img>
  
                  <v-list-item :subtitle="item.raw.description" class="mb-2">
                    <template v-slot:title>
                      <strong class="text-h6 mb-2">{{ item.raw.name }}</strong>
                    </template>
                  </v-list-item>
  
                  <div class="d-flex justify-space-between px-4">
                    <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                      <v-icon icon="mdi-clock" start></v-icon>
  
                      <div class="text-truncate">{{ item.raw.status }}</div>
                    </div>
  
                    <v-btn
                      class="text-none"
                      size="small"
                      text="Read"
                      border
                      flat
                      :to="item.raw._path"
                    >
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>
  
        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4">
            <v-btn
              :disabled="page === 1"
              density="comfortable"
              icon="mdi-arrow-left"
              variant="tonal"
              rounded
              @click="prevPage"
            ></v-btn>
  
            <div class="mx-2 text-caption">
              Page {{ page }} of {{ pageCount }}
            </div>
  
            <v-btn
              :disabled="page >= pageCount"
              density="comfortable"
              icon="mdi-arrow-right"
              variant="tonal"
              rounded
              @click="nextPage"
            ></v-btn>
          </div>
        </template>
      </v-data-iterator>
    </v-card>
  </template>