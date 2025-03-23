
// import { useState } from "react";
// import { Upload, FileText, Plus, X, Edit, Trash } from "lucide-react";
// import Button from "../ui-custom/Button";
// import Card from "../ui-custom/Card";

// interface Education {
//   degree: string;
//   institution: string;
//   location?: string;
//   duration: string;
// }

// interface WorkExperience {
//   position: string;
//   company: string;
//   duration: string;
//   description?: string;
// }

// interface Skill {
//   name: string;
// }

// interface ResumeData {
//   name: string;
//   email: string;
//   phone: string;
//   education: Education[];
//   workExperience: WorkExperience[];
//   skills: Skill[];
//   additionalInfo?: string;
// }

// const mockParseResume = (file: File): Promise<ResumeData> => {
//   // In a real application, this would call an AI API to parse the resume
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         name: "Priyanshu Sandeep Kayarkar",
//         email: "priyanshukayarkar@gmail.com",
//         phone: "+91 9950500444",
//         education: [
//           {
//             degree: "B.Tech in Computer Science & Design",
//             institution: "Vishwakarma College Of Engineering (VCOE), Nagpur",
//             duration: "2003 - 2007"
//           }
//         ],
//         workExperience: [],
//         skills: [
//           { name: "backend" },
//           { name: "Node.js" },
//           { name: "Express.js" }
//         ]
//       });
//     }, 1500);
//   });
// };

// const ResumeParser = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isParsing, setIsParsing] = useState(false);
//   const [resumeData, setResumeData] = useState<ResumeData | null>(null);
//   const [activeSection, setActiveSection] = useState<string | null>(null);
  
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };
  
//   const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };
  
//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };
  
//   const handleUpload = async () => {
//     if (!file) return;
    
//     setIsUploading(true);
    
//     // Simulate upload
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     setIsUploading(false);
//     setIsParsing(true);
    
//     try {
//       const data = await mockParseResume(file);
//       setResumeData(data);
//     } catch (error) {
//       console.error("Error parsing resume:", error);
//     }
    
//     setIsParsing(false);
//   };
  
//   const handleRemoveFile = () => {
//     setFile(null);
//     setResumeData(null);
//   };
  
//   const toggleSection = (section: string) => {
//     if (activeSection === section) {
//       setActiveSection(null);
//     } else {
//       setActiveSection(section);
//     }
//   };
  
//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       {!resumeData ? (
//         <Card className="animate-fade-in">
//           <h2 className="text-xl font-semibold text-white mb-4">Upload Your Resume</h2>
          
//           <div 
//             className="border-2 border-dashed border-nexthire-light-gray rounded-lg p-8 mb-4 text-center"
//             onDrop={handleFileDrop}
//             onDragOver={handleDragOver}
//           >
//             {!file ? (
//               <>
//                 <Upload className="h-12 w-12 mx-auto mb-4 text-nexthire-purple" />
//                 <p className="text-nexthire-text-gray mb-2">Drag and drop your resume here, or click to browse</p>
//                 <p className="text-nexthire-text-gray text-sm mb-4">Supported formats: PDF, DOCX</p>
//                 <label className="button-primary cursor-pointer inline-block">
//                   Browse Files
//                   <input 
//                     type="file" 
//                     accept=".pdf,.docx" 
//                     className="hidden" 
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               </>
//             ) : (
//               <div className="flex items-center justify-between bg-nexthire-light-gray p-3 rounded-md">
//                 <div className="flex items-center space-x-3">
//                   <FileText className="h-8 w-8 text-nexthire-purple" />
//                   <div className="text-left">
//                     <p className="text-white font-medium">{file.name}</p>
//                     <p className="text-nexthire-text-gray text-sm">
//                       {(file.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </div>
//                 </div>
//                 <button 
//                   className="text-nexthire-text-gray hover:text-white"
//                   onClick={handleRemoveFile}
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//             )}
//           </div>
          
//           {file && (
//             <div className="flex justify-end space-x-3">
//               <Button 
//                 variant="secondary" 
//                 onClick={handleRemoveFile}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 onClick={handleUpload} 
//                 isLoading={isUploading || isParsing}
//               >
//                 {isParsing ? "Parsing Resume..." : "Upload & Parse"}
//               </Button>
//             </div>
//           )}
//         </Card>
//       ) : (
//         <div className="animate-slide-in">
//           <div className="flex items-center justify-between mb-5">
//             <h1 className="text-2xl font-bold text-white">NextHire Resume</h1>
//             <Button variant="outline" size="sm">
//               <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//               </svg>
//               Download
//             </Button>
//           </div>
          
//           <Card className="mb-6">
//             <div className="flex justify-between">
//               <div>
//                 <h2 className="text-xl font-bold text-white">{resumeData.name}</h2>
//                 <p className="text-nexthire-text-gray">{resumeData.email}</p>
//                 <p className="text-nexthire-text-gray">{resumeData.phone}</p>
//               </div>
//               <div className="flex space-x-2">
//                 <Button variant="ghost" size="sm">
//                   <Edit className="h-4 w-4 mr-1" />
//                   Edit
//                 </Button>
//                 <Button variant="ghost" size="sm">
//                   <Trash className="h-4 w-4 mr-1" />
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           </Card>
          
//           {/* Education Section */}
//           <Card className="mb-6">
//             <div 
//               className="flex justify-between items-center cursor-pointer"
//               onClick={() => toggleSection('education')}
//             >
//               <h3 className="text-lg font-semibold text-white">Education</h3>
//               <div className="flex space-x-2">
//                 <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
//                   <Plus className="h-4 w-4 mr-1" />
//                   Add Education
//                 </Button>
//               </div>
//             </div>
            
//             {resumeData.education.map((edu, index) => (
//               <div key={index} className="mt-4 p-3 bg-nexthire-light-gray rounded-md">
//                 <div className="flex justify-between mb-1">
//                   <h4 className="font-medium text-white">{edu.degree}</h4>
//                   <div className="flex space-x-2">
//                     <Button variant="ghost" size="sm" className="p-1 h-auto">
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="sm" className="p-1 h-auto">
//                       <Trash className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//                 <p className="text-nexthire-text-gray text-sm">{edu.institution}</p>
//                 <p className="text-nexthire-text-gray text-sm">{edu.duration}</p>
//               </div>
//             ))}
//           </Card>
          
//           {/* Work Experience Section */}
//           <Card className="mb-6">
//             <div 
//               className="flex justify-between items-center cursor-pointer"
//               onClick={() => toggleSection('experience')}
//             >
//               <h3 className="text-lg font-semibold text-white">Work Experience</h3>
//               <div className="flex space-x-2">
//                 <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
//                   <Plus className="h-4 w-4 mr-1" />
//                   Add Job
//                 </Button>
//                 <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
//                   <Plus className="h-4 w-4 mr-1" />
//                   Add Internship
//                 </Button>
//               </div>
//             </div>
            
//             {resumeData.workExperience.length === 0 && (
//               <div className="mt-4 p-3 bg-nexthire-light-gray rounded-md text-center">
//                 <p className="text-nexthire-text-gray">No work experience added yet.</p>
//               </div>
//             )}
//           </Card>
          
//           {/* Skills Section */}
//           <Card className="mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-white">Skills</h3>
//               <Button variant="ghost" size="sm">
//                 <Plus className="h-4 w-4 mr-1" />
//                 Add Skill
//               </Button>
//             </div>
            
//             <div className="flex flex-wrap gap-2">
//               {resumeData.skills.map((skill, index) => (
//                 <div 
//                   key={index}
//                   className="bg-nexthire-light-gray text-white rounded-full px-3 py-1 text-sm flex items-center"
//                 >
//                   {skill.name}
//                   <button className="ml-2 text-nexthire-text-gray hover:text-white">
//                     <X className="h-3 w-3" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </Card>
          
//           {/* Additional Sections */}
//           <div className="flex flex-col space-y-4">
//             <Button variant="outline" className="w-full">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Portfolio/Work Sample
//             </Button>
            
//             <Button variant="outline" className="w-full">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Training/Course
//             </Button>
            
//             <Button variant="outline" className="w-full">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Extra Curricular Activities
//             </Button>
            
//             <Button variant="outline" className="w-full">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Accomplishments/Additional Detail
//             </Button>
//           </div>
          
//           <div className="mt-6 flex justify-center">
//             <Button>Save</Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeParser;
