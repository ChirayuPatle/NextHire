import { useEffect, useRef, useState } from "react";
import { DyteProvider, useDyteClient, useDyteMeeting, useDyteSelector } from "@dytesdk/react-web-core";
import CodeEditor from "../code/code-editor";

// Define types for Dyte participants and meeting
interface DyteParticipant {
  id: string;
  name: string;
  videoEnabled: boolean;
  audioEnabled: boolean;
  videoTrack?: MediaStreamTrack;
  audioTrack?: MediaStreamTrack;
}

interface VideoRoomProps {
  roomId?: string;
}

const VideoRoom = ({ roomId = "230472155" }: VideoRoomProps) => {
  const [isCodingRoundActive, setIsCodingRoundActive] = useState(false);
  const [participants, setParticipants] = useState<{ userID: string; streamID?: string }[]>([]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [timer, setTimer] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Dyte Client
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    const initDyteClient = async () => {
      const authToken = "YOUR_SERVER_GENERATED_TOKEN"; // Replace with your Dyte auth token

      if (!authToken) {
        console.error("Dyte auth token is missing!");
        return;
      }

      try {
        await initMeeting({
          authToken,
          defaults: {
            audio: true,
            video: true,
          },
        });
      } catch (err) {
        console.error("Error initializing Dyte client:", err);
      }
    };

    initDyteClient();
  }, [initMeeting]);

  // Join Room and Set Up Streams
  const MeetingComponent = () => {
    const { meeting } = useDyteMeeting();
    const roomJoined = useDyteSelector((m) => m.self.roomJoined);
    const self = useDyteSelector((m) => m.self);
    const dyteParticipants = useDyteSelector((m) => m.participants.all);

    // Join the room when the meeting is initialized
    useEffect(() => {
      const joinRoom = async () => {
        if (!roomJoined) {
          try {
            await meeting.joinRoom();
          } catch (err) {
            console.error("Error joining room:", err);
          }
        }
      };

      if (meeting) {
        joinRoom();
      }
    }, [meeting, roomJoined]);

    // Set up local stream
    useEffect(() => {
      if (roomJoined && self.videoTrack) {
        const localStream = new MediaStream();
        if (self.videoTrack) localStream.addTrack(self.videoTrack);
        if (self.audioTrack) localStream.addTrack(self.audioTrack);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
          localVideoRef.current.play().catch((err) => console.error("Local video play failed:", err));
        }

        // Add local participant
        setParticipants((prev) => [
          ...prev.filter((p) => p.userID !== "Rolex"),
          { userID: "Rolex", streamID: "local-stream" },
        ]);

        // Start timer
        timerRef.current = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000);
      }
    }, [roomJoined, self.videoTrack, self.audioTrack]);

    // Handle remote participants
    useEffect(() => {
      if (roomJoined) {
        const handleParticipantUpdate = () => {
          const remoteParticipants = Array.from(dyteParticipants.values()).filter(
            (p: DyteParticipant) => p.id !== self.id
          );

          // Update participants list
          setParticipants((prev) => {
            const updatedParticipants = [
              ...prev.filter((p) => p.userID === "Rolex"), // Keep local participant
              ...remoteParticipants.map((p: DyteParticipant) => ({
                userID: p.name || p.id,
                streamID: p.id,
              })),
            ];
            return updatedParticipants;
          });

          // Set up remote video streams
          remoteParticipants.forEach((p: DyteParticipant) => {
            if (p.videoTrack) {
              const remoteStream = new MediaStream();
              remoteStream.addTrack(p.videoTrack);
              const videoElement = document.createElement("video");
              videoElement.className = "w-full h-full object-cover rounded-md";
              videoElement.srcObject = remoteStream;
              videoElement.autoplay = true;
              videoElement.muted = false;
              remoteVideoRefs.current.set(p.id, videoElement);
              const container = document.getElementById(`remote-video-${p.id}`);
              if (container) container.appendChild(videoElement);
            }
          });
        };

        // Initial setup
        handleParticipantUpdate();

        // Listen for participant updates
        meeting.participants.on("participant-joined", handleParticipantUpdate);
        meeting.participants.on("participant-left", (participant: DyteParticipant) => {
          setParticipants((prev) => prev.filter((p) => p.userID !== (participant.name || participant.id)));
          const videoElement = remoteVideoRefs.current.get(participant.id);
          if (videoElement) {
            videoElement.srcObject = null;
            videoElement.remove();
          }
          remoteVideoRefs.current.delete(participant.id);
        });

        return () => {
          meeting.participants.off("participant-joined", handleParticipantUpdate);
          meeting.participants.off("participant-left");
        };
      }
    }, [roomJoined, dyteParticipants, self.id]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (meeting) {
          meeting.leaveRoom().catch((err) => console.error("Error leaving room:", err));
          remoteVideoRefs.current.forEach((video) => {
            video.srcObject = null;
            video.remove();
          });
          remoteVideoRefs.current.clear();
        }
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [meeting]);

    // Toggle Microphone
    const toggleMic = async () => {
      if (meeting) {
        try {
          if (isMicOn) {
            await meeting.self.disableAudio();
          } else {
            await meeting.self.enableAudio();
          }
          setIsMicOn((prev) => !prev);
        } catch (err) {
          console.error("Error toggling microphone:", err);
        }
      }
    };

    // Toggle Camera
    const toggleCamera = async () => {
      if (meeting) {
        try {
          if (isCameraOn) {
            await meeting.self.disableVideo();
          } else {
            await meeting.self.enableVideo();
          }
          setIsCameraOn((prev) => !prev);
        } catch (err) {
          console.error("Error toggling camera:", err);
        }
      }
    };

    // Leave Room
    const leaveRoom = async () => {
      if (meeting) {
        try {
          await meeting.leaveRoom();
          setParticipants([]);
          if (timerRef.current) clearInterval(timerRef.current);
          setTimer(0);
          remoteVideoRefs.current.forEach((video) => {
            video.srcObject = null;
            video.remove();
          });
          remoteVideoRefs.current.clear();
        } catch (err) {
          console.error("Error leaving room:", err);
        }
      }
    };

    // Format Timer
    const formatTimer = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
      <div className="flex h-screen bg-gray-900">
        {/* Video Conferencing Section */}
        <div
          className={`transition-all duration-300 ${
            isCodingRoundActive ? "w-1/4" : "w-1/5"
          } h-full p-2 bg-gray-800 border-r border-gray-700 flex flex-col items-center`}
        >
          {/* Timer */}
          <div className="text-white text-lg mb-2">{formatTimer(timer)}</div>

          {/* Video Grid */}
          <div className="w-full flex-1 overflow-y-auto bg-black rounded-lg p-2 space-y-2">
            {/* Local Video */}
            <div className="relative w-full h-40 bg-gray-900 rounded-md">
              <video
                ref={localVideoRef}
                className="w-full h-full object-cover rounded-md"
                muted
              />
              <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                Rolex (You)
              </div>
            </div>

            {/* Remote Videos */}
            {participants
              .filter((p) => p.userID !== "Rolex" && p.streamID)
              .map((participant) => (
                <div
                  key={participant.streamID}
                  id={`remote-video-${participant.streamID}`}
                  className="relative w-full h-40 bg-gray-900 rounded-md"
                >
                  <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                    {participant.userID}
                  </div>
                </div>
              ))}
          </div>

          {/* Controls */}
          <div className="flex space-x-2 mt-2">
            <button
              onClick={toggleMic}
              className={`p-2 rounded-full ${
                isMicOn ? "bg-blue-500" : "bg-red-500"
              } text-white`}
            >
              {isMicOn ? "Mic On" : "Mic Off"}
            </button>
            <button
              onClick={toggleCamera}
              className={`p-2 rounded-full ${
                isCameraOn ? "bg-blue-500" : "bg-red-500"
              } text-white`}
            >
              {isCameraOn ? "Camera On" : "Camera Off"}
            </button>
            <button
              onClick={leaveRoom}
              className="p-2 rounded-full bg-red-600 text-white"
            >
              Leave
            </button>
          </div>

          {/* Toggle Coding Mode */}
          <button
            className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setIsCodingRoundActive((prev) => !prev)}
          >
            {isCodingRoundActive ? "Disable Coding Mode" : "Enable Coding Mode"}
          </button>
        </div>

        {/* Code Editor Section */}
        <div
          className={`transition-all duration-300 ${
            isCodingRoundActive ? "w-3/4" : "hidden"
          } h-full bg-gray-900 p-4`}
        >
          <CodeEditor />
        </div>
      </div>
    );
  };

  return (
    <DyteProvider value={meeting} fallback={<i>Loading...</i>}>
      {meeting ? <MeetingComponent /> : <i>Loading meeting...</i>}
    </DyteProvider>
  );
};

export default VideoRoom;