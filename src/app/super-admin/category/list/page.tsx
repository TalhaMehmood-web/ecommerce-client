import ListCategoriesView from "@/components/app/(super-admin)/category/list";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import { Button } from "@/components/ui/button";
import { ShieldPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <PageWrapper className="flex flex-col gap-4">
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "List Categories" },
        ]}
      />
      <div className="flex items-center justify-between">
        <PageTitle title="Categories List" />
        <Link href={"/super-admin/category/add"}>
          <Button className="text-white  " size="lg" variant="success">
            <ShieldPlus />
            Add New Category
          </Button>
        </Link>
      </div>
      <ListCategoriesView />
    </PageWrapper>
  );
};

export default page;
