import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Notification {
  title: string;
  description: string;
  bio: string;
  message: string;
  link?: string;
  socialMedia?: string;
  user: string;
}

const ChatApp: React.FC = () => {
  const [users, setUsers] = useState<string[]>(["User1", "User2", "User3"]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [socialMedia, setSocialMedia] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const sendNotification = (toAll: boolean) => {
    if (message.trim() === "" || title.trim() === "" || description.trim() === "" || bio.trim() === "") return;
    const newNotification: Notification = toAll
      ? { title, description, bio, message, link, socialMedia, user: "All Users" }
      : { title, description, bio, message, link, socialMedia, user: selectedUser };
    setNotifications([...notifications, newNotification]);
    setTitle("");
    setDescription("");
    setBio("");
    setMessage("");
    setLink("");
    setSocialMedia("");
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Notify</h1>
      <Card className="w-full max-w-2xl p-6 bg-neutral-800 rounded-2xl shadow-lg">
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <Input
              className="bg-gray-800 text-white border border-gray-600 p-3 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
            <Input
              className="bg-gray-800 text-white border border-gray-600 p-3 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter notification description"
            />
            <select
              className="bg-gray-800 text-white border border-gray-600 p-3 rounded-lg"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select User</option>
              {users.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 mt-4">
            <Button onClick={() => sendNotification(false)} disabled={!selectedUser} className="px-6 border-2 bg-neutral-800 py-3 rounded-lg text-white font-semibold">
              Notify User
            </Button>
            <Button onClick={() => sendNotification(true)} className="px-6 bg-none border-2 bg-neutral-800 py-3 rounded-lg text-white font-semibold">
              Notify All
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">Notifications</h2>
        <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg">
          {notifications.length === 0 ? (
            <p className="text-gray-400">No notifications yet</p>
          ) : (
            notifications.map((note, index) => (
              <div key={index} className="p-4 border-b border-gray-700 last:border-b-0 bg-gray-900 rounded-lg mb-2">
                <h3 className="text-lg font-bold text-blue-400">{note.title}</h3>
                <p className="text-gray-300">{note.description}</p>
                <p className="text-gray-400 text-sm">{note.bio}</p>
                <p className="text-white mt-2">{note.message}</p>
                {note.link && <a href={note.link} className="text-blue-400 hover:underline">🔗 Link</a>}
                {note.socialMedia && <a href={note.socialMedia} className="ml-2 text-blue-400 hover:underline">🌐 Social Media</a>}
                <p className="text-sm text-gray-500 mt-2">Sent to: {note.user}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;