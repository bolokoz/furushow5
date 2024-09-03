<script lang="ts" setup>
import { Radar } from "vue-chartjs";

const props = defineProps( {
  parmegiana: {
    default: {
      title : 'parmegiana',
    }
  }
})


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
          label: props.parmegiana.title,
          data: [1, 1, 2, 1, 3, 2, 2],
      //     borderColor: '#000000',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)',
    tension: 0.02,
      // backgroundColor: '#FFFFFF',
        }
      ]
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
            title: {
                display: true,
                text: 'Parmegianólogo',
                padding: {
                    top: 10,
                    bottom: 20
                }
            },
            subtitle: {
                display: true,
                text: 'ASdasdasd '
            }
        },
  scales: {
        r: {
          ticks: {
          display: false,
          stepSize: 1
        },
            angleLines: {
                // display: false
            },
            suggestedMin: 0,
            suggestedMax: 3
        }
      }
});
</script>
<template>
  <div style="background-color: antiquewhite;">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>
