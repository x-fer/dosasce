import Image from "next/image";
import Link from "next/link";

export default function Organizers() {
  return (
    <section
      id="organizers"
      className="bg-dosasce-white flex w-full flex-col items-center justify-center py-12"
    >
      <div className="w-full px-8 md:w-3/4 md:px-0">
        <h2 className="mb-8 font-serif text-3xl leading-tight font-extrabold tracking-wide md:text-4xl">
          ORGANIZATORI
        </h2>

        {/* X.FER */}
        <div className="mb-8">
          <h3 className="mb-3 font-serif text-xl font-bold md:text-2xl">
            X.FER
          </h3>
          <p className="font-sans text-base leading-7 md:text-lg md:leading-relaxed">
            Studentska je udruga na Fakultetu elektrotehnike i računarstva
            nastala s ciljem provođenja vještine Natjecateljsko programiranje.
            Polaznici vještine se upoznaju s primjenom algoritama u rješavanju
            složenih problema te uče optimizirati svoja programska rješenja.
            Osim vještine, organiziramo i programerska natjecanja kroz godinu na
            kojima studenti imaju priliku pokazati usvojena znanja, najveće od
            kojih je AlgoTrade hackathon. Članovi kluba su bivši natjecalji i
            olimpijci, a udruga trenutno broji 20-ak aktivnih te preko 50
            počasnih članova. Naša misija je omogućiti polaznicima vještine
            strukturirano obrazovanje iz algoritama te ih pripremiti za poslovne
            intervjue karakteristične za ovaj dio IT sektora. Cilj X.FER-a je
            okupiti najbolje studente te im omogućiti proširivanje znanja i
            napredak u ovom području. Želimo stvoriti otvorenu zajednicu u kojoj
            će članovi izmjenjivati natjecateljska i poslovna iskustva te učiti
            jedni od drugih.
          </p>
        </div>

        {/* EESTEC */}
        <div className="mb-8">
          <h3 className="mb-3 font-serif text-xl font-bold md:text-2xl">
            EESTEC LC Zagreb
          </h3>
          <p className="font-sans text-base leading-7 md:text-lg md:leading-relaxed">
            Neprofitna je studentska organizacija sa oko 150 aktivnih članova.
            Radi se o lokalnoj podružnici europske mreže studenata
            elektrotehnike (koja danas okuplja i studente drugih STEM područja).
            Glavni fokus udruge je na unaprjeđenju vlastitih članova, ali i
            drugih studenata kroz stjecanje praktičnih STEM vještina izvan
            formalnog obrazovanja. Kroz različite inicijative, uključujući
            specijalizirane radionice u IT sektoru, udruga pruža svojim
            članovima neophodne alate za profesionalni razvoj i umrežavanje,
            čime značajno doprinosi njihovoj konkurentnosti na tržištu rada.
            EESTEC LC Zagreb se ističe svojom sposobnošću da razvija visoko
            kvalificirane mlade profesionalce, čime privlači kontinuirani
            interes poslodavaca.
          </p>
        </div>

        {/* Logos in a row */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16">
          <Link
            href="https://xfer.hr/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/assets/logos/xfer.png"
              alt="X.FER logo"
              width={144}
              height={72}
              className="h-[48px] w-auto object-contain md:h-[80px]"
            />
          </Link>

          <Link
            href="https://www.fer.unizg.hr/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/assets/logos/fer.png"
              alt="FER logo"
              width={130}
              height={120}
              className="h-[80px] w-auto object-contain md:h-[120px]"
            />
          </Link>

          <Link
            href="https://eestec.hr/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/assets/logos/eestec.png"
              alt="EESTEC logo"
              width={120}
              height={120}
              className="h-[80px] w-auto object-contain md:h-[120px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
