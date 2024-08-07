<template>
    <v-container>
      <v-row>
  <v-parallax
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    height="300"
  >
    <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h4 font-weight-thin mb-4">
        Boloko Blog
      </h1>
      <h4 class="subheading">
        Asdasd
      </h4>
    </div>
  </v-parallax>

      </v-row>
      <v-row>
        <template v-for="n in 4" :key="n">
          <v-col class="mt-2" cols="12">
            <strong>Category {{ n }}</strong>
          </v-col>

          <v-col v-for="j in 6" :key="`${n}${j}`" cols="6" md="2">
            <v-sheet height="150"></v-sheet>
          </v-col>
        </template>
      </v-row>
    </v-container>
</template>
