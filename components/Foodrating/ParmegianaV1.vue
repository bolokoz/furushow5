<script setup>

const form = reactive({
    type: Object
})





const frontmatter = computed ({

return : 
`---
title: ${form.restaurante}
preco: ${form.price}
serve: ${form.porcao}
cover: /assets/images/cover2.jpg
# This is the icon of the page
icon: food
# Set writing time
date: 2023-12-28
# A page can have multiple categories
category:
- Parmegianologo
# A page can have multiple tags
# this page is sticky in article list
sticky: false
# this page will appear in starred articles
star: false
---` 
})

const tickLabels = {
  1: "Ruim",
  2: "Abaixo",
  3: "Acima",
  4: "Recomend",
  5: "Top",
};

</script>

<template>
        <v-text-field
          v-model="form.restaurante"
          label="restaurante"
          required
        ></v-text-field>
        <input type="date" v-model="form.date" />
        <v-text-field
          v-model.number="form.price"
          label="price"
          type="number"
          prefix="R$"
        ></v-text-field>
        <v-text-field
          v-model.number="form.porcao"
          label="porcao"
          type="number"
          prefix="serve"
          suffix="pessoas"
        ></v-text-field>

        <v-combobox
          label="Acompanhamentos"
          v-model="form.acompanhamentos"
          multiple
          chips
          :items="['Arroz', 'Batata Frita']"
        ></v-combobox>

        <v-textarea label="Observacoes" v-model="form.description"></v-textarea>
        <div class="text-caption">Carne - {{ form.rating_carne }}</div>
        <v-slider
          v-model="form.rating_carne"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">rating_molho - {{ form.rating_molho }}</div>
        <v-slider
          v-model="form.rating_molho"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">
          rating_acompanhamentos - {{ form.rating_acompanhamentos }}
        </div>
        <v-slider
          v-model="form.rating_acompanhamentos"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">
          rating_restaurante - {{ form.rating_restaurante }}
        </div>
        <v-slider
          v-model="form.rating_restaurante"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">
          rating_maisvalia - {{ form.rating_maisvalia }}
        </div>
        <v-slider
          v-model="form.rating_maisvalia"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="text-caption">
          rating_apresentacao - {{ form.rating_apresentacao }}
        </div>
        <v-slider
          v-model="form.rating_apresentacao"
          show-ticks="always"
          :min="1"
          :max="5"
          step="1"
          tick-size="4"
          :ticks="tickLabels"
        ></v-slider>
</template>