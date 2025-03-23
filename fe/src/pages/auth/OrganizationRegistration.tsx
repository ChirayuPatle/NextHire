import { useRegisterOrg } from '@/hooks/auth/useRegister';
import { RegistrationForm } from '@/components/auth/RegistrationForm';
import { toast } from 'sonner';

export default function OrganizationRegistration() {
  const { mutate: register, isPending } = useRegisterOrg();

  const handleSubmit = async (formData: any) => {
    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        industry: formData.industry,
        website: formData.website,
        address: formData.address,
        description: formData.description,
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
    }
  };

  return (
    <RegistrationForm onSubmit={handleSubmit} isLoading={isPending} />
  );
} 