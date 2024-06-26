import React, { useState, useEffect } from 'react';
import { fetchMetrics } from './api/metrics';
import MetricForm from './components/MetricForm';
import MetricsList from './components/MetricsList';

function useMetrics() {
  const [metrics, setMetrics] = useState([]);

  const getMetrics = async () => {
    try {
      const data = await fetchMetrics();
      setMetrics(data);
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    }
  };

  useEffect(() => {
    getMetrics();
  }, []);

  return [metrics, getMetrics];
}

function App() {
  const [metrics, getMetrics] = useMetrics();
  const [statusMessage, setStatusMessage] = useState({ message: '', error: '' });

  const clearMessages = () => {
    setStatusMessage({ message: '', error: '' });
  };

  return (
    <div className="App">
      <MetricForm
        onMetricCreated={getMetrics}
        setStatusMessage={setStatusMessage}
        clearMessages={clearMessages}
        statusMessage={statusMessage}
      />
      <MetricsList
        metrics={metrics}
        clearMessages={clearMessages}
        setStatusMessage={setStatusMessage}
        statusMessage={statusMessage}
      />
    </div>
  );
}

export default App;
// In the App component, we define a custom hook useMetrics that fetches metrics from the API and returns the metrics and a function to fetch the metrics. We then use this custom hook in the App component to fetch metrics and pass the metrics to the MetricList and MetricForm components.