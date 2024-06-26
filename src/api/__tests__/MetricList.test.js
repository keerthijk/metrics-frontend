// src/components/MetricsList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import MetricsList from '../../components/MetricsList';

const mockMetrics = [
  {
    id: 1,
    name: 'Metric 1',
    metric_records: [{ id: 1, value: 10, timestamp: '2023-01-01T00:00:00Z' }],
  },
  {
    id: 2,
    name: 'Metric 2',
    metric_records: [{ id: 2, value: 20, timestamp: '2023-01-02T00:00:00Z' }],
  },
];

describe('MetricsList Component', () => {
  let clearMessages, setStatusMessage, statusMessage;

  beforeEach(() => {
    clearMessages = jest.fn();
    setStatusMessage = jest.fn();
    statusMessage = { error: '', message: '' };
  });

  it('renders the metrics list', () => {
    const { getByText } = render(
      <MetricsList
        metrics={mockMetrics}
        clearMessages={clearMessages}
        setStatusMessage={setStatusMessage}
        statusMessage={statusMessage}
      />
    );

    expect(getByText('Metric 1')).toBeInTheDocument();
    expect(getByText('Metric 2')).toBeInTheDocument();
  });

  it('handles add records button click', () => {
    render(
      <MetricsList
        metrics={mockMetrics}
        clearMessages={clearMessages}
        setStatusMessage={setStatusMessage}
        statusMessage={statusMessage}
      />
    );

    fireEvent.click(screen.getByRole('addbutton1', { selector: 'button' }));
    expect(screen.getByText('Create Metric Record: Metric 1')).toBeInTheDocument();
  });

  it('handles show timeline button click', () => {
    render(
      <MetricsList
        metrics={mockMetrics}
        clearMessages={clearMessages}
        setStatusMessage={setStatusMessage}
        statusMessage={statusMessage}
      />
    );

    fireEvent.click(screen.getByRole('timelinebutton1', { selector: 'button' }));
    expect(screen.getByText('Metric Timeline')).toBeInTheDocument();
  });

  it('clears messages when buttons are clicked', () => {
    render(
      <MetricsList
        metrics={mockMetrics}
        clearMessages={clearMessages}
        setStatusMessage={setStatusMessage}
        statusMessage={statusMessage}
      />
    );

    fireEvent.click(screen.getByRole('addbutton1', { selector: 'button' }));
    expect(clearMessages).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('timelinebutton1', { selector: 'button' }));
    expect(clearMessages).toHaveBeenCalled();
  });
});
