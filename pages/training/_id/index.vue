<template>
  <v-container>
    <!-- Start header -->
    <component-header :title="title" />
    <!-- End header -->

    <v-row justify="center" align="center">
      <v-card width="800">
        <v-card-title>General</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="horse.horseName"
                label="HorseName"
                outlined />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="horse.sex"
                outlined
                :items="sexs"
                label="Sex" />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="horse.species"
                outlined
                :items="species"
                label="Species" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn depressed block color="primary" @click="registerHorse">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <v-divider class="mt-10" />

    <v-row class="mt-5">
      <v-col cols="12">
        <h1>Horses of {{ title }}</h1>
      </v-col>
      <v-col>
        <v-card>
          <v-text-field
            v-model="search"
            outlined
            append-icon="mdi-magnify"
            label="Search"
            single-line
            clearable
            hide-details />
          <v-data-table
            :headers="headers"
            :items="horses"
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
            <template #item.actions="{ item }">
              <v-icon
                color="error"
                @click="deleteHorse(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ComponentHeader from '@/components/header/Header'
import { formatFullDate, formatRelativeDate } from '@/utils/dayjs';
export default {
  name: 'PageViewtraining',
  components: { ComponentHeader },
  data () {
    return {
      title: '',
      species: [],
      sexs: ['เพศผู้', 'เพศเมีย'],
      training: {},
      search: '',
      horses: [],
      dialog: false,
      horse: {},
      detail: {},
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'start',
          sortable: false
        },
        {
          text: 'HorseName',
          value: 'horseName',
          align: 'center',
          sortable: false
        },
        {
          text: 'Sex',
          value: 'sex',
          align: 'center',
          sortable: false
        },
        {
          text: 'Species',
          value: 'species',
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
      ],
      formatter: {
        formatFullDate,
        formatRelativeDate
      },
    }
  },
  async mounted () {
    const { id } = this.$route.params
    this.training.id = id;
    // this.readMore(id)
    await this.findAll(id);
    await this.findAllSpecies()
  },
  methods: {
    async findAll (trainingId) {
      this.horses = await this.$api.trainingService.findAllHorseByTrainingId(trainingId);
    },
    async findAllSpecies () {
      this.species = await this.$api.trainingService.findAllSpecies();
    },
    async registerHorse () {
      if (!this.horse.horseName || !this.horse.species || !this.horse.sex) {
        await this.$store.dispatch('snackbar/setErrorMessage', 'Horse name or species or sex is require!');
        return;
      }
      await this.$api.trainingService.registerHorse({ ...this.horse, trainingId: this.training.id })
      this.horse = {}
      await this.findAll(this.training.id);
    },
    async deleteHorse ({ id: horseId }) {
      await this.$api.trainingService.deleteHorse({ horseId, trainingId: this.training.id })
      await this.findAll(this.training.id);
    },
    // readMore (id) {
    //   this.$api.trainingService.findById(id, (results) => {
    //     this.training = { id, ...results }
    //     this.title = `training ${results.trainingName}`
    //   })
    // }
  }
}
</script>
