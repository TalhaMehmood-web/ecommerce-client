import React, { useState, useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { imagesSchema, ImagesValues } from "@/lib/schema/add-product";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

interface ImagesFormProps {
  defaultValues?: ImagesValues;
  onSubmit: (values: ImagesValues) => void;
  onBack: () => void;
}

export function ImagesForm({
  defaultValues,
  onSubmit,
  onBack,
}: ImagesFormProps) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ImagesValues>({
    resolver: zodResolver(imagesSchema),
    defaultValues: defaultValues || {
      productImages: [],
      productVideos: [],
      altTexts: [],
    },
  });

  // Load default images from defaultValues.productImages
  useEffect(() => {
    const storedImages = defaultValues?.productImages || [];
    const storedAltTexts = defaultValues?.altTexts || [];

    form.setValue("productImages", storedImages);
    form.setValue("altTexts", storedAltTexts);
  }, [defaultValues, form]);

  // Convert file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);

      const newImages = [...form.getValues().productImages];
      const newAltTexts = [...(form.getValues().altTexts || [])];

      const base64Images = await Promise.all(acceptedFiles.map(fileToBase64));

      base64Images.forEach((imageUrl) => {
        newImages.push(imageUrl);
        newAltTexts.push("");
      });

      form.setValue("productImages", newImages);
      form.setValue("altTexts", newAltTexts);

      // Store in localStorage
      localStorage.setItem("productImages", JSON.stringify(newImages));
      localStorage.setItem("altTexts", JSON.stringify(newAltTexts));

      setIsUploading(false);
    },
    [form]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxSize: 5242880,
  });

  const handleRemoveImage = (index: number) => {
    const newImages = [...form.getValues().productImages];
    const newAltTexts = [...(form.getValues().altTexts || [])];

    newImages.splice(index, 1);
    newAltTexts.splice(index, 1);

    form.setValue("productImages", newImages);
    form.setValue("altTexts", newAltTexts);

    // Update localStorage
    localStorage.setItem("productImages", JSON.stringify(newImages));
    localStorage.setItem("altTexts", JSON.stringify(newAltTexts));
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Images & Media</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p className="text-sm">
              Drag and drop your images here or click to upload
            </p>
          </div>

          {form.watch("productImages").length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {form.watch("productImages").map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative rounded-lg overflow-hidden border p-2"
                >
                  <AspectRatio ratio={1}>
                    <img
                      src={image}
                      alt={
                        form?.watch("altTexts")?.[index] ||
                        `Product image ${index + 1}`
                      }
                      className="object-cover w-full h-full rounded-md"
                    />
                  </AspectRatio>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 w-5 h-5 p-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <Input
                    placeholder="Alt text"
                    value={form.watch("altTexts")?.[index] || ""}
                    onChange={(e) => {
                      const newAltTexts = [
                        ...(form.getValues().altTexts || []),
                      ];
                      newAltTexts[index] = e.target.value;
                      form.setValue("altTexts", newAltTexts);
                      localStorage.setItem(
                        "altTexts",
                        JSON.stringify(newAltTexts)
                      );
                    }}
                    className="text-xs p-1 w-full mt-1"
                  />
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Next Step</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
