export type Candidate = {
  id: number;
  name: string;
  email: string;
  status:
    | "applied"
    | "screening"
    | "interviewed"
    | "offered"
    | "hired"
    | "rejected";
  interviewRounds: InterviewRound[];
};

export type InterviewRound = {
  id: number;
  name: string;
  description: string;
  deadline: string;
  broadcastMessage: string;
  status: "upcoming" | "in-progress" | "completed";
};

export type Session = {
  id: number;
  title: string;
  description: string;
  skills: string[];
  location: string;
  jobType: string;
  status: "draft" | "active" | "completed";
  candidates: Candidate[];
  startDate: string;
  endDate: string;
  createdAt: string;
  interviewRounds: InterviewRound[];
};
