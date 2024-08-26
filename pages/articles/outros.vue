<template>
  <AppCategoryPage title="Vinhos" caption="Experimentando vinhos" link="vinhos">
    <v-data-iterator :items="vinhos" :items-per-page="4" :search="search">
      <template v-slot:header>
        <v-text-field
          v-model="search"
          density="comfortable"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          style="max-width: 300px"
          variant="outlined"
          class="px-2"
          clearable
          hide-details
        ></v-text-field>
      </template>
      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row>
            <v-col cols="6" md="3" v-for="item in items" :key="item.title">
              <LazyFoodratingVinhoListItem :vinho="item" />
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
  </AppCategoryPage>
</template>

<script setup>
const { data: vinhos } = await useAsyncData("vinhos", () =>
  queryContent("/articles/foodrating/vinhos").sort({ date: -1 }).find()
);
</script>
