import request from 'supertest';
import express, { Express } from 'express';
import getLoanOffersRouter from './get-loan-offers';

const mockSafeParse = jest.fn();
const mockGetLoanOffers = jest.fn();

jest.mock('@test-app/shared/models/index', () => ({
  LoanApplicationInputSchema: {
    safeParse: mockSafeParse,
  },
}));

jest.mock('../services/get-loan-offers', () => ({
  getLoanOffers: mockGetLoanOffers,
}));

let app: Express;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.use(getLoanOffersRouter);
});

beforeEach(() => {
  mockSafeParse.mockReset();
  mockGetLoanOffers.mockReset();
});

describe('POST /loan-offers', () => {
  it('returns 422 if validation fails', async () => {
    const validationErrors = [
      { path: ['amount'], message: 'Amount must be a positive number' },
    ];

    mockSafeParse.mockReturnValue({
      success: false,
      error: { errors: validationErrors },
    });

    const response = await request(app)
      .post('/loan-offers')
      .send({ amount: -10 });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({ errors: validationErrors });
  });

  it('returns 201 with offers if input is valid', async () => {
    const validBodyThatMatchesSchema = {
      personalDetails: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@example.com',
        employmentStatus: 'FULL_TIME',
        employerName: 'Test Inc.',
      },
      loanDetails: {
        loanPurpose: 'CAR_LOAN',
        amount: 5000,
        loanTerm: 3,
        deposit: 1000,
      },
    };

    const mockOffers = [
      { provider: 'Bank X', interestRate: 0.05, monthlyPayment: 450.5 },
      {
        provider: 'Credit Union Y',
        interestRate: 0.048,
        monthlyPayment: 448.0,
      },
    ];

    mockSafeParse.mockReturnValue({
      success: true,
      data: validBodyThatMatchesSchema,
    });
    mockGetLoanOffers.mockReturnValue(mockOffers);

    const response = await request(app)
      .post('/loan-offers')
      .send(validBodyThatMatchesSchema);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ offers: mockOffers });
  });
});
