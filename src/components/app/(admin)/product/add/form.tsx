import FormFieldTitle from "@/components/shared/form-field/form-field-title";
import FormFieldWrapper from "@/components/shared/form-field/form-field-wrapper";
import ImageUploader from "@/components/shared/images-uploader";
import RichTextEditor from "@/components/shared/rich-text-editor";
import { Input } from "@/components/ui/input";
import ProductInventory from "./product-inventory";
import AddProductOrganize from "./organize";

const AddProductForm = () => {
  return (
    <div className="flex-1 flex-col h-auto items-start flex gap-4  ">
      <div className="flex-1 w-full flex flex-col gap-4 ">
        {/* product title */}
        <FormFieldWrapper>
          <FormFieldTitle>Product Title</FormFieldTitle>
          <Input className="h-12 bg-white" placeholder="Write title here.." />
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
    </div>
  );
};

export default AddProductForm;
