type StyleObject = React.CSSProperties;

export const loanStyles: { [key: string]: StyleObject } = {
  formGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px', fontWeight: 'bold' },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
  },
  errorInput: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: '0.8em', marginTop: '4px' },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    marginRight: '10px',
  },
  buttonDisabled: { backgroundColor: '#ccc', cursor: 'not-allowed' },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  stepIndicator: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.1em',
    fontWeight: 'bold',
  },

  responseMessage: {
    padding: '10px',
    marginTop: '20px',
    borderRadius: '4px',
    border: '1px solid',
  },
  successMessage: {
    borderColor: 'green',
    backgroundColor: '#e6ffe6',
    color: 'green',
  },
  errorMessage: {
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
    color: 'red',
  },
};
