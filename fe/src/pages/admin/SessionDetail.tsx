
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useApp } from "@/context/AppContext";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash, UserPlus, CalendarDays, VideoIcon, Code } from "lucide-react";
import { Candidate, Session, Round } from '@/utils/localStorage';
import AppLayout from '@/components/layout/AppLayout';
import { toast } from 'sonner';
import DatePicker from '@/components/ui-custom/DatePicker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define QuestionType
type QuestionType = "multiple_choice" | "coding" | "open_ended";

// Define the Question interface
interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string;
  codeTemplate?: string;
}

const SessionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sessions, candidates, refreshData } = useApp();
  const session = sessions.find((session) => session.id === id);

  const [isAddCandidateDialogOpen, setIsAddCandidateDialogOpen] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState('');
  const [availableCandidates, setAvailableCandidates] = useState<Candidate[]>([]);

  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('multiple_choice');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [codeTemplate, setCodeTemplate] = useState('');

  const [questions, setQuestions] = useState<Question[]>([]);
  
  // Add state for rounds
  const [isAddRoundDialogOpen, setIsAddRoundDialogOpen] = useState(false);
  const [roundName, setRoundName] = useState('');
  const [roundType, setRoundType] = useState<'aptitude' | 'coding' | 'technical' | 'hr' | 'custom'>('aptitude');
  const [roundDescription, setRoundDescription] = useState('');
  const [roundDuration, setRoundDuration] = useState(30);
  const [rounds, setRounds] = useState<Round[]>([]);
  
  // Add state for scheduling interviews
  const [isScheduleInterviewDialogOpen, setIsScheduleInterviewDialogOpen] = useState(false);
  const [interviewTitle, setInterviewTitle] = useState('');
  const [interviewDate, setInterviewDate] = useState<Date>(new Date());
  const [interviewDuration, setInterviewDuration] = useState(60);
  const [selectedCandidateId, setSelectedCandidateId] = useState('');

  useEffect(() => {
    // Load questions from local storage when the component mounts
    const storedQuestions = localStorage.getItem(`session_${id}_questions`);
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, [id]);

  useEffect(() => {
    // Save questions to local storage whenever the questions state changes
    localStorage.setItem(`session_${id}_questions`, JSON.stringify(questions));
  }, [id, questions]);

  useEffect(() => {
    // Filter out candidates already in the session
    if (session) {
      const sessionCandidateIds = session.candidates.map(c => c.id) || [];
      const available = candidates.filter(candidate => !sessionCandidateIds.includes(candidate.id));
      setAvailableCandidates(available);
      
      // Load rounds
      if (session.rounds) {
        setRounds(session.rounds);
      }
    }
  }, [session, candidates]);

  if (!session) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-white">Session not found</h1>
        </div>
      </AppLayout>
    );
  }

  const handleAddCandidateToSession = () => {
    const candidateToAdd = availableCandidates.find(candidate => candidate.email === candidateEmail);

    if (candidateToAdd) {
      // Get the current session from localStorage
      const currentSessions = JSON.parse(localStorage.getItem('nexthire_sessions') || '[]');
      
      // Find the index of the session to update
      const sessionIndex = currentSessions.findIndex((s: Session) => s.id === session.id);
      
      if (sessionIndex !== -1) {
        // Update the session's candidates array with the proper structure
        const candidateEntry = {
          id: candidateToAdd.id,
          name: candidateToAdd.name,
          email: candidateToAdd.email,
          status: 'pending' as const  // explicitly type this as a const
        };
        
        // Make sure candidates array exists
        if (!currentSessions[sessionIndex].candidates) {
          currentSessions[sessionIndex].candidates = [];
        }
        
        // Add the candidate entry
        currentSessions[sessionIndex].candidates.push(candidateEntry);
        
        // Save the updated sessions array back to localStorage
        localStorage.setItem('nexthire_sessions', JSON.stringify(currentSessions));
        
        // Refresh the data
        refreshData();
      }
      
      // Close the dialog and reset the candidate email
      setIsAddCandidateDialogOpen(false);
      setCandidateEmail('');
      toast.success(`Added ${candidateToAdd.name} to the session`);
    }
  };

  const handleAddQuestion = () => {
    const newQuestionId = `question_${Date.now()}`;
    let newQuestion: Question;

    if (questionType === "multiple_choice") {
      newQuestion = {
        id: newQuestionId,
        text: questionText,
        type: questionType,
        options: options,
        correctAnswer: correctAnswer,
      };
    } else if (questionType === "coding") {
      newQuestion = {
        id: newQuestionId,
        text: questionText,
        type: questionType,
        codeTemplate: codeTemplate,
      };
    } else {
      newQuestion = {
        id: newQuestionId,
        text: questionText,
        type: questionType,
      };
    }

    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    setIsAddQuestionDialogOpen(false);
    setQuestionText('');
    setQuestionType('multiple_choice');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setCodeTemplate('');
    toast.success('Question added successfully');
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId));
    toast.success('Question deleted');
  };
  
  const handleAddRound = () => {
    // Create a new round
    const newRound: Omit<Round, 'id'> = {
      name: roundName,
      type: roundType,
      description: roundDescription,
      duration: roundDuration,
      order: rounds.length + 1,
    };
    
    // Get the current session from localStorage
    const currentSessions = JSON.parse(localStorage.getItem('nexthire_sessions') || '[]');
    
    // Find the index of the session to update
    const sessionIndex = currentSessions.findIndex((s: Session) => s.id === session.id);
    
    if (sessionIndex !== -1) {
      // Create a unique ID for the new round
      const roundId = `round_${Date.now()}`;
      
      // Make sure rounds array exists
      if (!currentSessions[sessionIndex].rounds) {
        currentSessions[sessionIndex].rounds = [];
      }
      
      // Add the new round
      currentSessions[sessionIndex].rounds.push({
        ...newRound,
        id: roundId
      });
      
      // Save the updated sessions array back to localStorage
      localStorage.setItem('nexthire_sessions', JSON.stringify(currentSessions));
      
      // Refresh the data
      refreshData();
    }
    
    // Reset form and close dialog
    setRoundName('');
    setRoundType('aptitude');
    setRoundDescription('');
    setRoundDuration(30);
    setIsAddRoundDialogOpen(false);
    toast.success('Round added successfully');
  };
  
  const handleDeleteRound = (roundId: string) => {
    // Get the current session from localStorage
    const currentSessions = JSON.parse(localStorage.getItem('nexthire_sessions') || '[]');
    
    // Find the index of the session to update
    const sessionIndex = currentSessions.findIndex((s: Session) => s.id === session.id);
    
    if (sessionIndex !== -1 && currentSessions[sessionIndex].rounds) {
      // Filter out the round to delete
      currentSessions[sessionIndex].rounds = currentSessions[sessionIndex].rounds.filter(
        (round: Round) => round.id !== roundId
      );
      
      // Reorder the remaining rounds
      currentSessions[sessionIndex].rounds.forEach((round: Round, index: number) => {
        round.order = index + 1;
      });
      
      // Save the updated sessions array back to localStorage
      localStorage.setItem('nexthire_sessions', JSON.stringify(currentSessions));
      
      // Refresh the data
      refreshData();
      toast.success('Round deleted');
    }
  };
  
  const handleScheduleInterview = () => {
    if (!selectedCandidateId) {
      toast.error('Please select a candidate');
      return;
    }
    
    // Get the current session from localStorage
    const currentSessions = JSON.parse(localStorage.getItem('nexthire_sessions') || '[]');
    
    // Find the index of the session to update
    const sessionIndex = currentSessions.findIndex((s: Session) => s.id === session.id);
    
    if (sessionIndex !== -1) {
      // Create a unique ID for the new interview
      const interviewId = `interview_${Date.now()}`;
      
      // Make sure interviews array exists
      if (!currentSessions[sessionIndex].interviews) {
        currentSessions[sessionIndex].interviews = [];
      }
      
      // Add the new interview
      currentSessions[sessionIndex].interviews.push({
        id: interviewId,
        title: interviewTitle,
        scheduledDate: interviewDate.toISOString(),
        duration: interviewDuration,
        candidates: [selectedCandidateId],
        status: 'scheduled'
      });
      
      // Save the updated sessions array back to localStorage
      localStorage.setItem('nexthire_sessions', JSON.stringify(currentSessions));
      
      // Refresh the data
      refreshData();
    }
    
    // Reset form and close dialog
    setInterviewTitle('');
    setInterviewDate(new Date());
    setInterviewDuration(60);
    setSelectedCandidateId('');
    setIsScheduleInterviewDialogOpen(false);
    toast.success('Interview scheduled successfully');
  };
  
  const startInterview = (interviewId: string, candidateId: string) => {
    navigate(`/interview/${id}/${candidateId}`);
  };
  
  const startCodingTest = (candidateId: string) => {
    navigate(`/coding/${id}/${candidateId}`);
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{session.title}</h1>
        <p className="text-nexthire-text-gray">{session.description}</p>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Session Details</TabsTrigger>
          <TabsTrigger value="rounds">Interview Rounds</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="interviews">Scheduled Interviews</TabsTrigger>
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <h2 className="text-xl font-bold text-white mb-4">Session Details</h2>
            <div className="text-nexthire-text-gray">
              <div className="flex justify-between mb-2">
                <span>Job Type:</span>
                <span>{session.jobType}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Location:</span>
                <span>{session.location}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Start Date:</span>
                <span>{format(new Date(session.startDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>End Date:</span>
                <span>{format(new Date(session.endDate), 'MMM dd, yyyy')}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {session.skills.map((skill, index) => (
                    <span key={index} className="bg-nexthire-dark-purple text-white text-xs px-2 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="rounds">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Interview Rounds</h2>
            <Dialog open={isAddRoundDialogOpen} onOpenChange={setIsAddRoundDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Plus className="mr-2 h-4 w-4" /> Add Round
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-nexthire-card-gray text-white border-nexthire-light-gray">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">Add New Round</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="roundName">Round Name</Label>
                    <Input
                      id="roundName"
                      value={roundName}
                      onChange={(e) => setRoundName(e.target.value)}
                      placeholder="E.g., Technical Interview"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="roundType">Round Type</Label>
                    <select
                      id="roundType"
                      className="bg-nexthire-light-gray border border-nexthire-dark-gray rounded-md py-2 px-4 text-white"
                      value={roundType}
                      onChange={(e) => setRoundType(e.target.value as any)}
                    >
                      <option value="aptitude">Aptitude Test</option>
                      <option value="coding">Coding Challenge</option>
                      <option value="technical">Technical Interview</option>
                      <option value="hr">HR Interview</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="roundDescription">Description</Label>
                    <Textarea
                      id="roundDescription"
                      value={roundDescription}
                      onChange={(e) => setRoundDescription(e.target.value)}
                      placeholder="Describe what this round entails"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="roundDuration">Duration (minutes)</Label>
                    <Input
                      id="roundDuration"
                      type="number"
                      value={roundDuration}
                      onChange={(e) => setRoundDuration(Number(e.target.value))}
                      min={1}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddRoundDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-nexthire-purple hover:bg-nexthire-dark-purple" onClick={handleAddRound}>Add Round</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {session.rounds && session.rounds.length > 0 ? (
            <div className="space-y-4">
              {session.rounds.sort((a, b) => a.order - b.order).map((round) => (
                <Card key={round.id} className="relative">
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteRound(round.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <div className="bg-nexthire-purple w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      {round.order}
                    </div>
                    <h3 className="text-lg font-bold text-white">{round.name}</h3>
                  </div>
                  
                  <div className="text-nexthire-text-gray ml-11">
                    <p className="mb-2">{round.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-nexthire-dark-purple bg-opacity-40 px-2 py-1 rounded-full">
                        {round.type.charAt(0).toUpperCase() + round.type.slice(1)}
                      </span>
                      {round.duration && (
                        <span className="text-xs bg-nexthire-dark-purple bg-opacity-40 px-2 py-1 rounded-full">
                          {round.duration} minutes
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-nexthire-text-gray">No rounds have been added yet.</p>
              <p className="text-nexthire-text-gray">Add rounds to structure your interview process.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="candidates">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Candidates</h2>
            <Dialog open={isAddCandidateDialogOpen} onOpenChange={setIsAddCandidateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <UserPlus className="mr-2 h-4 w-4" /> Add Candidate
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-nexthire-card-gray text-white border-nexthire-light-gray">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">Add Candidate to Session</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="candidateEmail">Candidate Email</Label>
                    <Input
                      id="candidateEmail"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="Enter candidate email"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddCandidateDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-nexthire-purple hover:bg-nexthire-dark-purple" onClick={handleAddCandidateToSession}>Add Candidate</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {session.candidates && session.candidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {candidates.filter(candidate => 
                session.candidates.some(sc => sc.id === candidate.id)
              ).map(candidate => (
                <Card key={candidate.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{candidate.name}</h3>
                      <p className="text-nexthire-text-gray mb-2">{candidate.email}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {candidate.skills.map((skill, index) => (
                          <span key={index} className="text-xs bg-nexthire-dark-purple bg-opacity-40 px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" onClick={() => startInterview('new', candidate.id)}>
                          <VideoIcon className="h-4 w-4 mr-1" /> Interview
                        </Button>
                        <Button size="sm" onClick={() => startCodingTest(candidate.id)}>
                          <Code className="h-4 w-4 mr-1" /> Coding Test
                        </Button>
                      </div>
                    </div>
                    
                    <div className="px-2 py-1 rounded-md bg-nexthire-dark-gray text-xs uppercase font-medium">
                      {session.candidates.find(sc => sc.id === candidate.id)?.status}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-nexthire-text-gray">No candidates added yet.</p>
              <p className="text-nexthire-text-gray">Add candidates to start the interview process.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="interviews">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Scheduled Interviews</h2>
            <Dialog open={isScheduleInterviewDialogOpen} onOpenChange={setIsScheduleInterviewDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <CalendarDays className="mr-2 h-4 w-4" /> Schedule Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-nexthire-card-gray text-white border-nexthire-light-gray">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">Schedule New Interview</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="interviewTitle">Interview Title</Label>
                    <Input
                      id="interviewTitle"
                      value={interviewTitle}
                      onChange={(e) => setInterviewTitle(e.target.value)}
                      placeholder="E.g., Technical Interview - Round 1"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="candidate">Select Candidate</Label>
                    <select
                      id="candidate"
                      className="bg-nexthire-light-gray border border-nexthire-dark-gray rounded-md py-2 px-4 text-white"
                      value={selectedCandidateId}
                      onChange={(e) => setSelectedCandidateId(e.target.value)}
                    >
                      <option value="">Select a candidate</option>
                      {candidates.filter(candidate => 
                        session.candidates.some(sc => sc.id === candidate.id)
                      ).map(candidate => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name} ({candidate.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="interviewDate">Interview Date & Time</Label>
                    <DatePicker
                      date={interviewDate}
                      onDateChange={setInterviewDate}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="interviewDuration">Duration (minutes)</Label>
                    <Input
                      id="interviewDuration"
                      type="number"
                      value={interviewDuration}
                      onChange={(e) => setInterviewDuration(Number(e.target.value))}
                      min={15}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsScheduleInterviewDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-nexthire-purple hover:bg-nexthire-dark-purple" onClick={handleScheduleInterview}>Schedule</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {session.interviews && session.interviews.length > 0 ? (
            <div className="space-y-4">
              {session.interviews.map((interview) => (
                <Card key={interview.id}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{interview.title}</h3>
                      <p className="text-nexthire-text-gray mb-3">
                        {format(new Date(interview.scheduledDate), 'MMM dd, yyyy - h:mm a')} ({interview.duration} mins)
                      </p>
                      
                      <div className="mb-3">
                        <span className="text-nexthire-text-gray mr-2">Candidate:</span>
                        {interview.candidates.map((candidateId) => {
                          const candidate = candidates.find(c => c.id === candidateId);
                          return (
                            <span key={candidateId} className="text-white">
                              {candidate ? candidate.name : 'Unknown Candidate'}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <span className={`px-3 py-1 rounded-md text-xs uppercase font-medium ${
                        interview.status === 'scheduled' ? 'bg-nexthire-dark-purple' : 
                        interview.status === 'completed' ? 'bg-green-700' : 'bg-red-700'
                      }`}>
                        {interview.status}
                      </span>
                      
                      {interview.status === 'scheduled' && (
                        <Button 
                          onClick={() => {
                            const candidateId = interview.candidates[0];
                            if (candidateId) {
                              startInterview(interview.id, candidateId);
                            }
                          }}
                        >
                          <VideoIcon className="h-4 w-4 mr-2" /> Join Interview
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-nexthire-text-gray">No interviews scheduled yet.</p>
              <p className="text-nexthire-text-gray">Schedule interviews with candidates to proceed with the recruitment process.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="questions">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Question Bank</h2>
            <Dialog open={isAddQuestionDialogOpen} onOpenChange={setIsAddQuestionDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Plus className="mr-2 h-4 w-4" /> Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-nexthire-card-gray text-white border-nexthire-light-gray">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">Add New Question</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="questionText">Question Text</Label>
                    <Textarea
                      id="questionText"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Enter question text"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="questionType">Question Type</Label>
                    <select
                      id="questionType"
                      className="bg-nexthire-light-gray border border-nexthire-dark-gray rounded-md py-2 px-4 text-white"
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                    >
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="coding">Coding</option>
                      <option value="open_ended">Open Ended</option>
                    </select>
                  </div>

                  {questionType === "multiple_choice" && (
                    <>
                      <div className="grid gap-2">
                        <Label>Options</Label>
                        {options.map((option, index) => (
                          <Input
                            key={index}
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...options];
                              newOptions[index] = e.target.value;
                              setOptions(newOptions);
                            }}
                          />
                        ))}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="correctAnswer">Correct Answer</Label>
                        <Input
                          id="correctAnswer"
                          type="text"
                          value={correctAnswer}
                          onChange={(e) => setCorrectAnswer(e.target.value)}
                          placeholder="Enter correct answer"
                        />
                      </div>
                    </>
                  )}

                  {questionType === "coding" && (
                    <div className="grid gap-2">
                      <Label htmlFor="codeTemplate">Code Template</Label>
                      <Textarea
                        id="codeTemplate"
                        value={codeTemplate}
                        onChange={(e) => setCodeTemplate(e.target.value)}
                        placeholder="Enter code template"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddQuestionDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-nexthire-purple hover:bg-nexthire-dark-purple" onClick={handleAddQuestion}>Add Question</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question) => (
                <Card key={question.id}>
                  <div className="flex justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="text-white font-medium mb-2">{question.text}</h3>
                      
                      <div className="mb-2">
                        <span className="text-xs bg-nexthire-dark-purple px-2 py-1 rounded-full">
                          {question.type === 'multiple_choice' ? 'Multiple Choice' : 
                           question.type === 'coding' ? 'Coding' : 'Open Ended'}
                        </span>
                      </div>
                      
                      {question.type === 'multiple_choice' && question.options && (
                        <div className="mt-3 text-nexthire-text-gray">
                          <p className="text-sm mb-1">Options:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {question.options.map((option, index) => (
                              <li key={index} className={option === question.correctAnswer ? 'text-green-400' : ''}>
                                {option} {option === question.correctAnswer && '(correct)'}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {question.type === 'coding' && question.codeTemplate && (
                        <div className="mt-3 text-nexthire-text-gray">
                          <p className="text-sm mb-1">Code Template:</p>
                          <pre className="bg-nexthire-dark-gray p-2 rounded text-xs overflow-x-auto">
                            {question.codeTemplate}
                          </pre>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteQuestion(question.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-nexthire-text-gray">No questions added yet.</p>
              <p className="text-nexthire-text-gray">Add questions to create a question bank for interviews.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default SessionDetail;
