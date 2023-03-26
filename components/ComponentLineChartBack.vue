<template>
  <v-container>
    <ApexCharts
      ref="chart"
      :options="options"
      :series="series"
      chart-id="lineChart" />
    <client-only />
  </v-container>
</template>

<script>
import mqtt from 'mqtt';
import { formatTime } from '../utils/dayjs';
export default {
  name: 'LandingPage',
  data () {
    return {
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
    this.client = mqtt.connect('mqtt://157.245.53.254', { port: 8083, username: 'horse-traking', password: '123456' });
    this.client.subscribe('horse/accumulator/two')
    this.client.on('message', (topic, payload) => {
      const value = payload.toString().split(',')
      const length = value.length;
      if (length > 2) {
        const [AcX, AcY, AcZ] = value;

        this.series[0].data.push({ x: new Date(), y: parseInt(AcX) })
        this.series[1].data.push({ x: new Date(), y: parseInt(AcY) })
        this.series[2].data.push({ x: new Date(), y: parseInt(AcZ) })

        this.$refs.chart.updateSeries(this.series, false, true);
      } else {
        this.$refs.chart.updateSeries(this.series, false, true);
      }
    })
  },
}
</script>
