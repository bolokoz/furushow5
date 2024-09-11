<script setup>
const {data} =  await useAsyncData('articles', () => queryContent("/articles/linguagens/").find())

// const { data: navigation } = await useAsyncData("navigation", () =>
//   fetchContentNavigation("articles/linguagens")
// );


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

    <v-main>
      <app-article-list :articles="data" />
    </v-main>


  </div>
</template>
