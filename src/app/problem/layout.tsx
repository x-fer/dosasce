export default function ProblemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      id="problem"
      className="bg-dosasce-white prose border-dosasce-light-red mx-auto my-20 max-w-5xl rounded-xl px-4 py-8 md:border-2 md:px-8 md:py-12"
    >
      {children}
    </section>
  );
}
