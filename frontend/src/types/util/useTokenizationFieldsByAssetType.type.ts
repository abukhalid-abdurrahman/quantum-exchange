import { TokenizeRealEstateSchema } from "@/schemas/rwa/tokenizeRealEstate.schema";
import { FormField } from "@/types/form/formField.type";
import { AnyZodObject, ZodObject } from "zod";

export type FieldsByAssetType = {
  schema: ZodObject<any> | AnyZodObject;
  fields: FormField[] | [];
  defaultValues: TokenizeRealEstateSchema | object;
};
