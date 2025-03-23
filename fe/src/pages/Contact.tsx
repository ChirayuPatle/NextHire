
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  CheckCircle 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactCard = ({ 
  icon, 
  title, 
  details 
}: { 
  icon: React.ReactNode; 
  title: string; 
  details: string | React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center rounded-xl bg-nexthire-card-gray p-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-nexthire-purple/20">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-medium text-white">{title}</h3>
      <div className="text-nexthire-text-gray">{details}</div>
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white">Get in Touch</h1>
          <p className="mx-auto max-w-2xl text-nexthire-text-gray">
            Have questions about NextHire? We're here to help. Reach out to our team for support, sales inquiries, or partnership opportunities.
          </p>
        </div>

        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard 
            icon={<Mail className="h-6 w-6 text-nexthire-purple" />}
            title="Email Us"
            details={<a href="mailto:hello@nexthire.com" className="hover:text-nexthire-purple">hello@nexthire.com</a>}
          />
          <ContactCard 
            icon={<Phone className="h-6 w-6 text-nexthire-purple" />}
            title="Call Us"
            details={<a href="tel:+1234567890" className="hover:text-nexthire-purple">+1 (234) 567-890</a>}
          />
          <ContactCard 
            icon={<MapPin className="h-6 w-6 text-nexthire-purple" />}
            title="Visit Us"
            details="100 Tech Drive, San Francisco, CA 94103"
          />
          <ContactCard 
            icon={<Clock className="h-6 w-6 text-nexthire-purple" />}
            title="Office Hours"
            details="Monday - Friday, 9AM - 5PM PST"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-xl bg-nexthire-card-gray p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Send us a Message</h2>
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="mb-4 h-16 w-16 text-nexthire-purple" />
                <h3 className="mb-2 text-xl font-medium text-white">Message Received!</h3>
                <p className="mb-6 text-nexthire-text-gray">We'll get back to you as soon as possible.</p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="bg-nexthire-purple hover:bg-nexthire-dark-purple"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                      Your Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="border-nexthire-dark-gray bg-nexthire-light-gray text-white placeholder:text-nexthire-text-gray"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                      Your Email
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="border-nexthire-dark-gray bg-nexthire-light-gray text-white placeholder:text-nexthire-text-gray"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-white">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    required
                    className="border-nexthire-dark-gray bg-nexthire-light-gray text-white placeholder:text-nexthire-text-gray"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    className="min-h-[150px] border-nexthire-dark-gray bg-nexthire-light-gray text-white placeholder:text-nexthire-text-gray"
                    placeholder="Your message here..."
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-nexthire-purple hover:bg-nexthire-dark-purple"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          <div className="rounded-xl bg-nexthire-card-gray p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">How do I get started with NextHire?</h3>
                <p className="text-nexthire-text-gray">
                  Sign up for a free trial account, and you'll be guided through the setup process. You can create your first hiring session in minutes.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">Do you offer custom integrations?</h3>
                <p className="text-nexthire-text-gray">
                  Yes, our Enterprise plan includes custom integrations with your existing HR systems. Contact our sales team to discuss your needs.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">Is my data secure?</h3>
                <p className="text-nexthire-text-gray">
                  NextHire takes security seriously. We use industry-standard encryption and security practices to protect your data.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">Can I migrate my existing candidate data?</h3>
                <p className="text-nexthire-text-gray">
                  Yes, we offer data migration services to help you import your existing candidate information into NextHire.
                </p>
              </div>
              <div className="flex items-center justify-center pt-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-nexthire-purple text-nexthire-purple hover:bg-nexthire-purple/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>View All FAQs</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contact;
