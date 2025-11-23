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
            {" "}
            došašće++{" "}
          </b>{" "}
          je online božićno natjecanje inspirirano omiljenim natjecanjem{" "}
          <Anchor href="https://adventofcode.com/">Advent of Code</Anchor>.
          Natjecanje se sastoji od nekoliko kola u kojima se u svakom otvara
          novi optimizacijski zadatak. Svi zadaci{" "}
          <strong>dostupni su do kraja natjecanja.</strong> Možeš se prijaviti
          kao <strong>školarac</strong>,{" "}
          <strong>student preddiplomskog studija</strong> ili{" "}
          <strong>student diplomskog studija</strong> te se natjecati u svojoj
          kategoriji. Dostupna je i <strong>open</strong> kategorija koja
          obuhvaća sve ostale koji ne pripadaju prethodnim kategorijama, a žele
          sudjelovati.
        </p>

        <p className="paragraph font-sans text-base leading-7 tracking-wide md:text-lg md:leading-8">
          {" "}
          Natjecanje službeno počinje <strong>1. prosinca u 00:01</strong>, a
          završava <strong>19. prosinca u 23:59</strong>, no priključiti se
          možeš u bilo kojem trenutku. Prijavljuješ se putem Google računa, a
          rješenja predaješ na stranicama zadataka. Svečana dodjela nagrada i
          druženje održat će se <strong>20. prosinca na FER-u</strong>, gdje
          ćemo čuti kako su najbolji sudionici pristupili zadacima. Očekuje te
          mnogo nagrada, od keksa i čokolada do majica i drugih poklona. Nagrade
          se dodjeljuju pobjednicima svake kategorije te ukupnim pobjednicima
          natjecanja, a tu su i utješne nagrade za sve sudionike. Iskoristi
          priliku pokazati svoje vještine, upoznati druge entuzijastične
          programere i osvojiti nešto usput. Pridruži se i doprinesi blagdanskom
          programerskom duhu.{" "}
        </p>
      </div>
    </section>
  );
}
