import { Express } from 'express';

import getLoanOffers from './loans/routes/get-loan-offers';

const API_BASE_PATH = '/api/v1';

export function integrateRoutes(app: Express): void {
  app.use(API_BASE_PATH, getLoanOffers);

  console.log('Routes integrated.');
}
