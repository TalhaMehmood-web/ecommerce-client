"use client";
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
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { toast } from "sonner";

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
  useEffect(() => {
    const storedImages = defaultValues?.productImages || [];
    const storedAltTexts = defaultValues?.altTexts || [];

    form.setValue("productImages", storedImages);
    form.setValue("altTexts", storedAltTexts);
  }, [defaultValues, form]);

  // File Upload Mutation
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await axiosInstance.post("upload/multiple", formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.data) {
        const uploadedImages = data.data; // Extract URLs
        const newAltTexts = Array(uploadedImages.length).fill("");

        form.setValue("productImages", uploadedImages);
        form.setValue("altTexts", newAltTexts);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to upload images");
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const currentImages = form.getValues().productImages;

      if (currentImages.length + acceptedFiles.length > 5) {
        return toast.error("You can upload up to 5 images only.");
      }

      const totalSize = acceptedFiles.reduce((acc, file) => acc + file.size, 0);
      if (totalSize > 5 * 1024 * 1024) {
        return toast.error("Total file size should not exceed 5MB.");
      }

      setIsUploading(true);
      await toast.promise(uploadMutation.mutateAsync(acceptedFiles), {
        loading: "Uploading images...",
        success: "Images uploaded successfully!",
        error: (error: any) =>
          error?.response?.data?.message || "Failed to upload images.",
      });

      setIsUploading(false);
    },
    [uploadMutation, form]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxSize: 5 * 1024 * 1024,
  });

  const handleRemoveImage = (index: number) => {
    const newImages = [...form.getValues().productImages];
    const newAltTexts = [...(form.getValues().altTexts || [])];

    newImages.splice(index, 1);
    newAltTexts.splice(index, 1);

    form.setValue("productImages", newImages);
    form.setValue("altTexts", newAltTexts);
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
              Drag and drop up to 5 images (Max 5MB total) or click to upload
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
                        form.watch("altTexts")?.[index] ||
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
