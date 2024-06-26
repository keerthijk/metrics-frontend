import React from 'react';
import { createMetric } from '../api/metrics';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const MetricFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

function MetricForm({ onMetricCreated, setStatusMessage, clearMessages, statusMessage }) {
  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={MetricFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        clearMessages();
        const result = await createMetric({ name: values.name });
        if (result.error) {
          setStatusMessage({ error: result.error });
        } else {
          setStatusMessage({ message: result.message });
          onMetricCreated(); // To refresh the list of metrics
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1>Add Metric</h1>
          {statusMessage.error && <p style={{ color: 'red' }}>{statusMessage.error}</p>}
          {statusMessage.message && <p style={{ color: 'green' }}>{statusMessage.message}</p>}          
          <Field type="text" name="name" placeholder="Enter metric name" />
          <ErrorMessage name="name" component="div" className="error" />
          <button type="submit" disabled={isSubmitting}>
            Create Metric
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default MetricForm;
// The MetricForm component is a form that allows users to create a new metric. It uses Formik and Yup for form validation. When the form is submitted, it calls the createMetric function from the API to create a new metric. If the creation is successful, it calls the onMetricCreated function to refresh the list of metrics. If there is an error, it displays the error message using the setStatusMessage function.