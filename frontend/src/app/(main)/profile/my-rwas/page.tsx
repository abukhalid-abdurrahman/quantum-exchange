import RWATable from "@/app/rwa/components/RWATable";

export default function page() {
  return (
    <div>
      <RWATable areFiltersHidden={true} absoluteFilters={true} />
    </div>
  );
}
