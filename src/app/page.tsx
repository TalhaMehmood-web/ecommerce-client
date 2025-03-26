"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className="font-nunito-sans">
      <Button onClick={() => router.push("/admin/add-product")}>
        Go to Admin
      </Button>
    </div>
  );
};

export default page;
