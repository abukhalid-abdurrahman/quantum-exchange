import Filters from "@/app/admin/assets/types/components/Filters";
import SearchField from "@/app/admin/assets/types/components/Search";
import Types from "@/app/admin/assets/types/components/Types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function page() {
  return (
    <div>
      <h2 className="h1 mb-1">Asset Types</h2>
      <div className="flex items-center justify-between mt-7.5">
        <div className="flex gap-7.5 items-center">
          <SearchField />
          <Filters />
        </div>
        <Button variant="muted" size="lg">
          Add type <Plus />
        </Button>
      </div>
      <Types className="mt-5" />
    </div>
  );
}
