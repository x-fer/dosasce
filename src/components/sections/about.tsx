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
          je online božićno natjecanje inspirirano svima nam omiljenim Advent of
          Codeom. Natjecanje se sastoji od dva kola, a svaki se tjedan otvara
          optimizacijski zadatak druge vrste.{" "}
          <b>Svi zadaci su dostupni do kraja natjecanja.</b> Možeš se prijaviti
          kao školarac, student preddiplomskog ili student diplomskog studija te
          se natječeš u svojoj kategoriji.
        </p>

        <p className="paragraph pb-5 font-sans text-base leading-7 tracking-wide md:text-lg md:leading-8">
          Očekuje te mnoštvo nagrada! Uz kekse i čokolade možeš osvojiti majice,
          slušalice, ulaznice za Muzej iluzija / Smashit i još puno toga!
          Dodijeljivat će se nagrade pobjednicima svakog kola, nagrade za ukupne
          pobjednike natjecanja te utješne nagrade za svakoga. Najupornije ćemo
          također nagraditi došašće++ majicama.
        </p>

        <p className="paragraph font-sans text-base leading-7 tracking-wide md:text-lg md:leading-8">
          Natjecanje službeno počinje <strong>7. prosinca</strong>, ali
          priključiti se možeš bilo kada. Prijavljuješ se preko Google računa, a
          rješenja možeš poslati preko stranice zadataka. Svečana podjela
          nagrada i druženje održat će se <strong>21. prosinca na FER-u</strong>{" "}
          kada ćemo imati priliku čuti kako su oni najbolji riješili zadatke. Ne
          propusti priliku testirati svoje vještine, upoznati druge
          entuzijastične programere i ponešto osvojiti. Pridruži se i doprinesi
          čaroliji blagdanskog programiranja!
        </p>
      </div>
    </section>
  );
}
