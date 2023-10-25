import { Spinner } from "@nextui-org/spinner";

function Loading() {
  return (
    <main className="flex items-center justify-center h-full min-h-screen">
      <Spinner label="Loading..." size="lg" />
    </main>
  );
}

export default Loading;
