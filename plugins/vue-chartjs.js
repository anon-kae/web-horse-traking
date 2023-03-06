import Vue from 'vue'
import { Line as LineChart, Pie as PieChart, Bar as BarChart, Radar as RadarChart, Doughnut as DoughnutChart } from 'vue-chartjs/legacy'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

if (!Vue.__vue_chartjs__) {
  Vue.__vue_chartjs__ = true

  ChartJS.defaults.font.family = '\'Rubik\', \'Roboto\', sans-serif';
  ChartJS.defaults.elements.line.fill = false;
  ChartJS.defaults.elements.line.tension = 0;
  ChartJS.defaults.elements.line.borderWidth = 2;

  Vue.mixin({
    components: { LineChart, PieChart, BarChart, RadarChart, DoughnutChart }
  })
}
