import "./navbar.styles.scss"
import AppIcon from "../app-icon/app-icon.component";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import LogoAndName from "../logo-and-name/logo-and-name.component";

const Navbar = () => {
  const defaultColor = '#d90429';
  const backgroundColorObject = { backgroundColor: defaultColor };
  return (
    <header>
      <div className=" p-8 px-20">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left mb-7 sm:mb-0">
            {/* Icon and App Name */}

            <LogoAndName />

          </div>

          {/* buttons Links */}
          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <SignedOut>
              <Link
                style={backgroundColorObject}
                className="block sm:w-32 w-full rounded-lg px-9 py-3 text-sm font-medium text-white transition focus:outline-none "
                type="button"
                to="/sign-in"
              >
                Sign-in
              </Link>

              <Link
                className="block sm:w-32 w-full border rounded-lg px-9 py-3 text-sm font-medium border-customRed  text-customRed transition focus:outline-none hover:bg-customRed hover:text-white "
                type="button"
                to="/sign-up"
              >
                Sign-up
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                style={backgroundColorObject}
                className="block rounded-lg px-9 py-3 text-sm font-medium text-white transition  "
                type="button"
                to="/dashboard"
              >
              Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;