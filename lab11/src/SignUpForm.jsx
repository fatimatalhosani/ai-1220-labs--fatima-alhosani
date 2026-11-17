import { useState } from 'react';
import { checkName, checkMobile, checkEmail } from './validate.js';

const fields = [
  { key: 'name', label: 'Full name', check: checkName },
  { key: 'mobile', label: 'Mobile number', check: checkMobile },
  { key: 'email', label: 'Email', check: checkEmail },
];

export default function SignUpForm() {
  const [values, setValues] = useState({ name: '', mobile: '', email: '' });
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState('');

  function updateField(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    setCreated('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    for (const field of fields) {
      const message = field.check(values[field.key]);
      if (message) nextErrors[field.key] = message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setCreated('');
      return;
    }
    setCreated(`Account created for ${values.name.trim()}.`);
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      {fields.map((field) => {
        const error = errors[field.key];
        const inputId = `signup-${field.key}`;
        const errorId = `${inputId}-error`;
        return (
          <div key={field.key}>
            <label htmlFor={inputId}>{field.label}</label>
            <input
              id={inputId}
              className={error ? 'invalid' : ''}
              value={values[field.key]}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? errorId : undefined}
              onChange={(event) => updateField(field.key, event.target.value)}
            />
            {error && <p id={errorId} className="error">{error}</p>}
          </div>
        );
      })}
      <button type="submit">Create account</button>
      <p className="result" role="status">{created}</p>
    </form>
  );
}
