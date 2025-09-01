import { SignUp } from "../utils/clerk-shim";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center flex-col gap-10 w-full h-screen bg-customGreen">
      <SignUp path="/sign-up" forceRedirectUrl="/new-user" />
    </div>
  );
}
