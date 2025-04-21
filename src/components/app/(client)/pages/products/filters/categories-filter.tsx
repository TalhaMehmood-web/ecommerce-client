"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/utils/endpoints";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const fetchAllCategories = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.GET_ALL);
  return response.data;
};

const CategoriesFilters = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    select: (data) => data.categories,
  });

  return (
    <div>
      {data?.map((category: any, index: any) => (
        <Collapsible
          defaultOpen={index < 4}
          key={category._id}
          className="group/collapsible"
        >
          <SidebarGroup className="select-none">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger asChild>
                <div className="bg-slate-200/50 text-nowrap py-6 cursor-pointer text-base font-extrabold flex items-center">
                  <p>{category?.name}</p>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </div>
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {category.subcategories.map((sub: any) => (
                    <SidebarMenuItem key={sub._id}>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center gap-2 px-2">
                          <Checkbox className="cursor-pointer" id={sub._id} />
                          <label htmlFor={sub._id} className="text-sm">
                            {sub.name}
                          </label>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </div>
  );
};

export default CategoriesFilters;
