import ListProductView from "@/components/app/(admin)/product/list";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import { Button } from "@/components/ui/button";
import { ShieldPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const ListProductPage = () => {
  return (
    <PageWrapper className="flex flex-col gap-4">
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Add Product" },
        ]}
      />
      <div className="flex items-center justify-between">
        <PageTitle title="Products List" />
        <Link href={"/admin/product/add"}>
          <Button className="text-white  " size="lg" variant="success">
            <ShieldPlus />
            Add New Product
          </Button>
        </Link>
      </div>
      <ListProductView />
    </PageWrapper>
  );
};

export default ListProductPage;
