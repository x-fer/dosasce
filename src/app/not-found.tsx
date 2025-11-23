import { Anchor } from "@/components/ui/anchor";

export default function NotFound() {
  return (
    <main className="flex h-screen w-screen flex-col pt-25 pb-10">
      <section className="border-dosasce-light-red bg-dosasce-white mx-auto flex h-full w-full max-w-5xl grow flex-col items-center justify-center rounded-lg border-2 border-solid p-4 py-10 text-center sm:px-0 md:p-10 md:px-16 lg:px-32">
        <p className="text-dosasce-red font-mono text-xl font-semibold">404</p>
        <h1 className="text-dosasce-black mt-4 font-serif text-3xl font-bold tracking-tight sm:text-5xl">
          Patuljci nisu izgradili ovu stranicu
        </h1>
        <p className="mt-6 font-sans text-base leading-7 text-gray-600">
          Ova stranica ne postoji, vjerojatno ju Djedovi pomoćnici nisu
          izgradili.
        </p>
        <Anchor
          href="/"
          className="text-dosasce-red mt-10 font-sans text-sm leading-7 font-semibold hover:opacity-80"
        >
          <span aria-hidden="true">&larr;</span> Vratite se na početnu stranicu
        </Anchor>
      </section>
    </main>
  );
}
