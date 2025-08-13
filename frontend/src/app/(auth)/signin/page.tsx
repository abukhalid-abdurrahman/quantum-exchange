import SignInForm from "@/app/(auth)/signin/components/SignInForm";

export default function page() {
  return (
    <div className="max-w-[380px] w-full self-center">
      <h1 className="h1 mb-2">Sign in</h1>
      <p className="p-sm text-secondary mb-7">
        Lorem ipsum dolor sit amet consectetur. Element sit curabitur habitant
        at quam.
      </p>
      <div className="">
        <SignInForm />
      </div>
    </div>
  );
}
