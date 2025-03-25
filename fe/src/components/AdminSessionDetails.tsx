import { ArrowLeft, Calendar, Clock, Users, Mail, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Candidate, InterviewRound, Session } from "@/lib/type";

const getSessions = (): Session[] => {
  const sessions = localStorage.getItem('interviewSessions');
  return sessions ? JSON.parse(sessions) : [];
};

const saveSessions = (sessions: Session[]) => {
  localStorage.setItem('interviewSessions', JSON.stringify(sessions));
};

export const AdminSessionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [isAddingRound, setIsAddingRound] = useState(false);
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);
  const [newRound, setNewRound] = useState({
    name: '',
    description: '',
    deadline: '',
    broadcastMessage: ''
  });
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const sessions = getSessions();
    const foundSession = sessions.find(s => s.id === Number(id));
    if (foundSession) {
      // Ensure interviewRounds exists and is an array
      const sessionWithDefaults = {
        ...foundSession,
        interviewRounds: foundSession.interviewRounds || []
      };
      setSession(sessionWithDefaults);
    } else {
      setSession(null);
    }
  }, [id]);

  if (!session) {
    return (
      <div className="px-20 text-white">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sessions
        </Button>
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">Session not found</h2>
          <p className="text-[#B0B0B0]">
            {id 
              ? `Session with ID ${id} does not exist.`
              : 'No session ID provided.'}
          </p>
        </div>
      </div>
    );
  }

  const addInterviewRound = () => {
    if (!newRound.name.trim()) return;
    
    const round: InterviewRound = {
      id: (session.interviewRounds?.length || 0) + 1, // Safe access to length
      name: newRound.name,
      description: newRound.description,
      deadline: newRound.deadline,
      broadcastMessage: newRound.broadcastMessage,
      status: "upcoming"
    };

    const updatedSession = {
      ...session,
      interviewRounds: [...(session.interviewRounds || []), round] // Safe spread
    };

    const updatedSessions = getSessions().map(s => 
      s.id === updatedSession.id ? updatedSession : s
    );

    saveSessions(updatedSessions);
    setSession(updatedSession);
    setNewRound({
      name: '',
      description: '',
      deadline: '',
      broadcastMessage: ''
    });
    setIsAddingRound(false);
  };

  const addCandidate = () => {
    if (!newCandidate.name || !newCandidate.email) return;

    const candidate: Candidate = {
      id: (session.candidates?.length || 0) + 1, // Safe access to length
      name: newCandidate.name,
      email: newCandidate.email,
      status: "applied",
      interviewRounds: (session.interviewRounds || []).map(round => ({ // Safe map
        id: round.id,
        name: round.name,
        description: round.description,
        deadline: round.deadline,
        broadcastMessage: round.broadcastMessage,
        status: "upcoming"
      }))
    };

    const updatedSession = {
      ...session,
      candidates: [...(session.candidates || []), candidate] // Safe spread
    };

    const updatedSessions = getSessions().map(s => 
      s.id === updatedSession.id ? updatedSession : s
    );

    saveSessions(updatedSessions);
    setSession(updatedSession);
    setNewCandidate({ name: '', email: '' });
    setIsAddingCandidate(false);
  };
  return (
    <div className="px-20 min-h-screen bg-neutral-950 py-[4rem] mt-[28rem] text-white">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Sessions
      </Button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{session.title}</h1>
          <p className="text-[#B0B0B0] mt-1">{session.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          session.status === 'active' ? 'bg-green-500/20 text-green-400' :
          session.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
          'bg-gray-500/20 text-gray-400'
        }`}>
          {session.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#1E1E1E] text-white border border-[#333] p-6">
            <h2 className="text-lg font-semibold mb-4">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#B0B0B0]" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">Start Date</p>
                  <p>{new Date(session.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#B0B0B0]" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">End Date</p>
                  <p>{new Date(session.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-[#B0B0B0]" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">Job Type</p>
                  <p>{session.jobType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#B0B0B0]" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">Location</p>
                  <p>{session.location}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1E1E1E] text-white border border-[#333] p-6">
            <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {session.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full bg-[#B967FF]/20 text-[#B967FF] text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          <Card className="bg-[#1E1E1E] text-white border border-[#333] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Interview Rounds</h2>
              <Button 
                size="sm" 
                onClick={() => setIsAddingRound(true)}
                className="bg-[#B967FF] hover:bg-[#B967FF]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Round
              </Button>
            </div>
            
            {isAddingRound && (
              <div className="mb-4 p-4 bg-[#252525] rounded-lg">
                <div className="grid text-black gap-4">
                  <div className="text-white">
                    <Label>Round Name*</Label>
                    <Input 
                      value={newRound.name}
                      onChange={(e) => setNewRound({...newRound, name: e.target.value})}
                      placeholder="Technical Interview"
                      className="text-black"
                    />
                  </div>
                  <div className="text-white">
                    <Label>Description</Label>
                    <Textarea 
                    className="text-black"
                      value={newRound.description}
                      onChange={(e) => setNewRound({...newRound, description: e.target.value})}
                      placeholder="Round description"
                    />
                  </div>
                  <div className="text-white" >
                    <Label>Deadline</Label>
                    <Input
                    className="text-black"
                      type="datetime-local"
                      value={newRound.deadline}
                      onChange={(e) => setNewRound({...newRound, deadline: e.target.value})}
                    />
                  </div>
                  <div className="text-white" >
                    <Label>Broadcast Message</Label>
                    <Textarea
                      value={newRound.broadcastMessage}
                      onChange={(e) => setNewRound({...newRound, broadcastMessage: e.target.value})}
                      placeholder="Message to send to candidates"
                      className="text-black"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={addInterviewRound}
                      className="bg-[#B967FF] hover:bg-[#B967FF]/90"
                      disabled={!newRound.name}
                    >
                      Create Round
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingRound(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {session.interviewRounds.length > 0 ? (
                session.interviewRounds.map((round) => (
                  <div key={round.id} className="p-3 bg-[#252525] rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{round.name}</h3>
                        <p className="text-sm text-[#B0B0B0] mt-1">{round.description}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-[#333] rounded-full">
                        {round.status}
                      </span>
                    </div>
                    {round.deadline && (
                      <p className="text-xs text-[#B0B0B0] mt-2">
                        Deadline: {new Date(round.deadline).toLocaleString()}
                      </p>
                    )}
                    {round.broadcastMessage && (
                      <div className="mt-2 p-2 bg-[#1E1E1E] rounded">
                        <p className="text-xs font-medium">Broadcast Message:</p>
                        <p className="text-xs text-[#B0B0B0]">{round.broadcastMessage}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[#B0B0B0] text-center py-4">No rounds added yet</p>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#1E1E1E] text-white border border-[#333] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Candidates ({session.candidates.length})</h2>
              <Button 
                size="sm"
                onClick={() => setIsAddingCandidate(true)}
                className="bg-[#B967FF] hover:bg-[#B967FF]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Candidate
              </Button>
            </div>
            
            <Dialog open={isAddingCandidate} onOpenChange={setIsAddingCandidate}>
              <DialogContent className="border-[#333]">
                <DialogHeader>
                  <DialogTitle>Add New Candidate</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Full Name*</Label>
                    <Input 
                      value={newCandidate.name}
                      onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Email*</Label>
                    <Input 
                      type="email"
                      value={newCandidate.email}
                      onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="bg-[#B967FF] hover:bg-[#B967FF]/90"
                    onClick={addCandidate}
                    disabled={!newCandidate.name || !newCandidate.email}
                  >
                    Add Candidate
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingCandidate(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="space-y-4">
              {session.candidates.length > 0 ? (
                session.candidates.map((candidate) => (
                  <div key={candidate.id} className="p-3 hover:bg-[#252525] rounded-md transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
                        <span className="text-sm">{candidate.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-[#B0B0B0]">{candidate.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        candidate.status === "hired" ? "bg-green-500/20 text-green-400" :
                        candidate.status === "rejected" ? "bg-red-500/20 text-red-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                    
                    <div className="ml-12 mt-2 space-y-2">
                      {candidate.interviewRounds.map((round) => (
                        <div key={round.id} className="text-sm">
                          <div className="flex justify-between">
                            <span>{round.name}</span>
                            <span className={`${
                              round.status === "in-progress" ? "text-green-400" :
                              round.status === "upcoming" ? "text-yellow-400" :
                              "text-yellow-400"
                            }`}>
                              {round.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#B0B0B0] text-center py-4">No candidates added yet</p>
              )}
            </div>
          </Card>

          <Card className="bg-[#1E1E1E] border text-white border-[#333] p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3 text-black">
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Email Candidates
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interviews
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};