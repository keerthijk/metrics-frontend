// src/components/MetricForm.js
import React, { useState } from 'react';
import { createMetric } from '../api/metrics';

const MetricForm = ({ onMetricCreated, setMessage, setError, clearMessages, message, error }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    const result = await createMetric({ name });
    if (result.error) {
      setError(result.error);
      setMessage('');
    } else {
      setMessage(result.message);
      setError('');
      setName('');
      onMetricCreated(); // To refresh the list of metrics
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Metric</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MetricForm;
