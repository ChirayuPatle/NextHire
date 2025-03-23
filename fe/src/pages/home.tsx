import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Clock, Users, MessageSquare, CheckCircle, Brain } from "lucide-react";
import Navbar from "@/components/layouts/navbar";
import Button from "@/components/ui-custom/button";
import Card from "@/components/ui-custom/card";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".animate-on-scroll");
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("animate-slide-in");
          section.classList.remove("opacity-0", "translate-y-10");
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-28 pb-20 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 mx-auto w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#B967FF]/10 to-transparent opacity-70 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-[#B967FF] to-[#D4A5FF] bg-clip-text text-transparent">AI-Powered</span> Interview Automation Platform
          </h1>
          
          <p className="text-lg sm:text-xl text-[#ABABAB] mb-8 max-w-3xl mx-auto animate-slide-in">
            Transform your recruitment process with NextHire's intelligent interview platform. 
            Automate candidate evaluations, get data-driven insights, and make better hiring decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-slide-in">
            <Link to="/login">
              <Button variant="primary" size="lg" className=" hover:underline hover:underline-offset-4 cursor-pointer w-full sm:w-auto">
                For Organizations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className=" group hover:bg-[#B967FF]/20 hover:border-transparent cursor-pointer w-full sm:w-auto">
                For Candidates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-[#1E1E1E] border border-[#2F2F2F]/30 rounded-xl p-6 shadow-xl mt-16 backdrop-blur-sm animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#B967FF] mb-2">87%</p>
                <p className="text-sm text-[#ABABAB]">Time Saved in Screening</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#B967FF] mb-2">92%</p>
                <p className="text-sm text-[#ABABAB]">More Accurate Matches</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#B967FF] mb-2">5x</p>
                <p className="text-sm text-[#ABABAB]">Higher Quality Hires</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#B967FF] mb-2">65%</p>
                <p className="text-sm text-[#ABABAB]">Reduced Hiring Costs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl"
      >
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionize Your Hiring Process</h2>
          <p className="text-[#ABABAB] text-lg max-w-3xl mx-auto">
            NextHire combines AI-powered interviewing with powerful analytics to transform how you evaluate candidates.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card 
            variant="glass" 
            isHoverable 
            className="animate-on-scroll opacity-0 translate-y-10"
          >
            <div className="p-2 bg-[#B967FF]/10 rounded-lg w-fit mb-4">
              <Brain className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Automated Questioning</h3>
            <p className="text-[#ABABAB]">
              AI generates tailored interview questions based on candidate responses, simulating real-life interview scenarios.
            </p>
          </Card>
          
          {/* Feature 2 */}
          <Card 
            variant="glass" 
            isHoverable 
            className="animate-on-scroll opacity-0 translate-y-10"
          >
            <div className="p-2 bg-[#B967FF]/10 rounded-lg w-fit mb-4">
              <MessageSquare className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Feedback</h3>
            <p className="text-[#ABABAB]">
              Provides instant, data-driven feedback to candidates, helping them improve and refine their answers.
            </p>
          </Card>
          
          {/* Feature 3 */}
          <Card 
            variant="glass" 
            isHoverable 
            className="animate-on-scroll opacity-0 translate-y-10"
          >
            <div className="p-2 bg-[#B967FF]/10 rounded-lg w-fit mb-4">
              <CheckCircle className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customizable</h3>
            <p className="text-[#ABABAB]">
              Offers customizable interview settings, including question difficulty, role-specific queries, and time limits.
            </p>
          </Card>
          
          {/* Feature 4 */}
          <Card 
            variant="glass" 
            isHoverable 
            className="animate-on-scroll opacity-0 translate-y-10"
          >
            <div className="p-2 bg-[#B967FF]/10 rounded-lg w-fit mb-4">
              <BarChart2 className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-[#ABABAB]">
              Provides recruiters with detailed performance analytics, highlighting candidate strengths and areas for improvement.
            </p>
          </Card>
          
          {/* Feature 5 */}
          <Card 
            variant="glass" 
            isHoverable 
            className="animate-on-scroll opacity-0 translate-y-10"
          >
            <div className="p-2 bg-[#B967FF]/10 rounded-lg w-fit mb-4">
              <Users className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Platform Support</h3>
            <p className="text-[#ABABAB]">
              Accessible across devices, ensuring flexibility for both candidates and recruiters.
            </p>
          </Card>
          
          {/* Feature 6 */}
          <Card 
            variant="glass" 
            isHoverable 
            className="animate-on-scroll opacity-0 translate-y-10"
          >
            <div className="p-2 bg-[#B967FF]/10 rounded-lg w-fit mb-4">
              <Brain className="h-6 w-6 text-[#B967FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Built-in Nexthire AI</h3>
            <p className="text-[#ABABAB]">
              Smart AI chatbot serves as a virtual assistant for both recruiters and job candidates.
            </p>
          </Card>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-[#1E1E1E] rounded-3xl overflow-hidden">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-[#ABABAB] text-lg max-w-3xl mx-auto">
            A simplified, efficient process that saves time and improves candidate selection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center animate-on-scroll opacity-0 translate-y-10">
            <div className="w-16 h-16 rounded-full bg-[#B967FF]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#B967FF] text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Sessions</h3>
            <p className="text-[#ABABAB] px-4">
              Set up interviews, define job roles, skills required, and assessment criteria.
            </p>
          </div>
          
          <div className="text-center animate-on-scroll opacity-0 translate-y-10">
            <div className="w-16 h-16 rounded-full bg-[#B967FF]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#B967FF] text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Candidate Takes Tests</h3>
            <p className="text-[#ABABAB] px-4">
              Candidates complete automated interviews and assessments at scheduled times.
            </p>
          </div>
          
          <div className="text-center animate-on-scroll opacity-0 translate-y-10">
            <div className="w-16 h-16 rounded-full bg-[#B967FF]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#B967FF] text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Review & Hire</h3>
            <p className="text-[#ABABAB] px-4">
              Get AI-generated insights and recommendations to make informed hiring decisions.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-[#1E1E1E] to-[#121212] border border-[#2F2F2F]/20 rounded-3xl p-8 md:p-12 shadow-xl animate-on-scroll opacity-0 translate-y-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Recruitment?</h2>
            <p className="text-[#ABABAB] text-lg max-w-3xl mx-auto mb-8">
              Join hundreds of companies using NextHire to find the best talent faster and with greater confidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/auth?type=register&role=organization">
              <Link to={'/login'}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-12">
            <div>
              <p className="text-2xl font-bold text-[#B967FF]">500+</p>
              <p className="text-sm text-[#ABABAB]">Companies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#B967FF]">50,000+</p>
              <p className="text-sm text-[#ABABAB]">Interviews</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#B967FF]">98%</p>
              <p className="text-sm text-[#ABABAB]">Satisfaction</p>s
            </div>
            <div>
              <p className="text-2xl font-bold text-[#B967FF]">10,000+</p>
              <p className="text-sm text-[#ABABAB]">Hires Made</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#1E1E1E] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 7L16 20.5L7 34H14L23 20.5L14 7H7Z" fill="#B967FF"/>
                  <path d="M26 7L35 20.5L26 34H33L42 20.5L33 7H26Z" fill="#B967FF"/>
                </svg>
                <span className="text-xl font-bold text-white">NextHire</span>
              </div>
              <p className="text-[#ABABAB] mb-4">
                Transform your recruitment process with AI-powered interview automation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Features</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Pricing</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Case Studies</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Reviews</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">About</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Careers</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Blog</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Contact</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Help Center</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Documentation</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Status</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Security</a></li>
                <li><a href="#" className="text-[#ABABAB] hover:text-[#B967FF]">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-[#2F2F2F]/20 text-center">
            <p className="text-[#ABABAB] text-sm">
              © {new Date().getFullYear()} NextHire. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;