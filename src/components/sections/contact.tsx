export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-dosasce-white flex w-full flex-col items-center justify-center"
    >
      <div className="w-full px-8 py-3 md:w-3/4 md:px-0">
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
      </div>
    </section>
  );
}
