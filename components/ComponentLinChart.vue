<template>
  <LineChart
    ref="chart"
    v-bind="$attrs"
    :chart-data="chartRendered ? chartData : { datasets: [{}] }"
    :chart-options="{ ...defaultChartOptions, ...chartOptions }"
    @chart:rendered="chartRendered = true"
    v-on="$listeners" />
</template>

<script>
export default {
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    },
  },
  data () {
    return {
      chartRendered: false,
      defaultChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          animationDuration: 1 // duration of animations when hovering an item
        },
        interaction: {
          mode: 'nearest',
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            padding: 16,
            boxWidth: 8
          }
        },
        scales: {
          yAxes: {
            ticks: {
              suggestedMax: 10,
              fontColor: 'rgba(127, 127, 127, 0.7)'
            },
            title: {
              display: true,
              text: 'Lab graph',
            },
            grid: {
              color: 'rgba(196, 196, 196, 0.3)'
            }
          },
          xAxes: {
            ticks: {
              beginAtZero: true
            },
            grid: {
              color: 'rgba(196, 196, 196, 0.3)'
            }
          }
        },
      }
    }
  },
}
</script>
