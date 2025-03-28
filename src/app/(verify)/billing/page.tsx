"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Billing = () => {
  const router = useRouter();
  return (
    <div>
      billing and verifcation page to be added
      <Button onClick={() => router.push("/admin")}>Go to Admin</Button>
    </div>
  );
};

export default Billing;
