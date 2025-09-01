import { SignIn } from "../utils/clerk-shim";

export default function SignInPage() {
    return (
        <div className="flex justify-center items-center flex-col gap-10 w-full h-screen bg-customGreen">
        <SignIn path="/sign-in" forceRedirectUrl="/dashboard" />
    </div>
            );
}
