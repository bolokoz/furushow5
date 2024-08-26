<template>
  <v-container class="text-center">
    <v-row align="center" class="" justify="center">
      <template v-for="(item, i) in items" :key="i">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :class="{ 'on-hover': isHovering }"
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
              :to="item.link"
              rounded="xl"
            >
              <v-img :src="item.img" height="425px" cover>
                <v-card-title class="text-h6 text-white d-flex flex-column">
                  <p class="mt-4">
                    {{ item.title }}
                  </p>

                  <div>
                    <p class="ma-0 text-body-1 font-weight-bold">
                      {{ item.text }}
                    </p>
                    <p class="text-caption font-weight-medium">
                      {{ item.subtext }}
                    </p>
                  </div>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
    <v-row>
      <!-- <v-col cols="12" md="8">
        <v-sheet class="mx-auto" rounded="xl" border>
          <div class="pa-4">
            <div class="text-h6">Últimos</div>

            <v-timeline align="start" side="end">
              <v-timeline-item dot-color="pink" size="small">
                <div class="d-flex">
                  <strong class="me-4">5pm</strong>
                  <div>
                    <strong>New Icon</strong>
                    <div class="text-caption">Mobile App</div>
                  </div>
                </div>
              </v-timeline-item>

              <v-timeline-item dot-color="teal-lighten-3" size="small">
                <div class="d-flex">
                  <strong class="me-4">3-4pm</strong>
                  <div>
                    <strong>Design Stand Up</strong>
                    <div class="text-caption mb-2">Hangouts</div>
                  </div>
                </div>
              </v-timeline-item>

              <v-timeline-item dot-color="pink" size="small">
                <div class="d-flex">
                  <strong class="me-4">12pm</strong>
                  <div>
                    <strong>Lunch break</strong>
                  </div>
                </div>
              </v-timeline-item>

              <v-timeline-item dot-color="teal-lighten-3" size="small">
                <div class="d-flex">
                  <strong class="me-4">9-11am</strong>
                  <div>
                    <strong>Finish Home Screen</strong>
                    <div class="text-caption">Web App</div>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="4">
        <v-sheet class="mx-auto" max-width="400" rounded="xl" border>
          <div class="pa-4">
            <div class="text-h6">Tags</div>
            <v-chip-group class="mt-3" column>
              <v-chip
                v-for="tag in tags"
                :key="tag"
                :text="tag"
                :value="tag"
                :to="`tags/${tag}`"
              ></v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
      </v-col> -->

    </v-row>
  </v-container>
</template>

<script setup>
const items = [
  {
    title: "Parmegianologo",
    text: `Avaliacao de parmegianas`,
    link: "/articles/foodrating/parmegianologo",
    img: "https://cdn.vuetifyjs.com/docs/images/cards/hands.jpg",
  },
  {
    title: "Dev",
    text: "Softwares",
    link: "/articles/dev",
    img: "https://cdn.vuetifyjs.com/docs/images/cards/concert.jpg",
  },
  {
    title: "Engenharia",
    text: "Web Apps interativos",
    link: "/articles/eng",
    img: "https://cdn.vuetifyjs.com/docs/images/cards/concert.jpg",
  },
  {
    title: "Linguagens",
    text: "Aprendendo novos idiomas",
    link: "/articles/linguagens",
    img: "https://cdn.vuetifyjs.com/docs/images/cards/singer.jpg",
  },
  {
    title: "Outros",
    text: "Diversos assuntos",
    link: "/articles/outros",
    img: "https://cdn.vuetifyjs.com/docs/images/cards/singer.jpg",
  },
  {
    title: "Destacados",
    text: "Meus favoritos",
    link: "/articles/destaques",
    img: "http://lorempixel.com.br/500/500/",
  },
];

const description =
  "All of my long-form thoughts on programming, user interfaces, product design, and more, collected in chronological order.";
useSeoMeta({
  title: "Articles | Boloko",
  description,
});

const { data: tags } = await useAsyncData('tags', () =>
queryContent("/")
    .where({ tag: { $exists: true } })
    .only("tag")
    .find())

</script>
