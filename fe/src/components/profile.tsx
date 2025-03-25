// src/pages/dashboard/profile.tsx
import { User } from "lucide-react";

export const DashboardProfile = () => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-neutral-100 rounded-full">
          <User size={24} className="text-neutral-600" />
        </div>
        <h1 className="text-2xl font-semibold">Profile Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Personal Information</h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-600">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="john@example.com"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Profile Picture</h2>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                <User size={32} className="text-neutral-500" />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Change Photo
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Security</h2>
            <button className="px-4 py-2 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors">
              Change Password
            </button>
          </div>

          {/* Save Button */}
          <div className="md:col-span-2 pt-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};