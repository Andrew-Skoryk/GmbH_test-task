import { useRouter } from "next/router";
import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./lib/redux/store";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/table");
    }
  }, [isAuthenticated, router]);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-2xl font-semibold mb-8">
        Please, Sign in to proceed
      </h1>
      <LoginForm />
    </main>
  );
}
