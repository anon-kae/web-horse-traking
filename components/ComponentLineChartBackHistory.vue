<template>
  <v-container>
    <ApexCharts
      ref="chartBackHistory"
      :options="options"
      :series="series"
      chart-id="lineChart" />
    <client-only />
  </v-container>
</template>

<script>
import { formatTime } from '../utils/dayjs';
export default {
  name: 'LandingPage',
  props: {
    valueChart: {
      type: Array || Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: [],
      options: {
        chart: {
          id: 'realtime',
          height: 350,
          width: '100%',
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Back sensor',
          align: 'left'
        },
        markers: {
          size: 0
        },
        legend: {
          show: true
        },
        xaxis: {
          type: 'datetime',
          rang: 7000000,
          labels: {
            formatter (value, timestamp) {
              return formatTime(timestamp)
            },
          }
        },
      },
      series: [
        {
          name: 'ความเร่งแกน X',
          data: []
        },
        {
          name: 'ความเร่งแกน Y',
          data: []
        },
        {
          name: 'ความเร่งแกน Z',
          data: []
        }
      ]
    }
  },
  mounted () {
    this.valueChart.forEach(({ date, value }) => {
      this.series[0].data.push({ x: new Date(date), y: parseInt(value.AcX) })
      this.series[1].data.push({ x: new Date(date), y: parseInt(value.AcY) })
      this.series[2].data.push({ x: new Date(date), y: parseInt(value.AcZ) })
    })

    this.$refs.chartBackHistory.updateSeries(this.series, false, true);
    this.$refs.chartBackHistory.updateOptions({
      title: {
        text: `Back sensor of ${this.title}`
      }
    })
  },
}
</script>
