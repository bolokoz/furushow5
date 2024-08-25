<template>
  <v-container fluid class="mt-4">
    <v-row>
      <v-col cols="12">
        <v-card color="secondary" variant="tonal" elevation="12" rounded="xl">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">Categoria</div>
              <div class="text-h3 mb-1">{{ title }}</div>
              <div class="text-h6">{{ caption }}</div>
            </div>
          </v-card-item>

          <v-card-text>
              <v-data-iterator :items="items">
                <template v-slot:default="{ items }">
                  <v-container class="pa-2" fluid>
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                        v-for="item in items"
                        :key="item.title"
                      >
                        <v-card
                          color="primary"
                          variant="tonal"
                          rounded="lg"
                          elevation="2"
                          :to="item.raw.path"
                        >
                          <div
                            class="d-flex flex-no-wrap justify-space-between"
                          >
                            <div>
                              <v-card-title class="text-h5">
                                {{ item.raw.title }}
                              </v-card-title>

                              <v-card-subtitle
                                >{{item.raw.date}}</v-card-subtitle
                              >

                              <v-card-text>
                                {{ item.raw.description }}
                              </v-card-text>

                              <v-card-actions>
                                <v-btn
                                v-for="category in item.raw.category"
                                  class="ms-2"
                                  size="small"
                                  :text="category"
                                  variant="flat"
                                ></v-btn>
                                <v-btn
                                v-for="tag in item.raw.tag"
                                  class="ms-2"
                                  size="small"
                                  :text="tag"
                                  variant="outlined"
                                ></v-btn>
                              </v-card-actions>
                            </div>

                            <v-avatar class="ma-3" rounded="0" size="225">
                              <v-img
                                src="http://lorempixel.com.br/225/225"
                              ></v-img>
                            </v-avatar>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
              </v-data-iterator>

          </v-card-text>
          <v-card-actions>
            <v-btn block>Voltar para categorias</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  title: String,
  caption: String,
  link: String,
  items: Array,
});
</script>

<style>
.right-gradient {
  background-image: linear-gradient(to left, rgb(0, 0, 0) 0%, transparent 72px);
}
</style>
