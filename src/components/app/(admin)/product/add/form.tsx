"use client";
import FormFieldTitle from "@/components/shared/form-field/form-field-title";
import FormFieldWrapper from "@/components/shared/form-field/form-field-wrapper";
import ImageUploader from "@/components/shared/images-uploader";
import RichTextEditor from "@/components/shared/rich-text-editor";
import { Input } from "@/components/ui/input";
import AddProductOrganize from "./organize";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ShieldPlus } from "lucide-react";
import ProductInventory from "./product-inventory";

const AddProductForm = () => {
  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      images: [],
      inventory: {
        pricing: {
          regularPrice: "29",
          salesPrice: "",
          taxClass: "zero",
          displayFormat: "eur",
        },
        restock: {
          currentStock: "",
          threshold: "",
          status: "",
        },
        shipping: {
          fulfillmentOption: "",
          packageDimensions: {
            width: "",
            height: "",
            length: "",
            weight: "",
          },
        },
        attribute: "",
        advancce: {
          identification: {
            idType: "",
            productId: "",
          },
          inventorySettings: "",
        },
        global: {
          countries: [],
          localDelivery: {
            enabled: false,
            deliveryRadius: "",
            deliveryFee: "",
          },
        },
      },
    },
  });
  const { handleSubmit, register } = methods;
  const handleAddProduct = (data: any) => {
    console.log("data", data);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="flex-1 flex-col h-auto items-start flex gap-4  "
      >
        <div className="w-full grid place-content-end">
          <Button type="submit">
            <ShieldPlus /> Add Product
          </Button>
        </div>
        <div className="flex-1 w-full flex flex-col gap-4 ">
          {/* product title */}
          <FormFieldWrapper>
            <FormFieldTitle>Product Title</FormFieldTitle>
            <Input
              {...register("title")}
              className="h-12 bg-white"
              placeholder="Write title here.."
            />
          </FormFieldWrapper>

          {/* product description */}
          <FormFieldWrapper>
            <FormFieldTitle>Product Description</FormFieldTitle>
            <RichTextEditor />
          </FormFieldWrapper>
          {/* dispay images */}
          <FormFieldWrapper>
            <FormFieldTitle>Display Images</FormFieldTitle>
            <ImageUploader />
          </FormFieldWrapper>
          {/* inventory */}
          <FormFieldWrapper>
            <FormFieldTitle>Product Inventory</FormFieldTitle>
            <ProductInventory />
          </FormFieldWrapper>
        </div>
        <div className="flex flex-1 w-full h-full ">
          {/* organize section */}
          <div className="flex  flex-1 h-full gap-4">
            <FormFieldWrapper className="flex-1/2 h-full">
              <FormFieldTitle>Organize</FormFieldTitle>
              <AddProductOrganize />
            </FormFieldWrapper>
            <FormFieldWrapper className="flex-1/2 h-full">
              <FormFieldTitle>Organize</FormFieldTitle>
              <AddProductOrganize />
            </FormFieldWrapper>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddProductForm;
