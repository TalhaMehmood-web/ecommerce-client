"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { tabContentVariants } from ".";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import AddReviewDialog from "./add-review-dialog";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import axiosInstance from "@/config/axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TablePagination from "@/components/shared/data-table/table-pagination";
import ProductReviewList from "./product-review-list";

// Fetch function
const fetchReviews = async (productId: string, page: number, limit: number) => {
  const res = await axiosInstance.get(
    `product-review?productId=${productId}&page=${page}&limit=${limit}`
  );
  return res.data;
};

const ProductReviewsAndRatings = () => {
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  // Assuming your product detail page URL looks like /products/:productId
  const productId = pathname.split("/").pop();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-reviews", productId, page, limit],
    queryFn: () => fetchReviews(productId as string, page, limit),
    enabled: !!productId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const totalPages = Math.ceil((data?.pagination?.totalReviews || 0) / 3);
  return (
    <React.Fragment>
      <TabsContent value="reviews" className="focus-visible:outline-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tabContentVariants}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-xl font-semibold mb-4">
                  Reviews and ratings
                </h3>
                <Button
                  onClick={() => setOpenReviewDialog(true)}
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 "
                >
                  <Star /> Rate this product
                </Button>
              </div>
              <ProductReviewList
                isError={isError}
                isLoading={isLoading}
                data={data}
              />
            </CardContent>
          </Card>

          {totalPages > 1 && (
            <TablePagination
              currentPage={page}
              totalPages={totalPages}
              pageSize={limit}
              totalItems={data?.totalReviews || 0}
              onPageChange={setPage}
              onPageSizeChange={setLimit}
              pageSizeOptions={[3, 5, 10, 20]}
            />
          )}
        </motion.div>
      </TabsContent>

      <AddReviewDialog
        open={openReviewDialog}
        onOpenChange={setOpenReviewDialog}
      />
    </React.Fragment>
  );
};

export default ProductReviewsAndRatings;
