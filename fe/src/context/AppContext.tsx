
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { initializeStorage, getSessions, getCandidates, getAnalytics, type Session, type Candidate } from '@/lib/localStorage';

interface AppContextProps {
  isAuthenticated: boolean;
  userRole: 'admin' | 'candidate' | null;
  sessions: Session[];
  candidates: Candidate[];
  analytics: any;
  refreshData: () => void;
  login: (email: string, password: string, role: 'admin' | 'candidate') => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'candidate' | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    // Initialize localStorage with sample data
    initializeStorage();
    
    // Check if user is logged in
    const userStr = localStorage.getItem('nexthire_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setIsAuthenticated(true);
      setUserRole(user.role);
    }
    
    refreshData();
  }, []);

  const refreshData = () => {
    setSessions(getSessions());
    setCandidates(getCandidates());
    setAnalytics(getAnalytics());
  };

  const login = async (email: string, password: string, role: 'admin' | 'candidate'): Promise<boolean> => {
    // Simplified login - in a real app this would validate credentials against a backend
    if (email && password) {
      const user = { email, role };
      localStorage.setItem('nexthire_user', JSON.stringify(user));
      setIsAuthenticated(true);
      setUserRole(role);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('nexthire_user');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      userRole,
      sessions,
      candidates,
      analytics,
      refreshData,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
