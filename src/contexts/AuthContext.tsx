import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

type AuthContextType = {
  user: User | null;
  profile: any | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true });

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const docRef = doc(db, 'users', u.uid);
          const snap = await getDoc(docRef);
          setProfile(snap.exists() ? snap.data() : null);
        } catch (e) {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={{ user, profile, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
