import Link from "next/link";
import Accordion, { type AccordionItem } from "@/components/ui/accordion";

export default function Contact() {
  const faq: AccordionItem[] = [
    {
      title: "Tko može sudjelovati?",
      content:
        "Sudjelovati mogu svi srednjoškolci (a i osnovnoškolci) te studenti s bilo kojeg hrvatskog sveučilišta.",
    },
    {
      title: "Kakve zadatke mogu očekivati?",
      content: (
        <>
          Svi su zadaci optimizacijskog tipa. Primjer zadatka možeš naći{" "}
          <Link
            href="/problem/3"
            className="text-dosasce-red underline hover:opacity-60"
          >
            ovdje
          </Link>
          .
        </>
      ),
    },
    {
      title: "Kako se prijaviti?",
      content:
        "Prijaviti se možete korištenjem Google računa bilo kada za vrijeme cijelog trajanja natjecanja.",
    },
    {
      title:
        "Koji se programski jezici/tehnologije mogu koristiti na natjecanju?",
      content: (
        <>
          Moguće je koristiti bilo koji programski jezik ili neku alternativnu
          metodu rješavanja (ovisno o zadatku). U zadacima koji su{" "}
          <i>output-only</i> tipa, bitan je samo rezultat koji pošaljete, a ne i
          kako ste do njega došli. U zadacima u kojima se traži kod, dozvoljeno
          je korištenje svih standarnih programskih jezika (Python, Java, C++,
          …).
        </>
      ),
    },
    {
      title: "Nisam iz Zagreba, mogu li svejedno sudjelovati?",
      content:
        "Naravno! Natjecanje se u potpunosti održava online, a ako osvojiš neku od nagrada, oko preuzimanja ćemo se dogovoriti naknadno 🙂",
    },
  ];

  return (
    <section
      id="contact"
      className="bg-dosasce-white flex w-full flex-col items-center justify-center"
    >
      <div className="mb-6 w-full px-8 py-3 md:w-3/4 md:px-0">
        <h2 className="pt-5 pb-5 font-serif text-3xl leading-8 font-extrabold tracking-wide md:text-4xl">
          KONTAKT
        </h2>
        <p className="paragraph pb-5 font-sans text-base leading-7 tracking-wide md:text-lg md:leading-8">
          Ako imate bilo kakva pitanja, slobodno nam se obratite!
        </p>
        <p className="paragraph mb-3 pb-5 font-sans text-base leading-7 tracking-wide md:text-lg md:leading-8">
          E-mail:{" "}
          <a
            target="_blank"
            className="text-dosasce-red underline hover:opacity-60 active:opacity-80"
            href="mailto:dosasce@xfer.hr"
          >
            dosasce@xfer.hr
          </a>
          <br />
          Instagram:{" "}
          <a
            target="_blank"
            className="text-dosasce-red underline hover:opacity-60 active:opacity-80"
            href="https://www.instagram.com/xfer_hr/"
          >
            @xfer_hr
          </a>
          ,{" "}
          <a
            target="_blank"
            className="text-dosasce-red underline hover:opacity-60 active:opacity-80"
            href="https://www.instagram.com/eestec_lc_zagreb/"
          >
            @eestec_lc_zagreb
          </a>
        </p>
        {faq?.length > 0 && <Accordion data={faq} />}
      </div>
    </section>
  );
}
