interface Session {
  id: string;
  title: string;
  description: string;
  skills: string[];
  jobType: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming";
  candidates: {
    id: string;
    name: string;
    email: string;
    status: "pending" | "interviewed" | "selected" | "rejected";
  }[];
  rounds: Round[];
  quizzes: {
    id: string;
    title: string;
    description: string;
    duration: number;
    questions: {
      id: string;
      question: string;
      type: "multiple-choice" | "coding";
      options?: string[];
      correctAnswer?: string;
      codeTemplate?: string;
    }[];
  }[];
  interviews: {
    id: string;
    title: string;
    scheduledDate: string;
    duration: number;
    candidates: string[];
    status: "scheduled" | "completed" | "cancelled";
    notes?: string;
  }[];
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  appliedSessions: string[];
  resumeUrl?: string;
  status: "active" | "hired" | "rejected";
  testScores: {
    sessionId: string;
    quizId: string;
    score: number;
    completedAt: string;
  }[];
  interviews: {
    sessionId: string;
    interviewId: string;
    status: "scheduled" | "completed" | "missed";
    feedback?: string;
    rating?: number;
  }[];
}

interface Round {
  id: string;
  name: string;
  type: "aptitude" | "coding" | "technical" | "hr" | "custom";
  description: string;
  questions?: any[];
  duration?: number;
  passingScore?: number;
  order: number;
}

const STORAGE_KEYS = {
  SESSIONS: 'nexthire_sessions',
  CANDIDATES: 'nexthire_candidates',
  ANALYTICS: 'nexthire_analytics',
  USER: 'nexthire_user'
};

const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.SESSIONS)) {
    const initialSessions: Session[] = [
      {
        id: '1',
        title: 'Senior Frontend Engineer',
        description: 'Looking for experienced React developers for our product team.',
        skills: ['React', 'TypeScript', 'Next.js'],
        jobType: 'Full-time',
        location: 'Remote',
        startDate: '2023-05-15',
        endDate: '2023-06-15',
        status: 'active',
        candidates: [
          { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'interviewed' },
          { id: '2', name: 'Michael Chen', email: 'michael@example.com', status: 'pending' },
          { id: '3', name: 'Emma Wilson', email: 'emma@example.com', status: 'selected' }
        ],
        rounds: [
          {
            id: 'round_1',
            name: 'Technical Quiz',
            type: 'aptitude',
            description: 'Basic React and JavaScript knowledge test',
            order: 1,
            passingScore: 70,
            duration: 30,
          },
          {
            id: 'round_2',
            name: 'Coding Challenge',
            type: 'coding',
            description: 'Implement a simple React component',
            order: 2,
            duration: 60,
          },
          {
            id: 'round_3',
            name: 'Technical Interview',
            type: 'technical',
            description: 'Deep dive into technical experience',
            order: 3,
            duration: 45,
          }
        ],
        quizzes: [
          {
            id: '1',
            title: 'React Fundamentals',
            description: 'Basic concepts of React',
            duration: 30,
            questions: [
              {
                id: '1',
                question: 'What is React?',
                type: 'multiple-choice',
                options: ['A JavaScript library', 'A programming language', 'A database', 'An operating system'],
                correctAnswer: 'A JavaScript library'
              },
              {
                id: '2',
                question: 'Create a function that reverses a string',
                type: 'coding',
                codeTemplate: 'function reverseString(str) {\n  // Your code here\n}'
              }
            ]
          }
        ],
        interviews: [
          {
            id: '1',
            title: 'Technical Interview',
            scheduledDate: '2023-05-20T10:00:00',
            duration: 60,
            candidates: ['1'],
            status: 'scheduled'
          }
        ]
      },
      {
        id: '2',
        title: 'UX Designer',
        description: 'Looking for a creative UX designer with Figma experience.',
        skills: ['Figma', 'UI/UX', 'Prototyping'],
        jobType: 'Contract',
        location: 'Hybrid',
        startDate: '2023-06-01',
        endDate: '2023-07-01',
        status: 'upcoming',
        candidates: [
          { id: '4', name: 'Alex Brown', email: 'alex@example.com', status: 'pending' },
          { id: '5', name: 'Jordan Lee', email: 'jordan@example.com', status: 'pending' }
        ],
        rounds: [
          {
            id: 'round_1',
            name: 'Portfolio Review',
            type: 'custom',
            description: 'Review of candidate UX/UI portfolio',
            order: 1,
            duration: 30,
          },
          {
            id: 'round_2',
            name: 'Design Challenge',
            type: 'custom',
            description: 'Create a simple UI design for a given scenario',
            order: 2,
            duration: 90,
          }
        ],
        quizzes: [],
        interviews: []
      }
    ];
    
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(initialSessions));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CANDIDATES)) {
    const initialCandidates: Candidate[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '555-123-4567',
        skills: ['React', 'JavaScript', 'CSS'],
        appliedSessions: ['1'],
        status: 'active',
        testScores: [],
        interviews: [
          {
            sessionId: '1',
            interviewId: '1',
            status: 'scheduled'
          }
        ]
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael@example.com',
        phone: '555-987-6543',
        skills: ['React', 'TypeScript', 'Node.js'],
        appliedSessions: ['1'],
        status: 'active',
        testScores: [],
        interviews: []
      }
    ];
    
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(initialCandidates));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.ANALYTICS)) {
    const initialAnalytics = {
      activeSessionsCount: 1,
      totalCandidatesCount: 5,
      interviewsCompletedCount: 0,
      testsCompletedCount: 0,
      candidatesHiredCount: 0,
      sessionCompletionRate: 0,
      monthlyActivity: [
        { month: 'Jan', candidates: 0, sessions: 0, interviews: 0 },
        { month: 'Feb', candidates: 0, sessions: 0, interviews: 0 },
        { month: 'Mar', candidates: 0, sessions: 0, interviews: 0 },
        { month: 'Apr', candidates: 2, sessions: 1, interviews: 1 },
        { month: 'May', candidates: 3, sessions: 1, interviews: 0 },
        { month: 'Jun', candidates: 0, sessions: 0, interviews: 0 }
      ]
    };
    
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(initialAnalytics));
  }
};

const getSessions = (): Session[] => {
  const sessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  return sessions ? JSON.parse(sessions) : [];
};

const getSessionById = (id: string): Session | undefined => {
  const sessions = getSessions();
  return sessions.find(session => session.id === id);
};

const createSession = (session: Omit<Session, 'id' | 'candidates' | 'quizzes' | 'interviews'>): Session => {
  const sessions = getSessions();
  const newSession: Session = {
    ...session,
    id: Date.now().toString(),
    candidates: [],
    quizzes: [],
    interviews: [],
    rounds: []
  };
  
  sessions.push(newSession);
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  
  const analytics = getAnalytics();
  analytics.activeSessionsCount += 1;
  const currentMonth = new Date().getMonth();
  analytics.monthlyActivity[currentMonth].sessions += 1;
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  
  return newSession;
};

const updateSession = (updatedSession: Session): void => {
  const sessions = getSessions();
  const index = sessions.findIndex(session => session.id === updatedSession.id);
  
  if (index !== -1) {
    sessions[index] = updatedSession;
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }
};

const deleteSession = (id: string): void => {
  const sessions = getSessions();
  const filteredSessions = sessions.filter(session => session.id !== id);
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filteredSessions));
  
  const analytics = getAnalytics();
  analytics.activeSessionsCount -= 1;
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
};

const createQuiz = (sessionId: string, quiz: Omit<Session['quizzes'][0], 'id'>): void => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex(session => session.id === sessionId);
  
  if (sessionIndex !== -1) {
    const newQuiz = {
      ...quiz,
      id: Date.now().toString()
    };
    
    sessions[sessionIndex].quizzes.push(newQuiz);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }
};

const getCandidates = (): Candidate[] => {
  const candidates = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
  return candidates ? JSON.parse(candidates) : [];
};

const getCandidateById = (id: string): Candidate | undefined => {
  const candidates = getCandidates();
  return candidates.find(candidate => candidate.id === id);
};

const addCandidateToSession = (sessionId: string, candidate: { name: string; email: string; }): void => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex(session => session.id === sessionId);
  
  if (sessionIndex !== -1) {
    const candidates = getCandidates();
    let candidateId = '';
    
    const existingCandidate = candidates.find(c => c.email === candidate.email);
    
    if (existingCandidate) {
      candidateId = existingCandidate.id;
      
      if (!existingCandidate.appliedSessions.includes(sessionId)) {
        existingCandidate.appliedSessions.push(sessionId);
        localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
      }
    } else {
      const newCandidate: Candidate = {
        id: Date.now().toString(),
        name: candidate.name,
        email: candidate.email,
        phone: '',
        skills: [],
        appliedSessions: [sessionId],
        status: 'active',
        testScores: [],
        interviews: []
      };
      
      candidates.push(newCandidate);
      localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
      candidateId = newCandidate.id;
      
      const analytics = getAnalytics();
      analytics.totalCandidatesCount += 1;
      const currentMonth = new Date().getMonth();
      analytics.monthlyActivity[currentMonth].candidates += 1;
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
    }
    
    if (!sessions[sessionIndex].candidates.some(c => c.id === candidateId)) {
      sessions[sessionIndex].candidates.push({
        id: candidateId,
        name: candidate.name,
        email: candidate.email,
        status: 'pending'
      });
      
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    }
  }
};

const getAnalytics = () => {
  const analytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
  return analytics ? JSON.parse(analytics) : {
    activeSessionsCount: 0,
    totalCandidatesCount: 0,
    interviewsCompletedCount: 0,
    testsCompletedCount: 0,
    candidatesHiredCount: 0,
    sessionCompletionRate: 0,
    monthlyActivity: [
      { month: 'Jan', candidates: 0, sessions: 0, interviews: 0 },
      { month: 'Feb', candidates: 0, sessions: 0, interviews: 0 },
      { month: 'Mar', candidates: 0, sessions: 0, interviews: 0 },
      { month: 'Apr', candidates: 0, sessions: 0, interviews: 0 },
      { month: 'May', candidates: 0, sessions: 0, interviews: 0 },
      { month: 'Jun', candidates: 0, sessions: 0, interviews: 0 }
    ]
  };
};

const createRound = (sessionId: string, round: Omit<Round, 'id'>): void => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex(session => session.id === sessionId);
  
  if (sessionIndex !== -1) {
    const newRound: Round = {
      ...round,
      id: `round_${Date.now()}`
    };
    
    if (!sessions[sessionIndex].rounds) {
      sessions[sessionIndex].rounds = [];
    }
    
    sessions[sessionIndex].rounds.push(newRound);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }
};

const updateRound = (sessionId: string, updatedRound: Round): void => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex(session => session.id === sessionId);
  
  if (sessionIndex !== -1 && sessions[sessionIndex].rounds) {
    const roundIndex = sessions[sessionIndex].rounds.findIndex(round => round.id === updatedRound.id);
    
    if (roundIndex !== -1) {
      sessions[sessionIndex].rounds[roundIndex] = updatedRound;
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    }
  }
};

const deleteRound = (sessionId: string, roundId: string): void => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex(session => session.id === sessionId);
  
  if (sessionIndex !== -1 && sessions[sessionIndex].rounds) {
    sessions[sessionIndex].rounds = sessions[sessionIndex].rounds.filter(round => round.id !== roundId);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }
};

export {
  initializeStorage,
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  createQuiz,
  getCandidates,
  getCandidateById,
  addCandidateToSession,
  getAnalytics,
  createRound,
  updateRound,
  deleteRound,
  type Session,
  type Candidate,
  type Round
};
