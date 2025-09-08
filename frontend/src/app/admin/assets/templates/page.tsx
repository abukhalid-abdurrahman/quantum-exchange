import SearchField from "@/app/admin/assets/templates/components/Search";
import Templates from "@/app/admin/assets/templates/components/Templates";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function page() {
  return (
    <div>
      <h2 className="h1 mb-1">Asset Templates</h2>
      <p className="p text-secondary">
        Templates that are the second or subsequent stages of tokenization
      </p>

      <div className="flex justify-between items-center mt-7.5">
        <SearchField />
        <Button variant="muted" size="lg">
          Add template <Plus />
        </Button>
      </div>

      <Templates className="mt-5" />
    </div>
  );
}
