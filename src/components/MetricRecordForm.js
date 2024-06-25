// src/components/MetricRecordForm.js
import React, { useState } from 'react';
import { createMetricRecord } from '../api/metrics';

const MetricRecordForm = ({ id, name, setMessage, setError, clearMessages, error, message }) => {
  const [timestamp, setTimestamp] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    const result = await createMetricRecord(id, { value, timestamp });
    if (result.error) {
      setError(result.error);
      setMessage('');
    } else {
      setMessage(result.message);
      setError('');
      setTimestamp('');
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Metric Record: {name}</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Timestamp:
        <input type="datetime-local" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} required />
      </label>
      <label>
        Value:
        <input type="number" min={0} value={value} onChange={(e) => setValue(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MetricRecordForm;
