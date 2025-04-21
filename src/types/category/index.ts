export interface Subcategory {
  _id?: string;
  name: string;
}

export interface Category {
  _id?: string;
  name: string;
  subcategories: Subcategory[];
  createdAt?: string;
}
export interface CategoryFormValues {
  name: string;
  subcategories: Subcategory[];
}
