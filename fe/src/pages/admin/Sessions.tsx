
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "@/components/ui-custom/DatePicker";
import { Plus } from "lucide-react";
import Card from "@/components/ui-custom/Card";
import AppLayout from "@/components/layout/AppLayout";
import { toast } from "sonner";

const Sessions = () => {
  const { sessions, refreshData } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    jobType: "",
    location: "",
    skills: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default to 1 week from now
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSession = () => {
    // Generate a unique ID for the new session
    const newSessionId = `session_${Date.now()}`;
    
    // Create a new session object
    const newSession = {
      id: newSessionId,
      title: formData.title,
      description: formData.description,
      jobType: formData.jobType,
      location: formData.location,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      status: "upcoming",
      candidates: [],
      rounds: [],
      quizzes: [],
      interviews: []
    };
    
    // Add the new session to localStorage
    const currentSessions = JSON.parse(localStorage.getItem('nexthire_sessions') || '[]');
    localStorage.setItem('nexthire_sessions', JSON.stringify([...currentSessions, newSession]));
    
    // Refresh the sessions data
    refreshData();
    
    // Reset the form
    setFormData({
      title: "",
      description: "",
      jobType: "",
      location: "",
      skills: "",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    // Close the dialog
    setIsDialogOpen(false);
    
    toast.success('Session created successfully');
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Interview Sessions</h1>
          <p className="text-nexthire-text-gray">Manage your recruitment sessions</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-nexthire-purple hover:bg-nexthire-dark-purple">
              <Plus className="mr-2 h-4 w-4" /> Create Session
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-nexthire-card-gray text-white border-nexthire-light-gray">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Create New Session</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Session Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  placeholder="E.g., Frontend Developer Recruitment"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  placeholder="Brief description of the session"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Input 
                    id="jobType" 
                    name="jobType" 
                    value={formData.jobType} 
                    onChange={handleInputChange} 
                    placeholder="E.g., Full-time, Contract"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    placeholder="E.g., Remote, New York"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="skills">Required Skills (comma separated)</Label>
                <Input 
                  id="skills" 
                  name="skills" 
                  value={formData.skills} 
                  onChange={handleInputChange} 
                  placeholder="E.g., React, TypeScript, Node.js"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <DatePicker 
                    date={formData.startDate} 
                    onDateChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <DatePicker 
                    date={formData.endDate} 
                    onDateChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button className="bg-nexthire-purple hover:bg-nexthire-dark-purple" onClick={handleCreateSession}>Create Session</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <Card 
            key={session.id} 
            className="hover:border-nexthire-purple transition-colors duration-300"
            isHoverable
          >
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-bold mb-2">{session.title}</h2>
              <p className="text-nexthire-text-gray text-sm mb-4 flex-grow">{session.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.isArray(session.skills) && session.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-nexthire-dark-purple text-white text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="text-sm text-nexthire-text-gray mb-4">
                <div className="flex justify-between mb-1">
                  <span>Start Date:</span>
                  <span>{format(new Date(session.startDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>End Date:</span>
                  <span>{format(new Date(session.endDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{session.location}</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  className="w-full bg-nexthire-purple hover:bg-nexthire-dark-purple"
                  onClick={() => navigate(`/session/${session.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {sessions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-nexthire-text-gray text-lg">No sessions found</p>
          <p className="text-nexthire-text-gray">Create your first interview session to get started</p>
        </div>
      )}
    </AppLayout>
  );
};

export default Sessions;
