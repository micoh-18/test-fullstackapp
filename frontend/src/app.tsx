import { Routes, Route, Link, Navigate } from 'react-router-dom';
import LoanApplicationPage from './loans/pages/LoanApplication';
import LoanSummaryPage from './loans/pages/LoanSummary';
import { baseStyles } from './styles';
import PageContainer from './shared/components/page-container';

const ROUTES = {
  HOME: '/',
  APPLICATION: '/application',
  SUMMARY: '/summary',
};

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.APPLICATION, label: 'Apply for Loan' },
];

// can place a omponnet for this.
const HomePage = () => (
  <PageContainer title="Welcome to the Loan Portal">
    <p style={{ textAlign: 'center' }}>
      Please use the navigation to apply for a loan.
    </p>
  </PageContainer>
);

const App = () => {
  return (
    <>
      <nav style={baseStyles.nav}>
        {NAV_LINKS.map((link) => (
          <Link key={link.to} to={link.to} style={baseStyles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.APPLICATION} element={<LoanApplicationPage />} />
        <Route path={ROUTES.SUMMARY} element={<LoanSummaryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
