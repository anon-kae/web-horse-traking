<template>
  <v-container>
    <!-- Start header -->
    <component-header top-level :title="title" />
    <!-- End header -->

    <!-- Start form create serialName -->
    <v-row justify="center" align="center">
      <v-card width="800">
        <v-card-title>General</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="training.name"
                label="TrainingName"
                hide-details
                outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="training.distance"
                label="Distance"
                hide-details
                outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="training.time"
                label="Time"
                hide-details
                outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="training.description"
                label="Description"
                hide-details
                outlined />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn depressed block color="primary" @click="createTraining">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <!-- End form create serialName -->

    <!-- Start line -->
    <v-divider class="mt-10" />
    <!-- End line -->

    <!-- Start wait connection to device -->
    <v-row class="mt-5">
      <v-col cols="12">
        <h1>Training</h1>
      </v-col>
      <v-col>
        <v-card>
          <v-text-field
            v-model="search"
            class="pa-2"
            outlined
            append-icon="mdi-magnify"
            label="Search"
            single-line
            clearable
            hide-details />
          <v-data-table
            :headers="headers"
            :items="trainings"
            :search="search">
            <template #[`item.createdAt`]="{ value }">
              <v-tooltip v-if="value" top>
                <template #activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    {{ formatter.formatRelativeDate(value) }}
                  </span>
                </template>
                {{ formatter.formatFullDate(value) }}
              </v-tooltip>
            </template>
            <template #[`item.status`]="{ value }">
              <v-chip
                outlined
                :color="colorStatus(value)"
                dark>
                {{ value }}
              </v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-icon
                color="primary"
                class="mr-2"
                @click="readMore(item)">
                visibility
              </v-icon>
              <v-icon
                color="error"
                @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- End wait connection to device -->
  </v-container>
</template>

<script>
import ComponentHeader from '@/components/header/Header'
import { formatFullDate, formatRelativeDate } from '@/utils/dayjs';
export default {
  name: 'PageCreateEvent',
  components: { ComponentHeader },
  data () {
    return {
      title: 'Create Training',
      trainings: [],
      training: {},
      detail: {},
      search: '',
      dialog: false,
      formatter: {
        formatFullDate,
        formatRelativeDate
      },
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'start',
          sortable: false
        },
        {
          text: 'Training',
          value: 'title',
          align: 'center',
          sortable: false
        },
        {
          text: 'Time',
          value: 'time',
          align: 'center',
          sortable: false
        },
        {
          text: 'Distance',
          value: 'distance',
          align: 'center',
          sortable: false
        },
        {
          text: 'NumberOfHourse',
          value: 'numberOfHorse',
          align: 'center',
          sortable: false
        },
        {
          text: 'Status',
          value: 'status',
          align: 'center',
          sortable: false
        },
        {
          text: 'Created at',
          value: 'createdAt',
          align: 'center',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center',
        },
      ]
    }
  },
  async mounted () {
    await this.findAll();
  },
  methods: {
    async findAll () {
      this.trainings = await this.$api.trainingService.findAll();
    },
    async createTraining () {
      if (!this.training.name || !this.training.distance || !this.training.time || !this.training.description) {
        await this.$store.dispatch('snackbar/setErrorMessage', 'Please fill out all information!');
        return;
      }
      await this.$api.trainingService.create(this.training)
      this.training = {}
      await this.findAll()
    },
    async deleteItem ({ id }) {
      await this.$api.trainingService.delete(id)
      await this.findAll()
    },
    readMore ({ id }) {
      this.$router.push({ name: 'training-id', params: { id }, })
    },
    colorStatus (status) {
      const condition = {
        ACTIVE: 'green',
        INACTIVE: 'error',
      }

      return condition[status];
    }
  }
}
</script>
