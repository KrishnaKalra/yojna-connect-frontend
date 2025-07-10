import { Loader2 } from "lucide-react";

export const Spinner = ({ size = 15, className = "" }) => {
  return (
    <div className="flex items-center justify-center h-40">
    <Loader2
      className={`h-${size} w-${size} animate-spin text-blue-600 ${className}`}
    />
    </div>
  );
};