<template>
  <v-container fluid class="mt-2">
    <v-row>
      <v-col cols="12" md="6">
        <v-card color="primary" variant="tonal" elevation="3" rounded="xl">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">Avaliacao de Parmegianas</div>
              <div class="text-h3 mb-6">Parmegianólogo</div>
            </div>
          </v-card-item>
          <v-card-actions>
            <v-btn to="/articles">Voltar para side projects</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  
    <FoodratingParmegianaCard :parmegiana="page" />
  </v-container>
</template>

<script setup>
const route = useRoute();

const { data: page } = await useAsyncData('doc',() => queryContent(route.path).findOne())

</script>
<style>

</style>
