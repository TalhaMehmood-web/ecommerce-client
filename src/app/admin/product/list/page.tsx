import DataTable from "@/components/app/(admin)/product/list";
import React from "react";

const ListProducts = () => {
  const columns = [
    { key: "id", label: "ID", minWidth: "50px" },
    { key: "name", label: "Name", minWidth: "150px" },
    { key: "email", label: "Email", minWidth: "200px" },

    { key: "actions", label: "Actions", minWidth: "100px" },
  ];
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Responsive Data Table</h1>
      <p className="text-gray-600 mb-8">
        A beautiful responsive table that works on all screen sizes with
        horizontal scrolling.
      </p>

      {/* Note: In a real app, replace with your actual API endpoint */}
      <DataTable
        columns={columns}
        endpoint="https://jsonplaceholder.typicode.com/users"
      />
    </div>
  );
};

export default ListProducts;
