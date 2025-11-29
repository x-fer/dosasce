import Accordion, { type AccordionItem } from "@/components/ui/accordion";
import { Anchor } from "../ui/anchor";

const faq: AccordionItem[] = [
  {
    title: "Kako natjecanje funkcionira?",
    content:
      "Svaki tjedan otvara se jedan novi zadatak koji možete rješavati do samog kraja natjecanja.",
  },
  {
    title: "Kakve zadatke mogu očekivati?",
    content: (
      <>
        Svi zadatci su optimizacijskog tipa. Problem ima golemi broj mogućih
        rješenja, znatno veći od 10<sup>10</sup>. Postoji teoretski optimalno
        rješenje, ali ga je gotovo nemoguće pronaći u realnom vremenu. Cilj je
        osmisliti algoritam koji pronalazi što bolje rješenje u ograničenom
        vremenu. Primjer zadatka možete pronaći{" "}
        <Anchor
          href="/problem/example"
          className="text-dosasce-red underline hover:opacity-60"
        >
          ovdje
        </Anchor>
        .
      </>
    ),
  },
  {
    title: "Tko se može natjecati?",
    content:
      "Mogu se natjecati svi sudionici koji žele sudjelovati u rješavanju zadataka.",
  },
  {
    title: "Koje kategorije postoje?",
    content: (
      <>
        Postoje kategorije <strong>školarci</strong>, koja obuhvaća
        osnovnoškolce i srednjoškolce, zatim <strong>prediplomski</strong>,{" "}
        <strong>diplomski</strong> i <strong>open</strong> kategorija. Open
        kategorija obuhvaća sve koji trenutno nisu u školi ili ne studiraju.
      </>
    ),
  },
  {
    title: "Kako mogu odabrati kategoriju?",
    content: (
      <>
        Kategoriju možeš odabrati u{" "}
        <Anchor href="/settings">postavkama profila</Anchor>.
      </>
    ),
  },
  {
    title: "Kako osiguravamo da se sudionici natječu u svojoj kategoriji?",
    content:
      "Nemamo sustav za provjeru identiteta ili statusa učenika i studenata. Tijekom dodjele nagrada očekujemo dokaz da sudionik pripada kategoriji u kojoj je sudjelovao. Ako se natječete u kategoriji koja vam ne pripada, nagradu nećete moći preuzeti.",
  },
  {
    title: "Tko može osvojiti nagradu?",
    content: (
      <>
        Nagrade mogu osvojiti sudionici unutar kategorija{" "}
        <strong>školarci</strong>, <strong>prediplomski</strong> i{" "}
        <strong>diplomski</strong>. Sudionici u <strong>open</strong> kategoriji
        mogu sudjelovati, ali ne mogu osvojiti nagradu.
      </>
    ),
  },
  {
    title: "Kako se prijaviti?",
    content:
      "Prijaviti se možete korištenjem Google računa u bilo kojem trenutku tijekom trajanja natjecanja.",
  },
  {
    title:
      "Koji se programski jezici ili tehnologije mogu koristiti na natjecanju?",
    content:
      "Možete koristiti bilo koji programski jezik ili alternativnu metodu rješavanja, ovisno o zadatku. Zadaci provjeravaju samo output rješenja pa možete koristiti bilo koji alat koji vas dovede do ispravnog rezultata.",
  },
  {
    title: "Nisam iz Zagreba, mogu li svejedno sudjelovati?",
    content:
      "Naravno! Natjecanje se u potpunosti održava online. Dodjela je uživo u Zagrebu, ali ako osvojiš neku od nagrada, a ne možeš doći, oko preuzimanja ćemo se dogovoriti naknadno.",
  },
  {
    title: "Imam ideju za zadatak / Htio bih pomoći u organizaciji natjecanja",
    content: (
      <>
        Uvijek volimo entuzijazam. Ako imaš ideju za zadatak, molim te pogledaj
        upute{" "}
        <Anchor
          href="/how-to-create-a-dosasce-problem"
          className="text-dosasce-red underline hover:opacity-60"
        >
          ovdje
        </Anchor>
        . Ako želiš pomoći u organizaciji natjecanja, slobodno nam se obrati na
        email <Anchor href="mailto:dosasce@xfer.hr">dosasce@xfer.hr</Anchor>.
        Izvorni kod za dosasce++ također možeš pronaći na GitHubu:{" "}
        <Anchor href="https://github.com/x-fer/dosasce">
          github.com/x-fer/dosasce
        </Anchor>
        .
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-dosasce-white flex w-full flex-col items-center justify-center"
    >
      <div className="mb-6 w-full px-8 py-3 md:w-3/4 md:px-0">
        <h2 className="pt-5 pb-5 font-serif text-3xl leading-8 font-extrabold tracking-wide md:text-4xl">
          ČESTO POSTAVLJANA PITANJA
        </h2>
        {faq?.length > 0 && <Accordion data={faq} />}
      </div>
    </section>
  );
}
