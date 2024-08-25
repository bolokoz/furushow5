<template>
    <main class="">
        TAG:{{ route.path }}
    </main>
  </template>
  
  <script setup>
  const route = useRoute();
  
  const { data: page } = await useAsyncData('my-page', queryContent(route.path).findOne)
  
  </script>
  <style>
  
  </style>
  