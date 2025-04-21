"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

interface Review {
  _id: string;
  user: {
    fullname: string;
  };
  rating: number;
  review: string;
  images: string[];
  createdAt: string;
}

interface ProductReviewListProps {
  isLoading: boolean;
  isError: boolean;
  data:
    | {
        totalReviews: number;
        averageRating: number;
        reviews: Review[];
      }
    | undefined;
}

const ProductReviewList: FC<ProductReviewListProps> = ({
  isLoading,
  isError,
  data,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load reviews.</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-4 mt-6">
      <div className="flex gap-4 mb-4">
        <p className="text-sm font-medium">
          <strong>{data.totalReviews}</strong> Reviews
        </p>
        <p className="text-sm font-medium">
          Avg Rating: <strong>{data.averageRating?.toFixed(1)}</strong> / 5
        </p>
      </div>

      {data.reviews.map((review) => (
        <div
          key={review._id}
          className="border rounded-lg p-4 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <div className="font-medium">{review.user.fullname}</div>
            <div className="flex gap-1 items-center text-yellow-500">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600">{review.review}</p>

          {review.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {review.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-32 h-32 rounded overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`review-image-${idx}`}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-400 mt-1">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewList;
