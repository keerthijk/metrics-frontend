import React, { useState } from 'react';

import MetricRecordForm from './MetricRecordForm';
import MetricTimeline from './MetricTimeline';

const MetricsList = ({ metrics, clearMessages, setStatusMessage, statusMessage }) => {
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
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.id}>
              <td>{metric.name}</td>
              <td>
                <button role={`addbutton${metric.id}`} onClick={() => handleAddRecordsClick(metric)}>Add Records</button>
              </td>
              <td>
                <button role={`timelinebutton${metric.id}`}onClick={() => handleShowTimelineClick(metric)}>Show Timeline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedMetric && (
        <MetricRecordForm
          id={selectedMetric.id}
          name={selectedMetric.name}
          setStatusMessage={setStatusMessage}
          statusMessage={statusMessage}
          clearMessages={clearMessages}
        />
      )}
      {selectedMetricForTimeline && (
        <MetricTimeline records={metricRecords} metricId={selectedMetricForTimeline} />
      )}
    </div>
  );
};

export default MetricsList;
