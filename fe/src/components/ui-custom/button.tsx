
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    isLoading = false, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const baseClasses = "rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center";
    
    const variantClasses = {
      primary: "bg-nexthire-purple hover:bg-nexthire-dark-purple text-white shadow-md hover:shadow-lg",
      secondary: "bg-nexthire-light-gray hover:bg-nexthire-dark-gray text-white",
      outline: "bg-transparent border border-nexthire-purple text-nexthire-purple hover:bg-nexthire-purple hover:bg-opacity-10",
      ghost: "bg-transparent hover:bg-nexthire-light-gray text-white",
      link: "bg-transparent text-nexthire-purple underline-offset-4 hover:underline p-0"
    };
    
    const sizeClasses = {
      sm: "text-sm px-3 py-1",
      md: "px-4 py-2",
      lg: "text-lg px-6 py-3"
    };
    
    const loadingClasses = isLoading 
      ? "relative text-transparent transition-none hover:text-transparent" 
      : "";
      
    const disabledClasses = disabled 
      ? "opacity-70 cursor-not-allowed" 
      : "";
      
    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          loadingClasses,
          disabledClasses,
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {children}
        
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="animate-spin h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
