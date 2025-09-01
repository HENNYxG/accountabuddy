import { Link, Outlet, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "../utils/clerk-shim";
import { SessionProvider } from "../contexts/session.context";
import Navbar from "../components/navbar/navbar.component";

// Clerk removed; using Supabase session provider

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <SessionProvider>
      {/* <header className="header">
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </div>
      </header> */}
      <main>
        <Outlet />
      </main>
    </SessionProvider>
  );
}
