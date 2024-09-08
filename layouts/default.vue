<template>
    <v-app id="inspire">
  
        <v-app-bar
      class="px-1"
      elevation="4"
      scroll-behavior="hide"
      dense
    >
      <v-btn
        color="grey-darken-1"
        size="32"
      >bolokos</v-btn>

      <v-spacer></v-spacer>

      <v-tabs
        color="grey-darken-2"
        centered
      >
        <v-tab
          v-for="link in links"
          :key="link"
          :text="link.title"
          :to="link.to"
        ></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <!-- <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-1"
        size="32"
      ></v-avatar> -->
    </v-app-bar>
  
      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <!--  -->
      </v-navigation-drawer>

  
      <v-main class="bg-grey-lighten-2">
            <slot/>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const drawer = ref(null)
    const links = [
        {title: 'Home', to:'/'},
        {title: 'Projects', to:'/projects'},
        {title: 'SideQuests', to:'/articles'},
  ]
  </script>
