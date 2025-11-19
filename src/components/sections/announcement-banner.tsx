type AnnouncementBannerProps = {
  title: string;
  visible?: boolean;
};

export default function AnnouncementBanner({
  title,
  visible = false,
}: AnnouncementBannerProps) {
  if (!visible) return null;

  return (
    <div className="border-dosasce-red bg-dosasce-white mb-4 flex items-center gap-3 rounded-full border px-3 py-2 md:mb-6 md:px-4 md:py-2.5">
      <div className="bg-dosasce-green h-2 w-2 animate-pulse rounded-full" />
      <div className="flex flex-col gap-0.5">
        <p className="text-dosasce-red font-serif text-xs leading-tight font-bold md:text-sm">
          Novi zadatak otvoren!
        </p>
        <p className="font-sans text-xs leading-tight text-gray-600 md:text-sm">
          <span className="font-semibold text-gray-800">{title}</span> je sada
          dostupan.
        </p>
      </div>
    </div>
  );
}
