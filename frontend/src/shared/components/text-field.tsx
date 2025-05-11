import React, { CSSProperties } from 'react';

interface InputProps {
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  type?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  datacy?: string;
}

const componentDefaultStyles = {
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  } as CSSProperties,
  inputErrorHighlight: {
    border: '1px solid #D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: '0.875rem',
    marginTop: '4px',
    minHeight: '1.2em',
  },
};

const Input = ({
  name,
  value,
  onChange,
  type = 'text',
  id,
  placeholder,
  label,
  error,
  style,
  datacy,
}: InputProps) => {
  const inputId = id || name;
  const currentInputStyle = {
    ...(style ? style : componentDefaultStyles.input),
    ...(error ? componentDefaultStyles.inputErrorHighlight : {}),
  };

  return (
    <>
      {label && (
        <label htmlFor={inputId} style={componentDefaultStyles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={currentInputStyle as CSSProperties}
        data-cy={datacy}
      />
      {error && (
        <p id={`${inputId}-error`} style={componentDefaultStyles.errorText}>
          {error}
        </p>
      )}
    </>
  );
};

export default Input;
