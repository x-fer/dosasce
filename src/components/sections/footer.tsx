import Separator from "../ui/separator";

export default function Footer() {
  return (
    <>
      <Separator variant="christmas-tree" />
      <footer className="bg-dosasce-red text-dosasce-white flex w-full items-center justify-center py-8 text-center font-serif text-lg">
        Running since 2023 • Made with &lt;3 by X.FER
      </footer>
    </>
  );
}
