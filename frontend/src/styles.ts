export const baseStyles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  pageTitle: { textAlign: 'center', color: '#333', marginBottom: '20px' },
  nav: {
    marginBottom: '20px',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    textAlign: 'center',
  },
  navLink: {
    margin: '0 15px',
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    padding: '5px 0',
  },
};
