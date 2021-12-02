import firebase from 'firebase';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../components/form/Button';
import Field from '../../../components/form/Field';

const provider = new firebase.auth.GoogleAuthProvider();

interface SignUpForm {
  email: string;
  password: string;
  confirm: string;
}

export default function Signup() {
  const { t } = useTranslation();
  const history = useHistory();
  const [error, setError] = useState('');

  const signUpWithEmail = async (data: SignUpForm, actions: FormikHelpers<SignUpForm>) => {
    actions.setSubmitting(true);

    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (result) => {
        handlePostLogin(result.user as firebase.User);
      })
      .catch((error: firebase.FirebaseError) => {
        setError(error.message);
      });

    actions.setSubmitting(false);
  };

  const signUpWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        handlePostLogin(result.user as firebase.User);
      })
      .catch((error: firebase.FirebaseError) => {
        setError(error.message);
      });
  };

  const handlePostLogin = async (user: firebase.User) => {
    const jwtToken = await user?.getIdToken();

    // eslint-disable-next-line
    process.env.NODE_ENV === 'development' && console.log(jwtToken);

    const query = new URLSearchParams(history.location.search);
    const redirect = query.get('redirect');

    if (redirect) {
      history.push(Buffer.from(redirect, 'base64').toString());
    } else {
      history.push('/workplace');
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validation.email-required"))
      .email(t("validation.is-email")),
    password: Yup.string()
      .required(t("validation.password-required"))
      .min(8, t("validation-password-min"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
        t("validation.password-match")
      ),
    confirm: Yup.string()
      .required(t("signup.confirm-required"))
      .oneOf([Yup.ref('password'), null], t("signup.confirm-match")),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen w-auto dark:bg-gray-800">
      <>
        <img className="h-28 " src={'/images/logo.svg'} alt="Logo" />
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold">{t('signup.register')}</h2>
        <div
          onClick={signUpWithGoogle}
          className="mt-4 w-72 md:w-96 flex flex-row whitespace-nowrap border bg-white dark:bg-gray-600 
          dark:hover:bg-gray-700dark:border-gray-600 justify-center rounded-full px-6 py-2 cursor-pointer 
          hover:bg-gray-50"
        >
          <img className="mr-2" src={'/images/Google.svg'} alt="Google logo" />
          <span className="font-semibold">{t('signup.signup-with-google')}</span>
        </div>
        <div className="text-red-500 text-center mt-2">{error}</div>
        <div className="flex flex-row items-center justify-around w-72 md:w-96 mt-4 text-gray-400">
          <hr className="w-full" />
          <span className="text-sm text-gray-400 whitespace-nowrap mx-2">{t('signup.or-signup-with-email')}</span>
          <hr className="w-full" />
        </div>
        <div className="w-72 md:w-96 form">
          <Formik
            initialValues={{ email: '', password: '', confirm: '' } as SignUpForm}
            onSubmit={(data, action) => signUpWithEmail(data, action)}
            validationSchema={validationSchema}
            validateOnChange={false}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="email" placeholder={t('common.email')} className="mt-4 w-full"></Field>
                <Field
                  className="mt-3 w-full"
                  type="password"
                  name="password"
                  placeholder={t('common.password')}
                ></Field>
                <Field
                  className="mt-3 w-full"
                  type="password"
                  name="confirm"
                  placeholder={t('signup.confirm-password')}
                ></Field>
                <div className="mt-3 mb-2">
                  <Button className="btn btn-primary w-full" isSubmitting={isSubmitting}>
                    {t('signup.button')}
                  </Button>
                </div>
                <span>
                  {t('signup.already-an-account')}{' '}
                  <Link
                    className="text-teal-500 hover:text-teal-600 hover:underline"
                    to={'/login' + history.location.search}
                  >
                    {t('signup.login')}
                  </Link>
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </>
    </div>
  );
}
