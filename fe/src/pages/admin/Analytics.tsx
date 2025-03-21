
import { useApp } from "@/context/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import Card from "@/components/ui-custom/Card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { UsersIcon, CalendarIcon, CheckSquareIcon, UserCheckIcon } from "lucide-react";

const Analytics = () => {
  const { analytics, sessions, candidates } = useApp();

  // Calculate the total number of scheduled interviews
  const totalScheduledInterviews = sessions.reduce((count, session) => {
    return count + (session.interviews ? session.interviews.length : 0);
  }, 0);
  
  // Calculate the completion rate of interviews
  const completedInterviews = sessions.reduce((count, session) => {
    return count + (session.interviews ? 
      session.interviews.filter(interview => interview.status === 'completed').length : 0);
  }, 0);
  
  const interviewCompletionRate = totalScheduledInterviews > 0 
    ? Math.round((completedInterviews / totalScheduledInterviews) * 100) 
    : 0;

  // Prepare data for the status pie chart
  const candidateStatusData = [
    { name: 'Active', value: candidates.filter(c => c.status === 'active').length, color: '#6366F1' },
    { name: 'Hired', value: candidates.filter(c => c.status === 'hired').length, color: '#10B981' },
    { name: 'Rejected', value: candidates.filter(c => c.status === 'rejected').length, color: '#EF4444' }
  ];
  
  // Prepare data for the skills bar chart
  const skillsFrequency: Record<string, number> = {};
  candidates.forEach(candidate => {
    candidate.skills.forEach(skill => {
      skillsFrequency[skill] = (skillsFrequency[skill] || 0) + 1;
    });
  });
  
  const skillsData = Object.entries(skillsFrequency)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Take top 8 skills
  
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-nexthire-text-gray">Overview of your recruitment metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="rounded-full bg-indigo-500 bg-opacity-20 p-3">
              <UsersIcon className="h-6 w-6 text-indigo-500" />
            </div>
            <div className="ml-4">
              <p className="text-nexthire-text-gray">Total Candidates</p>
              <h3 className="text-2xl font-bold text-white">{candidates.length}</h3>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="rounded-full bg-purple-500 bg-opacity-20 p-3">
              <CalendarIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-nexthire-text-gray">Active Sessions</p>
              <h3 className="text-2xl font-bold text-white">
                {sessions.filter(s => s.status === 'active').length}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="rounded-full bg-green-500 bg-opacity-20 p-3">
              <CheckSquareIcon className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-nexthire-text-gray">Interviews Scheduled</p>
              <h3 className="text-2xl font-bold text-white">{totalScheduledInterviews}</h3>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="rounded-full bg-blue-500 bg-opacity-20 p-3">
              <UserCheckIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-nexthire-text-gray">Completion Rate</p>
              <h3 className="text-2xl font-bold text-white">{interviewCompletionRate}%</h3>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-bold text-white mb-4">Monthly Activity</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics.monthlyActivity}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E1E', 
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="candidates" 
                  stackId="1"
                  stroke="#8884d8" 
                  fill="#8884d8" 
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stackId="1"
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                />
                <Area 
                  type="monotone" 
                  dataKey="interviews" 
                  stackId="1"
                  stroke="#ffc658" 
                  fill="#ffc658" 
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-xl font-bold text-white mb-4">Candidate Status</h2>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={candidateStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {candidateStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E1E', 
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <Card>
        <h2 className="text-xl font-bold text-white mb-4">Top Skills</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={skillsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis 
                dataKey="skill" 
                stroke="#999"
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E1E1E', 
                  border: '1px solid #444',
                  borderRadius: '4px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </AppLayout>
  );
};

export default Analytics;
