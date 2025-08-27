import Filters from "@/app/(main)/profile/history/components/Filters";
import GeneralFilters from "@/app/(main)/profile/history/components/GeneralFilters";
import { RwaHistory } from "@/app/(main)/profile/history/components/RwaHistory";
import { SwapHistory } from "@/app/(main)/profile/history/components/SwapHistory";

export default function page() {
  return (
    <div>
      <h2 className="h1 mb-1">RWA history</h2>

      <Filters className="mt-5" />
      <RwaHistory />

      <h2 className="h1 mb-1 mt-12.5">Swap history</h2>
      <GeneralFilters className="mt-5" />
      <SwapHistory />
    </div>
  );
}
