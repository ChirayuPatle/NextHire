import { useState } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";

const faqs = [
  {
    question: "How does the automated interview platform work?",
    answer:
      "Our AI-powered platform evaluates candidates based on their responses and provides detailed insights into their skills and performance.",
  },
  {
    question: "Can I customize the interview questions?",
    answer:
      "Yes, you can create custom interview questions tailored to your company's needs from the settings panel.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We prioritize security and use encryption to protect all interview data, ensuring privacy and compliance.",
  },
  {
    question: "How can I get support?",
    answer:
      "You can reach out to our support team through the contact form in the platform or email us at support@next-hire.com.",
  },
];

const HelpPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Help & Support
      </h1>
      <p className="text-neutral-400 mt-2">Find answers to commonly asked questions</p>

      <div className="w-full max-w-2xl mt-6">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 bg-neutral-800 rounded-lg shadow-md hover:bg-neutral-700 transition"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <ChevronDown
                className={`transition-transform ${openIndex === index ? "rotate-180" : "rotate-0"}`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 bg-neutral-900 rounded-b-lg border-l-4 border-blue-500 text-neutral-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Information Section */}
      <div className="w-full max-w-2xl mt-12 p-6 bg-neutral-900 rounded-lg shadow-md text-neutral-300">
        <h2 className="text-xl font-semibold text-white">Contact Information</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-500" size={20} />
            <span>+91 93736 90752</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-500" size={20} />
            <span>priyanshukayarkar2@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="text-blue-500" size={20} />
            <span>Pachgao AI Street, Tech City, USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
