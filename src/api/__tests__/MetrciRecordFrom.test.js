import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MetricRecordForm from '../../components/MetricRecordForm'; // Adjust the import path as necessary
import { createMetricRecord } from '../metrics';

// Mock the createMetricRecord function
jest.mock('../metrics', () => ({
  createMetricRecord: jest.fn(),
}));


describe('MetricRecordForm', () => {
  it('submits the form and displays status message', async () => {
    const mockStatusMessage = { message: 'Metric record created successfully' };
    createMetricRecord.mockResolvedValue(mockStatusMessage);
    const setStatusMessage = jest.fn();
    const clearMessages = jest.fn();

    render(
      <MetricRecordForm
        id="1"
        name="Test Metric"
        setStatusMessage={setStatusMessage}
        statusMessage={{}}
        clearMessages={clearMessages}
      />
    );

    fireEvent.change(screen.getByTestId('timestamp'), { target: { value: '2023-04-01T12:00' } });
    fireEvent.change(screen.getByTestId('value'), { target: { value: '100' } });
    fireEvent.click(screen.getByText('Submit', { selector: 'button' }));

    await waitFor(() => {
      expect(createMetricRecord).toHaveBeenCalledWith("1", {
        timestamp: '2023-04-01T12:00',
        value: 100,
      });
      expect(setStatusMessage).toHaveBeenCalledWith(mockStatusMessage);
    });
  });

  it('validates timestamp input and shows error messages', async () => {
    const setStatusMessage = jest.fn();
    const clearMessages = jest.fn();
    render(
      <MetricRecordForm
      id="1"
      name="Test Metric"
      setStatusMessage={setStatusMessage}
      statusMessage={{}}
      clearMessages={clearMessages}
      />
    );

    fireEvent.change(screen.getByTestId('timestamp'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Submit', { selector: 'button' }));

    await waitFor(() => {
      expect(screen.getByText('Timestamp is required')).toBeInTheDocument();
    });
  });

  it('validates value input and shows error messages', async () => {
    const setStatusMessage = jest.fn();
    const clearMessages = jest.fn();
    render(
      <MetricRecordForm
      id="1"
      name="Test Metric"
      setStatusMessage={setStatusMessage}
      statusMessage={{}}
      clearMessages={clearMessages}
      />
    );

    fireEvent.change(screen.getByTestId('value'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Submit', { selector: 'button' }));

    await waitFor(() => {
      expect(screen.getByText('Value is required')).toBeInTheDocument();
    });
  });
});