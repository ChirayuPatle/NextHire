
import { useApp } from '@/context/AppContext';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useApp();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
      <div className="flex min-h-screen bg-neutral-950 w-full">
          <div className="p-4">
            {children}
          </div>
      </div>
  );
};

export default AppLayout;
