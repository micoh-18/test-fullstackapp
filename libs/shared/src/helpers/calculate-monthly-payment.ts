export function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  loanTerm: number
): number {
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly and percentage to

  const numberOfPayments = loanTerm * 12; // Convert term in years to number of monthly payments
  // Calculate monthly payment using the formula
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment;
}
