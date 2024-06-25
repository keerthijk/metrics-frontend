// src/components/MetricTimeline.js
import React, { useEffect, useState } from 'react';
import { fetchMetricAverages } from '../api/metrics';

const MetricTimeline = ({ records, metricId }) => {
  const [averages, setAverages] = useState({ minute: [], hour: [], day: [] });

  useEffect(() => {
    const getAverages = async () => {
      const data = await fetchMetricAverages(metricId);
      setAverages(data);
    };
    getAverages();
  }, [metricId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Metric Timeline</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
              <td>{record.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Minute Averages</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Average Value</th>
          </tr>
        </thead>
        <tbody>
          {averages.minute.map((record, index) => (
            <tr key={index}>
              <td>{new Date(record.period).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
              <td>{record.average_value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Hour Averages</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Average Value</th>
          </tr>
        </thead>
        <tbody>
          {averages.hour.map((record, index) => (
            <tr key={index}>
              <td>{new Date(record.period).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
              <td>{record.average_value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Day Averages</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Average Value</th>
          </tr>
        </thead>
        <tbody>
          {averages.day.map((record, index) => (
            <tr key={index}>
             <td>{formatDate(record.period)}</td>
              <td>{record.average_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetricTimeline;
