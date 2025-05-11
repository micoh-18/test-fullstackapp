// src/pages/LoanApplicationPage.tsx (or wherever your component is located)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loanStyles } from '../styles';
import LoanApplicationForm from '../components/ApplicationForm';
import PageContainer from '../../shared/components/page-container';
import { LoanApplication } from '@test-app/shared/models/index';

import {
  submitLoanApplication,
  ApiSuccessResponse,
} from '../services/loanService';

const LoanApplicationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    type: 'success' | 'error';
    message: string;
    data?: ApiSuccessResponse;
  } | null>(null);

  const navigate = useNavigate();

  const handleApplyLoan = async (loanApplication: LoanApplication) => {
    setIsLoading(true);
    setApiResponse(null);

    try {
      const successData = await submitLoanApplication(loanApplication);

      setApiResponse({
        type: 'success',
        message: `Application submitted! ID: ${successData.id}, Status: ${successData.status}.`,
        data: successData,
      });
      navigate('/summary', {
        state: {
          applicationData: successData,
        },
      });
    } catch (error: any) {
      console.error('Loan application error in component:', error);
      setApiResponse({
        type: 'error',
        message: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Loan Application">
      <LoanApplicationForm onSubmit={handleApplyLoan} isLoading={isLoading} />
      {apiResponse && (
        <div
          style={{
            ...loanStyles.responseMessage,
            ...(apiResponse.type === 'success'
              ? loanStyles.successMessage
              : loanStyles.errorMessage),
          }}
        >
          <p>{apiResponse.message}</p>
        </div>
      )}
    </PageContainer>
  );
};

export default LoanApplicationPage;
