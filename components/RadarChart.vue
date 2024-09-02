<script lang="ts" setup>
import { Radar } from "vue-chartjs";
const chartData = ref({
    labels: [
        "Carne 1",
        "Carne 2",
        "Molho 1",
        "Molho 2",
        "Mais Valia",
        "Apresentação",
        "Acompanhamentos",
      ],
      datasets: [
        {
          data: [4, 5, 3, 5, 3, 4, 5],
        }
      ]
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>
<template>
  <div>
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>
