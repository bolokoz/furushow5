<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <ContentDoc v-slot="{ doc }" tag="article">
        <article>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
        </article>
      </ContentDoc>
    </div>
    <div>
    <!-- <ul v-if="toc && toc.links">
      <li v-for="link in toc.links" :key="link.text">
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul> -->
  </div>
  </main>
</template>
<script setup>
const route = useRoute();
const { slug } = route.params;
// const { toc } = useContent()
useSeoMeta({
  ogImage: `https://fayazahmed.com/articles/${slug}.png`,
  twitterCard: "summary_large_image",
  articleAuthor: "Fayaz Ahmed",
});
</script>
<style>

</style>
