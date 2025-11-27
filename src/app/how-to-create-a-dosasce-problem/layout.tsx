export default function HowToCreateProblemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      id="how-to-create"
      className="bg-dosasce-white prose border-dosasce-light-red mx-auto mt-25 mb-15 max-w-5xl rounded-xl px-4 py-6 md:border-2 md:px-8 md:py-10"
    >
      {children}
    </section>
  );
}
