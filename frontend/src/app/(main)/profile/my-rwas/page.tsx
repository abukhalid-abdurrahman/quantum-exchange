import RWATable from "@/app/(main)/rwa/components/RWATable";

export default function page() {
  return (
    <div>
      <RWATable areFiltersHidden={true} absoluteFilters={true} />
    </div>
  );
}
