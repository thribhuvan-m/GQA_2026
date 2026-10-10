import { site } from "@/config/site";

export function AnnouncementBar() {
  if (!site.announcement.enabled || !site.announcement.message) return null;
  return (
    <div className="bg-forest text-cream">
      <p className="container-page py-2 text-center text-xs font-medium tracking-wide sm:text-[0.8rem]">
        {site.announcement.message}
      </p>
    </div>
  );
}
