
// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
// import { 
//   BarChart, 
//   XAxis, 
//   YAxis, 
//   Bar, 
//   ResponsiveContainer, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend,
//   PieChart,
//   Pie,
//   Cell
// } from "recharts";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ChevronDown, ChevronUp, Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// // Mock data for demonstration
// const mockSessionData = {
//   id: "session-1",
//   title: "Frontend Developer Assessment",
//   participants: 45,
//   completionRate: 82,
//   averageScore: 76.3,
//   highestScore: 98,
//   lowestScore: 42,
//   passingScore: 70,
//   questionStats: [
//     { id: 1, question: "What is React?", difficulty: "easy", correctAnswerRate: 95 },
//     { id: 2, question: "Explain the virtual DOM concept", difficulty: "medium", correctAnswerRate: 78 },
//     { id: 3, question: "What are hooks in React?", difficulty: "medium", correctAnswerRate: 85 },
//     { id: 4, question: "Describe the useEffect hook", difficulty: "hard", correctAnswerRate: 63 },
//     { id: 5, question: "What is JSX?", difficulty: "easy", correctAnswerRate: 91 },
//     { id: 6, question: "Implement a sorting algorithm", difficulty: "hard", correctAnswerRate: 52 },
//   ],
//   scoreDistribution: [
//     { range: "0-20", count: 1 },
//     { range: "21-40", count: 3 },
//     { range: "41-60", count: 9 },
//     { range: "61-80", count: 22 },
//     { range: "81-100", count: 10 },
//   ],
//   timePerQuestion: [
//     { id: 1, avgTimeSeconds: 23 },
//     { id: 2, avgTimeSeconds: 45 },
//     { id: 3, avgTimeSeconds: 38 },
//     { id: 4, avgTimeSeconds: 72 },
//     { id: 5, avgTimeSeconds: 30 },
//     { id: 6, avgTimeSeconds: 120 },
//   ],
//   submissionTimes: [
//     { hour: "00:00", count: 0 },
//     { hour: "03:00", count: 0 },
//     { hour: "06:00", count: 2 },
//     { hour: "09:00", count: 8 },
//     { hour: "12:00", count: 15 },
//     { hour: "15:00", count: 12 },
//     { hour: "18:00", count: 5 },
//     { hour: "21:00", count: 3 },
//   ],
//   candidates: [
//     { id: "c1", name: "John Doe", score: 92, completionTime: "25:13", status: "passed" },
//     { id: "c2", name: "Jane Smith", score: 87, completionTime: "28:45", status: "passed" },
//     { id: "c3", name: "Alex Johnson", score: 65, completionTime: "30:22", status: "failed" },
//     { id: "c4", name: "Sam Wilson", score: 78, completionTime: "22:15", status: "passed" },
//     { id: "c5", name: "Taylor Swift", score: 95, completionTime: "19:58", status: "passed" },
//     { id: "c6", name: "Chris Evans", score: 58, completionTime: "31:47", status: "failed" },
//     { id: "c7", name: "Robert Downey", score: 83, completionTime: "26:19", status: "passed" },
//     { id: "c8", name: "Mark Ruffalo", score: 72, completionTime: "29:33", status: "passed" },
//   ]
// };

// const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

// const TestAnalytics = ({ sessionId }: { sessionId: string }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState<{
//     key: string;
//     direction: 'ascending' | 'descending';
//   } | null>(null);

//   // For this demo we're using mock data
//   const data = mockSessionData;

//   // Filtering candidates based on search term
//   const filteredCandidates = data.candidates.filter(candidate => 
//     candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Sorting function for candidates table
//   const sortedCandidates = [...filteredCandidates].sort((a, b) => {
//     if (!sortConfig) return 0;
    
//     if (sortConfig.key === 'score' || sortConfig.key === 'completionTime') {
//       const valueA = sortConfig.key === 'score' ? a[sortConfig.key] : 
//         parseInt(a[sortConfig.key].split(':')[0]) * 60 + parseInt(a[sortConfig.key].split(':')[1]);
//       const valueB = sortConfig.key === 'score' ? b[sortConfig.key] : 
//         parseInt(b[sortConfig.key].split(':')[0]) * 60 + parseInt(b[sortConfig.key].split(':')[1]);
        
//       return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
//     }
    
//     // String comparison for other fields
//     const valueA = a[sortConfig.key as keyof typeof a];
//     const valueB = b[sortConfig.key as keyof typeof b];
    
//     if (valueA < valueB) return sortConfig.direction === 'ascending' ? -1 : 1;
//     if (valueA > valueB) return sortConfig.direction === 'ascending' ? 1 : -1;
//     return 0;
//   });

//   const requestSort = (key: string) => {
//     let direction: 'ascending' | 'descending' = 'ascending';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key: string) => {
//     if (!sortConfig || sortConfig.key !== key) return null;
//     return sortConfig.direction === 'ascending' ? 
//       <ChevronUp className="h-4 w-4" /> : 
//       <ChevronDown className="h-4 w-4" />;
//   };

//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="overview" className="w-full">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="questions">Questions</TabsTrigger>
//           <TabsTrigger value="candidates">Candidates</TabsTrigger>
//           <TabsTrigger value="performance">Performance</TabsTrigger>
//         </TabsList>
        
//         {/* Overview Tab */}
//         <TabsContent value="overview" className="space-y-6">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className="py-4">
//                 <CardTitle className="text-lg">Participants</CardTitle>
//               </CardHeader>
//               <CardContent className="py-2">
//                 <div className="text-3xl font-bold text-nexthire-purple">{data.participants}</div>
//                 <p className="text-sm text-nexthire-text-gray">Total candidates</p>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader className="py-4">
//                 <CardTitle className="text-lg">Completion Rate</CardTitle>
//               </CardHeader>
//               <CardContent className="py-2">
//                 <div className="text-3xl font-bold text-nexthire-purple">{data.completionRate}%</div>
//                 <Progress value={data.completionRate} className="mt-2" />
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader className="py-4">
//                 <CardTitle className="text-lg">Average Score</CardTitle>
//               </CardHeader>
//               <CardContent className="py-2">
//                 <div className="text-3xl font-bold text-nexthire-purple">{data.averageScore}%</div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span>Pass: {data.passingScore}%</span>
//                   <span className="text-nexthire-text-gray">
//                     Range: {data.lowestScore}% - {data.highestScore}%
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader className="py-4">
//                 <CardTitle className="text-lg">Pass Rate</CardTitle>
//               </CardHeader>
//               <CardContent className="py-2">
//                 <div className="text-3xl font-bold text-nexthire-purple">
//                   {Math.round((data.candidates.filter(c => c.status === "passed").length / data.candidates.length) * 100)}%
//                 </div>
//                 <p className="text-sm text-nexthire-text-gray">
//                   {data.candidates.filter(c => c.status === "passed").length} passed of {data.candidates.length}
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
          
//           <div className="grid gap-6 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Score Distribution</CardTitle>
//                 <CardDescription>Distribution of candidate scores</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart
//                     data={data.scoreDistribution}
//                     margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="range" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#8884d8" name="Candidates" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader>
//                 <CardTitle>Submission Times</CardTitle>
//                 <CardDescription>When candidates completed the test</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart
//                     data={data.submissionTimes}
//                     margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="hour" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#82ca9d" name="Submissions" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
        
//         {/* Questions Tab */}
//         <TabsContent value="questions" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Question Performance</CardTitle>
//               <CardDescription>Percentage of correct answers per question</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={data.questionStats}
//                   margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="id" />
//                   <YAxis />
//                   <Tooltip 
//                     formatter={(value, name, props) => [`${value}%`, 'Correct Answer Rate']}
//                     labelFormatter={(value) => `Question ${value}`}
//                   />
//                   <Legend />
//                   <Bar dataKey="correctAnswerRate" fill="#8884d8" name="Correct Answer Rate (%)" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader>
//               <CardTitle>Question Analysis</CardTitle>
//               <CardDescription>Detailed breakdown of each question</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>ID</TableHead>
//                     <TableHead>Question</TableHead>
//                     <TableHead>Difficulty</TableHead>
//                     <TableHead>Correct Answer Rate</TableHead>
//                     <TableHead>Avg. Time (sec)</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {data.questionStats.map((q, i) => (
//                     <TableRow key={q.id}>
//                       <TableCell>{q.id}</TableCell>
//                       <TableCell>{q.question}</TableCell>
//                       <TableCell>
//                         <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
//                           q.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
//                           q.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
//                           'bg-red-500/20 text-red-500'
//                         }`}>
//                           {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
//                         </span>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <Progress value={q.correctAnswerRate} className="w-24" />
//                           <span>{q.correctAnswerRate}%</span>
//                         </div>
//                       </TableCell>
//                       <TableCell>{data.timePerQuestion[i].avgTimeSeconds}s</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
        
//         {/* Candidates Tab */}
//         <TabsContent value="candidates" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Candidate Results</CardTitle>
//               <CardDescription>Individual performance of all candidates</CardDescription>
              
//               <div className="pt-2">
//                 <div className="relative">
//                   <Search className="absolute left-2 top-2.5 h-4 w-4 text-nexthire-text-gray" />
//                   <Input
//                     placeholder="Search candidates..."
//                     className="pl-8"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[250px]">
//                       <Button 
//                         variant="ghost" 
//                         onClick={() => requestSort('name')} 
//                         className="flex items-center p-0 font-medium hover:bg-transparent hover:underline"
//                       >
//                         Name {getSortIcon('name')}
//                       </Button>
//                     </TableHead>
//                     <TableHead>
//                       <Button 
//                         variant="ghost" 
//                         onClick={() => requestSort('score')} 
//                         className="flex items-center p-0 font-medium hover:bg-transparent hover:underline"
//                       >
//                         Score {getSortIcon('score')}
//                       </Button>
//                     </TableHead>
//                     <TableHead>
//                       <Button 
//                         variant="ghost" 
//                         onClick={() => requestSort('completionTime')} 
//                         className="flex items-center p-0 font-medium hover:bg-transparent hover:underline"
//                       >
//                         Time Taken {getSortIcon('completionTime')}
//                       </Button>
//                     </TableHead>
//                     <TableHead>
//                       <Button 
//                         variant="ghost" 
//                         onClick={() => requestSort('status')} 
//                         className="flex items-center p-0 font-medium hover:bg-transparent hover:underline"
//                       >
//                         Status {getSortIcon('status')}
//                       </Button>
//                     </TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {sortedCandidates.map((candidate) => (
//                     <TableRow key={candidate.id}>
//                       <TableCell className="font-medium">{candidate.name}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center gap-2">
//                           <Progress 
//                             value={candidate.score} 
//                             className="w-24" 
//                             indicatorColor={candidate.status === 'passed' ? 'bg-green-500' : 'bg-red-500'}
//                           />
//                           <span className={candidate.status === 'passed' ? 'text-green-500' : 'text-red-500'}>
//                             {candidate.score}%
//                           </span>
//                         </div>
//                       </TableCell>
//                       <TableCell>{candidate.completionTime}</TableCell>
//                       <TableCell>
//                         <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
//                           candidate.status === 'passed' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
//                         }`}>
//                           {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
//                         </span>
//                       </TableCell>
//                       <TableCell>
//                         <Button size="sm" variant="outline">View Details</Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>
        
//         {/* Performance Tab */}
//         <TabsContent value="performance" className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Difficulty Distribution</CardTitle>
//                 <CardDescription>Questions by difficulty level</CardDescription>
//               </CardHeader>
//               <CardContent className="flex justify-center">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={[
//                         { name: 'Easy', value: data.questionStats.filter(q => q.difficulty === 'easy').length },
//                         { name: 'Medium', value: data.questionStats.filter(q => q.difficulty === 'medium').length },
//                         { name: 'Hard', value: data.questionStats.filter(q => q.difficulty === 'hard').length },
//                       ]}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={100}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     >
//                       {[
//                         { name: 'Easy', value: data.questionStats.filter(q => q.difficulty === 'easy').length },
//                         { name: 'Medium', value: data.questionStats.filter(q => q.difficulty === 'medium').length },
//                         { name: 'Hard', value: data.questionStats.filter(q => q.difficulty === 'hard').length },
//                       ].map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader>
//                 <CardTitle>Time Distribution</CardTitle>
//                 <CardDescription>Average time spent on each question</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart
//                     data={data.timePerQuestion}
//                     margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="id" label={{ value: 'Question', position: 'insideBottom', offset: -5 }} />
//                     <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
//                     <Tooltip 
//                       formatter={(value) => [`${value} seconds`, 'Average Time']}
//                       labelFormatter={(value) => `Question ${value}`}
//                     />
//                     <Legend />
//                     <Bar dataKey="avgTimeSeconds" fill="#ffc658" name="Avg. Time (seconds)" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </div>
          
//           <Card>
//             <CardHeader>
//               <CardTitle>Performance Summary</CardTitle>
//               <CardDescription>Overall test performance insights</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="rounded-lg bg-nexthire-card-gray p-4">
//                   <h3 className="text-lg font-medium text-white">Strengths</h3>
//                   <ul className="mt-2 space-y-2 text-nexthire-text-gray">
//                     <li className="flex items-start">
//                       <span className="mr-2 text-green-500">•</span>
//                       High performance on basic concept questions (95% correct)
//                     </li>
//                     <li className="flex items-start">
//                       <span className="mr-2 text-green-500">•</span>
//                       Good understanding of React fundamentals
//                     </li>
//                     <li className="flex items-start">
//                       <span className="mr-2 text-green-500">•</span>
//                       Most candidates completed the test within time limit
//                     </li>
//                   </ul>
//                 </div>
                
//                 <div className="rounded-lg bg-nexthire-card-gray p-4">
//                   <h3 className="text-lg font-medium text-white">Areas for Improvement</h3>
//                   <ul className="mt-2 space-y-2 text-nexthire-text-gray">
//                     <li className="flex items-start">
//                       <span className="mr-2 text-red-500">•</span>
//                       Low performance on coding questions (52% correct)
//                     </li>
//                     <li className="flex items-start">
//                       <span className="mr-2 text-red-500">•</span>
//                       Advanced topics need more focus
//                     </li>
//                     <li className="flex items-start">
//                       <span className="mr-2 text-red-500">•</span>
//                       Some candidates struggled with time management
//                     </li>
//                   </ul>
//                 </div>
//               </div>
              
//               <div className="rounded-lg bg-nexthire-card-gray p-4">
//                 <h3 className="text-lg font-medium text-white">Recommendations</h3>
//                 <ul className="mt-2 space-y-2 text-nexthire-text-gray">
//                   <li className="flex items-start">
//                     <span className="mr-2 text-nexthire-purple">•</span>
//                     Consider adjusting difficulty balance (current distribution is too weighted toward hard questions)
//                   </li>
//                   <li className="flex items-start">
//                     <span className="mr-2 text-nexthire-purple">•</span>
//                     Increase time allocation for coding questions
//                   </li>
//                   <li className="flex items-start">
//                     <span className="mr-2 text-nexthire-purple">•</span>
//                     Add more medium-difficulty questions to better assess candidate skills
//                   </li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default TestAnalytics;
