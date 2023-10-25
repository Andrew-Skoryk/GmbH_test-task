import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-between min-h-screen p-24 mx-auto">
      <h1 className="mb-8 text-2xl font-semibold">
        Please, Sign in to proceed
      </h1>
      <LoginForm />
    </main>
  );
}
