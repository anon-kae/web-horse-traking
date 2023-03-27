// import { ref, onValue } from 'firebase/database';
import { collection, query, where, getDocs, setDoc, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import ms from 'ms';
export default function ({ database }, app, store) {
  return {
    async onEndCountdown (trainingId, { name }) {
      const { rounds } = await this.findTrainingById(trainingId);
      const roundResult = rounds ? [...rounds] : []

      roundResult.forEach((e) => {
        if (e.name === name) {
          e.status = 'END'
        }
      })

      await updateDoc(doc(database, `Training/${trainingId}`), {
        rounds: roundResult,
        timerStatus: 'END',
      })

      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Timeout'
      )
    },
    async addValueOnMQTT (trainingId, round, value) {
      const { rounds } = await this.findTrainingById(trainingId);
      const roundResult = rounds ? [...rounds] : []

      // roundResult[round].labs

      await updateDoc(doc(database, `Training/${trainingId}`), {
        rounds: roundResult,
      })
    },
    async onCountdown (trainingId) {
      const { time, rounds } = await this.findTrainingById(trainingId);

      const roundResult = rounds ? [...rounds] : []
      const numberOfRound = rounds?.length ? rounds.length : 0;

      roundResult.push({
        status: 'START',
        name: `Round ${numberOfRound}`,
        createdAt: new Date(),
      })

      await updateDoc(doc(database, `Training/${trainingId}`), {
        rounds: roundResult,
        timerStatus: 'START',
        round: numberOfRound
      })

      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Create Round Successfully'
      )

      return { ms: ms(time), round: numberOfRound };
    },
    async findAll (status = 'ACTIVE') {
      const db = collection(database, 'Training');
      const qs = query(db, where('status', '==', status));
      const snapshot = await getDocs(qs);

      if (snapshot.empty) {
        return [];
      };

      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt?.toDate() }))
    },
    async findTrainingById (trainingId) {
      const snapshot = await getDoc(doc(database, `Training/${trainingId}`));

      if (snapshot.empty) {
        return [];
      };

      const result = {
        ...snapshot.data(),
        id: snapshot.id,
        createdAt: snapshot.data().createdAt?.toDate()
      }

      return result;
    },
    async findAllSpecies () {
      const db = collection(database, 'Species');
      const qs = query(db);
      const snapshot = await getDocs(qs);

      if (snapshot.empty) {
        return [];
      };

      return snapshot.docs.map(doc => (doc.data().name))
    },
    async findAllHorseByTrainingId (trainingId) {
      const db = collection(database, 'Animals');
      const qs = query(db, where('trainingId', '==', trainingId));
      const snapshot = await getDocs(qs);

      if (snapshot.empty) {
        return [];
      };

      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt?.toDate() }))
    },
    async findHorseByTrainingId (trainingId) {
      const db = collection(database, 'Animals');
      const qs = query(db, where('trainingId', '==', trainingId));
      const snapshot = await getDocs(qs);

      if (snapshot.empty) {
        return [];
      };

      return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, createdAt: doc.data().createdAt?.toDate() }))
    },
    async create ({ name, distance, description, time }) {
      const db = collection(database, 'Training');
      await setDoc(doc(db), {
        title: name,
        distance: Number(distance),
        description,
        time,
        status: 'ACTIVE',
        rounds: [],
        numberOfHorse: 0,
        createdAt: new Date()
      })

      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Create Event Successfully'
      )
    },
    async registerHorse ({ horseName, sex, species, trainingId }) {
      const db = collection(database, 'Animals');
      await setDoc(doc(db), {
        horseName,
        species,
        speed: 0,
        trainingId,
        typeId: 'Bgxd5cyTFipQgwZlOY1w',
        status: 'ACTIVE',
        sex,
        createdAt: new Date()
      })

      const horses = await this.findHorseByTrainingId(trainingId)
      const numberOfHorse = horses.length - 1;
      await updateDoc(doc(database, `Training/${trainingId}`), {
        numberOfHorse: numberOfHorse + 1,
      })

      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Create Horse Successfully'
      )
    },
    async delete (trainingId) {
      const horses = await this.findHorseByTrainingId(trainingId)
      horses.forEach(async ({ id }) => {
        await deleteDoc(doc(database, `Animals/${id}`))
      })

      await deleteDoc(doc(database, `Training/${trainingId}`))
      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Delete Event Successfully!'
      )
    },
    async deleteHorse ({ horseId, trainingId }) {
      const horses = await this.findHorseByTrainingId(trainingId)
      const numberOfHorse = horses.length;
      await updateDoc(doc(database, `Training/${trainingId}`), {
        numberOfHorse: numberOfHorse - 1,
      })

      await deleteDoc(doc(database, `Animals/${horseId}`))

      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Delete Horse Successfully!'
      )
    }
  }
}
