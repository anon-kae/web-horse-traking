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
  props: {
    timeStatus: {
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
          text: 'Front sensor',
          align: 'left'
        },
        markers: {
          size: 0
        },
        legend: {
          show: true,
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
    this.client.subscribe('horse/accumulator/one')
    this.client.on('message', (topic, payload) => {
      this.$refs.chart.updateSeries(this.series, false, true);
      if (this.timeStatus === 'start') {
        const value = payload.toString().split(',')
        const [AcX, AcY, AcZ] = value;
        const now = new Date();
        this.data.push({ value: { AcX, AcY, AcZ }, date: now })

        this.series[0].data.push({ x: now, y: parseInt(AcX) })
        this.series[1].data.push({ x: now, y: parseInt(AcY) })
        this.series[2].data.push({ x: now, y: parseInt(AcZ) })

        this.$refs.chart.updateSeries(this.series, false, true);

        localStorage.setItem('labs1', JSON.stringify(this.data));
      } else if (this.timeStatus === 'end') {
        localStorage.setItem('labs1', JSON.stringify(this.data));
        this.data = []
      }
    })
  },
}
</script>
