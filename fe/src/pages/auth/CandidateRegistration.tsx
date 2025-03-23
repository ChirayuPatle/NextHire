import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterCandidate } from "@/hooks/auth/useRegister";
import { Card, Input, Button } from "@/components/ui/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, Plus } from "lucide-react";

const candidateSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain uppercase, lowercase, number and special character'
    ),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

type CandidateFormData = z.infer<typeof candidateSchema>;

export default function CandidateRegistration() {
  const { mutate: register, isPending } = useRegisterCandidate();
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
  });

  const onSubmit = async (data: CandidateFormData) => {
    try {
      await register({
        ...data,
        skills
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && skills.length < 10) { // Limit max skills
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  return (
    <Card className="max-w-md mx-auto bg-background/95 backdrop-blur-sm shadow-xl border border-border/50">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Create Your Account
          </h2>
          <p className="text-mutedForeground text-sm">
            Enter your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                placeholder="you@example.com"
                {...registerField("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                {...registerField("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  First Name
                </label>
                <Input
                  placeholder="John"
                  {...registerField("firstName")}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.firstName.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Last Name
                </label>
                <Input
                  placeholder="Doe"
                  {...registerField("lastName")}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.lastName.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Skills ({skills.length}/10)
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., JavaScript)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  disabled={skills.length >= 10}
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  disabled={!skillInput.trim() || skills.length >= 10}
                  variant="secondary"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <AnimatePresence>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                        className="ml-2 hover:text-primary/60 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || isSubmitting}
          >
            {(isPending || isSubmitting) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
} 