import React, { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { imagesSchema, ImagesValues } from "@/lib/schema/add-product";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X, ImagePlus, Video } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useDropzone } from "react-dropzone";

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

  const productImages = form.getValues().productImages || [];
  const productVideos = form.getValues().productVideos || [];
  const altTexts = form.getValues().altTexts || [];

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsUploading(true);
      setTimeout(() => {
        const newImages = [...productImages];
        const newAltTexts = [...altTexts];

        acceptedFiles.forEach((file) => {
          if (file.type.includes("image")) {
            // In a real application, you would upload the file and get a URL
            // For this example, we'll use a placeholder
            const placeholders = [
              "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop",
            ];

            const imageUrl =
              placeholders[newImages.length % placeholders.length];
            newImages.push(imageUrl);
            newAltTexts.push(`Product image ${newImages.length}`);
          }
        });

        form.setValue("productImages", newImages);
        form.setValue("altTexts", newAltTexts);
        setIsUploading(false);
      }, 500); // Simulate upload delay
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5242880, // 5MB
  });

  const handleAddImage = () => {
    // In a real application, you would implement file selection
    // For this example, we'll add placeholder URLs
    const newImages = [...productImages];
    const newAltTexts = [...altTexts];

    // Add different placeholder images to make it more realistic
    const placeholders = [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop",
    ];

    const imageUrl = placeholders[newImages.length % placeholders.length];
    newImages.push(imageUrl);
    newAltTexts.push(`Product image ${newImages.length}`);

    form.setValue("productImages", newImages);
    form.setValue("altTexts", newAltTexts);
  };

  const handleAddVideo = () => {
    // In a real application, you would implement video selection
    // For this example, we'll add a placeholder video URL
    const newVideos = [...productVideos];
    newVideos.push("https://example.com/product-video.mp4");
    form.setValue("productVideos", newVideos);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...productImages];
    const newAltTexts = [...altTexts];

    newImages.splice(index, 1);
    newAltTexts.splice(index, 1);

    form.setValue("productImages", newImages);
    form.setValue("altTexts", newAltTexts);
  };

  const handleRemoveVideo = (index: number) => {
    const newVideos = [...productVideos];
    newVideos.splice(index, 1);
    form.setValue("productVideos", newVideos);
  };

  const handleUpdateAltText = (index: number, text: string) => {
    const newAltTexts = [...altTexts];
    newAltTexts[index] = text;
    form.setValue("altTexts", newAltTexts);
  };

  return (
    <div className="w-full  p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Images & Media</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload
              className={`h-12 w-12 mx-auto ${
                isDragActive ? "text-primary animate-bounce" : "text-gray-400"
              } mb-2`}
            />
            <p className="text-sm font-medium mb-1">
              {isDragActive
                ? "Drop files here..."
                : "Drag and drop your product images here"}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Supports JPG, PNG, WebP up to 5MB each
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the dropzone
                  handleAddImage();
                }}
                variant="outline"
                size="sm"
                className="animate-bounce-in"
                disabled={isUploading}
              >
                <ImagePlus className="h-4 w-4 mr-1" /> Add Image
              </Button>
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the dropzone
                  handleAddVideo();
                }}
                variant="outline"
                size="sm"
                disabled={isUploading}
              >
                <Video className="h-4 w-4 mr-1" /> Add Video
              </Button>
            </div>
            {isUploading && (
              <p className="text-xs text-primary mt-2 animate-pulse">
                Uploading...
              </p>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Product Images</h3>
            {productImages.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                No images added yet
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {productImages.map((image: any, index: any) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden border border-gray-200 animate-scale-in"
                  >
                    <AspectRatio ratio={1}>
                      <img
                        src={image}
                        alt={altTexts[index] || `Product image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-2">
                      <Input
                        placeholder="Alt text for SEO"
                        value={altTexts[index] || ""}
                        onChange={(e) =>
                          handleUpdateAltText(index, e.target.value)
                        }
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {productVideos.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Product Videos</h3>
              <div className="space-y-2">
                {productVideos.map((video: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 border rounded-md animate-fade-in"
                  >
                    <Video className="h-5 w-5 text-gray-500" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm truncate">{video}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemoveVideo(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" className="animate-float">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
