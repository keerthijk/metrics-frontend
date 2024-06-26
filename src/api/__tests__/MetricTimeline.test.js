import React from 'react';
import {act} from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import MetricTimeline from '../../components/MetricTimeline';
import { fetchMetricAverages } from '../metrics';

// Mock the fetchMetricAverages function
jest.mock('../metrics', () => ({
  fetchMetricAverages: jest.fn(),
}));

describe('MetricTimeline', () => {
  const mockRecords = [
    { id: '1', timestamp: '2020-01-01T00:00:00Z', value: 10 },
    { id: '2', timestamp: '2020-01-01T00:00:00Z', value: 20 },
    { id: '3', timestamp: '2020-01-01T02:00:00Z', value: 10 },
    { id: '4', timestamp: '2020-01-02T00:00:00Z', value: 20 },
  ];
  const mockAverages = {
    minute: [{ period: '2020-01-01T00:00:00Z', average_value: 15 }, { period: '2020-01-01T02:00:00Z', average_value: 10 }, { period: '2020-01-02T00:00:00Z', average_value: 20 }],
    hour: [{ period: '2020-01-01T00:00:00Z', average_value: 15 }, { period: '2020-01-01T02:00:00Z', average_value: 10 }, { period: '2020-01-02T00:00:00Z', average_value: 20 }] ,
    day: [{ period: '2020-01-01T00:00:00Z', average_value: 13.3 }, { period: '2020-01-02T00:00:00Z', average_value: 20 }],
  };

  beforeEach(() => {
    fetchMetricAverages.mockResolvedValue(mockAverages);
  });

  it('renders without crashing', () => {
    render(<MetricTimeline records={mockRecords} metricId="1" />);
  });

  it('initially displays headers', () => {
    render(<MetricTimeline records={mockRecords} metricId="1" />);
    expect(screen.getByText('Metric Timeline')).toBeInTheDocument();
    expect(screen.getByText('Minute Averages')).toBeInTheDocument();
    expect(screen.getByText('Hour Averages')).toBeInTheDocument();
    expect(screen.getByText('Day Averages')).toBeInTheDocument();
  });

  it('calls fetchMetricAverages with correct metricId', async () => {
    render(<MetricTimeline records={mockRecords} metricId="1" />);
    await waitFor(() => expect(fetchMetricAverages).toHaveBeenCalledWith("1"));
  });

  it('renders fetched averages', async () => {
    render(<MetricTimeline records={mockRecords} metricId="1" />);
    await waitFor(() => expect(screen.getByText('13.3')).toBeInTheDocument());
  });

  it('updates data when metricId changes', async () => {
    const { rerender } = render(<MetricTimeline records={mockRecords} metricId="1" />);
    rerender(<MetricTimeline records={mockRecords} metricId="2" />);
    await waitFor(() => expect(fetchMetricAverages).toHaveBeenCalledWith("2"));
  });
});