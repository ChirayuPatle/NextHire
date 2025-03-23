import { useSearchParams } from 'react-router-dom';
import { RegistrationWrapper } from '@/components/auth/RegistrationWrapper';
import { AuthLayout } from '@/layouts/AuthLayout';

export default function Register() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'candidate' | 'organization' || 'candidate';

  return (
    <AuthLayout>
      <div className="max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          {type === 'candidate' ? 'Candidate' : 'Organization'} Registration
        </h1>
        <RegistrationWrapper
          type={type}
          onBack={() => window.history.back()}
        />
      </div>
    </AuthLayout>
  );
} 