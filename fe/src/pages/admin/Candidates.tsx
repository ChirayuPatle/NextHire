
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Card from "@/components/ui-custom/Card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Mail, Phone, Calendar, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const Candidates = () => {
  const { candidates, refreshData } = useApp();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCandidateDialogOpen, setIsAddCandidateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddCandidate = () => {
    // Generate a unique ID for the new candidate
    const newCandidateId = `candidate_${Date.now()}`;
    
    // Create a new candidate object
    const newCandidate = {
      id: newCandidateId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      appliedSessions: [],
      status: "active",
      testScores: [],
      interviews: []
    };
    
    // Add the new candidate to localStorage
    const currentCandidates = JSON.parse(localStorage.getItem('nexthire_candidates') || '[]');
    localStorage.setItem('nexthire_candidates', JSON.stringify([...currentCandidates, newCandidate]));
    
    // Refresh the candidates data
    refreshData();
    
    // Reset the form
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: ""
    });
    
    // Close the dialog
    setIsAddCandidateDialogOpen(false);
    
    toast.success('Candidate added successfully');
  };
  
  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-600';
      case 'hired':
        return 'bg-green-600';
      case 'rejected':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };
  
  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Candidates</h1>
          <p className="text-nexthire-text-gray">Manage your candidate pool</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nexthire-text-gray h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddCandidateDialogOpen} onOpenChange={setIsAddCandidateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-nexthire-purple hover:bg-nexthire-dark-purple">
                <Plus className="mr-2 h-4 w-4" /> Add Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-nexthire-card-gray text-white border-nexthire-light-gray">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Add New Candidate</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Enter candidate name"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input 
                    id="skills" 
                    name="skills" 
                    value={formData.skills} 
                    onChange={handleInputChange} 
                    placeholder="E.g., React, JavaScript, CSS"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddCandidateDialogOpen(false)}>Cancel</Button>
                <Button className="bg-nexthire-purple hover:bg-nexthire-dark-purple" onClick={handleAddCandidate}>Add Candidate</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card 
              key={candidate.id} 
              className="hover:border-nexthire-purple transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
                <span className={`px-2 py-1 rounded-full text-xs uppercase ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-nexthire-text-gray">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{candidate.email}</span>
                </div>
                {candidate.phone && (
                  <div className="flex items-center text-nexthire-text-gray">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{candidate.phone}</span>
                  </div>
                )}
                <div className="flex items-center text-nexthire-text-gray">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Applied to {candidate.appliedSessions.length} sessions</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-nexthire-text-gray mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-nexthire-dark-purple text-white text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {candidate.testScores.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-nexthire-text-gray mb-2">Test Results:</p>
                  <div className="space-y-1">
                    {candidate.testScores.map((score, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-xs text-nexthire-text-gray">Test #{index + 1}</span>
                        <span className={`text-xs font-medium ${score.score >= 70 ? 'text-green-400' : 'text-red-400'}`}>
                          {score.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                <Button variant="secondary" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" /> Approve
                </Button>
                <Button variant="destructive" size="sm">
                  <XCircle className="h-4 w-4 mr-2" /> Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-nexthire-text-gray text-lg">No candidates found</p>
          {searchTerm ? (
            <p className="text-nexthire-text-gray">No results match your search. Try different keywords.</p>
          ) : (
            <p className="text-nexthire-text-gray">Add your first candidate to get started</p>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default Candidates;
