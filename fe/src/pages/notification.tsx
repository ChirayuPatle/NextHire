import { useState } from "react";
import { Bell, CheckCircle } from "lucide-react";

// Define Notification Type
interface Notification {
  id: number;
  message: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "New message from Team", read: false },
    { id: 2, message: "Project deadline approaching", read: false },
    { id: 3, message: "System update available", read: false },
  ]);

  // Mark all as read
  const markAllAsRead = (): void => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        <Bell className="mr-2" /> Notifications
      </h1>

      {/* Mark All as Read Button */}
      {notifications.some((n) => !n.read) && (
        <button
          onClick={markAllAsRead}
          className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
        >
          Mark All as Read
        </button>
      )}

      {/* Notifications List */}
      <div className="w-full max-w-md">
        {notifications.length === 0 ? (
          <p className="text-gray-400">No new notifications</p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-3 rounded-md flex items-center justify-between ${
                  notification.read ? "bg-gray-800 text-gray-500" : "bg-gray-700"
                }`}
              >
                <span>{notification.message}</span>
                {notification.read && <CheckCircle className="text-green-500" size={20} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
