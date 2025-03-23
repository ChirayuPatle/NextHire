import { cn } from "@/lib/utils";
import { theme } from "@/styles/theme";

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-muted/50 rounded-xl border border-border/50 p-8",
      "transition-all duration-200",
      "hover:border-primary/20",
      "backdrop-blur-sm shadow-lg",
      className
    )}
    {...props}
  />
);

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "w-full bg-background/50 border border-border/50 text-foreground rounded-lg px-4 py-2",
      "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
      "placeholder:text-muted-foreground/50",
      "transition-all duration-200",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
);

export const Button = ({
  variant = "primary",
  className,
  children,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
}) => (
  <button
    className={cn(
      "px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center",
      "transition-all duration-200",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      {
        "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20": variant === "primary",
        "bg-secondary/10 text-secondary hover:bg-secondary/20": variant === "secondary",
        "bg-transparent hover:bg-muted text-muted-foreground": variant === "ghost",
      },
      className
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
); 