import { cn } from "@/lib/utils";
import Image from "next/image";

const CoverImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const imageSrc = src.startsWith("/") ? src : `/${src}`;

  return (
    <div className="mb-6 h-72 max-h-75 w-full overflow-hidden rounded-t-lg md:mb-8">
      <Image
        src={imageSrc}
        alt={alt}
        width={1024}
        height={300}
        className={cn("m-0! h-full w-full object-cover!", className)}
        priority
      />
    </div>
  );
};

export default CoverImage;
