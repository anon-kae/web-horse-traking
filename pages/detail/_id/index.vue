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
              Round
              <v-icon>timer</v-icon>
            </v-tab>

            <v-tab href="#tab-2" class="text-capitalize">
              Horse
              <v-icon>bedroom_baby</v-icon>
            </v-tab>

            <v-tab href="#tab-3" class="text-capitalize">
              Summary
              <v-icon>query_stats</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-card-text>
                  <v-col cols="12" md="3">
                    <v-btn
                      color="primary"
                      large
                      :disabled="isLoading"
                      @click="startCountdown">
                      Timer Start
                      <v-icon class="pl-2">
                        mdi-alarm
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers"
                      :items="desserts"
                      item-key="name">
                      <template #item.timer>
                        <Countdown
                          :time="timer / 1000"
                          format="hh:mm:ss"
                          @on-end="onEndCountdown"
                          @on-countdown="onCountdown">
                          <template slot-scope="{ time }">
                            {{ time }}
                          </template>
                        </Countdown>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-card flat>
                <v-card-text class="d-flex justify-center">
                  <v-col cols="12" md="8">
                    <v-row justify="center">
                      <v-expansion-panels inset>
                        <v-expansion-panel v-for="horse in details?.horses" :key="horse.id">
                          <v-expansion-panel-header>
                            <b> Name: {{ horse.horseName }} </b>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-list-item two-line>
                              <v-list-item-content>
                                <v-list-item-title>
                                  <v-chip
                                    color="success"
                                    label
                                    outlined>
                                    Best Speed:
                                    {{ horse.speed ?? 0 }} km/h
                                  </v-chip>
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item two-line>
                              <v-list-item-content>
                                <v-list-item-title><b>Sex</b></v-list-item-title>
                                <v-list-item-subtitle>
                                  {{ horse.sex }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item two-line>
                              <v-list-item-content>
                                <v-list-item-title><b>Species</b></v-list-item-title>
                                <v-list-item-subtitle>
                                  {{ horse.species }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-3">
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
import Countdown from '@choujiaojiao/vue2-countdown';
import ComponentLinChart from '../../../components/ComponentLinChart.vue'
import { formatDate, formatMonth, formatYear, formatFullDate, formatRelativeDate } from '@/utils/dayjs';
export default {
  name: 'IndexPage',
  components: { ComponentLinChart, Countdown },
  data () {
    return {
      details: {},
      isLoading: false,
      tab: null,
      title: '',
      timer: 0,
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
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Timer', value: 'timer' },
      ],
      desserts: [],
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
      this.desserts = this.details.training?.rounds ? [...this.details.training?.rounds] : []
      if (localStorage.getItem('time')) {
        this.isLoading = true;
        this.timer = parseInt(localStorage.getItem('time')) * 1000
      }
    },
    async startCountdown () {
      this.isLoading = true;
      this.timer = await this.$api.trainingService.onCountdown(this.id)
      localStorage.setItem('time', (this.timer / 1000))
      await this.findAll(this.id)
      this.desserts = [...this.details.training.rounds]
    },
    onEndCountdown () {
      localStorage.removeItem('time')
      this.isLoading = false;
    },
    onCountdown (time) {
      localStorage.setItem('time', time)
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
