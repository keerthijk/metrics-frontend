// src/components/__tests__/MetricForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MetricForm from '../../components/MetricForm';
import { createMetric } from '../../api/metrics';

// Mock the API call
jest.mock('../../api/metrics', () => ({
  createMetric: jest.fn(),
}));

describe('MetricForm', () => {
  const onMetricCreated = jest.fn();
  const setStatusMessage = jest.fn();
  const clearMessages = jest.fn();

  beforeEach(() => {
    onMetricCreated.mockClear();
    setStatusMessage.mockClear();
    clearMessages.mockClear();
  });

  it('renders the form with initial state', () => {
    render(
      <MetricForm
        onMetricCreated={onMetricCreated}
        setStatusMessage={setStatusMessage}
        clearMessages={clearMessages}
        statusMessage={{}}
      />
    );

    expect(screen.getByPlaceholderText('Enter metric name')).toBeInTheDocument();
    expect(screen.getByText('Create Metric')).toBeInTheDocument();
  });

  it('validates form input and shows error messages', async () => {
    render(
      <MetricForm
        onMetricCreated={onMetricCreated}
        setStatusMessage={setStatusMessage}
        clearMessages={clearMessages}
        statusMessage={{}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter metric name'), { target: { value: 'a' } });
    fireEvent.click(screen.getByText('Create Metric'));

    await waitFor(() => {
      expect(screen.getByText('Too Short!')).toBeInTheDocument();
    });
  });

  it('handles successful form submission', async () => {
    createMetric.mockResolvedValue({ message: 'Metric created successfully' });

    render(
      <MetricForm
        onMetricCreated={onMetricCreated}
        setStatusMessage={setStatusMessage}
        clearMessages={clearMessages}
        statusMessage={{}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter metric name'), { target: { value: 'New Metric' } });
    fireEvent.click(screen.getByText('Create Metric'));

    await waitFor(() => {
      expect(setStatusMessage).toHaveBeenCalledWith({ message: 'Metric created successfully' });
      expect(onMetricCreated).toHaveBeenCalled();
    });
  });

  it('handles form submission error', async () => {
    createMetric.mockResolvedValue({ error: 'Error creating metric' });

    render(
      <MetricForm
        onMetricCreated={onMetricCreated}
        setStatusMessage={setStatusMessage}
        clearMessages={clearMessages}
        statusMessage={{}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter metric name'), { target: { value: 'New Metric' } });
    fireEvent.click(screen.getByText('Create Metric'));

    await waitFor(() => {
      expect(setStatusMessage).toHaveBeenCalledWith({ error: 'Error creating metric' });
    });
  });
});
