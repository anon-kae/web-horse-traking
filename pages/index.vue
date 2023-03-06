<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12">
        <h1>All Training</h1>
      </v-col>

      <v-col v-for="(training) in trainings" :key="training.id" cols="12" md="4">
        <v-card dark width="500" height="200" @click="moreDetail(training)">
          <v-container class="fill-height">
            <v-row justify="center" align="center">
              <v-col cols="12">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      <div class="d-flex justify-center text-h4">
                        {{ training.title }}
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="d-flex justify-center">
                        <v-chip
                          class="mb-1"
                          small
                          outlined
                          text-color="white">
                          total running distance {{ training.distance }}
                        </v-chip>
                      </div>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <div class="d-flex justify-center">
                        <v-chip
                          class="mb-1"
                          :color="colorStatus(training.status)"
                          small
                          outlined
                          text-color="white">
                          {{ training.status }}
                        </v-chip>
                      </div>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <div class="d-flex justify-center">
                        <v-tooltip v-if="training.createdAt" top>
                          <template #activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                              {{ formatter.formatRelativeDate(training.createdAt) }}
                            </span>
                          </template>
                          {{ formatter.formatFullDate(training.createdAt) }}
                        </v-tooltip>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { formatDate, formatMonth, formatYear, formatFullDate, formatRelativeDate } from '@/utils/dayjs';
export default {
  name: 'IndexPage',
  data () {
    return {
      value: {},
      active: {},
      date: {},
      data: {},
      options: {},
      menu: {},
      available: 10,
      trainings: [],
      formatter: {
        formatRelativeDate,
        formatFullDate,
        formatDate,
        formatMonth,
        formatYear
      },
    };
  },
  computed: {
  },
  async mounted () {
    await this.findAll()
  },
  methods: {
    async findAll () {
      this.trainings = await this.$api.trainingService.findAll();
    },
    moreDetail (item) {
      this.$router.push({ name: 'detail-id', params: { id: item.id }, query: { title: item.title } })
    },
    colorStatus (status) {
      const condition = {
        PENDING: 'orange',
        ACTIVE: 'success',
        INACTIVE: 'error',
      }

      return condition[status];
    },
  }
}
</script>
