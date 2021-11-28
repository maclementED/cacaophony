import firebase from 'firebase';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../components/form/Button';
import Field from '../../../components/form/Field';
import { useAuth } from '../../../providers/AuthProvider';

var provider = new firebase.auth.GoogleAuthProvider();

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const history = useHistory();
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser !== undefined && currentUserLoaded !== true) {
      setCurrentUserLoaded(true);
      if (currentUser) {
        handlePostLogin(currentUser);
      }
    }
  }, [currentUser]);

  const signInWithEmail = (data: LoginForm, actions: FormikHelpers<LoginForm>) => {
    setError('');
    actions.setSubmitting(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        actions.setSubmitting(false);
      })
      .catch((error) => {
        actions.setSubmitting(false);
        setError(error.code === 'auth/wrong-password' ? t("login.wrong-email-or-password") : error.message);
      });
  };

  const signInWithGoogle = () => {
    setError('');
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error: firebase.auth.Error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          setError(t("login.popup-closed"));
        } else {
          setError(t("common.unknown-error"));
        }
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

  const validationScheme = Yup.object().shape({
    email: Yup.string().email("Ce courriel n'est pas valide").required('Le courriel est obligatoire'),
    password: Yup.string()
      .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
        'Le mot de passe doit contenir au moins une majuscule et un chiffre.'
      )
      .required('Le mot de passe est obligatoire'),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800">
      <img className="h-28" src="/images/logo.svg" alt="Logo" />
      <h2 className="mt-4 text-4xl font-semibold">{t('login.login')}</h2>
      <div
        className="mt-4 w-72 md:w-96 flex flex-row whitespace-nowrap border
        justify-center rounded-full px-6 py-2 cursor-pointer hover:bg-gray-50"
        onClick={signInWithGoogle}
      >
        <img className="mr-2" src="/images/Google.svg" alt="Google logo" />
        <span className="font-semibold">{t('login.login-with-google')}</span>
      </div>
      <div className="text-red-500 text-center mt-2">{error}</div>
      <div className="flex flex-row items-center justify-around w-72 md:w-96 mt-2 text-gray-400">
        <hr className="w-full" />
        <span className="text-sm text-gray-400 whitespace-nowrap mx-2">
          {t('login.or-login-with-email')}
        </span>
        <hr className="w-full" />
      </div>
      <div className="w-72 md:w-96 form">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={signInWithEmail}
          validationSchema={validationScheme}
          validateOnChange={false}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="email" placeholder={t('common.email')} className="mt-4 w-full"></Field>
              <Field
                className="mt-3 mb-1 w-full"
                type="password"
                name={t('common.email')}
                placeholder="Password"
              ></Field>
              <Link to="/forgot" className="text-teal-500 hover:text-teal-600 hover:underline">
                {t('login.forgot-password')}
              </Link>
              <div className="mt-4 mb-2">
                <Button isSubmitting={isSubmitting} className="w-full btn-primary">
                  {t('login.login')}
                </Button>
              </div>
              <span>
                {t('login.new-member')}{' '}
                <Link
                  className="text-teal-500 hover:text-teal-600 hover:underline"
                  to={'/signup' + history.location.search}
                >
                  {t('login.create-account')}
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
