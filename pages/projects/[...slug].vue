<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-main>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="9">
            <v-sheet  class="ma-2 pa-2 overflow-hidden" rounded="xl">
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
            </v-sheet>
          </v-col>
          <v-col md="3">
            <v-sheet color="primary" class="ma-2 pa-2" rounded="xl">
              <TOC :content="page" :activeTocId="activeTocId"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import TOC from '~/components/TOC.vue';

const route = useRoute();
const breadcrumbs = useBreadcrumbs(route.path)
const activeTocId = ref(null)
// const leftDrawer = ref(false);
// const rightDrawer = ref(false);

const { data: page } = await useAsyncData(
  "my-page",
  queryContent(route.path).findOne
);
</script>
<style></style>
