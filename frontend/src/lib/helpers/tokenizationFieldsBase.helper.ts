import { ASSET_TYPES, MIN_NUMBER } from "@/lib/constants";
import { z } from "zod";

export const tokenizationFieldsBase = [
  {
    name: "image",
    placeholder: "Image",
    type: "string",
  },
  {
    name: "title",
    placeholder: "Title",
    type: "string",
  },
  {
    name: "assetDescription",
    placeholder: "Description",
    type: "string",
  },
  {
    name: "proofOfOwnershipDocument",
    placeholder: "Proof of ownership document",
    type: "file",
  },
  {
    name: "uniqueIdentifier",
    placeholder: "Unique identifier",
    type: "string",
  },
  {
    name: "network",
    placeholder: "Network",
    type: "string",
  },
  {
    name: "royalty",
    placeholder: "Royalty",
    type: "number",
  },
  {
    name: "price",
    placeholder: "Price",
    type: "number",
  },
  {
    name: "ownerContact",
    placeholder: "Owner contact",
    type: "string",
  },
  {
    name: "assetType",
    placeholder: "Asset Type",
    type: "string",
  },
];
