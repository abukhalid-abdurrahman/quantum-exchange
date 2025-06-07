"use client";

import TokenizationModal from "./TokenizationModal";
import PageTitle from "@/components/PageTitle";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import DateField from "@/components/form/DateField";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DragAndDropUpload } from "@/app/rwa/create/components/DragAndDropUpload";
import { useCreateRwa } from "@/requests/rwa/createRwa.request";
import { useTokenizationFields } from "@/hooks/useTokenizationFields";
import { getFieldsByAssetType } from "@/utils/getFieldsByAssetType.util";
import { useNetAmount } from "@/hooks/useNetAmount";
import { useCoords } from "@/hooks/useCoords";

const LocationPickerModal = dynamic(
  () => import("@/components/LocationPickerModal"),
  {
    ssr: false,
  }
);

export default function CreateRwa() {
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isTokenized, setIsTokenized] = useState(false);
  const [isSuccessfullyDone, setIsSuccessfullyDone] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenId, setTokenId] = useState("");

  const submit = useCreateRwa();

  const { tokenizeSchema, tokenizeFields, defaultTokenizeValues } =
    useTokenizationFields(selectedAssetType);

  const form = useForm<z.infer<typeof tokenizeSchema>>({
    resolver: zodResolver(tokenizeSchema),
    defaultValues: defaultTokenizeValues,
  });

  const assetType = form.watch("assetType");
  const price = form.watch("price");
  const royalty = form.watch("royalty");

  const netAmount = useNetAmount(price, royalty);
  const { coords, setCoords } = useCoords(form);

  const onSubmit = (data: z.infer<typeof tokenizeSchema>) => {
    setIsTokenized(true);
    setIsError(false);
    setErrorMessage("");
    submit.mutate(data, {
      onSuccess: (res: any) => {
        setIsSuccessfullyDone(true);
        setTokenId(res.data.tokenId);
      },
      onError: (error: any) => {
        setIsError(true);
        setErrorMessage(
          error.response?.data?.error?.message ||
            "Something went wrong. Please try again later."
        );
      },
    });
  };

  const checkFirstStep = async () => {
    const isValid = await form.trigger([
      "title",
      "assetDescription",
      "uniqueIdentifier",
      "network",
      "price",
      "royalty",
      "ownerContact",
      "image",
      "proofOfOwnershipDocument",
      "assetType",
    ]);
    if (isValid) {
      setIsSecondStep(true);
    }
  };

  useEffect(() => {
    if (assetType) {
      setSelectedAssetType(assetType);
    }
  }, [assetType]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-20 items-start lg:gap-5 md:flex-col"
        >
          <DragAndDropUpload control={form.control} name="image" />
          <div className="w-1/2 md:w-full">
            <PageTitle title="Create your Decentrlised Trust Agreement RWA" />
            <div
              className={`flex flex-col gap-2 firstStep ${
                isSecondStep ? "hidden" : "block"
              }`}
            >
              {tokenizeFields
                .filter(
                  (item) =>
                    item.name === "title" ||
                    item.name === "assetDescription" ||
                    item.name === "uniqueIdentifier" ||
                    item.name === "network"
                )
                .map((item, i) => (
                  <div key={i}>
                    {item?.selectItems ? (
                      <SelectField form={form} input={item} />
                    ) : (
                      <InputField form={form} input={item} />
                    )}
                  </div>
                ))}

              <div className="flex justify-between gap-2">
                {tokenizeFields
                  .filter(
                    (item) => item.name === "price" || item.name === "royalty"
                  )
                  .map((item, i) => (
                    <div key={i}>
                      <InputField form={form} input={item} />
                    </div>
                  ))}
                <div className="w-1/3">
                  <Input
                    type="number"
                    placeholder="Net amount"
                    disabled={true}
                    value={netAmount}
                  />
                </div>
              </div>

              {tokenizeFields
                .filter(
                  (item) =>
                    item.name === "ownerContact" ||
                    item.name === "proofOfOwnershipDocument" ||
                    item.name === "assetType"
                )
                .map((item, i) => (
                  <div key={i}>
                    {item?.selectItems ? (
                      <SelectField form={form} input={item} />
                    ) : (
                      <InputField
                        isFileField={item.name === "proofOfOwnershipDocument"}
                        withFormLabel={item.name === "proofOfOwnershipDocument"}
                        formLabelClasses="text-white"
                        form={form}
                        input={item}
                      />
                    )}
                  </div>
                ))}
            </div>
            <div
              className={`flex flex-col gap-2 isSecondStep ${
                isSecondStep ? "block" : "hidden"
              }`}
            >
              <h2 className="h2 mb-2 text-white border-b border-textGray pb-2">
                Additional fields for {assetType}
              </h2>
              {getFieldsByAssetType(selectedAssetType).fields.map((item) => (
                <div key={item.name}>
                  {item?.selectItems && (
                    <SelectField input={item} form={form} />
                  )}
                  {!item?.selectItems && (
                    <div>
                      {item?.type === "date" ? (
                        <DateField input={item} form={form} />
                      ) : (
                        <InputField
                          input={item}
                          form={form}
                          setIsMapOpen={setIsMapOpen}
                          coords={coords}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => {
                  setIsSecondStep(false);
                }}
                variant="gray"
                type="button"
                size="xl"
                className={`w-full ${isSecondStep ? "block" : "hidden"}`}
              >
                Prev Step
              </Button>
              <Button
                onClick={checkFirstStep}
                variant="gray"
                type="button"
                size="xl"
                className={`w-full ${isSecondStep ? "hidden" : "block"}`}
              >
                Next Step
              </Button>
              <Button
                variant="gray"
                type="submit"
                size="xl"
                className={`w-full ${isSecondStep ? "block" : "hidden"}`}
              >
                Mint RWA
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {isMapOpen && (
        <LocationPickerModal
          onSelect={(newCoords) => {
            setCoords(newCoords);
            // setIsMapOpen(false);
          }}
          setIsOpen={setIsMapOpen}
        />
      )}
      {isTokenized && (
        <TokenizationModal
          tokenId={tokenId}
          form={form}
          errorMessage={errorMessage}
          isError={isError}
          isSuccessfullyDone={isSuccessfullyDone}
          setIsSuccessfullyDone={setIsSuccessfullyDone}
          setIsOpen={setIsTokenized}
          setIsSecondStep={setIsSecondStep}
        />
      )}
    </>
  );
}
