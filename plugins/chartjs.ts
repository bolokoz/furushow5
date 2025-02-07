import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale,   PointElement,
    LineElement,
    Filler, } from 'chart.js'
export default defineNuxtPlugin(() => {
    Chart.register(CategoryScale, LinearScale, RadialLinearScale, BarElement, Title, Tooltip, Legend,   PointElement,
        LineElement,
        Filler)
})