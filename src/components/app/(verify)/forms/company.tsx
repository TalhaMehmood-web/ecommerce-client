import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CompanyFormData,
  CompanyFormValues,
  companyFormSchema,
} from "@/types/verify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Step } from "../components/step";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface CompanyDetailsFormProps {
  data: CompanyFormData;
  updateData: (data: Partial<CompanyFormData>) => void;
  onValidSubmit?: () => void;
}

export const CompanyDetailsForm = ({
  data,
  updateData,
  onValidSubmit,
}: CompanyDetailsFormProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    data.logo || null
  );

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: data.name || "",
      address: data.address || "",
      contact: data.contact || "",
      taxId: data.taxId || "",
      isActive: data.isActive || false,
    },
  });

  // Update form when data prop changes
  useEffect(() => {
    form.reset({
      name: data.name || "",
      address: data.address || "",
      contact: data.contact || "",
      taxId: data.taxId || "",
      isActive: data.isActive || false,
    });
  }, [data, form]);

  // Watch for form changes and update parent component
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateData(value as Partial<CompanyFormData>);
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);

      // In a real app, you'd upload this to a server
      // For now, just store the preview URL
      updateData({ logo: previewUrl });
    }
  };

  return (
    <Step
      title="Company Details"
      description="Provide information about your company"
    >
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(() => {
            toast.success("Company details saved");
            if (onValidSubmit) onValidSubmit();
          })}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter company address"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax ID (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tax ID"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel htmlFor="company-logo">Company Logo</FormLabel>
            <div className="flex items-center gap-4">
              {logoPreview && (
                <div className="h-16 w-16 overflow-hidden rounded-md border">
                  <img
                    src={logoPreview}
                    alt="Company logo preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <Input
                id="company-logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full"
              />
            </div>
          </div>
        </form>
      </Form>
    </Step>
  );
};
