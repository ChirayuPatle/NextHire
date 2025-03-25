// src/services/mockData.ts
export interface Session {
  id: string;
  title: string;
  description: string;
  jobType: string;
  location: string;
  skills: string[];
  startDate: string;
  endDate: string;
  rounds?: Round[];
  candidates?: Candidate[];
  interviews?: Interview[];
}

export interface Round {
  id: string;
  name: string;
  type: "aptitude" | "coding" | "technical" | "hr" | "custom";
  description: string;
  duration: number;
  order: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  status: "pending" | "interviewing" | "hired" | "rejected";
}

export interface Interview {
  id: string;
  title: string;
  scheduledDate: string;
  duration: number;
  candidates: string[];
  status: "scheduled" | "completed" | "cancelled";
}

// Initialize mock data in localStorage if it doesn't exist
export const initializeMockData = () => {
  if (!localStorage.getItem("nexthire_sessions")) {
    const mockSessions: Session[] = [
      {
        id: "session_1",
        title: "Frontend Developer Recruitment",
        description: "Hiring for React developers with TypeScript experience",
        jobType: "Full-time",
        location: "Remote",
        skills: ["React", "TypeScript", "CSS", "JavaScript"],
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        rounds: [
          {
            id: "round_1",
            name: "Technical Screening",
            type: "technical",
            description: "Initial technical skills assessment",
            duration: 45,
            order: 1,
          },
          {
            id: "round_2",
            name: "Coding Challenge",
            type: "coding",
            description: "Live coding session with team members",
            duration: 60,
            order: 2,
          },
        ],
        candidates: [
          {
            id: "candidate_1",
            name: "Sarah Miller",
            email: "sarah.miller@example.com",
            skills: ["React", "TypeScript", "CSS"],
            status: "interviewing",
          },
          {
            id: "candidate_2",
            name: "James Wilson",
            email: "james.wilson@example.com",
            skills: ["JavaScript", "HTML", "CSS"],
            status: "pending",
          },
        ],
        interviews: [
          {
            id: "interview_1",
            title: "Technical Interview - Sarah Miller",
            scheduledDate: new Date(
              Date.now() + 2 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            duration: 45,
            candidates: ["candidate_1"],
            status: "scheduled",
          },
        ],
      },
    ];

    localStorage.setItem("nexthire_sessions", JSON.stringify(mockSessions));
  }

  if (!localStorage.getItem("nexthire_candidates")) {
    const mockCandidates: Candidate[] = [
      {
        id: "candidate_1",
        name: "Sarah Miller",
        email: "sarah.miller@example.com",
        skills: ["React", "TypeScript", "CSS"],
        status: "interviewing",
      },
      {
        id: "candidate_2",
        name: "James Wilson",
        email: "james.wilson@example.com",
        skills: ["JavaScript", "HTML", "CSS"],
        status: "pending",
      },
      {
        id: "candidate_3",
        name: "Emma Davis",
        email: "emma.davis@example.com",
        skills: ["React", "Node.js", "MongoDB"],
        status: "pending",
      },
    ];

    localStorage.setItem("nexthire_candidates", JSON.stringify(mockCandidates));
  }
};

// Get all sessions
export const getSessions = (): Session[] => {
  return JSON.parse(localStorage.getItem("nexthire_sessions") || "[]");
};

// Get all candidates
export const getCandidates = (): Candidate[] => {
  return JSON.parse(localStorage.getItem("nexthire_candidates") || "[]");
};

// Add a new session
export const addSession = (session: Omit<Session, "id">): Session => {
  const sessions = getSessions();
  const newSession = {
    ...session,
    id: `session_${Date.now()}`,
  };
  sessions.push(newSession);
  localStorage.setItem("nexthire_sessions", JSON.stringify(sessions));
  return newSession;
};

// Add a candidate to a session
export const addCandidateToSession = (
  sessionId: string,
  candidateId: string,
): boolean => {
  const sessions = getSessions();
  const candidates = getCandidates();

  const sessionIndex = sessions.findIndex((s) => s.id === sessionId);
  const candidate = candidates.find((c) => c.id === candidateId);

  if (sessionIndex === -1 || !candidate) return false;

  if (!sessions[sessionIndex].candidates) {
    sessions[sessionIndex].candidates = [];
  }

  sessions[sessionIndex].candidates.push({
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    skills: candidate.skills,
    status: "pending",
  });

  localStorage.setItem("nexthire_sessions", JSON.stringify(sessions));
  return true;
};

// Add a round to a session
export const addRoundToSession = (
  sessionId: string,
  round: Omit<Round, "id">,
): Round | null => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex((s) => s.id === sessionId);

  if (sessionIndex === -1) return null;

  if (!sessions[sessionIndex].rounds) {
    sessions[sessionIndex].rounds = [];
  }

  const newRound = {
    ...round,
    id: `round_${Date.now()}`,
    order: sessions[sessionIndex].rounds.length + 1,
  };

  sessions[sessionIndex].rounds.push(newRound);
  localStorage.setItem("nexthire_sessions", JSON.stringify(sessions));
  return newRound;
};

// Schedule an interview
export const scheduleInterview = (
  sessionId: string,
  interview: {
    title: string;
    scheduledDate: string;
    duration: number;
    candidateIds: string[];
  },
): Interview | null => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex((s) => s.id === sessionId);

  if (sessionIndex === -1) return null;

  if (!sessions[sessionIndex].interviews) {
    sessions[sessionIndex].interviews = [];
  }

  const newInterview: Interview = {
    ...interview,
    id: `interview_${Date.now()}`,
    status: "scheduled" as const,
    candidates: interview.candidateIds,
  };

  sessions[sessionIndex].interviews.push(newInterview);
  localStorage.setItem("nexthire_sessions", JSON.stringify(sessions));
  return newInterview;
};
