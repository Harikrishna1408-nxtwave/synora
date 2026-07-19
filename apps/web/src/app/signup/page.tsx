import AuthLayout from "@/components/auth/AuthLayout";
import LoginCard from "@/components/auth/LoginCard";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <LoginCard>
        <SignupForm />
      </LoginCard>
    </AuthLayout>
  );
}