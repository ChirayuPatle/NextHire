import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const baseSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number and special character"
    ),
});

interface RegistrationFormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (values: z.infer<T>) => Promise<void>;
  children: React.ReactNode;
}

export function RegistrationForm<T extends z.ZodType>({
  schema,
  onSubmit,
  children,
}: RegistrationFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<T>) => {
    try {
      await onSubmit(values);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {children}
      </form>
    </Form>
  );
} 