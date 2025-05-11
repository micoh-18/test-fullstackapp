import React, { useState } from 'react';

import { loanStyles } from '../styles';
import { LoanApplication } from '@test-app/shared/models/index';
import {
  EMPLOYMENT_STATUSES,
  LOAN_PURPOSES,
} from '@test-app/shared/enums/index';
import Input from '../../shared/components/text-field';

type FormErrors = {
  [key: string]: string | undefined;
};

const LoanApplicationForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: LoanApplication) => void;
  isLoading: boolean; // directly adding this here to add specific types for the props
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<LoanApplication>({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      employmentStatus: EMPLOYMENT_STATUSES.EMPLOYED,
      employerName: '',
    },
    loanDetails: {
      loanPurpose: LOAN_PURPOSES.VEHICLE,
      amount: 0,
      loanTerm: 0,
      deposit: 0,
    },
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const [section, field] = name.split('.') as [keyof FormData, string];

    setFormData((prev: LoanApplication) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof LoanApplication],
        [field]:
          type === 'number' && e.target instanceof HTMLInputElement
            ? e.target.value === ''
              ? ''
              : Number(e.target.value)
            : value,
      },
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateStep1 = (): FormErrors => {
    const newErrors: FormErrors = {};
    const pd = formData.personalDetails;
    if (!pd.firstName.trim())
      newErrors['personalDetails.firstName'] = 'First name is required.';
    if (!pd.lastName.trim())
      newErrors['personalDetails.lastName'] = 'Last name is required.';
    if (!pd.email.trim())
      newErrors['personalDetails.email'] = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(pd.email))
      newErrors['personalDetails.email'] = 'Email is invalid.';
    if (!pd.employmentStatus)
      newErrors['personalDetails.employmentStatus'] =
        'Employment status is required.';
    if (
      !pd.employerName.trim() &&
      pd.employmentStatus === EMPLOYMENT_STATUSES.EMPLOYED
    ) {
      newErrors['personalDetails.employerName'] = 'Employer name is required.';
    }
    return newErrors;
  };

  const validateStep2 = (): FormErrors => {
    const newErrors: FormErrors = {};
    const ld = formData.loanDetails;
    if (!ld.loanPurpose)
      newErrors['loanDetails.loanPurpose'] = 'Loan purpose is required.';
    if (
      ld.amount === 0 ||
      Number(ld.amount) <= 0 ||
      Number(ld.amount) < 2000 ||
      Number(ld.amount) > 10000
    )
      newErrors['loanDetails.amount'] =
        'Loan Amount must be $2000 or greater, and no more than $10000.';
    if (ld.loanTerm === 0 || Number(ld.loanTerm) <= 0 || ld.loanTerm > 7)
      newErrors['loanDetails.loanTerm'] =
        'Valid loan term is required (e.g., up to 7 months).';
    if (
      (ld.deposit === 0 || Number(ld.deposit) < 0) &&
      formData.loanDetails?.loanPurpose === LOAN_PURPOSES.VEHICLE
    )
      newErrors['loanDetails.deposit'] = 'Valid deposit amount is required.';
    return newErrors;
  };

  const handleNext = () => {
    const step1Errors = validateStep1();
    if (Object.values(step1Errors).every((e) => !e)) {
      setErrors({});
      setStep(2);
    } else {
      setErrors(step1Errors);
    }
  };

  const handlePrevious = () => setStep(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const step1Errors = validateStep1();
    const step2Errors = validateStep2();
    const allErrors = { ...step1Errors, ...step2Errors };
    if (Object.values(allErrors).every((e) => !e)) {
      setErrors({});
      const submissionData: LoanApplication = {
        personalDetails: { ...formData.personalDetails },
        loanDetails: {
          ...formData.loanDetails,
        },
      };
      onSubmit(submissionData);
    } else {
      setErrors(allErrors);
    }
  };

  const renderError = (fieldName: string) =>
    errors[fieldName] && (
      <p style={loanStyles.errorText}>{errors[fieldName]}</p>
    );

  const step1 = () => {
    return (
      <>
        <h3>Personal Details</h3>
        <div style={loanStyles.formGroup}>
          <Input
            label="First Name"
            id="personalDetails.firstName"
            name="personalDetails.firstName"
            type="text"
            value={formData.personalDetails?.firstName || ''}
            onChange={handleChange}
            placeholder="John"
            error={errors['personalDetails.firstName']}
            datacy="first-name-input"
          />
        </div>
        <div style={loanStyles.formGroup}>
          <Input
            label="Last Name"
            id="personalDetails.lastName"
            name="personalDetails.lastName"
            type="text"
            value={formData.personalDetails?.lastName || ''}
            onChange={handleChange}
            placeholder="Doe"
            error={errors['personalDetails.lastName']}
            datacy="last-name-input"
          />
        </div>
        <div style={loanStyles.formGroup}>
          <Input
            label="Email Address"
            id="personalDetails.email"
            name="personalDetails.email"
            type="email"
            value={formData.personalDetails?.email || ''}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            error={errors['personalDetails.email']}
            datacy="email-input"
          />
        </div>
        <div style={loanStyles.formGroup}>
          <label
            htmlFor="personalDetails.employmentStatus"
            style={loanStyles.label}
          >
            Employment Status
          </label>
          <select
            id="personalDetails.employmentStatus"
            name="personalDetails.employmentStatus"
            value={formData.personalDetails.employmentStatus}
            onChange={handleChange}
            style={{
              ...loanStyles.select,
              ...(errors['personalDetails.employmentStatus'] &&
                loanStyles.errorInput),
            }}
            data-cy="employment-status-input"
          >
            <option value="">Select employment status</option>
            {Object.entries(EMPLOYMENT_STATUSES).map(([key, value]) => (
              <option key={key} value={value}>
                {key.replace('_', ' ')}
              </option>
            ))}
          </select>
          {renderError('personalDetails.employmentStatus')}
        </div>
        {formData.personalDetails?.employmentStatus ===
          EMPLOYMENT_STATUSES.EMPLOYED && (
          <div style={loanStyles.formGroup}>
            <Input
              label="Employer Name"
              id="personalDetails.employerName"
              name="personalDetails.employerName"
              type="text"
              value={formData.personalDetails?.employerName || ''}
              onChange={handleChange}
              placeholder="Acme Corp"
              error={errors['personalDetails.employerName']}
              datacy="employer-name-input"
            />
          </div>
        )}
      </>
    );
  };

  const step2 = () => {
    return (
      <>
        <h3>Loan Details</h3>
        <div style={loanStyles.formGroup}>
          <label htmlFor="loanDetails.loanPurpose" style={loanStyles.label}>
            Loan Purpose
          </label>
          <select
            id="loanDetails.loanPurpose"
            name="loanDetails.loanPurpose"
            value={formData.loanDetails.loanPurpose}
            onChange={handleChange}
            style={{
              ...loanStyles.select,
              ...(errors['loanDetails.loanPurpose'] && loanStyles.errorInput),
            }}
          >
            {Object.entries(LOAN_PURPOSES).map(([key, value]) => (
              <option key={key} value={value}>
                {key.replace('_', ' ')}
              </option>
            ))}
          </select>
          {renderError('loanDetails.loanPurpose')}
        </div>
        <div style={loanStyles.formGroup}>
          <Input
            label="Loan Amount ($)"
            id="loanDetails.amount"
            name="loanDetails.amount"
            type="number"
            value={formData.loanDetails?.amount ?? ''}
            onChange={handleChange}
            placeholder="5000"
            error={errors['loanDetails.amount']}
          />
        </div>
        <div style={loanStyles.formGroup}>
          <Input
            label="Loan Term (months)"
            id="loanDetails.loanTerm"
            name="loanDetails.loanTerm"
            type="number"
            value={formData.loanDetails?.loanTerm ?? 0}
            onChange={handleChange}
            placeholder="0"
            error={errors['loanDetails.loanTerm']}
          />
        </div>
        {formData.loanDetails?.loanPurpose === LOAN_PURPOSES.VEHICLE && (
          <div style={loanStyles.formGroup}>
            <Input
              label="Deposit Amount ($)"
              id="loanDetails.deposit"
              name="loanDetails.deposit"
              type="number"
              value={formData.loanDetails?.deposit ?? 0}
              onChange={handleChange}
              placeholder="0"
              style={loanStyles.input}
              error={errors['loanDetails.deposit']}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={loanStyles.stepIndicator}>Step {step} of 2</div>
      {step === 1 && step1()}
      {step === 2 && step2()}
      <div style={loanStyles.buttonContainer}>
        {step === 1 && (
          <button
            data-cy="next-button"
            type="button"
            onClick={handleNext}
            style={loanStyles.button}
          >
            Next
          </button>
        )}
        {step === 2 && (
          <>
            <button
              type="button"
              onClick={handlePrevious}
              style={loanStyles.button}
            >
              Previous
            </button>
            <button
              type="submit"
              style={{
                ...loanStyles.button,
                ...(isLoading && loanStyles.buttonDisabled),
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default LoanApplicationForm;
