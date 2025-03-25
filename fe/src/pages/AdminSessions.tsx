import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/SectionHeader";
import { SessionItem } from "@/components/SessionItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, KeyboardEvent } from "react";
import { Session } from "@/lib/type";

const getSessions = (): Session[] => {
  const sessions = localStorage.getItem('interviewSessions');
  return sessions ? JSON.parse(sessions) : [];
};

const saveSessions = (sessions: Session[]) => {
  localStorage.setItem('interviewSessions', JSON.stringify(sessions));
};

export const AdminSessions = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: [] as string[],
    location: '',
    jobType: '',
    startDate: '',
    endDate: ''
  });
  const [currentSkill, setCurrentSkill] = useState('');

  useEffect(() => {
    const loadedSessions = getSessions();
    setSessions(loadedSessions);
  }, []);

  const handleViewDetails = (sessionId: number) => {
    navigate(`/dashboard/session/${sessionId}`);
  };

  const handleCreateSession = () => {
    const newSession: Session = {
      id: sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1,
      title: formData.title,
      description: formData.description,
      skills: formData.skills,
      location: formData.location,
      jobType: formData.jobType,
      status: "active",
      candidates: [],
      startDate: formData.startDate,
      endDate: formData.endDate,
      createdAt: new Date().toISOString(),
      interviewRounds: []
    };

    const updatedSessions = [...sessions, newSession];
    saveSessions(updatedSessions);
    setSessions(updatedSessions);
    
    setFormData({
      title: '',
      description: '',
      skills: [],
      location: '',
      jobType: '',
      startDate: '',
      endDate: ''
    });
    setCurrentSkill('');
    setIsDialogOpen(false);
    navigate(`/dashboard/session/${newSession.id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ','].includes(e.key) && currentSkill.trim()) {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="px-20 text-white">
      <SectionHeader 
        title="Interview Sessions" 
        actionText="Create New" 
        onAction={() => setIsDialogOpen(true)}
      />

      <Card className="bg-[#1E1E1E] border border-[#333] p-6 mt-6">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <SessionItem 
              key={session.id} 
              session={session} 
              onViewDetails={() => handleViewDetails(session.id)}
            />
          ))
        ) : (
          <div className="text-center p-6 text-[#B0B0B0]">
            <p>No active sessions found</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setIsDialogOpen(true)}
            >
              Create Your First Session
            </Button>
          </div>
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-[#B967FF] hover:bg-[#B967FF]/90">
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="border-[#333] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Session</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Session Title*</Label>
              <Input 
                id="title" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea 
                id="description" 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Date*</Label>
                <Input 
                  type="date" 
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="text-black"
                />
              </div>
              <div className="grid gap-2">
                <Label>End Date*</Label>
                <Input 
                  type="date" 
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="text-black"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="skills">Required Skills*</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#B967FF]/20 text-[#B967FF] text-sm"
                  >
                    {skill}
                    <button 
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-[#B967FF] hover:text-[#B967FF]/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Enter skill and press comma or enter"
                  className="text-black flex-1"
                />
                <Button 
                  type="button"
                  onClick={addSkill}
                  disabled={!currentSkill.trim()}
                  className="bg-[#B967FF] hover:bg-[#B967FF]/90"
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location*</Label>
              <Input 
                id="location" 
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jobType">Job Type*</Label>
              <Input 
                id="jobType" 
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                required
                className="text-black"
              />
            </div>
          </div>
          <Button 
            className="bg-[#B967FF] hover:bg-[#B967FF]/90 w-full mt-4"
            onClick={handleCreateSession}
            disabled={
              !formData.title || 
              !formData.description || 
              formData.skills.length === 0 || 
              !formData.location || 
              !formData.jobType || 
              !formData.startDate || 
              !formData.endDate
            }
          >
            Create Session
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};