import firebase from 'firebase';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase';
import { APIError } from '../models/APIError';
import { MoreInfoForm, Role, User, UserDoc } from '../models/User';
import { useAlert } from './AlertProvider';

interface AuthContextProps {
  currentUser: firebase.User | null | undefined; // Firebase User
  userDetails: User | null | undefined; // User Document that have additionnal infos
  role: Role; // User Role
  // eslint-disable-next-line
  authFetch: (url: string, init?: RequestInit | undefined) => Promise<Object>; // Method to fetch with the bearer token
  logout: () => void;
  updateUser: (data: UserDoc) => Promise<boolean>;
  finishSignup: (data: MoreInfoForm) => Promise<any>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
  currentUser: undefined,
  userDetails: undefined,
  role: undefined,
  authFetch: async () => await {},
  logout: () => {},
  updateUser: async () => await false,
  finishSignup: async () => await false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>();
  const [userDetails, setUserDetails] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role>();
  const { push } = useHistory();
  const { addAlert } = useAlert();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      if (currentUser === undefined) return;

      setLoading(true);

      const role = await updateRole();
      if (role) {
        await updateUserDetails();
      }

      setLoading(false);
    };
    init();
  }, [currentUser]);

  const updateRole = () => {
    return currentUser?.getIdTokenResult(true).then((token) => {
      setRole(token.claims.role);
      return token.claims.role;
    });
  };

  const updateUserDetails = async () => {
    const storageUser: User | null = JSON.parse(localStorage.getItem('userDetails') || 'null');

    if (storageUser?.uid === currentUser?.uid) {
      setUserDetails(storageUser);
    } else {
      await authFetch(`users/${currentUser?.uid}`)
        .then((res) => res as User)
        .then((user) => {
          localStorage.setItem('userDetails', JSON.stringify(user));
          setUserDetails(user);
        });
    }
  };

  // eslint-disable-next-line
  const authFetch = async (url: string, init?: RequestInit | undefined) => {
    const idToken = await currentUser?.getIdToken();

    return fetch(process.env.REACT_APP_API_URL + url, {
      ...init,
      headers: {
        Authorization: `Bearer ${idToken?.toString()}`,
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    }).then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        await res.json().then((err) => {
          throw err;
        });
      }
    });
  };

  const logout = async () => {
    await firebase.auth().signOut();
    localStorage.clear();
    push('/');
  };

  const updateUser = async (user: UserDoc) => {
    return await authFetch(`users/${currentUser?.uid}`, { method: 'PATCH', body: JSON.stringify(user) })
      .then((userDoc) => userDoc as User)
      .then((user) => {
        addAlert({ title: 'Votre profile a été modifié', variant: 'success' });
        localStorage.setItem('userDetails', JSON.stringify(user));
        setUserDetails(user);
        return true;
      })
      .catch((err: APIError) => {
        if (err.error === 'users/email-already-exists') {
          addAlert({ title: 'Cette adresse courriel est déjà utilisé', variant: 'danger' });
        } else {
          addAlert({ title: 'Une erreur est survenue', variant: 'danger' });
        }
        return false;
      });
  };

  const finishSignup = async (data: MoreInfoForm) => {
    return await authFetch(`users/${currentUser?.uid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async () => {
        await updateRole();
        await updateUserDetails();
      })
      .catch(async (error: APIError) => {
        if (error.error === 'users/already-exist') {
          await updateRole();
          await updateUserDetails();
        }
        throw error;
      });
  };

  return (
    <AuthContext.Provider value={{ authFetch, userDetails, currentUser, role, logout, updateUser, finishSignup }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
