import { FileText, Download, Filter, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "../components/SectionHeader";

const reports = [
  {
    id: 1,
    title: "Monthly Hiring Report",
    type: "Hiring",
    date: "2023-06-01",
    format: "PDF",
    size: "2.4 MB"
  },
  {
    id: 2,
    title: "Candidate Pipeline Analysis",
    type: "Analysis",
    date: "2023-05-15",
    format: "Excel",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Interview Performance Q2",
    type: "Interviews",
    date: "2023-04-10",
    format: "PDF",
    size: "3.2 MB"
  },
];

export const AdminReports = () => {
  return (
    <div className="animate-[fade-in_0.3s_ease-out] px-10 text-white">
      <SectionHeader 
        title="Reports Dashboard" 
        actionText="Generate New" 
        onAction={() => console.log("Generate new report")}
      />

      <div className="mt-6 space-y-6">
        <Card className="bg-[#1E1E1E] text-white border border-[#333] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-[#B0B0B0]" />
              <span className="text-sm text-[#B0B0B0]">Filter by:</span>
              <Button className="text-black" variant="outline" size="sm">
                Report Type
              </Button>
              <Button className="text-black" variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
            <Button className="bg-[#B967FF] hover:bg-[#8344B8]">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </Card>

        <div className="grid text-white grid-cols-1 gap-4">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ report }: { report: any }) => {
  return (
    <Card className="bg-[#1E1E1E] text-white border border-[#333] hover:border-[#B967FF] transition-colors">
      <div className="p-6 text-white ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-[#B967FF]/10">
              <FileText className="h-6 w-6 text-[#B967FF]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{report.title}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/80">
                <span>Type: {report.type}</span>
                <span>Created: {new Date(report.date).toLocaleDateString()}</span>
                <span>Format: {report.format}</span>
                <span>Size: {report.size}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-[#B967FF] text-[#B967FF] hover:bg-[#B967FF]/10">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};