import { LoanApplication } from '@test-app/shared/models';
import { calculateMonthlyPayment } from '@test-app/shared/helpers';

const lenders = [
  { name: 'Lender A', interestRate: 4.5 },
  { name: 'Lender B', interestRate: 5.2 },
  { name: 'Lender C', interestRate: 6.0 },
];

export function getLoanOffers(input: LoanApplication) {
  const { loanDetails, personalDetails } = input;

  const offers = lenders.map((lender) => {
    const monthlyPayment = calculateMonthlyPayment(
      loanDetails.amount - loanDetails.deposit,
      lender.interestRate,
      loanDetails.loanTerm
    );

    return {
      lender: lender.name,
      interestRate: lender.interestRate,
      monthlyPayment: Number(monthlyPayment.toFixed(2)),
      termMonths: loanDetails.loanTerm * 12,
      totalLoanAmount: loanDetails.amount - loanDetails.deposit,
      applicant: `${personalDetails.firstName} ${personalDetails.lastName}`,
    };
  });

  return offers;
}
