import { CompanyFormData } from "@/types/verify";
import { Step } from "../../components/step";
import { CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyReviewFormProps {
  data: CompanyFormData;
}

export const CompanyReviewForm = ({ data }: CompanyReviewFormProps) => {
  console.log({ data });
  return (
    <Step
      title="Review Company Details"
      description="Review your company information before finalizing"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-lg border p-6 shadow-sm"
      >
        <h3 className="mb-4 text-lg font-semibold">Company Information</h3>
        <dl className="space-y-4">
          <div className="grid grid-cols-3">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">
              Name
            </dt>
            <dd className="col-span-2 text-sm">{data.name}</dd>
          </div>

          <div className="grid grid-cols-3">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">
              Address
            </dt>
            <dd className="col-span-2 text-sm">{data.address}</dd>
          </div>

          <div className="grid grid-cols-3">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">
              Contact
            </dt>
            <dd className="col-span-2 text-sm">{data.contact}</dd>
          </div>

          {data.taxId && (
            <div className="grid grid-cols-3">
              <dt className="col-span-1 text-sm font-medium text-muted-foreground">
                Tax ID
              </dt>
              <dd className="col-span-2 text-sm">{data.taxId}</dd>
            </div>
          )}

          {data.logo && (
            <div className="grid grid-cols-3">
              <dt className="col-span-1 text-sm font-medium text-muted-foreground">
                Logo
              </dt>
              <dd className="col-span-2">
                <div className="h-16 w-16 overflow-hidden rounded-md border">
                  <img
                    src={data.logo}
                    alt="Company logo"
                    className="h-full w-full object-cover"
                  />
                </div>
              </dd>
            </div>
          )}

          <div className="grid grid-cols-3">
            <dt className="col-span-1 text-sm font-medium text-muted-foreground">
              Status
            </dt>
            <dd className="col-span-2">
              <span className="flex items-center gap-1 text-sm">
                {data.isActive ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Active
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-yellow-600" />
                    Pending Activation
                  </>
                )}
              </span>
            </dd>
          </div>
        </dl>
      </motion.div>

      <div className="mt-8 rounded-lg border border-green-100 bg-green-50 p-4 text-center">
        <p className="text-green-700">
          Your company details have been submitted successfully!
        </p>
      </div>
    </Step>
  );
};
