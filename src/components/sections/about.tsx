import { Anchor } from "../ui/anchor";

export default function About() {
  return (
    <section
      id="about"
      className="bg-dosasce-white flex w-full flex-col items-center justify-center pb-8"
    >
      <div className="w-full px-8 py-3 md:w-3/4 md:px-0">
        <p className="paragraph pt-5 pb-5 font-sans text-base leading-7 tracking-wide md:text-lg md:leading-8">
          <b className="font-serif text-xl tracking-wide md:text-2xl">
            došašće++
          </b>{" "}
          je online božićno natjecanje inspirirano omiljenim natjecanjem:{" "}
          <Anchor href="https://adventofcode.com/">Advent of Code</Anchor>.
          Natjecanje se sastoji od nekoliko kola gdje se u svakom kolu otvara
          novi optimizacijski zadatak.{" "}
          <b>Svi zadaci su dostupni do kraja natjecanja.</b> Možeš se prijaviti
          kao <strong>školarac</strong>,{" "}
          <strong>student preddiplomskog studija</strong>,{" "}
          <strong>student diplomskog studija</strong> te se natječeš u svojoj
          kategoriji. Također postoji i <strong>open</strong> kategorija koja
          obuhvaća sve ostale koji ne pripadaju prethodnim kategorijama, a žele
          sudjelovati.
        </p>

        <p className="paragraph pb-5 font-sans text-base leading-7 tracking-wide md:text-lg md:leading-8">
          Očekuje te mnoštvo nagrada! Uz kekse i čokolade možeš osvojiti majice,
          slušalice, ulaznice za Muzej iluzija / Smashit i još puno toga!
          Dodijeljivat će se nagrade pobjednicima svakog kola, nagrade za ukupne
          pobjednike natjecanja te utješne nagrade za svakoga. Najupornije ćemo
          također nagraditi došašće++ majicama.
        </p>

        <p className="paragraph font-sans text-base leading-7 tracking-wide md:text-lg md:leading-8">
          Natjecanje službeno počinje <strong>1. prosinca</strong>, ali
          priključiti se možeš bilo kada. Prijavljuješ se preko Google računa, a
          rješenja možeš poslati preko stranice zadataka. Svečana podjela
          nagrada i druženje održat će se <strong>20. prosinca na FER-u</strong>{" "}
          kada ćemo imati priliku čuti kako su oni najbolji riješili zadatke. Ne
          propusti priliku testirati svoje vještine, upoznati druge
          entuzijastične programere i ponešto osvojiti. Pridruži se i doprinesi
          čaroliji blagdanskog programiranja!
        </p>
      </div>
    </section>
  );
}
