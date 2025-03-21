"use client";

import React, { useState, ChangeEvent } from "react";

interface TeamMember {
  id: number;
  name: string;
  contact: string;
  email: string;
  domain: string;
  currentStatus: string;
}

const teamMembersData: TeamMember[] = [
  { id: 1, name: "Alice Johnson", contact: "555-0101", email: "alice@example.com", domain: "Marketing", currentStatus: "Active" },
  { id: 2, name: "Bob Smith", contact: "555-0102", email: "bob@example.com", domain: "Engineering", currentStatus: "Active" },
  { id: 3, name: "Carol White", contact: "555-0103", email: "carol@example.com", domain: "Design", currentStatus: "Inactive" },
  { id: 4, name: "David Brown", contact: "555-0104", email: "david@example.com", domain: "Engineering", currentStatus: "Active" },
  { id: 5, name: "Eva Green", contact: "555-0105", email: "eva@example.com", domain: "Marketing", currentStatus: "Active" },
  { id: 6, name: "Frank Black", contact: "555-0106", email: "frank@example.com", domain: "Sales", currentStatus: "Inactive" },
  { id: 7, name: "Grace Lee", contact: "555-0107", email: "grace@example.com", domain: "Design", currentStatus: "Active" },
  { id: 8, name: "Henry Adams", contact: "555-0108", email: "henry@example.com", domain: "Engineering", currentStatus: "Active" },
  { id: 9, name: "Ivy Carter", contact: "555-0109", email: "ivy@example.com", domain: "HR", currentStatus: "Active" },
  { id: 10, name: "Jack Davis", contact: "555-0110", email: "jack@example.com", domain: "Sales", currentStatus: "Active" },
  { id: 11, name: "Kelly Miller", contact: "555-0111", email: "kelly@example.com", domain: "Marketing", currentStatus: "Inactive" },
  { id: 12, name: "Liam Wilson", contact: "555-0112", email: "liam@example.com", domain: "Engineering", currentStatus: "Active" },
  { id: 13, name: "Mia Taylor", contact: "555-0113", email: "mia@example.com", domain: "Design", currentStatus: "Active" },
  { id: 14, name: "Noah Martinez", contact: "555-0114", email: "noah@example.com", domain: "Engineering", currentStatus: "Active" },
  { id: 15, name: "Olivia Anderson", contact: "555-0115", email: "olivia@example.com", domain: "HR", currentStatus: "Inactive" },
  { id: 16, name: "Paul Thomas", contact: "555-0116", email: "paul@example.com", domain: "Sales", currentStatus: "Active" },
  { id: 17, name: "Quincy Roberts", contact: "555-0117", email: "quincy@example.com", domain: "Marketing", currentStatus: "Active" },
  { id: 18, name: "Rachel Moore", contact: "555-0118", email: "rachel@example.com", domain: "Engineering", currentStatus: "Inactive" },
  { id: 19, name: "Sam Walker", contact: "555-0119", email: "sam@example.com", domain: "Design", currentStatus: "Active" },
  { id: 20, name: "Tina Hall", contact: "555-0120", email: "tina@example.com", domain: "HR", currentStatus: "Active" },
];

// Map domains to Tailwind badge classes
const domainColors: { [key: string]: string } = {
  Engineering: "bg-blue-600",
  Marketing: "bg-purple-600",
  Design: "bg-green-600",
  Sales: "bg-red-600",
  HR: "bg-yellow-600",
};

// Map status to color classes
const statusColors: { [key: string]: string } = {
  active: "bg-green-600",
  inactive: "bg-red-600",
};

export const TeamDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterDomain, setFilterDomain] = useState<string>("All");
  const [viewAll, setViewAll] = useState<boolean>(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterDomain(e.target.value);
  };

  const filteredMembers = teamMembersData.filter((member) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      member.name.toLowerCase().includes(term) ||
      member.email.toLowerCase().includes(term) ||
      member.domain.toLowerCase().includes(term) ||
      member.currentStatus.toLowerCase().includes(term);
    const matchDomain = filterDomain === "All" || member.domain === filterDomain;
    return matchSearch && matchDomain;
  });

  // Show only 10 members by default
  const membersToDisplay = viewAll ? filteredMembers : filteredMembers.slice(0, 10);

  const domains = Array.from(new Set(teamMembersData.map((member) => member.domain)));

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <div className="max-w-7xl mx-auto bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-white">Team</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterDomain}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Domains</option>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 border border-gray-600">S.No</th>
                <th className="px-4 py-2 border border-gray-600">Candidate Name</th>
                <th className="px-4 py-2 border border-gray-600">Contact</th>
                <th className="px-4 py-2 border border-gray-600">Email</th>
                <th className="px-4 py-2 border border-gray-600 text-center">Domain</th>
                <th className="px-4 py-2 border border-gray-600 text-center">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {membersToDisplay.map((member, index) => {
                const statusKey = member.currentStatus.toLowerCase();
                return (
                  <tr key={member.id} className="hover:bg-gray-600">
                    <td className="px-4 py-2 border border-gray-600 text-center">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-600">{member.name}</td>
                    <td className="px-4 py-2 border border-gray-600">{member.contact}</td>
                    <td className="px-4 py-2 border border-gray-600">{member.email}</td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          domainColors[member.domain] || "bg-gray-500"
                        }`}
                      >
                        {member.domain}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[statusKey] || "bg-gray-500"
                        }`}
                      >
                        {member.currentStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        {filteredMembers.length > 10 && !viewAll && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setViewAll(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              View All Members
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
