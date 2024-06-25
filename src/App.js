import './App.css';
import React, { useEffect, useState } from 'react';
import MetricForm from './components/MetricForm';
import MetricsList from './components/MetricsList';
import { fetchMetrics } from './api/metrics';

function App() {
  const [metrics, setMetrics] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const getMetrics = async () => {
    const data = await fetchMetrics();
    setMetrics(data);
  };

  useEffect(() => {
    getMetrics();
  }, []);

  const clearMessages = () => {
    setMessage('');
    setError('');
  };

  return (
    <div className="App">
      <MetricForm
        onMetricCreated={getMetrics} 
        setMessage={setMessage}
        setError={setError}
        clearMessages={clearMessages}
        message={message}
        error={error}
      />
      <MetricsList 
        metrics={metrics} 
        clearMessages={clearMessages}
        setMessage={setMessage}
        setError={setError}
        message={message}
        error={error}
      />
    </div>
  );
}

export default App;
