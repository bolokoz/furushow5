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
        <slot></slot>
          </v-card-text>
          <v-card-actions>
            <v-btn block to="/articles">Voltar para categorias</v-btn>
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

