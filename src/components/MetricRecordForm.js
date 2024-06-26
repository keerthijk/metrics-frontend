import React from 'react';
import { createMetricRecord } from '../api/metrics';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const MetricRecordFormSchema = Yup.object().shape({
  timestamp: Yup.date().required('Timestamp is required'),
  value: Yup.number().required('Value is required'),
});

const MetricRecordForm = ({ id, name, setStatusMessage, statusMessage, clearMessages }) => {
  return (
    <Formik
      initialValues={{ timestamp: '', value: '' }}
      validationSchema={MetricRecordFormSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        clearMessages();
        const result = await createMetricRecord(id, values);
        if (result.error) {
          setStatusMessage({ error: result.error });
        } else {
          setStatusMessage({ message: result.message });
          resetForm();
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1>Create Metric Record: {name}</h1>
          {statusMessage.error && <p style={{ color: 'red' }}>{statusMessage.error}</p>}
          {statusMessage.message && <p style={{ color: 'green' }}>{statusMessage.message}</p>} 
          <div>
            <label htmlFor="timestamp">Timestamp:</label>
            <Field type="datetime-local" name="timestamp" data-testid="timestamp" />
            <ErrorMessage name="timestamp" component="div" />
          </div>
          <div>
            <label htmlFor="value">Value:</label>
            <Field type="number" name="value" data-testid="value" />
            <ErrorMessage name="value" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MetricRecordForm;
