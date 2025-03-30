export interface ProductDescription {
  root: {
    children: Array<{
      children: Array<{
        detail: number;
        format: number;
        mode: string;
        style: string;
        text: string;
        type: string;
        version: number;
        textFormat?: number; // Make it optional
        textStyle?: string; // Make it optional
      }>;
      direction: string;
      format: string;
      indent: number;
      type: string;
      version: number;
      textFormat: number;
      textStyle: string;
    }>;
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface ProductData {
  basicInfo: {
    productName: string;
    productDescription?: ProductDescription;
    category: string;
    subcategory: string;
    brand: string;
    sku: string;
    productTags: string[];
  };
  pricing: {
    basePrice: number;
    taxRate: number;
    currency: string;
    discountedPrice?: any;
    discountPercentage?: any;
  };
  inventory: {
    stockQuantity: number;
    stockStatus: string;
    minOrderQuantity: number;
    maxOrderQuantity: number;
  };
  shipping: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    shippingCost: number;
    estimatedDelivery: string;
    returnPolicy: string;
  };
  images: {
    productImages: string[];
    productVideos: string[];
    altTexts: string[];
  };
  variations: {
    sizeOptions: string[];
    colorVariants: ColorVariant[];
    materialType: string[];
    customizations: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    slug: string;
  };
  otherInfo: {
    isFeatured: boolean;
    warrantyInfo: string;
    supplierInfo: string;
  };
}
