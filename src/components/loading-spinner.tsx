import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "border-4 rounded-full border-brand-200 border-t-brand-700 animate-spin duration-700",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        md: "size-6 border-4",
        lg: "size-8 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

const LoadingSpinner = ({ size, className }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(spinnerVariants({ size: "md", className: "h-8 w-8" }))}
      />
    </div>
  );
};

export default LoadingSpinner;