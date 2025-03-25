import { BarChart2, PieChart, LineChart, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  Pie, Cell, LineChart as RechartsLineChart, Line, ResponsiveContainer 
} from "recharts";
import { SectionHeader } from "../components/SectionHeader";

const applicantsData = [
  { name: "Jan", applicants: 140, interviews: 45, hires: 8 },
  { name: "Feb", applicants: 200, interviews: 68, hires: 12 },
  { name: "Mar", applicants: 80, interviews: 32, hires: 5 },
  { name: "Apr", applicants: 120, interviews: 50, hires: 9 },
  { name: "May", applicants: 180, interviews: 72, hires: 14 },
  { name: "Jun", applicants: 170, interviews: 65, hires: 11 },
];

const sourceData = [
  { name: "LinkedIn", value: 35 },
  { name: "Job Boards", value: 25 },
  { name: "Referrals", value: 20 },
  { name: "Career Site", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ['#B967FF', '#8344B8', '#6A3D99', '#512D7A', '#3A1D5B'];

const timeToHireData = [
  { name: 'Frontend', days: 14 },
  { name: 'Backend', days: 21 },
  { name: 'UX/UI', days: 10 },
  { name: 'Product', days: 18 },
  { name: 'Data', days: 25 },
];

const rejectionReasons = [
  { reason: "Technical Skills", count: 42 },
  { reason: "Culture Fit", count: 28 },
  { reason: "Experience", count: 18 },
  { reason: "Salary Expectation", count: 12 },
];

export const AdminAnalysis = () => {
  return (
    <div className="animate-[fade-in_0.3s_ease-out] bg-neutral-950 min-h-screen py-20 mt-[15rem] px-10 text-white">
      <div className="">
        <SectionHeader 
        title="Hiring Analytics Dashboard" 
        actionText="Export Report" 
        onAction={() => console.log("Export clicked")}
      >
      </SectionHeader>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Applicant Funnel */}
        <Card className="bg-[#1E1E1E] text-white border border-[#333] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Hiring Funnel</h3>
            <div className="p-2 rounded-full bg-[#B967FF]/20">
              <BarChart2 className="h-5 w-5 text-[#B967FF]" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicantsData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#B0B0B0" />
                <YAxis stroke="#B0B0B0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#252525', borderColor: '#333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="applicants" fill="#B967FF" radius={[4, 4, 0, 0]} name="Applicants" />
                <Bar dataKey="interviews" fill="#8344B8" radius={[4, 4, 0, 0]} name="Interviews" />
                <Bar dataKey="hires" fill="#512D7A" radius={[4, 4, 0, 0]} name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        {/* Time to Hire */}
        <Card className="bg-[#1E1E1E] text-white border border-[#333] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Average Time to Hire (Days)</h3>
            <div className="p-2 rounded-full bg-[#B967FF]/20">
              <LineChart className="h-5 w-5 text-[#B967FF]" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={timeToHireData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#B0B0B0" />
                <YAxis stroke="#B0B0B0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#252525', borderColor: '#333' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="days" 
                  stroke="#B967FF" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Rejection Reasons */}
        <Card className="bg-[#1E1E1E] text-white border border-[#333] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top Rejection Reasons</h3>
            <div className="p-2 rounded-full bg-[#B967FF]/20">
              <BarChart2 className="h-5 w-5 text-[#B967FF]" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={rejectionReasons}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#B0B0B0" />
                <YAxis dataKey="reason" type="category" stroke="#B0B0B0" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#252525', borderColor: '#333' }}
                />
                <Bar dataKey="count" fill="#B967FF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};