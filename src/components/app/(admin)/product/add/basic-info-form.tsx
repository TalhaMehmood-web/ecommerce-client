"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X, Plus } from "lucide-react";
// import { basicInfoSchema, BasicInfoValues } from "@/lib/form-schema";
import { basicInfoSchema, BasicInfoValues } from "@/lib/schema/add-product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RichTextEditor, {
  initialValue,
} from "@/components/shared/rich-text-editor";

interface BasicInfoFormProps {
  defaultValues?: BasicInfoValues;
  onSubmit: (values: BasicInfoValues) => void;
}

const categories = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Books",
  "Sports & Outdoors",
  "Toys & Games",
  "Automotive",
  "Health & Wellness",
];

const subcategories = {
  Electronics: [
    "Laptops",
    "Smartphones",
    "Tablets",
    "Cameras",
    "Audio",
    "Wearables",
  ],
  Clothing: ["Men", "Women", "Kids", "Outerwear", "Activewear", "Formal"],
  Accessories: ["Watches", "Jewelry", "Bags", "Hats", "Scarves", "Sunglasses"],
  "Home & Kitchen": ["Furniture", "Appliances", "Cookware", "Bedding", "Decor"],
  "Beauty & Personal Care": [
    "Skincare",
    "Makeup",
    "Haircare",
    "Fragrance",
    "Bath & Body",
  ],
  Books: ["Fiction", "Non-fiction", "Children's", "Educational", "Comics"],
  "Sports & Outdoors": [
    "Fitness",
    "Camping",
    "Team Sports",
    "Water Sports",
    "Winter Sports",
  ],
  "Toys & Games": [
    "Board Games",
    "Action Figures",
    "Educational Toys",
    "Outdoor Toys",
  ],
  Automotive: [
    "Car Parts",
    "Accessories",
    "Tools",
    "Maintenance",
    "Electronics",
  ],
  "Health & Wellness": [
    "Vitamins",
    "Supplements",
    "Medical Supplies",
    "Personal Care",
  ],
};

export function BasicInfoForm({ defaultValues, onSubmit }: BasicInfoFormProps) {
  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: defaultValues || {
      productName: "",
      productDescription: initialValue,
      category: "",
      subcategory: "",
      brand: "",
      sku: "",
      productTags: [],
    },
  });
  console.log("defaultValues", defaultValues);
  const [tag, setTag] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  const handleAddTag = () => {
    if (tag && !form.getValues().productTags.includes(tag)) {
      form.setValue("productTags", [...form.getValues().productTags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue(
      "productTags",
      form.getValues().productTags.filter((t) => t !== tagToRemove)
    );
  };

  return (
    <div className="w-full  p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Basic Information
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter unique SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <RichTextEditor {...field} editorKey="productDescription" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCategory(value);
                      form.setValue("subcategory", "");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedCategory}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCategory &&
                        subcategories[
                          selectedCategory as keyof typeof subcategories
                        ]?.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productTags"
            render={() => (
              <FormItem>
                <FormLabel>Product Tags</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.getValues().productTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" size="sm" onClick={handleAddTag}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" className="animate-float">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
