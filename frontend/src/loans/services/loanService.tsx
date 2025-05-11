import { LoanApplication } from '@test-app/shared/models/index';
interface ApiErrorResponse {
  message?: string;
  error?: { message?: string };
  errors?: Array<{ path: string[]; message: string }>;
}

export interface ApiSuccessResponse {
  id: string;
  status: string;
  [key: string]: any;
}

export const submitLoanApplication = async (
  loanApplication: LoanApplication
): Promise<ApiSuccessResponse> => {
  console.log(
    'Submitting Data to Backend:',
    JSON.stringify(loanApplication, null, 2)
  );

  try {
    const response = await fetch('http://localhost:3333/api/loans/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loanApplication),
    });
    console.log('API Response:', response);

    const responseData: ApiSuccessResponse | ApiErrorResponse =
      await response.json();

    if (!response.ok) {
      let errorMessage = `Request failed: ${response.status}`;
      const errorData = responseData as ApiErrorResponse;
      if (errorData.error?.message) errorMessage = errorData.error.message;
      else if (errorData.message) errorMessage = errorData.message;
      else if (errorData.errors?.length) {
        errorMessage = errorData.errors
          .map((err) => `${err.path.join('.')} - ${err.message}`)
          .join('; ');
      }
      throw new Error(errorMessage);
    }

    return responseData as ApiSuccessResponse;
  } catch (error) {
    console.error('Loan application submission error:', error);
    throw error;
  }
};
