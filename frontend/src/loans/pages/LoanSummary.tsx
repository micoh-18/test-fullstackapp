import { useLocation, Link } from 'react-router-dom';
import { loanStyles } from '../styles';
import PageContainer from '../../shared/components/page-container';

import { LoanApplication } from '@test-app/shared/models/index';

const LoanSummaryPage = () => {
  const location = useLocation();
  const state = location.state as LoanApplication;
  const applicationDetails = state ?? null;

  return (
    <PageContainer title="Personal Loan Details">
      {applicationDetails ? (
        <div>
          <p>Thank you for your application!</p>
          <h3>Application Details:</h3>
          <div style={loanStyles.details}>
            <pre>{JSON.stringify(applicationDetails, null, 2)}</pre>
          </div>
          <p style={{ marginTop: '20px' }}>
            <Link to="/application" style={loanStyles.navLink}>
              Submit another application
            </Link>
          </p>
        </div>
      ) : (
        <p>
          No application details found. Please submit an application first or
          ensure you were redirected correctly.
        </p>
      )}
    </PageContainer>
  );
};

export default LoanSummaryPage;
