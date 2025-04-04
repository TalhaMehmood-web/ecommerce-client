import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaymentStatusPageProps {
  status: "success" | "failure";
  title: string;
  message: string;
  orderNumber?: string;
  amount?: string;
  date?: string;
  primaryActionLabel: string;
  primaryActionLink: string;
  secondaryActionLabel?: string;
  secondaryActionLink?: string;
  children?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const PaymentStatusPage: React.FC<PaymentStatusPageProps> = ({
  status,
  title,
  message,
  orderNumber,
  amount,
  date,
  primaryActionLabel,
  primaryActionLink,
  secondaryActionLabel,
  secondaryActionLink,
  children,
}) => {
  const bgColorClass =
    status === "success" ? "bg-success-light" : "bg-error-light";
  const borderColorClass =
    status === "success" ? "border-success/20" : "border-error/20";

  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-8">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card
          className={`shadow-lg border-2 ${borderColorClass} ${bgColorClass}`}
        >
          <CardHeader className="pb-2">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-center text-2xl font-bold">
                {title}
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              className="flex justify-center py-4"
              variants={itemVariants}
            >
              {children}
            </motion.div>

            <motion.p
              className="text-center text-gray-700"
              variants={itemVariants}
            >
              {message}
            </motion.p>

            {(orderNumber || amount || date) && (
              <motion.div
                className="rounded-lg bg-white/70 p-4 space-y-2"
                variants={itemVariants}
              >
                {orderNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order ID:</span>
                    <span className="font-medium">{orderNumber}</span>
                  </div>
                )}

                {amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-medium">{amount}</span>
                  </div>
                )}

                {date && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">{date}</span>
                  </div>
                )}
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <motion.div className="w-full" variants={itemVariants}>
              <Button
                asChild
                className="w-full"
                variant={status === "success" ? "default" : "destructive"}
              >
                <Link href={primaryActionLink}>{primaryActionLabel}</Link>
              </Button>
            </motion.div>

            {secondaryActionLabel && secondaryActionLink && (
              <motion.div className="w-full" variants={itemVariants}>
                <Button asChild variant="outline" className="w-full">
                  <Link href={secondaryActionLink}>{secondaryActionLabel}</Link>
                </Button>
              </motion.div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentStatusPage;
