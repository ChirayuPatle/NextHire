
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import AppLayout from '@/components/layout/AppLayout';
import Card from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { RoomProvider } from '@/lib/liveblocks';
import CodeEditor from '@/components/admin/CodeEditor';

const CodingRoom = () => {
  const { id, candidateId } = useParams<{ id: string; candidateId: string }>();
  const navigate = useNavigate();
  const { userRole, sessions, candidates } = useApp();
  
  const session = sessions.find(s => s.id === id);
  const candidate = candidates.find(c => c.id === candidateId);
  
  const roomId = `coding_room_${id}_${candidateId}`;

  const initialStorage = {
    code: '// Write your code here...',
    language: 'javascript',
    isEditable: userRole === 'admin',
    participantIds: candidateId ? [candidateId] : []
  };
  
  const initialPresence = {
    cursor: null,
    name: userRole === 'admin' ? 'Admin' : (candidate?.name || 'Candidate'),
    color: userRole === 'admin' ? '#9333EA' : '#2563EB'
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
            <h1 className="text-2xl font-bold text-white mb-2">Coding Interview</h1>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="p-0 flex flex-col h-[70vh]">
            <RoomProvider
              id={roomId}
              initialPresence={initialPresence}
              initialStorage={initialStorage}
            >
              <CodeEditor
                userRole={userRole}
                candidateId={candidateId}
              />
            </RoomProvider>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Instructions</h3>
            <div className="text-nexthire-text-gray space-y-2">
              <p>- Write your solution to the given problem</p>
              <p>- You can run your code to check the output</p>
              <p>- Your code will be saved automatically</p>
              <p>- The interviewer may provide feedback in real-time</p>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-bold text-white mb-3">Problem</h3>
            <div className="text-nexthire-text-gray space-y-2">
              <p className="font-medium">FizzBuzz</p>
              <p>
                Write a function that prints numbers from 1 to n, but for
                multiples of 3 print "Fizz" and for multiples of 5 print "Buzz".
                For numbers which are multiples of both 3 and 5, print "FizzBuzz".
              </p>
              <div className="mt-4">
                <p className="font-medium">Example:</p>
                <p>Input: n = 15</p>
                <p>Output: [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CodingRoom;
