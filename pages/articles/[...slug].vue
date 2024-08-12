<template>
  <main class="">
    Title: {{ page.title }}
    <ContentDoc>
      <template v-slot="{ doc }">
        <article>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
        </article>
      </template>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
      <template #empty>
        <h1>Documento vazio</h1>
      </template>
    </ContentDoc>
  </main>
</template>

<script setup>
const route = useRoute();

const { data: page } = await useAsyncData('my-page', queryContent(route.path).findOne)

</script>
<style>

</style>
