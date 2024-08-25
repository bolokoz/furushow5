<template>

<CategoryPage title="Outros" caption="Interesses diversos" link="outros" :items="items"/>


</template>

<script setup>

const { data: items } = await useAsyncData("items", () =>
  queryContent("/articles/foodrating/vinhos").sort({ date: -1 }).find()
);
</script>