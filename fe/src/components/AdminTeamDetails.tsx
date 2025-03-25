import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  contact: string;
  email: string;
  domain: string;
  currentStatus: string;
}

const domainColors: Record<string, string> = {
  Engineering: "bg-blue-500/20 text-blue-400",
  Marketing: "bg-purple-500/20 text-purple-400",
  Design: "bg-green-500/20 text-green-400",
  Sales: "bg-red-500/20 text-red-400",
  HR: "bg-yellow-500/20 text-yellow-400",
};

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  inactive: "bg-red-500/20 text-red-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  hired: "bg-blue-500/20 text-blue-400",
  rejected: "bg-gray-500/20 text-gray-400",
};

const teamMembersData: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    contact: "+1 555-123-4567",
    email: "john.doe@example.com",
    domain: "Engineering",
    currentStatus: "active"
  },
  {
    id: 2,
    name: "Jane Smith",
    contact: "+1 555-987-6543",
    email: "jane.smith@example.com",
    domain: "Marketing",
    currentStatus: "pending"
  },
  {
    id: 3,
    name: "Alex Johnson",
    contact: "+1 555-456-7890",
    email: "alex.j@example.com",
    domain: "Design",
    currentStatus: "hired"
  },
  {
    id: 4,
    name: "Sarah Williams",
    contact: "+1 555-789-0123",
    email: "sarah.w@example.com",
    domain: "Sales",
    currentStatus: "rejected"
  },
  {
    id: 5,
    name: "Michael Brown",
    contact: "+1 555-234-5678",
    email: "michael.b@example.com",
    domain: "HR",
    currentStatus: "inactive"
  },
];

export const AdminTeamDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("All");
  const [viewAll, setViewAll] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  const membersToDisplay = viewAll ? filteredMembers : filteredMembers.slice(0, 10);
  const domains = Array.from(new Set(teamMembersData.map((member) => member.domain)));

  return (
    <div className="w-full h-full px-20 mx-auto text-[#B0B0B0] rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Candidates</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0]" />
          <Input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 bg-[#252525] border border-[#333] text-white placeholder-[#B0B0B0] focus:border-[#B967FF] focus:ring-1 focus:ring-[#B967FF]/50"
          />
        </div>
        <select
          value={filterDomain}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-[#333] rounded-md bg-[#252525] text-white focus:outline-none focus:ring-2 focus:ring-[#B967FF]"
        >
          <option value="All">All Domains</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#333]">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#252525]">
            <tr>
              <th className="px-4 py-3 border-b border-[#333] text-left text-sm font-medium text-[#B0B0B0]">ID</th>
              <th className="px-4 py-3 border-b border-[#333] text-left text-sm font-medium text-[#B0B0B0]">Name</th>
              <th className="px-4 py-3 border-b border-[#333] text-left text-sm font-medium text-[#B0B0B0]">Contact</th>
              <th className="px-4 py-3 border-b border-[#333] text-left text-sm font-medium text-[#B0B0B0]">Email</th>
              <th className="px-4 py-3 border-b border-[#333] text-left text-sm font-medium text-[#B0B0B0]">Domain</th>
              <th className="px-4 py-3 border-b border-[#333] text-left text-sm font-medium text-[#B0B0B0]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333]">
            {membersToDisplay.map((member) => {
              const statusKey = member.currentStatus.toLowerCase();
              return (
                <tr 
                  key={member.id} 
                  className="hover:bg-[#252525]/80 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-white">{member.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{member.name}</td>
                  <td className="px-4 py-3 text-sm text-[#B0B0B0]">{member.contact}</td>
                  <td className="px-4 py-3 text-sm text-[#B0B0B0]">{member.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${domainColors[member.domain] || "bg-neutral-500/20 text-neutral-400"}`}
                    >
                      {member.domain}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[statusKey] || "bg-neutral-500/20 text-neutral-400"}`}
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

      {filteredMembers.length > 10 && !viewAll && (
        <div className="mt-6 text-center">
          <Button
            onClick={() => setViewAll(true)}
            variant="outline"
            className="border-[#B967FF] text-[#B967FF] hover:bg-[#B967FF]/10"
          >
            View All Candidates ({filteredMembers.length})
          </Button>
        </div>
      )}
    </div>
  );
};