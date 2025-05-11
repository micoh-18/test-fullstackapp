import { z } from 'zod';
import { EMPLOYMENT_STATUSES } from '../enums';
import { LOAN_PURPOSES } from '../enums/loan-purposes';

export const PersonalDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  employmentStatus: z.nativeEnum(EMPLOYMENT_STATUSES),
  employerName: z.string().trim(),
});

export const LoanDetailsSchema = z.object({
  loanPurpose: z.nativeEnum(LOAN_PURPOSES),
  amount: z.number().min(2000).max(10000),
  loanTerm: z.number().min(1).max(7),
  deposit: z.number().min(0),
});

export const LoanApplicationInputSchema = z.object({
  personalDetails: PersonalDetailsSchema,
  loanDetails: LoanDetailsSchema,
});

export const LoanApplicationResponseSchema = z.object({
  message: z.string(),
  applicationId: z.string(),
  data: z.object({
    id: z.string(),
    submittedAt: z.string(),
    status: z.string(),
  }),
});

export type PersonalDetails = z.infer<typeof PersonalDetailsSchema>;
export type LoanDetails = z.infer<typeof LoanDetailsSchema>;
export type LoanApplication = z.infer<typeof LoanApplicationInputSchema>;
