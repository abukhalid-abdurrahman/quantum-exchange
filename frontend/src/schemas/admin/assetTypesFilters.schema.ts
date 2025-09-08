import { z } from "zod";

export const assetTypesFiltersschema = z.object({
  type: z.array(z.string()).min(1),
});

export type AssetTypesFiltersSchemaType = z.infer<
  typeof assetTypesFiltersschema
>;

export const assetTypesFiltersSchemaDefaultValues: AssetTypesFiltersSchemaType =
  {
    type: ["Movable", "Immovable"],
  };
