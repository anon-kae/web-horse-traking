<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12">
        <h1>
          <v-btn icon @click="$router.go(-1)">
            <v-icon>
              mdi-arrow-left-bold-circle-outline
            </v-icon>
          </v-btn>
          {{ title }}
        </h1>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-tabs
            v-model="tab"
            dark
            centered
            icons-and-text>
            <v-tabs-slider />

            <v-tab href="#tab-1" class="text-capitalize">
              Horse
              <v-icon>bedroom_baby</v-icon>
            </v-tab>

            <v-tab href="#tab-2" class="text-capitalize">
              Summary
              <v-icon>query_stats</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-card-text>
                  <v-col cols="12" md="3">
                    <v-card width="500" height="200">
                      <v-container class="fill-height">
                        <v-row justify="center" align="center">
                          <v-col v-for="horse in details?.horses" :key="horse.id" cols="12">
                            <v-list-item two-line>
                              <v-list-item-content>
                                <v-list-item-title>
                                  <div class="d-flex justify-center text-h4">
                                    {{ horse.speed ?? 0 }} km/h
                                  </div>
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-card-text>
                <v-col cols="12">
                  <v-card>
                    <component-lin-chart :chart-data="chartData" />
                  </v-card>
                </v-col>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ComponentLinChart from '../../../components/ComponentLinChart.vue'
import { formatDate, formatMonth, formatYear, formatFullDate, formatRelativeDate } from '@/utils/dayjs';
export default {
  name: 'IndexPage',
  components: { ComponentLinChart },
  data () {
    return {
      details: {},
      tab: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      title: '',
      panel: [0, 1],
      formatter: {
        formatDate,
        formatMonth,
        formatYear,
        formatFullDate,
        formatRelativeDate
      },
      id: null,
      chartData: {
        labels: ['a', 'a', 'a', 'a', 'a'],
        datasets: [
          {
            label: 'Round 1',
            data: [2, 1, 16, 3, 2],
            backgroundColor: 'rgba(20, 255, 0, 0.3)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
          },
          {
            label: 'Round 2',
            data: [3, 2, 17, 4, 3],
            backgroundColor: 'rgba(20, 255, 0, 0.3)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
          },
        ],
      },
    };
  },
  async created () {
    this.id = this.$route.params.id
    this.title = this.$route.query.title

    await this.findAll(this.id)
  },
  methods: {
    async findAll (trainingId) {
      const horses = await this.$api.trainingService.findAllHorseByTrainingId(trainingId);
      const training = await this.$api.trainingService.findTrainingById(trainingId);
      this.details = { training, horses }
    },
    colorStatus (status) {
      const condition = {
        PENDING: 'orange',
        ACTIVE: 'success',
        INACTIVE: 'error',
      }

      return condition[status];
    }
  }
}
</script>
