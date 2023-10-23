import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

function notFound() {
  return (
    <section className="py-16 text-center text-red-800">
      <h2 className="text-xl">Oops! No such page seems to exist...</h2>
    </section>
  );
}

export default notFound;
