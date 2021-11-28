import React, { useContext, useEffect, useState } from 'react';
import { Alert } from '../models/Alert';
import AlertComponent from '../components/alert/Alert';

interface AlertContextProps {
  addAlert: (alert: Alert) => void;
}

interface AlertProviderProps {
  children: React.ReactNode;
}

const AlertContext = React.createContext<AlertContextProps>({
  addAlert: () => {},
});

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<Alert | undefined>();

  useEffect(() => {
    window.addEventListener('error', function (e) {
      addAlert({
        title: 'Une erreur est survenue',
        summary: "Si le problème persiste, N'hésitez pas à contactez le support. Code 001",
        variant: 'danger',
      });
      return false;
    });
    window.addEventListener('unhandledrejection', function (e) {
      addAlert({
        title: 'Une erreur est survenue',
        summary: "Si le problème persiste. N'hésitez pas à contactez le support. Code 001",
        variant: 'danger',
      });
      return false;
    });
  }, []);

  const addAlert = (alert: Alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(undefined);
    }, alert.timeout || 3000);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {alert && (
        <AlertComponent
          variant={alert.variant}
          title={alert.title}
          summary={alert.summary}
          close={() => setAlert(undefined)}
        ></AlertComponent>
      )}
      {children}
    </AlertContext.Provider>
  );
}
