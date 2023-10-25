import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-2xl font-semibold mb-8">
        Please, Sign in to proceed
      </h1>
      <LoginForm />
    </main>
  );
}
