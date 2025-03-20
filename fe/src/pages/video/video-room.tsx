import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface VideoRoomProps {
  roomId?: string;
}

const VideoRoom = ({ roomId = "230472155" }: VideoRoomProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMeeting = async () => {
      if (!containerRef.current) return;

      const appId = import.meta.env.VITE_ZEGO_APP_ID;
      const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

      if (!appId || !serverSecret) {
        console.error("Zego App ID or Server Secret is missing!");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        parseInt(appId), // Ensure it's a number
        serverSecret,
        roomId,
        Date.now().toString(), // Corrected Date.now usage
        "Rolex"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Personal Link",
            url: `http://localhost:5173/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    initMeeting();
  }, [roomId]);

  return <div ref={containerRef} style={{ width: "100%", height: "91vh" }} />;
};

export default VideoRoom;
