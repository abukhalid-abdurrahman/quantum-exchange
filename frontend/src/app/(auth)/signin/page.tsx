import SignInForm from "@/app/(auth)/signin/components/SignInForm";

export default function page() {
  return (
    <div className="max-w-[340px] self-center">
      <h1 className="h1 mb-2">Sign in</h1>
      <p className="p-sm text-secondary mb-7">
        Sign in to your account to start using Quantum Street
      </p>
      <div className="">
        <SignInForm />
      </div>
    </div>
  );
}
