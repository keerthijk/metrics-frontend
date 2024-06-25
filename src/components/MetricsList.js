// src/components/MetricsList.js
import React, { useState } from 'react';
import MetricRecordForm from './MetricRecordForm';
import MetricTimeline from './MetricTimeline';

const MetricsList = ({ metrics, clearMessages, setMessage, setError, message, error }) => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [metricRecords, setMetricRecords] = useState([]);
  const [selectedMetricForTimeline, setSelectedMetricForTimeline] = useState(null);

  const handleAddRecordsClick = (metric) => {
    clearMessages();
    setSelectedMetric(metric);
    setSelectedMetricForTimeline(null); // Clear timeline selection when adding records
  };

  const handleShowTimelineClick = (metric) => {
    clearMessages();
    setSelectedMetricForTimeline(metric.id);
    setMetricRecords(metric.metric_records);
    setSelectedMetric(null); // Clear add records selection when showing timeline
  };

  return (
    <div>
      <h1>Metrics List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Add Records</th>
            <th>Show Timeline</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.id}>
              <td>{metric.name}</td>
              <td>
                <button onClick={() => handleAddRecordsClick(metric)}>Add Records</button>
              </td>
              <td>
                <button onClick={() => handleShowTimelineClick(metric)}>Show Timeline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedMetric && (
        <MetricRecordForm
          id={selectedMetric.id}
          name={selectedMetric.name}
          setMessage={setMessage}
          setError={setError}
          clearMessages={clearMessages}
          error={error}
          message={message}
        />
      )}
      {selectedMetricForTimeline && (
        <MetricTimeline records={metricRecords} metricId={selectedMetricForTimeline} />
      )}
    </div>
  );
};

export default MetricsList;
