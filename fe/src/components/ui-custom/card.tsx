
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  isHoverable?: boolean;
}

const Card = ({
  className,
  variant = "default",
  padding = "md",
  isHoverable = false,
  children,
  ...props
}: CardProps) => {
  const baseClasses = "rounded-lg shadow-md overflow-hidden transition-all duration-300";
  
  const variantClasses = {
    default: "bg-nexthire-card-gray",
    glass: "bg-nexthire-dark-gray bg-opacity-70 backdrop-blur-lg backdrop-filter border border-nexthire-light-gray/20",
    gradient: "bg-gradient-to-br from-nexthire-dark-gray to-nexthire-black border border-nexthire-light-gray/10"
  };
  
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7"
  };
  
  const hoverClasses = isHoverable 
    ? "hover:transform hover:-translate-y-1 hover:shadow-lg" 
    : "";
  
  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
