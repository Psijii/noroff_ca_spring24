

/**
 * Represents the SignUpPage component.
 * @returns {JSX.Element} The rendered SignUpPage component.
 */
import TextSignUp from "./SignUpText";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <div className="container max-w-5xl mx-auto mt-20 px-4 py-4 md:flex items-center justify-between gap-20">
      <TextSignUp />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
