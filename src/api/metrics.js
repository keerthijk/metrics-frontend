// src/api/metrics.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/metrics';

export const fetchMetrics = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMetric = async (metric) => {
  try {
    const response = await axios.post(API_URL, metric);
    return { data: response.data, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response && error.response.data ? error.response.data.error : 'Unknown error';
    return { error: errorMessage };
  }
};

export const createMetricRecord = async (metricId, metricRecord) => {
  try {
    const response = await axios.post(`${API_URL}/${metricId}/metric_records`, {
      metric_record: metricRecord,
    });
    return { data: response.data, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response && error.response.data ? error.response.data.error : 'Unknown error';
    return { error: errorMessage };
  }
};

export const fetchMetricAverages = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/averages`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response && error.response.data ? error.response.data.error : 'Unknown error';
    return { error: errorMessage };
  }
};
