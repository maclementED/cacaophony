import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import i18n from './i18n';
import Forgot from './pages/auth/Forgot/Forgot';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import Loading from './pages/misc/Loading';
import NotFound from './pages/misc/NotFound';
import Workplace from './pages/workplace/Workplace';

export default function Router() {
  auth.languageCode = i18n.language;

  return (
    <Switch>
      <Route exact path="/" component={Loading} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forgot" component={Forgot} />
      <Route exact path="/workplace/:workplaceId/:channelId" component={Workplace} />
      <Route exact path="/chats/:channelId" component={NotFound} />

      {/* declare all above this */}
      <Route component={NotFound} />
    </Switch>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
