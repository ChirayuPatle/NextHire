
import AppLayout from "@/components/layouts/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "CEO & Founder",
    image: "/placeholder.svg",
    bio: "Previously led HR Tech at a Fortune 500 company. Founded NextHire to revolutionize the hiring process."
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "/placeholder.svg",
    bio: "Full-stack developer with 12+ years of experience. Passionate about building tools that make recruiting more efficient."
  },
  {
    name: "James Wilson",
    role: "Head of Product",
    image: "/placeholder.svg",
    bio: "Former recruiter who understands the pain points of traditional hiring. Focused on user-centered design."
  },
  {
    name: "Priya Patel",
    role: "Head of Customer Success",
    image: "/placeholder.svg",
    bio: "Dedicated to ensuring customers get the most out of NextHire with personalized support and training."
  }
];

const values = [
  {
    title: "Innovation",
    description: "We continuously explore new technologies and methodologies to improve the hiring experience."
  },
  {
    title: "Equity",
    description: "We design tools that help reduce bias in hiring and create more diverse workplaces."
  },
  {
    title: "Efficiency",
    description: "We believe in streamlining processes to save time without sacrificing quality."
  },
  {
    title: "Transparency",
    description: "We foster open communication between candidates, employers, and our platform."
  }
];

const About = () => {
  return (
    <AppLayout>
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">About NextHire</h1>
          <p className="mx-auto max-w-3xl text-xl text-nexthire-text-gray">
            We're on a mission to make technical hiring more efficient, fair, and enjoyable for everyone involved.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-white">Our Story</h2>
          <div className="rounded-xl bg-nexthire-card-gray p-8">
            <p className="mb-4 text-nexthire-text-gray">
              NextHire was founded in 2022 with a simple goal: to fix the broken technical hiring process. After experiencing frustration on both sides of the 
              hiring table, our founding team knew there had to be a better way.
            </p>
            <p className="mb-4 text-nexthire-text-gray">
              Traditional interviews often fail to accurately assess a candidate's abilities and potential. They're time-consuming, stressful, and frequently biased. 
              We built NextHire to solve these problems with a platform that provides structured, fair, and comprehensive assessment tools.
            </p>
            <p className="text-nexthire-text-gray">
              Today, NextHire helps thousands of companies streamline their hiring process, reduce time-to-hire, and build stronger, more diverse technical teams. 
              We're just getting started on our journey to transform how companies find and hire talent.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-white">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <div key={index} className="rounded-xl bg-nexthire-card-gray p-6">
                <h3 className="mb-2 text-xl font-bold text-white">{value.title}</h3>
                <p className="text-nexthire-text-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team Section */}
        <div>
          <h2 className="mb-6 text-3xl font-bold text-white">Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="rounded-xl bg-nexthire-card-gray p-6 text-center">
                <Avatar className="mx-auto mb-4 h-24 w-24">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="mb-1 text-xl font-bold text-white">{member.name}</h3>
                <p className="mb-3 text-nexthire-purple">{member.role}</p>
                <p className="text-sm text-nexthire-text-gray">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
