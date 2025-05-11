import { LoanApplicationInputSchema } from '@test-app/shared/models';
import { Router } from 'express';
import { getLoanOffers } from '../services/get-loan-offers';

const router = Router();

router.post('/loan-offers', (req, res) => {
  const result = LoanApplicationInputSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({ errors: result.error.errors });
  }
  const offers = getLoanOffers(result.data);
  return res.status(201).json({ offers });
});

export default router;
