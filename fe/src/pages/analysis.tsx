import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  SearchIcon,
  BellIcon,
  HomeIcon,
  UserIcon,
  ImageIcon,
  BarChartIcon,
  SettingsIcon,
  MenuIcon,
  ChevronRightIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const NextHireDashboard = () => {
  // Sample data for applicants chart
  const applicantsData = [
    { name: "Jan", value: 140 },
    { name: "Feb", value: 200 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 120 },
    { name: "May", value: 180 },
    { name: "Jun", value: 170 },
  ];

  // Sample data for candidates
  const candidatesData = [
    {
      id: "01",
      name: "Jhon Doe",
      contact: "+91 1111111111",
      email: "jhondoe@gmail.com",
      domain: "backend",
      status: "Round - 1 in progress",
    },
    {
      id: "02",
      name: "David Mil",
      contact: "+91 455832591",
      email: "davidmil@gmail.com",
      domain: "frontend",
      status: "Round - 1 in progress",
    },
    {
      id: "03",
      name: "Kevin Max",
      contact: "+91 791924589",
      email: "maxkev@gmail.com",
      domain: "frontend",
      status: "Round - 1 in progress",
    },
    {
      id: "04",
      name: "Luna Ray",
      contact: "+91 785612345",
      email: "lunaray@gmail.com",
      domain: "backend",
      status: "Round - 1 in progress",
    },
  ];

  const [activeRound, setActiveRound] = useState(1);

  return (
    <div className="flex flex-col min-h-screen h-full bg-neutral-950 text-white">

      <div className="flex flex-1 flex-grow">

        <main className="flex-1 p-4 overflow-auto bg-neutral-950">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Applicants Chart */}
            <div className="bg-neutral-900/80 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium">Applicants</h2>
                <span className="text-sm font-medium">200</span>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicantsData}>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="#333"
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Bar dataKey="value" fill="#d884df" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Restructured Round Selection */}
            <div className="bg-neutral-900/80 rounded-lg p-6">
              <h2 className="text-sm font-medium mb-6 text-center">
                Interview Rounds
              </h2>
              <div className="flex flex-col space-y-4">
                {[1, 2, 3].map((round) => (
                  <NavLink
                  to={`/round/${round}`}
                    key={round}
                    onClick={() => setActiveRound(round)}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      activeRound === round
                        ? "bg-purple-900/40 border-l-4 border-purple-500"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                      <span className="font-medium">{round}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Round {round}</h3>
                      <p className="text-xs text-gray-400">
                        {round === 1
                          ? "Technical Assessment"
                          : round === 2
                            ? "Coding Round"
                            : "HR Interview"}
                      </p>
                    </div>
                    {activeRound === round && (
                      <ChevronRightIcon size={20} className="text-purple-500" />
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="bg-neutral-900/80 rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="relative w-64 mb-4">
                <input
                  type="text"
                  placeholder="Search Candidate"
                  className="w-full bg-neutral-700/40 rounded-md py-2 px-10 text-white text-sm"
                />
                <SearchIcon
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={14}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 text-xs border-b border-gray-800">
                      <th className="text-left p-3">Sr No.</th>
                      <th className="text-left p-3">Candidate Name</th>
                      <th className="text-left p-3">Contact</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Domain</th>
                      <th className="text-left p-3">Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatesData.map((candidate) => (
                      <tr
                        key={candidate.id}
                        className="border-b border-gray-800 text-sm"
                      >
                        <td className="p-3">{candidate.id}</td>
                        <td className="p-3">{candidate.name}</td>
                        <td className="p-3">{candidate.contact}</td>
                        <td className="p-3">{candidate.email}</td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${candidate.domain === "backend" ? "bg-purple-900 text-purple-300" : "bg-purple-300/20 text-purple-300"}`}
                          >
                            {candidate.domain}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-3 py-1 rounded-full bg-green-800 text-green-300 text-xs">
                            {candidate.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NextHireDashboard;
