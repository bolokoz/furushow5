<template>
  <main>

    <ContentList path="/articles/foodrating/parmegianologo" v-slot="{ list }">
      <data-iterator :articles="list" title="Parmegianas"/>
    </ContentList>
    <ContentList path="/articles/foodrating/vinhos" v-slot="{ list }">
      <data-iterator :articles="list" title="Vinhos"/>
    </ContentList>
    <ContentList path="/articles/dev" v-slot="{ list }">
      <data-iterator :articles="list" title="Dev"/>
    </ContentList>
    <ContentList path="/articles/linguagens" v-slot="{ list }">
      <data-iterator :articles="list" title="Linguagens"/>
    </ContentList>


  </main>
</template>

<script setup>

const description =
  "All of my long-form thoughts on programming, user interfaces, product design, and more, collected in chronological order.";
useSeoMeta({
  title: "Articles | Fayaz Ahmed",
  description,
});

const query = { path: '/foodrating/parmegianologo', sort: [{ date: -1 }] }
// const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const articlesQuery = queryContent('articles')


const { data: articles } = await useAsyncData("all-articles", () =>
  queryContent("/articles").sort({ published: -1 }).find()
);

const games = [
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/4.png',
          title: 'The Sci-Fi Shooter Experience',
          subtitle: 'Dive into a futuristic world of intense battles and alien encounters.',
          advanced: false,
          duration: '8 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/2.png',
          title: 'Epic Adventures in Open Worlds',
          subtitle: 'Embark on a journey through vast, immersive landscapes and quests.',
          advanced: true,
          duration: '10 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/3.png',
          title: 'Surviving the Space Station Horror',
          subtitle: 'Navigate a haunted space station in this chilling survival horror game.',
          advanced: false,
          duration: '9 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/5.png',
          title: 'Neon-Lit High-Speed Racing Thrills',
          subtitle: 'Experience adrenaline-pumping races in a futuristic, neon-soaked city.',
          advanced: true,
          duration: '12 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/6.png',
          title: 'Retro-Style Platformer Adventures',
          subtitle: 'Jump and dash through pixelated worlds in this classic-style platformer.',
          advanced: false,
          duration: '11 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/7.png',
          title: 'Medieval Strategic War Campaigns',
          subtitle: 'Lead armies into epic battles and conquer kingdoms in this strategic game.',
          advanced: true,
          duration: '10 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/1.png',
          title: 'Underwater VR Exploration Adventure',
          subtitle: 'Dive deep into the ocean and discover the mysteries of the underwater world.',
          advanced: true,
          duration: '11 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/8.png',
          title: '1920s Mystery Detective Chronicles',
          subtitle: 'Solve crimes and uncover secrets in the glamourous 1920s era.',
          advanced: false,
          duration: '9 minutes',
        },
      ]
</script>
