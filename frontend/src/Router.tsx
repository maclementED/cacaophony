import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import Loading from './pages/misc/Loading';
import NotFound from './pages/misc/NotFound';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Loading} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forgot-password" component={NotFound} />
      <Route exact path="/workplace/:workplaceId/:channelId" component={NotFound} />
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
