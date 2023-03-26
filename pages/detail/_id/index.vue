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
              Monitoring
              <v-icon>stacked_line_chart</v-icon>
            </v-tab>
            <v-tab href="#tab-4" class="text-capitalize">
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
                      <template #item.timer="{ item }">
                        <div v-if="item.status !== 'END'">
                          <Countdown
                            :time="timer.ms / 1000"
                            format="hh:mm:ss"
                            @on-end="onEndCountdown(item)"
                            @on-countdown="onCountdown">
                            <template slot-scope="{ time }">
                              {{ time }}
                            </template>
                          </Countdown>
                        </div>
                        <div v-else>
                          Time out
                        </div>
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
              <v-card-text v-if="round !== null">
                <v-col cols="12">
                  <v-card>
                    <ComponentLineChartFront :round="round" />
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <ComponentLineChartBack :round="round" />
                  </v-card>
                </v-col>
              </v-card-text>
            </v-tab-item>
            <v-tab-item value="tab-4">
              <!-- <v-card-text>
                <v-col cols="12">
                  <v-card>
                    <ComponentLineChartFront :round="round" />
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <ComponentLineChartBack :round="round" />
                  </v-card>
                </v-col>
              </v-card-text> -->
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Countdown from '@choujiaojiao/vue2-countdown';
import ComponentLineChartBack from '../../../components/ComponentLineChartBack.vue'
import ComponentLineChartFront from '../../../components/ComponentLineChartFront.vue'
import { formatDate, formatMonth, formatYear, formatFullDate, formatRelativeDate } from '@/utils/dayjs';
export default {
  name: 'IndexPage',
  components: { Countdown, ComponentLineChartBack, ComponentLineChartFront },
  data () {
    return {
      client: null,
      details: {},
      isLoading: false,
      tab: null,
      title: '',
      timer: {},
      round: null,
      panel: [0, 1],
      formatter: {
        formatDate,
        formatMonth,
        formatYear,
        formatFullDate,
        formatRelativeDate
      },
      id: null,
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
        this.timer.ms = parseInt(localStorage.getItem('time')) * 1000
      }
    },
    async startCountdown () {
      this.isLoading = true;
      this.timer = await this.$api.trainingService.onCountdown(this.id)
      localStorage.setItem('time', (this.timer.ms / 1000))
      this.round = this.timer.rounds;
      await this.findAll(this.id)
      this.desserts = [...this.details.training.rounds]
    },
    async onEndCountdown (item) {
      await this.$api.trainingService.onEndCountdown(this.id, item)
      localStorage.removeItem('time')
      this.isLoading = false;
      await this.findAll(this.id)
      this.desserts = [...this.details.training.rounds]
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
