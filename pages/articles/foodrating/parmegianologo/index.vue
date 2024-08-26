<template>
  <v-container fluid class="mt-2">
    <v-row>
      <v-col cols="12" md="6">
        <v-card color="primary" variant="tonal" elevation="3" rounded="xl">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">Avaliacao de parmegianas</div>
              <div class="text-h3 mb-6">Parmegianologo</div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card color="secondary" variant="tonal" elevation="12" rounded="xl">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">os melhores</div>
              <div class="text-h3 mb-1">Ranking</div>
              <!-- <div class="text-h6">{{ caption }}</div> -->
            </div>
          </v-card-item>

          <v-card-text>
            <v-data-table :headers="headers" :items="parmegianas">
              <template v-slot:item.calories="{ value }">
                <v-chip :color="getColor(value)">
                  {{ value }}
                </v-chip>
              </template>
              <template v-slot:item._path="{ value }">
                <v-btn color="primary" variant="tonal" :to="value"> Ver </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-card color="orange" variant="outlined" elevation="3" rounded="xl">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">scores</div>

              <div class="text-h3 mb-6">Criterios de availiacao</div>

              <div class="text-caption">critério versão 2 - 08/2024</div>

              <div class="text-h4">

                Score = [(Carne + Molho) * 2 + (Crosta + Acompanhamentos + Valor + Apresentação)] / 6

                
            </div>
            <ContentDoc path="articles/foodrating/parmegianologo/criterio_v2" />
            </div>
          </v-card-item>
          <v-card-text>


            <v-row dense>
                <v-col cols="12" md=4                     v-for="item in criterio_v1">
                    <v-card

                    variant="tonal"
                    class="ma-2 mx-auto"
                    max-width="344"
                    :title="item.title"
                    :subtitle="item.subtitle"
                    :text="item.text"
                    >
                </v-card>
                
            </v-col>
        </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { data: parmegianas } = await useAsyncData("parmegianas", () =>
  queryContent("/articles/foodrating/parmegianologo").sort({ date: -1 }).find()
);

const headers = [
  { title: "Restaurante", key: "title" },
  { title: "Score", key: "rating" },
  { title: "Preço (R$)", key: "Price" },
  { title: "Carne e Crosta", key: "rating_carne" },
  { title: "Acompanhamentos", key: "rating_acompanhamentos" },
  { title: "Molho e queijos", key: "rating_molho" },
  { title: "Ver", key: "_path" },
];

const criterio_v1 = [
    {
        title: 'Carne',
        subtitle: 'Peso 2',
        text: 'Considera a suculencia, maciez, sabor, sal'
    },
    {
        title: 'Molho e queijo',
        subtitle: 'Peso 2',
        text: 'Considera a suculencia, maciez, sabor, sal'
    },
    {
        title: 'Crosta',
        subtitle: 'Peso 1',
        text: 'Considera a suculencia, maciez, sabor, sal'
    },
    {
        title: 'Acompanhamentos',
        subtitle: 'Peso 1',
        text: 'Considera a suculencia, maciez, sabor, sal'
    },
    {
        title: 'Valor',
        subtitle: 'Peso 1',
        text: 'Considera a suculencia, maciez, sabor, sal'
    },
    {
        title: 'Apresentação e restaurante',
        subtitle: 'Peso 1',
        text: 'Considera a suculencia, maciez, sabor, sal'
    },
]

function getColor(score) {
  if (score > 2) return "green";
}
</script>
