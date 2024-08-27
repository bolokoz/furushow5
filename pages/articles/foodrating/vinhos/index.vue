<template>
    <v-container fluid class="mt-2">
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="primary" variant="tonal" elevation="3" rounded="xl">
            <v-card-item>
              <div>
                <div class="text-overline mb-1">Avaliacao de vinhos</div>
                <div class="text-h3 mb-6">Vinhos</div>
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
              <v-data-table :headers="headers" :items="vinhos" items-per-page="5">
                <template v-slot:item.calories="{ value }">
                  <v-chip :color="getColor(value)">
                    {{ value }}
                  </v-chip>
                </template>
                <template v-slot:item._path="{ value }">
                  <v-btn color="primary" variant="tonal" :to="value"> Ver </v-btn>
                </template>
                <template v-slot:item.images="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="setImage(item.images)"
          ></v-img>
        </v-card>
      </template>
                <template v-slot:item.rating="{ item }">
        <v-rating
          :model-value="item.rating"
          length="2"
          color="orange-darken-2"
          density="compact"
          size="small"
          readonly
        ></v-rating>
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
  
                <div class="text-caption">critério versão 1 - 08/2024 - Ainda não sinto que tenho experiência e paladar para selecionar uma nota em uma banda de critérios mais abrangente, portanto por enquanto vou dar notas entre 0 e 2</div>
  
                <!-- <div class="text-h5 ml-6">
  
                  Score = [(Carne + Molho) * 2 + (Crosta + Acompanhamentos + Valor + Apresentação)] / 6
              
              </div> -->
  
                  <p class="text-overline ml-6">Notas de 0 a 2, sendo:</p>
                  <p class="text-overline ml-6">0 = RUIM</p>
                  <p class="text-overline ml-6">1 = Abaixo da média</p>
                  <p class="text-overline ml-6">2 = Acima da média</p>
  
                  
  
              </div>
            </v-card-item>
            <!-- <v-card-text>
  
  
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
            </v-card-text> -->
          </v-card>
        </v-col>
        {{ vinhos }}
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const { data: vinhos } = await useAsyncData("vinhos", () =>
    queryContent("/articles/foodrating/vinhos").sort({ date: -1 }).find()
  );
  
  const headers = [
    { title: "Vinho", key: "title" },
    { title: "Score", key: "rating" },
    { title: "Imagem", key: "images" },
    { title: "Uva", key: "uva" },
    { title: "Origem", key: "country" },
    { title: "Adega", key: "adega" },
    { title: "Ano", key: "year" },
    { title: "Preço (R$)", key: "price" },
    { title: "Restaurante", key: "restaurante" },
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
          text: 'Sabor, acidez, presença'
      },
      {
          title: 'Crosta',
          subtitle: 'Peso 1',
          text: 'Crocância apesar do molho, consistência'
      },
      {
          title: 'Acompanhamentos',
          subtitle: 'Peso 1',
          text: 'Harmonia e preparos individuais'
      },
      {
          title: 'Valor',
          subtitle: 'Peso 1',
          text: 'Mais valia'
      },
      {
          title: 'Apresentação e restaurante',
          subtitle: 'Peso 1',
          text: 'Aparência do prato, ambiente e atendimento'
      },
  ]
  
  function getColor(score) {
    if (score > 2) return "green";
  }

  function setImage(obj) {
  if (Array.isArray(obj)) {
    if (obj.indexOf(0) !== "-1") {
      return obj[0];
    }
  } else return "http://lorempixel.com.br/500/500";
}
  </script>
  