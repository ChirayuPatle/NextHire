
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Button from '@/components/ui-custom/Button';
import { toast } from 'sonner';
import { useStorage, useMutation, useOthers, useSelf, useUpdateMyPresence } from '@/lib/liveblocks';

interface CodeEditorProps {
  userRole: string;
  candidateId: string;
}

const CodeEditor = ({ userRole, candidateId }: CodeEditorProps) => {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  const code = useStorage((state) => state.code);
  const language = useStorage((state) => state.language);
  const isEditable = useStorage((state) => state.isEditable);
  const participantIds = useStorage((state) => state.participantIds || []);
  
  // Update code in storage
  const updateCode = useMutation(({ storage }, newCode) => {
    storage.set("code", newCode);
  }, []);
  
  // Update language in storage
  const updateLanguage = useMutation(({ storage }, newLanguage) => {
    storage.set("language", newLanguage);
  }, []);
  
  // Toggle edit permission
  const toggleEditPermission = useMutation(({ storage }) => {
    const currentState = storage.get("isEditable");
    storage.set("isEditable", !currentState);
    return !currentState;
  }, []);
  
  // Run the code
  const runCode = () => {
    try {
      // This is a simplified version. In a real app, you'd run this in a secure sandbox
      // eslint-disable-next-line no-new-func
      const result = Function(code)();
      toast.success("Code executed successfully!");
      console.log("Code execution result:", result);
    } catch (error) {
      toast.error(`Error executing code: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error("Code execution error:", error);
    }
  };
  
  // Handle text changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCode(e.target.value);
  };
  
  // Handle language changes
  const handleLanguageChange = (newLanguage: string) => {
    updateLanguage(newLanguage);
  };
  
  // Toggle edit permission (admin only)
  const handleToggleEditPermission = () => {
    if (userRole !== 'admin') return;
    
    const newState = toggleEditPermission();
    toast.success(`Code editing is now ${newState ? 'enabled' : 'disabled'} for candidate`);
  };
  
  // Setup cursor presence on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMyPresence({
        cursor: { x: e.clientX, y: e.clientY },
      });
    };

    const handleMouseLeave = () => {
      updateMyPresence({
        cursor: null,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [updateMyPresence]);
  
  // Return connected users count
  const connectedUsers = others.length + 1; // +1 for the current user
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-nexthire-light-gray flex justify-between items-center">
        <div className="flex items-center">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32 bg-nexthire-dark-gray">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-nexthire-dark-gray text-white">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          {userRole === 'admin' && (
            <div className="ml-4 flex items-center">
              <Label htmlFor="edit-permission" className="mr-2 text-white">Allow Editing</Label>
              <Switch 
                id="edit-permission" 
                checked={isEditable} 
                onCheckedChange={handleToggleEditPermission}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-nexthire-text-gray text-xs">
            {connectedUsers} user{connectedUsers !== 1 ? 's' : ''} connected
          </span>
          <Button onClick={runCode}>Run Code</Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <Textarea 
          value={code}
          onChange={handleCodeChange}
          className="h-full resize-none p-4 bg-[#1e1e1e] font-mono text-green-400 rounded-none"
          disabled={!isEditable && userRole !== 'admin'}
        />
        
        {/* Render cursors for other participants */}
        {others.map(({ connectionId, presence }) => {
          if (presence.cursor === null) {
            return null;
          }
          
          return (
            <div
              key={connectionId}
              className="absolute w-4 h-4 z-10 pointer-events-none"
              style={{
                left: presence.cursor.x,
                top: presence.cursor.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <svg
                width="24"
                height="36"
                viewBox="0 0 24 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.65376 12.3673H5.46667V12.5544V36L0 36V8.5L0 0L19.3333 0.000N19.3735L5.65376 12.3673Z"
                  fill={presence.color || "#1c90ff"}
                />
              </svg>
              
              <div
                className="absolute px-2 py-1 rounded-md text-xs text-white whitespace-nowrap"
                style={{
                  backgroundColor: presence.color || "#1c90ff",
                  transform: "translate(8px, -24px)",
                }}
              >
                {presence.name || "Anonymous"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-nexthire-light-gray text-nexthire-text-gray">
        <div className="flex items-center">
          <span className="font-semibold mr-2">Participants:</span>
          <div className="flex items-center space-x-2">
            {participantIds.length > 0 ? (
              participantIds.map((participantId, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-nexthire-dark-purple text-white text-xs rounded-full"
                >
                  {participantId === candidateId ? "Candidate" : "Admin"}
                </span>
              ))
            ) : (
              <span>No participants</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
