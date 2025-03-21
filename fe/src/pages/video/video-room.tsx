import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeEditor from "../code/code-editor"; 
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface VideoRoomProps {
  roomId?: string;
}

const VideoRoom = ({ roomId = "230472155" }: VideoRoomProps) => {
  const [currentTab, setCurrentTab] = useState<"meeting" | "code">("meeting");
  const [timer, setTimer] = useState(0);
  const meetingContainerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const initZegoUIKit = async () => {
      const appId = parseInt(import.meta.env.VITE_ZEGO_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

      if (!appId || !serverSecret) {
        console.error("Zego App ID or Server Secret is missing!");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Candidate"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (meetingContainerRef.current) {
        zp.joinRoom({
          container: meetingContainerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          showPreJoinView: false,
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showRoomTimer: false,
          onLeaveRoom: () => {
            if (timerRef.current) clearInterval(timerRef.current);
            navigate("/dashboard");
          },
        });
      }
    };

    initZegoUIKit();
  }, [roomId, navigate]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center p-2 shadow-lg">
        <div className="flex flex-col space-y-4 mb-4">
          <button
            className={`p-2 rounded-lg ${
              currentTab === "meeting" ? "bg-blue-500" : "bg-gray-600"
            } text-white transition-all duration-300 hover:bg-blue-400`}
            onClick={() => setCurrentTab("meeting")}
          >
            Meet
          </button>
          <button
            className={`p-2 rounded-lg ${
              currentTab === "code" ? "bg-blue-500" : "bg-gray-600"
            } text-white transition-all duration-300 hover:bg-blue-400`}
            onClick={() => setCurrentTab("code")}
          >
            Code
          </button>
        </div>
        <div className="text-white text-sm">{formatTimer(timer)}</div>
      </div>

      <div className="flex-1 h-full relative">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentTab === "meeting" ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div ref={meetingContainerRef} className="w-full h-full bg-gray-800" />
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentTab === "code" ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="w-full h-full bg-gray-900">
            <CodeEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRoom;