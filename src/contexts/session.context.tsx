import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Session, User, createClient } from '@supabase/supabase-js';

type SessionContextValue = {
  session: Session | null;
  user: User | null;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signInWithMagicLink = async (email: string) => {
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + '/app' } });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = useMemo(() => ({ session, user, signInWithMagicLink, signOut }), [session, user]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
};

