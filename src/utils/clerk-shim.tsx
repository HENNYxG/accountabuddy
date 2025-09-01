// Minimal shim to replace Clerk usage with Supabase session context
import React from 'react';
import { useSession } from '../contexts/session.context';
import { Navigate } from 'react-router-dom';

export const SignedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useSession();
  if (!user) return null;
  return <>{children}</>;
};

export const SignedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useSession();
  if (user) return null;
  return <>{children}</>;
};

type UserButtonProps = { afterSignOutUrl?: string; appearance?: any };
export const UserButton: React.FC<UserButtonProps> = ({ afterSignOutUrl }) => {
  const { user, signOut } = useSession();
  if (!user) return null;
  return (
    <button onClick={async () => { await signOut(); if (afterSignOutUrl) window.location.href = afterSignOutUrl; }}>
      {/* Keep minimal visual impact; callers likely wrap with styles */}
      Sign out
    </button>
  );
};

export const SignIn: React.FC<{ path?: string; forceRedirectUrl?: string }> = ({ forceRedirectUrl }) => {
  const { user, signInWithMagicLink } = useSession();
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  if (user && forceRedirectUrl) return <Navigate to={forceRedirectUrl} replace />;
  return (
    <div className="w-full max-w-sm p-6 rounded-3xl bg-white shadow">
      <h2 className="text-xl mb-4">Sign in</h2>
      {sent ? (
        <p>Check your email for a magic link.</p>
      ) : (
        <form onSubmit={async (e) => { e.preventDefault(); await signInWithMagicLink(email); setSent(true); }}>
          <input className="w-full border rounded px-3 py-2 mb-3" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="w-full bg-purple-600 text-white rounded px-4 py-2" type="submit">Send Magic Link</button>
        </form>
      )}
    </div>
  );
};

export const SignUp: React.FC<{ path?: string; forceRedirectUrl?: string }> = (props) => {
  // For magic-link only flow, SignUp is same as SignIn
  return <SignIn {...props} />;
};

export const useAuth = () => {
  const { user } = useSession();
  return { userId: user?.id ?? null, isLoaded: true };
};

