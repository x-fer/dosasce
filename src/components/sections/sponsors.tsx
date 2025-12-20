import Image from "next/image";
import Link from "next/link";

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="bg-dosasce-white flex w-full flex-col items-center justify-center py-12"
    >
      <div className="w-full px-8 md:w-3/4 md:px-0">
        <h2 className="mb-8 font-serif text-3xl leading-tight font-extrabold tracking-wide md:text-4xl">
          SPONZORI
        </h2>

        {/* Judge0 */}
        <div className="mb-8">
          <h3 className="mb-3 font-serif text-xl font-bold md:text-2xl">
            Judge0
          </h3>
          <p className="font-sans text-base leading-7 md:text-lg md:leading-relaxed">
            Judge0 je hrvatska open-source platforma za sigurno i udaljeno
            izvršavanje programskog koda. Platforma omogućuje kompajliranje i
            pokretanje predanih rješenja u izoliranom (sandbox) okruženju. Kao
            sponzor događaja Judge0 nam je osigurao besplatne računalne resurse
            za pokretanje checker sustava za zadatke.
          </p>
        </div>

        {/* Podravka */}
        <div className="mb-8">
          <h3 className="mb-3 font-serif text-xl font-bold md:text-2xl">
            Podravka
          </h3>
          <p className="font-sans text-base leading-7 md:text-lg md:leading-relaxed">
            Podravka je jedna od vodećih hrvatskih prehrambenih kompanija s
            dugogodišnjom tradicijom. Kao sponzor događaja Podravka je osigurala
            grickalice i osvježenje za sudionike i organizatore.
          </p>
        </div>

        {/* Logos in a row */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16">
          <Link
            href="https://judge0.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/assets/logos/judge0.png"
              alt="Judge0 logo"
              width={144}
              height={72}
              className="h-[32px] w-auto object-contain md:h-[52px]"
            />
          </Link>

          <Link
            href="https://www.podravka.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/assets/logos/podravka.png"
              alt="Podravka logo"
              width={130}
              height={120}
              className="h-[56px] w-auto object-contain md:h-[80px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
