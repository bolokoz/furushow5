<script setup>
const projects = [
  { title: "title1", to: "", img: "https://picsum.photos/1920/1080?random" },
  { title: "title2", to: "", img: "https://picsum.photos/1920/1080?random" },
  { title: "title3", to: "", img: "https://picsum.photos/1920/1080?random" },
  { title: "title4", to: "", img: "https://picsum.photos/1920/1080?random" },
];

const search = ref('')

const { data: projects2 } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
)

const years = [
        {
          color: 'cyan',
          year: '1960',
        },
        {
          color: 'green',
          year: '1970',
        },
        {
          color: 'pink',
          year: '1980',
        },
        {
          color: 'amber',
          year: '1990',
        },
        {
          color: 'orange',
          year: '2000',
        },
      ]
  
    const isSelected = ref([])

</script>

<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <data-iterator :articles=projects2 title="PROJECTOS 1"/>
       <v-divider></v-divider>
      <v-sheet class="mx-auto" elevation="8">
        <v-slide-group
          v-model="model"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="project in projects"
            :key="n"
            v-slot="{ isSelected, toggle, selectedClass }"
          >
            <v-card
              :class="['ma-4', selectedClass]"
              color="grey-lighten-1"
              height="200"
              width="300"
              @click="toggle"
            >
              <div class="d-flex fill-height align-center justify-center">
                <v-scale-transition>
                  <v-icon
                    v-if="isSelected"
                    color="white"
                    icon="mdi-close-circle-outline"
                    size="48"
                  ></v-icon>
                </v-scale-transition>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-timeline align="start">
        <v-timeline-item
          v-for="(year, i) in years"
          :key="i"
          size="small"
        >
          <template v-slot:opposite>
            <div
              :class="`pt-1 headline font-weight-bold`"
              v-text="year.year"
            ></div>
          </template>
          <div>
            <h2
              :class="`mt-n1 headline font-weight-light mb-4`"
            >
              Lorem ipsum
            </h2>
            <div>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
              scaevola imperdiet nec ut, sed euismod convenire principes at. Est
              et nobis iisque percipit, an vim zril disputando voluptatibus, vix
              an salutandi sententiae.
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </v-main>
</template>
