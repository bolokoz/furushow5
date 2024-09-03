<script lang="ts" setup>
import { Radar } from "vue-chartjs";

const props = defineProps({
  parmegiana: {
    default: {
      title: "parmegiana",
      rating: 1,
      rating_carne: 1,
      rating_molho: 1,
      rating_acompanhamentos: 1,
      rating_maisvalia: 1,
      rating_restaurant: 1,
    },
  },
});

const chartData = ref({
  labels: [
    "Carne 1",
    "Carne 2",
    "Molho 1",
    "Molho 2",
    "Acompanhamentos",
    "Mais Valia",
    "Apresentação",
  ],
  datasets: [
    {
      label: props.parmegiana.title.toUpperCase() + ': ' + props.parmegiana.rating,
      data: [
        props.parmegiana.rating_carne,
        props.parmegiana.rating_carne,
        props.parmegiana.rating_molho,
        props.parmegiana.rating_molho,
        props.parmegiana.rating_acompanhamentos,
        props.parmegiana.rating_maisvalia,
        props.parmegiana.rating_restaurant,
      ],
      //     borderColor: '#000000',
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
      tension: 0.02,
      // backgroundColor: '#FFFFFF',
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Parmegianólogo",
      padding: {
        top: 10,
        bottom: 20,
      },
    },
    legend: {
      labels: {
        font: {
          size: 14,
          family: 'Helvetica',
          weight: 'bolder'
        }
      }
    }
  },
  scales: {
    r: {
      ticks: {
        display: false,
        stepSize: 1,
      },
      angleLines: {
        // display: false
      },
      suggestedMin: 0,
      suggestedMax: 3,
    },
  },
});
</script>
<template>
  <div style="background-color: antiquewhite">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>
