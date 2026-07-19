import AuthLayout from "@/components/auth/AuthLayout";
import LoginCard from "@/components/auth/LoginCard";

export default function SignupPage() {
  return (
    <AuthLayout>
      <LoginCard>
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold text-white">
            Signup
          </h1>

          <p className="text-slate-400">
            Signup page is under development.
          </p>
        </div>
      </LoginCard>
    </AuthLayout>
  );
}