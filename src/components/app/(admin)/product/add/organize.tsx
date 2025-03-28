"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagsInput from "./tags-input";
// import TagsInput from "@/components/tags-input";

const AddProductOrganize = () => {
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [collection, setCollection] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="bg-white shadow-md w-full h-full flex-1 rounded-md  p-4 space-y-4">
      {/* Category Select */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium">Category</label>
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="books">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vendor Select */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium">Vendor</label>
        <Select onValueChange={setVendor}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vendor1">Vendor 1</SelectItem>
            <SelectItem value="vendor2">Vendor 2</SelectItem>
            <SelectItem value="vendor3">Vendor 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Collection Select */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium">Collection</label>
        <Select onValueChange={setCollection}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="summer">Summer Collection</SelectItem>
            <SelectItem value="winter">Winter Collection</SelectItem>
            <SelectItem value="sale">Sale Items</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium">Tags</label>
        <TagsInput tags={tags} setTags={setTags} />
      </div>
    </div>
  );
};

export default AddProductOrganize;
