import FormFieldTitle from "@/components/shared/form-field/form-field-title";
import FormFieldWrapper from "@/components/shared/form-field/form-field-wrapper";
import ImageUploader from "@/components/shared/images-uploader";
import RichTextEditor from "@/components/shared/rich-text-editor";
import { Input } from "@/components/ui/input";
import ProductInventory from "./product-inventory";

const AddProductForm = () => {
  return (
    <div className="flex-1 items-center flex gap-4  ">
      <div className="flex-[0.5] flex flex-col gap-4 ">
        {/* product title */}
        <FormFieldWrapper>
          <FormFieldTitle>Product Title</FormFieldTitle>
          <Input className="h-12" placeholder="Write title here.." />
        </FormFieldWrapper>
        {/* dispay images */}
        <FormFieldWrapper>
          <FormFieldTitle>Display Images</FormFieldTitle>
          <ImageUploader />
        </FormFieldWrapper>
        {/* product description */}
        <FormFieldWrapper>
          <FormFieldTitle>Product Description</FormFieldTitle>
          <RichTextEditor />
        </FormFieldWrapper>
        {/* inventory */}
        <FormFieldWrapper>
          <FormFieldTitle>Product Inventory</FormFieldTitle>
          <ProductInventory />
        </FormFieldWrapper>
      </div>
      <div className="flex flex-[0.5] "></div>
    </div>
  );
};

export default AddProductForm;
