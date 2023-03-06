import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AuthService, TrainingService } from '../services';

import FirebaseService from '../services/FirebaseService';
/**
 * API factory of services
 */
const apiFactory = (firebaseService, app, store) => {
  /**
   * Define services here, it will be constructed later
   */
  const services = {
    authService: AuthService,
    trainingService: TrainingService
  }

  /**
   * construct each service with own firebaseService instance
   */
  for (const [name, ServiceFactory] of Object.entries(services)) {
    const ownService = {
      auth: getAuth(firebaseService),
      database: getFirestore(firebaseService)
    }
    services[name] = ServiceFactory(ownService, app, store)
  }

  return services
}

export default ({ app, store }, inject) => {
  const api = apiFactory(FirebaseService, app, store)
  inject('api', api)
}
