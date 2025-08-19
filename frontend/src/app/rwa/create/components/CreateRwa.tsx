"use client";

import TokenizationModal from "./TokenizationModal";
import PageTitle from "@/components/PageTitle";
import InputField from "@/components/form/fields/InputField";
import SelectField from "@/components/form/fields/SelectField";
import DateField from "@/components/form/fields/DateField";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DragAndDropUpload } from "@/app/rwa/create/components/DragAndDropUpload";
import { useCreateRwa } from "@/requests/rwa/createRwa.request";
import { useTokenizationFields } from "@/hooks/useTokenizationFields";
import { getFieldsByAssetType } from "@/utils/getFieldsByAssetType.util";
import { useNetAmount } from "@/hooks/useNetAmount";
import { useCoords } from "@/hooks/useCoords";
import { MoveRight } from "lucide-react";
import FileDropField from "@/components/form/fields/FileDropField";
import { FormFieldRenderer } from "@/components/form/FormFieldRenderer";

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
          <DragAndDropUpload
            control={form.control}
            name="image"
            isSuccessfullyDone={isSuccessfullyDone}
          />
          <div className="w-1/2 md:w-full">
            <div className={`firstStep ${isSecondStep ? "hidden" : "block"}`}>
              {tokenizeFields.map((item, i) => (
                <div key={i}>
                  <h3
                    className={`h3 mb-5 text-secondary ${i === 0 ? "mt-0" : "mt-7"}`}
                  >
                    {item.title}
                  </h3>
                  <div className="flex flex-col gap-[14px]">
                    {item.fields.map((formField, i) => (
                      <FormFieldRenderer
                        fieldType={formField.type}
                        key={i}
                        form={form}
                        input={formField}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`flex flex-col gap-[14px] isSecondStep ${
                isSecondStep ? "block" : "hidden"
              }`}
            >
              <h2 className="h2 mb-2 text-white border-b border-text-gray pb-2">
                Additional fields for {assetType}
              </h2>
              {/* {getFieldsByAssetType(selectedAssetType).fields.map((item) => (
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
              ))} */}
            </div>

            <div className="flex justify-end gap-2 mt-10">
              <Button
                onClick={() => {
                  setIsSecondStep(false);
                }}
                variant="default"
                type="button"
                size="xl"
                className={`w-full ${isSecondStep ? "block" : "hidden"}`}
              >
                Prev Step
              </Button>
              <Button
                onClick={checkFirstStep}
                variant="default"
                type="button"
                size="lg"
                className={`${isSecondStep ? "hidden" : "flex gap-5"}`}
              >
                Continue
                <MoveRight />
              </Button>
              <Button
                variant="default"
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
