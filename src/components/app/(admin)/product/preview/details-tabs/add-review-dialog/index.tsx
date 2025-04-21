"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "./images-upload";
import StarRating from "./star-ratings";
import { usePathname } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import ApiLoader from "@/components/shared/loading/api-loader";

// Zod schema
const reviewSchema = z.object({
  review: z
    .string()
    .min(10, { message: "Review must be at least 10 characters" })
    .max(500, { message: "Review must be less than 500 characters" }),
  rating: z.number().min(1, { message: "Please provide a rating" }).max(5),
  images: z
    .array(
      z.object({
        id: z.string(),
        file: z.instanceof(File),
        preview: z.string(),
      })
    )
    .default([]),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ open, onOpenChange }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const id = pathname.split("/").pop() as string;

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
      rating: 0,
      images: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ReviewFormValues) => {
      const formData = new FormData();
      formData.append("productId", id);
      formData.append("review", data.review);
      formData.append("rating", data.rating.toString());

      data.images.forEach((image) => {
        formData.append("images", image.file);
      });

      const res = await axiosInstance.post(`product-review`, formData);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-reviews", id],
      });
      toast.success("Review submitted successfully!");
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const handleSubmit = (values: ReviewFormValues) => {
    mutation.mutate(values);
  };

  return (
    <React.Fragment>
      <ApiLoader
        isLoading={mutation.isPending}
        message="Adding Your Review..."
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-10/12 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with others. Your review will help people
              make better decisions.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <StarRating
                        rating={field.value}
                        setRating={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your review here..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Photos (Optional)</FormLabel>
                    <FormControl>
                      <ImageUpload
                        images={field.value}
                        setImages={field.onChange}
                        maxFiles={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button disabled={mutation.isPending} type="submit">
                    {mutation.isPending ? "Submitting..." : "Submit Review"}
                  </Button>
                </motion.div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ReviewForm;
