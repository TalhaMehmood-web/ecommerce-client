import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  placeholder?: string;
  className?: string;
  field: any; // React Hook Form field props
}

const PasswordInput = ({
  placeholder = "••••••••",
  className = "",
  field,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`pl-10 pr-10 ${className}`} // Ensure space for the eye icon
        {...field}
        autoComplete="current-password"
      />
      <button
        type="button"
        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
