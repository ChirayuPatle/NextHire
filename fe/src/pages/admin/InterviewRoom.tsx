import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import AppLayout from '@/components/layout/AppLayout';
import Card from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator";
import { VideoIcon, MicIcon, MicOffIcon, MessageSquare, CameraIcon, CameraOffIcon, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackNote {
  id: string;
  text: string;
  timestamp: string;
  isPrivate: boolean;
}

const InterviewRoom = () => {
  const { id, candidateId } = useParams<{ id: string; candidateId: string }>();
  const navigate = useNavigate();
  const { userRole, sessions, candidates } = useApp();
  
  const session = sessions.find(s => s.id === id);
  const candidate = candidates.find(c => c.id === candidateId);
  
  const [activeTab, setActiveTab] = useState('interview');
  const [feedback, setFeedback] = useState<FeedbackNote[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [isPrivateFeedback, setIsPrivateFeedback] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [interviewStatus, setInterviewStatus] = useState('waiting');
  const [candidateRating, setCandidateRating] = useState(0);
  const [overallFeedback, setOverallFeedback] = useState('');

  useEffect(() => {
    if (!id || !candidateId) return;
    
    const feedbackKey = `interview_feedback_${id}_${candidateId}`;
    const storedFeedback = localStorage.getItem(feedbackKey);
    
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
    
    const questionsKey = `interview_questions_${id}_${candidateId}`;
    const storedQuestions = localStorage.getItem(questionsKey);
    
    if (storedQuestions) {
      setQuestionsAsked(JSON.parse(storedQuestions));
    }
    
    const statusKey = `interview_status_${id}_${candidateId}`;
    const storedStatus = localStorage.getItem(statusKey);
    
    if (storedStatus) {
      setInterviewStatus(storedStatus);
    }
    
    const ratingKey = `interview_rating_${id}_${candidateId}`;
    const storedRating = localStorage.getItem(ratingKey);
    
    if (storedRating) {
      setCandidateRating(Number(storedRating));
    }
    
    const overallKey = `interview_overall_${id}_${candidateId}`;
    const storedOverall = localStorage.getItem(overallKey);
    
    if (storedOverall) {
      setOverallFeedback(storedOverall);
    }
  }, [id, candidateId]);
  
  useEffect(() => {
    if (!id || !candidateId) return;
    
    localStorage.setItem(`interview_feedback_${id}_${candidateId}`, JSON.stringify(feedback));
    localStorage.setItem(`interview_questions_${id}_${candidateId}`, JSON.stringify(questionsAsked));
    localStorage.setItem(`interview_status_${id}_${candidateId}`, interviewStatus);
    localStorage.setItem(`interview_rating_${id}_${candidateId}`, candidateRating.toString());
    localStorage.setItem(`interview_overall_${id}_${candidateId}`, overallFeedback);
  }, [id, candidateId, feedback, questionsAsked, interviewStatus, candidateRating, overallFeedback]);
  
  const addFeedback = () => {
    if (!currentFeedback.trim()) return;
    
    const newFeedback: FeedbackNote = {
      id: `feedback_${Date.now()}`,
      text: currentFeedback,
      timestamp: new Date().toISOString(),
      isPrivate: isPrivateFeedback
    };
    
    setFeedback(prev => [...prev, newFeedback]);
    setCurrentFeedback('');
    
    if (!isPrivateFeedback) {
      toast.success('Feedback shared with candidate');
    }
  };
  
  const addQuestion = () => {
    if (!currentQuestion.trim()) return;
    
    setQuestionsAsked(prev => [...prev, currentQuestion]);
    setCurrentQuestion('');
    toast.success('Question added to log');
  };
  
  const toggleMic = () => {
    setIsMicOn(prev => !prev);
    toast(isMicOn ? 'Microphone turned off' : 'Microphone turned on');
  };
  
  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
    toast(isCameraOn ? 'Camera turned off' : 'Camera turned on');
  };
  
  const toggleScreenShare = () => {
    setIsScreenSharing(prev => !prev);
    toast(isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started');
  };
  
  const startInterview = () => {
    setInterviewStatus('active');
    toast.success('Interview started');
  };
  
  const endInterview = () => {
    setInterviewStatus('completed');
    toast.success('Interview completed');
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  if (!session || !candidate) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-white">Session or candidate not found</h1>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Interview Room</h1>
            <p className="text-nexthire-text-gray">
              Session: {session.title} | Candidate: {candidate.name}
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => navigate(`/session/${id}`)}
          >
            Back to Session
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6 p-0 overflow-hidden">
            <div className="flex justify-center items-center h-[40vh] bg-nexthire-dark-gray">
              {interviewStatus === 'waiting' ? (
                <div className="text-center">
                  <VideoIcon className="h-16 w-16 text-nexthire-text-gray mx-auto mb-4" />
                  <p className="text-nexthire-text-gray mb-4">Interview not started yet</p>
                  {userRole === 'admin' && (
                    <Button onClick={startInterview}>Start Interview</Button>
                  )}
                </div>
              ) : interviewStatus === 'completed' ? (
                <div className="text-center">
                  <VideoIcon className="h-16 w-16 text-nexthire-text-gray mx-auto mb-4" />
                  <p className="text-nexthire-text-gray">Interview completed</p>
                </div>
              ) : (
                <div className="text-center">
                  <VideoIcon className="h-16 w-16 text-nexthire-purple mx-auto mb-4 animate-pulse" />
                  <p className="text-white">Interview in progress</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-nexthire-light-gray">
              <div className="flex justify-center space-x-4">
                <Button 
                  variant={isMicOn ? "primary" : "secondary"} 
                  onClick={toggleMic}
                  className="rounded-full h-12 w-12 p-0"
                >
                  {isMicOn ? <MicIcon className="h-5 w-5" /> : <MicOffIcon className="h-5 w-5" />}
                </Button>
                <Button 
                  variant={isCameraOn ? "primary" : "secondary"} 
                  onClick={toggleCamera}
                  className="rounded-full h-12 w-12 p-0"
                >
                  {isCameraOn ? <CameraIcon className="h-5 w-5" /> : <CameraOffIcon className="h-5 w-5" />}
                </Button>
                <Button 
                  variant={isScreenSharing ? "primary" : "secondary"} 
                  onClick={toggleScreenShare}
                  className="rounded-full h-12 w-12 p-0"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                {userRole === 'admin' && interviewStatus === 'active' && (
                  <Button 
                    variant="primary" 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={endInterview}
                  >
                    End Interview
                  </Button>
                )}
              </div>
            </div>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-nexthire-card-gray">
              <TabsTrigger value="interview">Interview Questions</TabsTrigger>
              <TabsTrigger value="coding">Go to Coding Exercise</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interview">
              <Card>
                <h3 className="text-lg font-bold text-white mb-4">Question Log</h3>
                <div className="mb-4 max-h-60 overflow-y-auto">
                  {questionsAsked.length > 0 ? (
                    <ul className="space-y-2">
                      {questionsAsked.map((question, index) => (
                        <li key={index} className="bg-nexthire-dark-gray p-3 rounded">
                          <div className="flex justify-between">
                            <span className="text-white">{question}</span>
                            <span className="text-nexthire-text-gray text-sm">Q{index + 1}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-nexthire-text-gray">No questions asked yet</p>
                  )}
                </div>
                
                {userRole === 'admin' && interviewStatus === 'active' && (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label htmlFor="question" className="mb-1 block">Add Question</Label>
                      <Input
                        id="question"
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        placeholder="Type a question..."
                      />
                    </div>
                    <Button onClick={addQuestion}>Add</Button>
                  </div>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="coding">
              <Card>
                <h3 className="text-lg font-bold text-white mb-4">Coding Exercise</h3>
                <p className="text-nexthire-text-gray mb-4">
                  Continue the interview with a coding exercise to evaluate the candidate's programming skills.
                </p>
                <Button onClick={() => navigate(`/coding/${id}/${candidateId}`)}>
                  Open Coding Environment
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Feedback Notes</h3>
              <MessageSquare className="h-5 w-5 text-nexthire-text-gray" />
            </div>
            
            <div className="mb-4 max-h-60 overflow-y-auto">
              {feedback.length > 0 ? (
                <ul className="space-y-3">
                  {feedback.map((note) => (
                    <li key={note.id} className={`p-3 rounded text-sm ${note.isPrivate ? 'bg-nexthire-dark-gray' : 'bg-nexthire-dark-purple bg-opacity-40'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-white">
                          {note.isPrivate ? 'Private Note' : 'Shared with Candidate'}
                        </span>
                        <span className="text-nexthire-text-gray text-xs">
                          {formatTimestamp(note.timestamp)}
                        </span>
                      </div>
                      <p className="text-nexthire-text-gray">{note.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-nexthire-text-gray">No feedback notes added yet</p>
              )}
            </div>
            
            {userRole === 'admin' && interviewStatus === 'active' && (
              <div className="space-y-2">
                <Textarea
                  value={currentFeedback}
                  onChange={(e) => setCurrentFeedback(e.target.value)}
                  placeholder="Add feedback notes here..."
                  className="resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privateNote"
                      checked={isPrivateFeedback}
                      onChange={() => setIsPrivateFeedback(prev => !prev)}
                      className="mr-2"
                    />
                    <Label htmlFor="privateNote" className="text-sm">Private Note</Label>
                  </div>
                  <Button onClick={addFeedback}>Add Note</Button>
                </div>
              </div>
            )}
          </Card>
          
          {userRole === 'admin' && interviewStatus === 'completed' && (
            <Card>
              <h3 className="text-lg font-bold text-white mb-4">Interview Evaluation</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rating" className="mb-1 block">Candidate Rating (1-5)</Label>
                  <div className="flex space-x-2 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCandidateRating(i + 1)}
                        className={`w-8 h-8 rounded-full ${
                          i < candidateRating ? 'bg-nexthire-purple' : 'bg-nexthire-dark-gray'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="overallFeedback" className="mb-1 block">Overall Feedback</Label>
                  <Textarea
                    id="overallFeedback"
                    value={overallFeedback}
                    onChange={(e) => setOverallFeedback(e.target.value)}
                    placeholder="Provide overall feedback for the candidate..."
                    className="resize-none"
                  />
                </div>
                
                <Button 
                  onClick={() => {
                    toast.success('Evaluation saved');
                    navigate(`/session/${id}`);
                  }}
                >
                  Save Evaluation
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default InterviewRoom;
