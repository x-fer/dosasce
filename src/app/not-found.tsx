import { Anchor } from "@/components/ui/anchor";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <section className="bg-dosasce-white border-dosasce-light-red mx-auto mt-25 mb-15 flex h-full w-full max-w-5xl grow flex-col items-center justify-center rounded-xl px-4 py-6 text-center md:border-2 md:px-8 md:py-10">
      <p className="text-dosasce-red font-mono text-xl font-semibold">404</p>
      <h1 className="text-dosasce-black mt-4 font-serif text-3xl font-bold tracking-tight sm:text-5xl">
        Patuljci nisu izgradili ovu stranicu
      </h1>
      <p className="mt-6 font-sans text-base leading-7 text-gray-600">
        Ova stranica ne postoji, vjerojatno ju Djedovi pomoćnici nisu izgradili.
      </p>
      <Anchor
        href="/"
        className="text-dosasce-red mt-10 font-sans text-sm leading-7 font-semibold hover:opacity-80"
      >
        <span aria-hidden="true">&larr;</span> Vratite se na početnu stranicu
      </Anchor>
    </section>
  );
}
