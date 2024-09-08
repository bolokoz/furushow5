<script setup>
const catsQuery = queryContent("articles/linguagens/");
const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation("articles/linguagens")
);
const leftDrawer = ref(false);
const rightDrawer = ref(false);

/*
// If you'd prefer to pass along raw `QueryBuilderParams`:

*/
// const catsQuery = {
//   where: [
//     { _path: /^\/articles/ling/ },
//   ],
// }
</script>

<template>
  <div>

    <v-navigation-drawer width="244" v-model="leftDrawer">
      <v-sheet color="" height="128" width="100%"></v-sheet>

      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`Item ${n}`"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
        <v-container fluid>
            <v-row dense>
                <v-col cols="12" md="9">

                    <v-sheet color="secondary" height="800" class="ma-2" rounded="xl"> 
                        <v-btn @click="rightDrawer = !rightDrawer">TOC</v-btn>


                    </v-sheet>
                </v-col>
                <v-col md="3">
                    <v-sheet color="primary" height="800" class="ma-2" rounded="xl"> 


                    </v-sheet>
                </v-col>
            </v-row>

            <v-navigation-drawer location="right" v-model="rightDrawer">
      <v-sheet color="" height="128" width="100%"> TOC </v-sheet>

      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`Item ${n}`"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

        </v-container>
    </v-main>


  </div>
</template>
