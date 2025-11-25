import Button from "../ui/button";
import { Anchor } from "../ui/anchor";

export default function InputChecker({
  inputFileUrl,
  checkerFileUrl,
}: {
  inputFileUrl: string;
  checkerFileUrl: string;
}) {
  return (
    <div className="flex w-full gap-4">
      <Anchor href={inputFileUrl} styled={false} className="w-1/2">
        <Button variant="default" className="w-full">
          Ulazni podatci
        </Button>
      </Anchor>
      <Anchor href={checkerFileUrl} styled={false} className="w-1/2">
        <Button variant="primary" className="w-full">
          Program za provjeru
        </Button>
      </Anchor>
    </div>
  );
}
