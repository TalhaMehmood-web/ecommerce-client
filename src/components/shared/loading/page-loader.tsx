import { Loader2 } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className=" text-blue-400  animate-spin flex-1 flex w-full justify-center items-center">
      <Loader2 size={40} />
    </div>
  );
};

export default PageLoader;
