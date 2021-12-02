import firebase from 'firebase';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../components/form/Button';
import Field from '../../../components/form/Field';

interface ForgotForm {
  email: string;
}

export default function Forgot() {
  const { t } = useTranslation();
  const history = useHistory();
  const [error, setError] = useState('');

  const handleSubmit = async (data: ForgotForm, actions: FormikHelpers<ForgotForm>) => {
    setError('');
    actions.setSubmitting(true);

    await firebase
      .auth()
      .sendPasswordResetEmail(data.email)
      .catch(() => {
        setError(t('common.unknown-error'));
      });

    actions.setSubmitting(false);
  };

  const validationScheme = Yup.object().shape({
    email: Yup.string().email(t('validation.is-email')).required(t('validation.email-required')),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800">
      <img className="h-28" src="/images/logo.svg" alt="Logo" />
      <h2 className="mt-4 text-4xl font-semibold">{t('forgot.title')}</h2>
      <div className="text-red-500 text-center mt-2">{error}</div>

      <div className="w-72 md:w-96 form">
        <Formik
          initialValues={{ email: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationScheme}
          validateOnChange={false}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="email" placeholder={t('common.email')} className="mt-4 w-full"></Field>
              <div className="mt-4 mb-2">
                <Button isSubmitting={isSubmitting} className="w-full btn-primary">
                  {t('forgot.send')}
                </Button>
              </div>
              <span>
                <Link
                  className="text-teal-500 hover:text-teal-600 hover:underline"
                  to={'/login' + history.location.search}
                >
                  {t('forgot.go-back')}
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
